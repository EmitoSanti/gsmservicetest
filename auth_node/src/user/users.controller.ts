import * as _ from "lodash";
import * as express from "express"; // revisar si esta bien .. creeria que si por el tipado de los parametros
import * as error from "../server/error";
import * as token from "../token";
import { Payload } from "../token";
import { IUser } from "./user";
import { UsersService } from "./users.service";
import * as rabbit from "../rabbit";

interface ISessionRequest extends express.Request {
  user: Payload;
}

export class UsersController {
  static current(req: ISessionRequest, res: express.Response) {
    console.log("current: "+ req.user.user_id);
    UsersService.currentUser(req.user.user_id)
      .then((user: IUser)  => {
        console.log("UsersController current: " + JSON.stringify(user));
        return res.json({
          id: user.id,
          name: user.name,
          login: user.login,
          permissions: user.permissions
        });
      })
      .catch((err: any) => error.handle(res, err));
  }

  static login(req: express.Request, res: express.Response) {
    console.log("login UsersController: "  +JSON.stringify(req.body));
    let user: IUser;
    UsersService.login(req.body)
      .then((userlogin: IUser) => {
        user = userlogin;
        return UsersService.validateLogin(req.body, user);
      })
      .then(() => {
        console.log("login user: " + JSON.stringify(user));
        return UsersService.updateLastLogin(user._id);
      })
      .then(() => {
        return token.create(user._id.toHexString());
      })
      .then((tokenString: string) => {
        console.log("fin login user: " + JSON.stringify(user));
        return res.json({
          id: user.id,
          name: user.name,
          login: user.login,
          permissions: user.permissions,
          token: tokenString
        });
      })
      .catch(err => error.handle(res, err));
  }

  static async logout(req: ISessionRequest, res: express.Response) {
    try {
      console.log("logout: " + JSON.stringify(req.user));
      await token.invalidate(req.user);
      rabbit.sendLogout(req.header("Authorization"))
        .catch((err) => {
          console.error("signout " + err);
        });
      res.send();
    } catch (err) {
      error.handle(res, err);
    }
  }

  static signUp(req: express.Request, res: express.Response) {
    console.log("signUp UsersController");
    let user: IUser;
    UsersService.register(req.body)
      .then((validate: any) => {
        return UsersService.login(req.body);
      })
      .then((userlogin: IUser) => {
        user = userlogin;
        return token.create(userlogin._id.toHexString());
      })
      .then((tokenString: string) => {
        user.token = tokenString;
        console.log("login user: " + JSON.stringify(user));
        return res.json(user);
      })
      .catch(err => error.handle(res, err));
  }

  static changePassword(req: ISessionRequest, res: express.Response) {
    console.log("changePassword controller: " + JSON.stringify(req.user.user_id));
    UsersService.findById(req.user.user_id)
      .then((user: IUser) => {
        console.log("user: " + JSON.stringify(user));
        return UsersService.validateChangePassword(req.body, user);
      })
      .then((validate: any) => {
        console.log("validate: " + JSON.stringify(validate));
        return UsersService.changePassword(req.user.user_id, req.body)
      })
      .then((algo: any) => {
        console.log("algo: " + JSON.stringify(algo));
        res.send();
      })
      .catch(err => error.handle(res, err));
  }

  static grantPermissions(req: ISessionRequest, res: express.Response) {
    console.log("grantPermissions");
    UsersService.hasPermission(req.user.user_id, "admin")
    .then(() => {
      return UsersService.grantPermissions(req.params.userID, req.body.permissions);
    })
    .then(() => {
      res.json();
    }).catch(err => error.handle(res, err));
  }

  static revokePermissions(req: ISessionRequest, res: express.Response) {
    console.log("revokePermissions");
    UsersService.hasPermission(req.user.user_id, "admin")
    .then(() => {
      return UsersService.revokePermissions(req.params.userID, req.body.permissions);
    })
    .then(() => {
      res.json();
    }).catch(err => error.handle(res, err));
  }

  static enableUser(req: ISessionRequest, res: express.Response) {
    console.log("enableUser");
    UsersService.hasPermission(req.user.user_id, "admin")
    .then(() => {
      return UsersService.enableUser(req.params.userID);
    })
    .then(() => {
      res.json();
    }).catch(err => error.handle(res, err));
  }

  static disableUser(req: ISessionRequest, res: express.Response) {
    const id = escape(req.params.userID);
    console.log("disableUser: " + id);
    UsersService.hasPermission(req.user.user_id, "admin")
    .then(() => {
      return UsersService.disableUser(id);
    })
    .then(() => {
      res.json();
    }).catch(err => error.handle(res, err));
  }

  static getUsers(req: ISessionRequest, res: express.Response) {
    console.log("getUsers");
    UsersService.hasPermission(req.user.user_id, "admin")
    .then(() => {
      return UsersService.findAllUsers();
    })
    .then((users: IUser[]) => {
      res.json(users.map(u => {
        return {
          id: u.id,
          name: u.name,
          login: u.login,
          permissions: u.permissions,
          enabled: u.enabled,
          lastLogin: u.lastLogin
        };
      }));
    }).catch(err => error.handle(res, err));
  }
}