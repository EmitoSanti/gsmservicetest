"use strict";

import * as error from "../server/error";
import { Article, IArticle } from "./article"; // modelo/schema para los objetos en mongo
import * as _ from "lodash";

export class ArticlesService {
    static async clean(object: any): Promise<any> {  // para limpiar las query ... parece que por ahora es al dope .. en los vacios que se machean devuelve null
        for (const key in object) {
            if (object[key] === null || typeof object[key] === "undefined") {
                delete object[key];
            } else if (typeof object[key] === "object" && typeof object[key].getMonth !== "function"
              && !object[key].hasOwnProperty("lastIndex")) {
                if (Object.keys(object[key]).length === 0) {
                    delete object[key];
                } else {
                    const cleared = await this.clean(object[key]);
                    if (Object.keys(cleared).length === 0 && typeof cleared.getMonth !== "function") {
                        delete object[key];
                    } else {
                        object[key] = cleared;
                    }
                }
            }
        }
        console.log("object: " + JSON.stringify(object));
        return object;
    }

    static getAll(filter: any): Promise<Array<any>> { // a filter hay que parcear
        console.log("getAll: " + JSON.stringify(filter));
        // https://github.com/aravindnc/mongoose-aggregate-paginate-v2/blob/master/tests/index.js
        const options = {
            page: filter.page ? filter.page : 1, // arreglar estructura del body
            limit: filter.limit ? filter.limit : 20
        };
        const aggregate = Article.aggregate();
        aggregate.match(filter);
        aggregate.group({
            _id: "$mpn",
            name: {$last: "$name"},
            mpn: {$last: "$mpn"},
            brand: {$last: "$brand"},
            services: {$last: "$services"},
            enabled: {$last: "$enabled"}
        });
        aggregate.project({
            "mpn": 1,
            "name": 1,
            "brand": 1,
            "services": 1,
            "enabled": 1
        });
        aggregate.sort({"mpn": 1, "name": 1}); // revisar sorting a nivel de mpn
        console.log("aggregate: " + JSON.stringify(aggregate));
        return new Promise((resolve, reject) => {
            return Article.aggregatePaginate(aggregate, options, function(err: any, resp: any) {
                if (err) {
                    return reject(err);
                }
                console.log("resp: " + JSON.stringify(resp));
                return resolve([{resp: resp}]);
            });
        });
    }

    static migrationArticles(articles: any): Promise<IArticle> { // cambiar de any a IAricles cuando este completo el mapeo desde sheets
        console.log("migrationArticles");
        return new Promise<IArticle>((resolve, reject) => {
            try { // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/
                // const art = new Article();
                Article.insertMany( articles );
                console.log("vamo a ver");
                resolve();
             } catch (e) {
                reject();
                console.log("se pudrio: " + e);
             }
        });
    }
}

/* export async function getArticle(data: any): Promise<IArticle[]> {
    console.log("getArticle: " + JSON.stringify(data));
    const query = {
        {mpn: data.mpn};
        {brand: data.brand};
        {name: data.name};
    };
    try {
        const article = await Article.find({  }).exec();
        if (!article) {
            throw error.newError(error.ERROR_NOT_FOUND, "El articulo no se encuentra");
        }
        return Promise.resolve(article);
    } catch (err) {
        return Promise.reject(err);
    }
}*/