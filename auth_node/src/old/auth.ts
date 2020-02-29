// import * as fs from "fs";
// import * as readline from "readline";

// import { google } from "googleapis";

// // If modifying these scopes, delete token.json.
// const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// // The file token.json stores the user"s access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = "token.json";

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials: any, callback: any) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err: any, token: any) => {
//     if (err) return getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getNewToken(oAuth2Client: any, callback: any) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });
//   console.log("Authorize this app by visiting this url:", authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question("Enter the code from that page here: ", (code: any) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err: any, token: any) => {
//       if (err) return console.error("Error while trying to retrieve access token", err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
//         if (err) return console.error(err);
//         console.log("Token stored to", TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }
// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listFiles(auth: any) {
//  const drive = google.drive({version: "v3", auth});
//  drive.files.list({
//    pageSize: 10,
//    fields: "nextPageToken, files(id, name)",
//  }, (err, res) => {
//    if (err) return console.log("The API returned an error: " + err);
//    const files = res.data.files;
//    if (files.length) {
//      console.log("Files:");
//      files.map((file) => {
//        console.log(`${file.name} (${file.id})`);
//      });
//    } else {
//      console.log("No files found.");
//    }
//  });
// }
// // [END drive_quickstart]

// module.exports = {
//  SCOPES,
//  listFiles,
// };
// // module.exports = authorize;