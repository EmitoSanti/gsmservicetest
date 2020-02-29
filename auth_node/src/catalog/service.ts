"use strict";

import * as error from "../server/error";
import { Article, IArticle } from "./article";
import * as _ from "lodash";

/* interface any {
    cartId: string;
    orderId: string;
    articleId: string;
    quantity: number;
    time: Date;
} */
/**
 * Creacion de un nuevo registro para la estadistica de carritos
 */
export function createArticle(articles: IArticle): Promise<IArticle> {
    console.log("createCartStats");

    return new Promise<IArticle>((resolve, reject) => {
        /*_.forEach(articles,  function(a) {
            const art = new Article();
            art.model = a.model;
        });*/
        // Then save the Stat Cart
        try { //https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/
            //const art = new Article();
            Article.insertMany( articles );
            console.log("vamo a ver");
            resolve();
         } catch (e) {
            reject();
            console.log("se pudrio: " + e);
         }
        /*art.save(function (err: any) {
            if (err) reject(err);
            resolve(art);
            console.log("err: " + err + " stats: " + JSON.stringify(art));
        });*/
    });
}


/**
 * Incrementa un campo del registro para la estadistica de carritos
 */
export async function addCartStats(cart: Cart): Promise<void> {
    console.log("addCartStats");
    console.log("cart: " + JSON.stringify(cart));

    try {
        const statsHour = await Article.findOne({ cartId: cart.cartId, orderId: cart.orderId }).exec();

        console.log("lodash statsHour: " + _.isNull(statsHour) + " " + statsHour);
        if (!_.isNull(statsHour)) {
            console.log("save statsHour : " + statsHour);
            if (cart.articleId) {
                statsHour.countArticles++;
                // addArticleStats(cart.articleId, cart.time);
            } else {
                // statsHour.decrementQuantity();
            }

            // Save the Stat Cart
            await statsHour.save();
            console.log("Save statsHour: " + JSON.stringify(statsHour));
        } else {
            console.log("Not save statsHour: " + statsHour);
            createCartStats(cart);
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