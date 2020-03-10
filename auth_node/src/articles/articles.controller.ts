import * as _ from "lodash";
import * as express from "express"; // revisar si esta bien .. creeria que si por el tipado de los parametros
import * as error from "../server/error";
import { ArticlesService } from "./articles.service"; // ver esto falla index.ts creo

// interface ISessionRequest extends express.Request { para los req
//   user: Payload;
// }

export class ArticlesController {
  static getArticles(req: express.Request, res: express.Response) {
    console.log("getArticle: " + JSON.stringify(req.body));
    ArticlesService.getAll(req.body)
      .then(response => {
        return res.json(response);
      })
      .catch(err => error.handle(res, err));
  }
  static getBrands(req: express.Request, res: express.Response) {
    console.log("getBrands: " + JSON.stringify(req.body));
    ArticlesService.getAllBrands(req.body)
      .then(response => {
        return res.json(response);
      })
      .catch(err => error.handle(res, err));
  }
}