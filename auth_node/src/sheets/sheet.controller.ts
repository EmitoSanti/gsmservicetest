import * as _ from "lodash";
import * as express from "express"; // revisar si esta bien .. creeria que si por el tipado de los parametros
import * as error from "../server/error";
import { SheetsService } from "./sheets.service"; // ver esto falla index.ts creo

// interface ISessionRequest extends express.Request { para los req
//   user: Payload;
// }

export class SheetsController {
  static getNewCode(req: express.Request, res: express.Response) {
    console.log("entro getNewCode");
    SheetsService.getNewCode()
      .then((response) => {
        console.log("googleURL: ", response);
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).json(err);
        // error.handle(res, err);
      });
  }
  static setNewCode(req: express.Request, res: express.Response) {
    console.log("entro code: " + JSON.stringify(req.query.code));
    console.log("entro scope: " + JSON.stringify(req.query.scope));
    try {
      const newCode = req.query.code;
      SheetsService.setNewCode(newCode);
    } catch (err) {
      error.handle(res, err); // revisar si funca bien
    }
  }

  static authorize(req: express.Request, res: express.Response) {
    SheetsService.readTokenFile()
      .then((token) => {
        return SheetsService.authorization(token);
      })
      .then((response) => {
        res.status(200).json("authorized");
      })
      .catch((err) => {
        const error  = {
          errno: err.errno,
          code: err.code,
          syscall: err.syscall
        };
        // err viene con el path del archivo que fallo si lo mando al front crea una pista para romper la seguridad de la plataforma
        res.status(400).json(error);
      });
  }
  static startMigration(req: express.Request, res: express.Response) {
    console.log("startMigration");
    SheetsService.readTokenFile()
    .then((token) => {
      console.log("token: " + token);
      return SheetsService.authorization(token);
    })
    .then((response) => {
      console.log("response: " + JSON.stringify(response));
      SheetsService.startMigration(response);
      res.status(200);
    })
    .catch((err) => {
      const error  = {
        errno: err.errno,
        code: err.code,
        syscall: err.syscall
      };
      // err viene con el path del archivo que fallo si lo mando al front crea una pista para romper la seguridad de la plataforma
      res.status(400).json(err);
      // error.handle(res, err); usar handle??
    });
    // try {
    //   SheetsService.startMigration();
    // } catch (err) {
    //   console.log("err: " + err);
    //   error.handle(res, err);
    // }
  }
}