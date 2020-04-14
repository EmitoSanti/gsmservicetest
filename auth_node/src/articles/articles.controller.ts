import * as _ from "lodash";
import * as express from "express"; // revisar si esta bien .. creeria que si por el tipado de los parametros
import * as error from "../server/error";
import { ArticlesService } from "./articles.service"; // ver esto falla index.ts creo

// interface ISessionRequest extends express.Request { para los req
//   user: Payload;
// }

export class ArticlesController {
  static getArticles(req: express.Request, res: express.Response) {
    console.log("ArticlesController getArticles: " + JSON.stringify(req.query));
    ArticlesService.getAll(
      req.query.brand,
      req.query.name,
      req.query.mpn,
      {
        pageIndex: req.query.pageIndex,
        pageSize: req.query.pageSize
      })
      .then(response => {
        return res.json(response);
      })
      .catch(err => error.handle(res, err));
  }

  static getBrands(req: express.Request, res: express.Response) {
    // console.log("getBrands: " + JSON.stringify(req.query));
    ArticlesService.getAllBrands(req.query)
      .then(response => {
        return res.json(response);
      })
      .catch(err => error.handle(res, err));
  }
}