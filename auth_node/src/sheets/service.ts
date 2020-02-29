import * as fs from "fs";
import * as readline from "readline";
import { google } from "googleapis";
// const fs = require("fs");
// const readline = require("readline");
// const {google} = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = "token.json";
const SPREAD_SHEET_ID = "1B0qopCbei9rLXQbfmUzC1try8l93lTdtgBT4LILjDT0";
const VERSION_GOOGLE_API = "v4";
const sheets = google.sheets(VERSION_GOOGLE_API);
run();
export async function run() {
    console.log("run");
    fs.readFile("key.json", (err: any, content: any) => {
        console.log("readFile");
        if (err) return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Sheets API.
        console.log(JSON.parse(content));
        authorize(JSON.parse(content), runInSheet);
    });
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: any, callback: any) {
    console.log("authorize");
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err: any, token: any) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client: any, callback: any) {
  console.log("getNewToken");
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code: any) => {
    rl.close();
    oAuth2Client.getToken(code, (err: any, token: any) => {
      console.log("getToken");
      if (err) return console.error("Error while trying to retrieve access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
async function runInSheet(auth: any) {
  // create(auth);
  await sortByBrand(auth); // revisar
  await getAllData(auth);
  // getByValue(auth);
}

function getAllData(auth: any) {
  console.log("listMajors");
  const sheets = google.sheets({version: VERSION_GOOGLE_API, auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: SPREAD_SHEET_ID,
    range: "Sheet1!A:D",
    valueRenderOption: "FORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER"
  }, (err: any, res: any) => {
    if (err) return console.log("The API returned an error: " + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log("Datos: " + JSON.stringify(rows));
      /*rows.map((row: any) => {
        console.log(`${row}`);
      });*/
    } else {
      console.log("No data found.");
    }
  });
}

async function create(auth: any) {
  const request = {
    resource: {
      properties: {
        title: "HOLA"
      }
    },
    auth: auth,
  };
  try {
    const response = (await sheets.spreadsheets.create(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
  /*sheets.spreadsheets.create(
    resource
  , (err: any, spreadsheet: any) => {
    if (err) {
      // Handle error.
      console.log(err);
    } else {
      console.log(`Spreadsheet ID: ${spreadsheet.spreadsheetId}`);
    }
  });*/
}

async function sortByBrand(auth: any) {
  console.log("sortByBrand");
  const request = {
    spreadsheetId: SPREAD_SHEET_ID,
    resource: {
      requests: [
        {
          sortRange: {
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
            ]
          }
        }
      ]
    },
    auth: auth
  };

  try {
    const response = (await sheets.spreadsheets.batchUpdate(request)).data;
    console.log("response: " + JSON.stringify(response, null, 2));
  } catch (err) {
    console.error("error: " + err);
  }
}

module.exports = {
  SCOPES,
  getAllData
};











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
    const response = (await sheets.spreadsheets.batchUpdate(request)).data;
    console.log("response: " + JSON.stringify(response, null, 2));
  } catch (err) {
    console.error("error: " + err);
  }
}
