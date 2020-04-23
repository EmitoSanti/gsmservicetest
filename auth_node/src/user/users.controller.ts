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
    console.log("current");

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
    console.log("login UsersController");
    let user: IUser;
    UsersService.validateLogin(req.body)
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

  static async logout(req: ISessionRequest, res: express.Response) {
    try {
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

  // static changePassword(req: ISessionRequest, res: express.Response) {
  //   let user: IUser;
  //   user.changePassword(req.user.user_id, req.body)
  //     .then(_ => res.send())
  //     .catch(err => error.handle(res, err));
  // }
  // static async grantPermissions(req: ISessionRequest, res: express.Response) {
  //   try {
  //     await user.hasPermission(req.user.user_id, "admin");
  //     await user.grant(req.params.userID, req.body.permissions);
  //     res.send();
  //   } catch (err) {
  //     error.handle(res, err);
  //   }
  // }

  // static async revokePermissions(req: ISessionRequest, res: express.Response) {
  //   try {
  //     await user.hasPermission(req.user.user_id, "admin");
  //     await user.revoke(req.params.userID, req.body.permissions);
  //     res.send();
  //   } catch (err) {
  //     error.handle(res, err);
  //   }
  // }

  // static async enableUser(req: ISessionRequest, res: express.Response) {
  //   try {
  //     await user.hasPermission(req.user.user_id, "admin");
  //     await user.enable(req.params.userID);
  //     res.send();
  //   } catch (err) {
  //     error.handle(res, err);
  //   }
  // }

  // static async disableUser(req: ISessionRequest, res: express.Response) {
  //   try {
  //     await user.hasPermission(req.user.user_id, "admin");
  //     await user.disable(req.params.userID);
  //     res.send();
  //   } catch (err) {
  //     error.handle(res, err);
  //   }
  // }

  // static async getAll(req: ISessionRequest, res: express.Response) {
  //   try {
  //     await user.hasPermission(req.user.user_id, "admin");
  //     const users = await user.findAll();
  //     res.json(users.map(u => {
  //       return {
  //         id: u.id,
  //         name: u.name,
  //         login: u.login,
  //         permissions: u.permissions,
  //         enabled: u.enabled
  //       };
  //     }));
  //   } catch (err) {
  //     error.handle(res, err);
  //   }
  // }
}