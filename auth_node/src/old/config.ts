// import * as fs from "fs";
// import * as readline from "readline";
// import { google } from "googleapis";



// const OAuth2Client = google.auth.OAuth2;
// const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// const TOKEN_PATH = "key.json";

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// const authorize = function (credentials: any, callback: any) {
//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, (err: any, token: any) => {
//         if (err) return getNewToken(oAuth2Client, callback);
//         oAuth2Client.setCredentials(JSON.parse(token));
//         callback(oAuth2Client);
//     });
// };

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// const getNewToken = function (oAuth2Client: any, callback: any) {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: "offline",
//         scope: SCOPES,
//     });
//     console.log("Authorize this app by visiting this url:", authUrl);
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     rl.question("Enter the code from that page here: ", (code: any) => {
//         rl.close();
//         oAuth2Client.getToken(code, (err: any, token: any) => {
//             if (err) return callback(err);
//             oAuth2Client.setCredentials(token);
//             // Store the token to disk for later program executions
//             fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
//                 if (err) console.error(err);
//                 console.log("Token stored to", TOKEN_PATH);
//             });
//             callback(oAuth2Client);
//         });
//     });
// };

// module.exports = {authorize, google};