"use strict";

import * as error from "../server/error";
import { Article, IArticle } from "./article";
import * as _ from "lodash";

export function migrationArticles(articles: any): Promise<IArticle> { // cambiar de any a IAricles cuando este completo el mapeo desde sheets
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
async function clean(object: any): Promise<any> {
    for (const key in object) {
        if (object[key] === null || typeof object[key] === "undefined") {
            delete object[key];
        } else if (typeof object[key] === "object" && typeof object[key].getMonth !== "function"
          && !object[key].hasOwnProperty("lastIndex")) {
            if (Object.keys(object[key]).length === 0) {
                delete object[key];
            } else {
                const cleared = await clean(object[key]);

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
export  function getAll(filter: any): Promise<Array<any>> { // a filter hay que parcear
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

/**
 * Incrementa un campo del registro para la estadistica de carritos
 */
export async function addCartStats(cart: any): Promise<void> {
    console.log("addCartStats");
    console.log("cart: " + JSON.stringify(cart));

    try {
        const statsHour = await Article.findOne({ cartId: cart.cartId, orderId: cart.orderId }).exec();

        console.log("lodash statsHour: " + _.isNull(statsHour) + " " + statsHour);
        if (!_.isNull(statsHour)) {
            console.log("save statsHour : " + statsHour);
            if (cart.articleId) {
                // statsHour.countArticles++;
                // addArticleStats(cart.articleId, cart.time);
            } else {
                // statsHour.decrementQuantity();
            }

            // Save the Stat Cart
            await statsHour.save();
            console.log("Save statsHour: " + JSON.stringify(statsHour));
        } else {
            console.log("Not save statsHour: " + statsHour);
            // createCartStats(cart);
        }

        return Promise.resolve();

    } catch (err) {
        console.log("catch err: " + JSON.stringify(err));
        return Promise.reject(err);
    }
}

// export interface StatQuery {
//     objId: boolean;
//     collection: string;
//     typeTime: string;
//     accion: string;
//     countObj: number;
//     created: string;
//     timeEnd: string;
//     enabled: Boolean;
// }



// export async function getStats(data: StatQuery) {
//     console.log("service getStats: " + JSON.stringify(data));
//     let inicio: any;
//     let fin: any;
//     let type: string;
//     const lab: any = [];
//     const count: any = [];

//     if (data.typeTime === "minutos" && !_.isUndefined(data.typeTime)) {
//         type = "minute";
//         inicio = data.created.slice(1, 25);
//         fin = data.timeEnd.slice(1, 25);
//     }
//     if (data.typeTime === "horas" && !_.isUndefined(data.typeTime)) {
//         type = "hour";
//         inicio = data.created.slice(1, 11);
//         fin = data.timeEnd.slice(1, 11);
//     }
//     console.log("inicio: " + inicio);
//     console.log("fin: " + fin);
//     switch (data.collection) {
//         case "usuarios":
//             console.log("usuarios ");
//             return new Promise((resolve, reject) => {
//                 StatsUser.find({
//                     $and: [
//                         {typeTime: type},
//                         {accionUser: data.accion},
//                         {countUser: {$gte: data.countObj}},
//                         {enabled: true},
//                         {$and: [{updated: {$gte: new Date(inicio)}}, {updated: {$lt: new Date(fin)}}]}
//                     ]
//                 }, function (err: any, result: IStatsUsers[]) {
//                     if (err) return reject(err);
//                     console.log("result: " + result);
//                     console.log("result: " + _.size(result));
//                     _.forEach(result, function(re) {
//                         console.log("forEach: " + re.updated);
//                         lab.push(re.updated.toString());
//                         count.push(re.countUser);
//                     });
//                     const clear = {
//                         title: data.collection + data.accion + data.typeTime,
//                         labels: [lab],
//                         datasets: [{
//                             label: data.accion,
//                             data: [count]
//                             }
//                         ]
//                     };

//                     console.log("clear: " + JSON.stringify(clear));
//                     resolve(clear);
//                 });
//             });
//         case "carritos":
//             console.log("carritos ");
//             return new Promise((resolve, reject) => {
//                 StatsCart.find({
//                     $and: [
//                         {countArticles: {$gte: data.countObj}},
//                         {enabled: true},
//                         {$and: [{updated: {$gte: new Date(inicio)}}, {updated: {$lt: new Date(fin)}}]}
//                     ]
//                 }, function (err: any, result: IStatsCarts[]) {
//                     if (err) return reject(err);
//                     console.log("result: " + result);
//                     console.log("result: " + _.size(result));
//                     _.forEach(result, function(re) {
//                         console.log("forEach: " + re.cartId);
//                         lab.push(re.cartId);
//                         count.push(re.countArticles);
//                     });
//                     const clear = {
//                         title: data.collection + data.accion + data.typeTime,
//                         labels: [lab],
//                         datasets: [{
//                             label: data.created,
//                             data: [count]
//                             }
//                         ]
//                     };

//                     console.log("clear: " + JSON.stringify(clear));
//                     resolve(clear);
//                 });
//             });
//         case "articulos":
//             console.log("articulos ");
//             return new Promise((resolve, reject) => {
//                 console.log("busca");
//                 StatsArticle.find({
//                     $and: [
//                         {typeTime: type},
//                         {countArticle: {$gte: data.countObj}},
//                         {enabled: true},
//                         {$and: [{updated: {$gte: new Date(inicio)}}, {updated: {$lt: new Date(fin)}}]}
//                     ]
//                 }, function (err: any, result: IStatsArticles[]) {
//                     if (err) return reject(err);
//                     console.log("err: " + err);
//                     console.log("result: " + result);
//                     console.log("result: " + _.size(result));
//                     _.forEach(result, function(re) {
//                         console.log("forEach: " + re.updated);
//                         lab.push(re.updated.toString());
//                         count.push(re.countArticle);
//                     });
//                     const clear = {
//                         title: data.collection + " " + data.accion + " " + data.typeTime,
//                         labels: [lab],
//                         datasets: [{
//                             label: data.typeTime,
//                             data: [count]
//                             }
//                         ]
//                     };

//                     console.log("clear: " + JSON.stringify(clear));
//                     resolve(clear);
//                 });
//             });
//         default:
//             console.log("Lo lamentamos, por el momento no disponemos de estadisticas de " + data.collection + ".");
//     }
// }
// export function createHistory(body: IStatsHistory) {
//     console.log("createHistory");
//     return new Promise<string>((resolve, reject) => {
//             const statHistory = <IStatsHistory>new StatsHistory();
//             statHistory.title = body.title;
//             statHistory.labels = body.labels;
//             statHistory.datasets = body.datasets;

//             // Then save the user
//             statHistory.save(function (err: any) {
//                 if (err) reject(err);
//                 console.log("Stat History save");
//                 resolve("ok");
//             });
//     });
// }

// export function getHistory() {
//     console.log("getHistory");
//     return new Promise((resolve, reject) => {
//         StatsHistory.find({
//             enabled: true
//         }, function (err: any, result: IStatsHistory[]) {
//             if (err) return reject(err);
//             console.log("result: " + result);
//             console.log("result: " + _.size(result));
//             resolve(result);
//         });
//     });
// }