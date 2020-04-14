"use strict";

import * as error from "../server/error";
import { Article, IArticle } from "./article"; // modelo/schema para los objetos en mongo
import * as _ from "lodash";

export class ArticlesService {
    static getAll(brand: string, name: string, mpn: string, pagination: any): Promise<Array<any>> { // a filter hay que parcear
        console.log("ArticlesService getAll");
        console.log("pagination: " + JSON.stringify(pagination));
        // https://github.com/aravindnc/mongoose-aggregate-paginate-v2/blob/master/tests/index.js
        const options = {
            page: pagination.pageIndex ? (parseInt(pagination.pageIndex) + 1) : 1, // Current page number > 0
            limit: pagination.pageSize ? pagination.pageSize : 24, // Limit that was used = pageSize
        };
        console.log("options: " + JSON.stringify(options));
        const filter: any = {};
        if (brand) {
            filter.brand = brand;
        }
        if (name) {
            filter.name = name;
        }
        if (mpn) {
            filter.mpn = mpn;
        }
        console.log("filter: " + JSON.stringify(filter));
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
        aggregate.sort({"name": 1, "mpn": 1}); // revisar sorting a nivel de mpn
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

    static getAllBrands(filter: any): Promise<Array<any>> { // a filter hay que parcear
        // console.log("getAllBrands: " + JSON.stringify(filter));
        // https://github.com/aravindnc/mongoose-aggregate-paginate-v2/blob/master/tests/index.js
        const options = {
            page: filter.page ? filter.page : 1, // arreglar estructura del body
            limit: filter.limit ? filter.limit : 20
        };
        const query = { enabled: true };
        if (filter.enabled == "false") {
            query.enabled = false;
        }
        const aggregate = Article.aggregate();
        aggregate.match(query);
        aggregate.group({
            _id: "$brand",
            brand: {$last: "$brand"},
            enabled: {$last: "$enabled"}
        });
        aggregate.project({
            "brand": 1,
            "enabled": 1
        });
        aggregate.sort({"brand": 1, "enabled": 1}); // revisar sorting a nivel de enabled
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
}

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
}*/