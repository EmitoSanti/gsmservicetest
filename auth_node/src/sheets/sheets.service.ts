"use strict";

import * as fs from "fs";
import * as error from "../server/error";
import { google } from "googleapis";
import { SCOPES,
  TOKEN_PATH,
  SPREAD_SHEET_ID,
  VERSION_GOOGLE_API,
  RANGE_EASY,
  RANGE_HARD,
  CREDENCIALS } from "./sheets.constants";
import { Article, IArticle } from "../articles/article"; // utilizarlos cuando este listo el mapeo desde sheets
import { ArticlesService } from "../articles/articles.service";
import * as _ from "lodash";

export class SheetsService {
  // TODO: mover toda la logica para el auth a google a un servicio dedicado nombrado authGoogle desde la linea 23 a 82.
  static sheets = google.sheets(VERSION_GOOGLE_API);
  // const { client_secret, client_id, redirect_uris } = CREDENCIALS.web; // destructuring Se que te va a bolar la cabeza ECMASCRIPT 6 lo dejo de ejemplo porque aca no funca
  static oAuth2Client = new google.auth.OAuth2(
    CREDENCIALS.web.client_id,
    CREDENCIALS.web.client_secret,
    CREDENCIALS.web.redirect_uris[0]
  );
  static readTokenFile() {
    const promise = new Promise((resolve, reject) => {
      fs.readFile(TOKEN_PATH, function(err, token) {
        console.log("err en readFile: " + JSON.stringify(err) + " message: " + err);
        if (err) return reject(err);
        console.log("token en readFile: " + token);
        return resolve(token);
      });
    });
    return promise;
  }

  static authorization(token: any) {
    console.log("authorization");
    const promise = new Promise((resolve, reject) => {
      this.oAuth2Client.setCredentials(JSON.parse(token)); // si hay token se puede trabajar con google // se parsea porque viene en texto plano
      console.log("oAuth2Client parse: " + JSON.stringify(this.oAuth2Client));
      // if (err) return reject(err); // ver si lo soporta en la documentacion de setCredentials
      return resolve(this.oAuth2Client);
    });
    return promise;
  }

  static getNewCode() {
    console.log("getNewCode");
    const promise = new Promise((resolve, reject) => {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
      });
      console.log("Authorize this app by visiting this url: ", authUrl);
      // if (err) return reject(err); // ver si lo soporta en la documentacion de generateAuthUrl
      return resolve(authUrl);
    });
    console.log("promise: ", promise);
    return promise;
  }
  static setNewCode(code: string) {
    console.log("setNewCode: " + JSON.stringify(code));
    const promise = new Promise((resolve, reject) => {
      this.oAuth2Client.getToken(code, (err: any, token: any) => {
        console.log("getToken");
        if (err) {
          console.log("Error while trying to retrieve access token ", err);
          return reject("Error while trying to retrieve access token " + err);
        }
        this.oAuth2Client.setCredentials(token); // ver si hay que sacarlo de aca
        fs.writeFile(TOKEN_PATH, JSON.stringify(token, null, 2), (err: any) => { // Store the token to disk for later program executions
          if (err) return console.log("Error while trying to write token file", err); // ver si encajar aca resolve y reject hacer pruebas
          console.log("Token stored to ", TOKEN_PATH);
        });
        return resolve("New token generated");
      });
    });
    return promise;
  }

  static async startMigration(auth: any) { // control de funciones para SheetsServices para automataizar alguns flujos y nos hacer tantas llamadas
    try {
      console.log("startMigration");
      await this.runInSheet(auth); // revisar
    } catch (err) {
      console.log(err); // devolver error al front
    }
  }
  static async runInSheet(oAuth2Client: any) { // control de funciones que trabajan sobre los sheets
    await this.sortByBrand(oAuth2Client);
    await this.getAllData(oAuth2Client);
  }

  static getAllData(auth: any) { // de any a AUTH
    console.log("getAllData");
    return new Promise<any>((resolve, reject) => {
      const sheets = google.sheets({version: VERSION_GOOGLE_API, auth});
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREAD_SHEET_ID,
        range: RANGE_EASY,
        valueRenderOption: "FORMATTED_VALUE",
        dateTimeRenderOption: "SERIAL_NUMBER"
      }, (err: any, res: any) => {
        if (err) return console.log("The API returned an error: " + err);
        const rows = res.data.values;
        if (rows) {
          console.log("Datos: " + JSON.stringify(rows));
          const allRows = rows.map(function(row: any) { // de any a IArticle
            // console.log("marca: " + `${row[0]}` + "   modelo: " + `${row[1]}` + "   mpn: " + `${row[2]}`);
            return {
              brand: row[0],
              name: row[1],
              mpn: row[2],
            };
          });
          console.log("allRows: " + JSON.stringify(allRows));
          ArticlesService.migrationArticles(allRows);
          resolve();
        } else {
          console.log("No data found.");
          reject();
        }
      });
    });
  }

  static async sortByBrand(auth: any) {
    console.log("sortByBrand");
    const request = {
      spreadsheetId: SPREAD_SHEET_ID,
      resource: {
        requests: [
          {
            sortRange: {
              range: RANGE_HARD,
              sortSpecs: [
                {
                  dimensionIndex: 0, // index column
                  sortOrder: "ASCENDING" // DESCENDING
                }
              ]
            }
          }
        ]
      },
      auth: auth
    };

    try {
      const sheets = google.sheets({version: VERSION_GOOGLE_API, auth});
      const response = (await sheets.spreadsheets.batchUpdate(request)).data;
      console.log("response: " + JSON.stringify(response, null, 2));
    } catch (err) {
      console.error("error: " + err);
    }
  }
}

async function create(auth: any) {
  const request = {
    resource: {
      properties: {
        title: "HOLA"
      }
    },
    auth: this.oAuth2Client,
  };
  try {
    const response = (await this.sheets.spreadsheets.create(request)).data; // va sin this.
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}

async function getByValue(auth: any) { // no sirve pa mierda
  console.log("sortByBrand");
  const request = {
    spreadsheetId: "1B0qopCbei9rLXQbfmUzC1try8l93lTdtgBT4LILjDT0", // pasar a constante
    resource: {
      requests: [
        {
          addFilterView: {
            filter: {
              filterViewId: 0,
              title: "A",
              range: {
                sheetId: 0, // index sheet
                startRowIndex: 0, // index start row // se puede borrar para que sea infinita
                endRowIndex: 11, // index end row // se puede borrar para que sea infinita
                startColumnIndex: 0, // index start column // se puede borrar para que sea infinita
                endColumnIndex: 4 // index end column // se puede borrar para que sea infinita
              },
              sortSpecs: [
                {
                  dimensionIndex: 0, // index column
                  sortOrder: "ASCENDING" // DESCENDING
                }
              ],
              criteria: {
                0: {
                  condition: {
                    type: "TEXT_CONTAINS",
                    values: {
                        userEnteredValue: "caca"
                    }
                  }
                }
              }
            }
          }
        }
      ]
    },
    auth: auth
  };
  try {
    const response = (await this.sheets.spreadsheets.batchUpdate(request)).data; // va sin this.
    console.log("response: " + JSON.stringify(response, null, 2));
  } catch (err) {
    console.error("error: " + err);
  }
}
