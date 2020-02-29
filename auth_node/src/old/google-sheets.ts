// import * as _ from "lodash";
// import * as fs from "fs";
// import { google } from "googleapis";

// const credentials = JSON.parse(fs.readFileSync("key.json", "utf-8"));
// const {client_secret: clientSecret, client_id: clientId, redirect_uris: redirectUris} = credentials.installed;
// const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);
// const token = fs.readFileSync("token.json", "utf-8");
// oAuth2Client.setCredentials(JSON.parse(token));

// /**
//  * Read a spreadsheet.
//  * @param {string} spreadsheetId
//  * @param {string} range
//  * @returns {Promise.<Array>}
//  */
// exports.read = async (spreadsheetId: any, range: any): Promise<any> => {
//  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
//   return sheets.spreadsheets.values.get({
//     spreadsheetId,
//     range,
//   })
//     .then(_.property("data.values"));
//   };
// /**
//  * Append content to the next line of a spreadsheet on specified range.
//  * @param {string} spreadsheetId
//  * @param {string} range
//  * @returns {Promise}
//  */

// exports.append = async (spreadsheetId: any, range: any, values: any): Promise<any> => {
//  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
//  const request = {
//   // The ID of the spreadsheet to update.
//   spreadsheetId: "my-spreadsheet-id",  // TODO: Update placeholder value.

//   // The A1 notation of a range to search for a logical table of data.
//   // Values will be appended after the last row of the table.
//   range: "my-range",  // TODO: Update placeholder value.

//   // How the input data should be interpreted.
//   valueInputOption: "",  // TODO: Update placeholder value.

//   // How the input data should be inserted.
//   insertDataOption: "",  // TODO: Update placeholder value.

//   resource: {
//     // TODO: Add desired properties to the request body.
//   },

//   auth: oAuth2Client
// };
//   sheets.spreadsheets.values.append(request, function(err: any, response: any) {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     // TODO: Change code below to process the `response` object:
//     console.log("response" + JSON.stringify(response, null, 2));
//   });
//   /*return sheets.spreadsheets.values.append({
//     spreadsheetId: string,
//     range: "Sheet1",
//     valueInputOption: "USER_ENTERED",
//     resource: { values },
//     });*/
// };
// /**
//  * Update cells on a spreadsheet.
//  * @param {string} spreadsheetId
//  * @param {string} range
//  * @returns {Promise}
//  */
// exports.update = async (spreadsheetId: any, range: any, values: any): Promise<any> => {
//  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
//  console.log("exports.update" + JSON.stringify(sheets, null, 2));
//   /*return sheets.spreadsheets.values.update({
//     spreadsheetId,
//     range,
//     valueInputOption: "USER_ENTERED",
//     resource: { values },
//   });*/
// };

// /**
//  * Create a new spreadsheet.
//  * @param {string} spreadsheetId
//  * @param {string} range
//  * @returns {Promise}
//  */
// exports.create = async (title: any): Promise<any> => {
//  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
//  console.log("exports.update" + JSON.stringify(sheets, null, 2));
//     /*return sheets.spreadsheets.create({
//     resource: {
//     properties: { title }
//     }
//  });*/
// };
