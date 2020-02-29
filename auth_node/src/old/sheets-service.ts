/*"use strict";

import * as env from "../server/environment";
import * as error from "../server/error";
import { resolve } from "path";
// import { google } from "google-spreadsheet";
import { google } from "googleapis";
const conf = env.getConfig(process.env);

// const { google } = require("google-spreadsheet");
const auth = require("./credentials-load");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const sheets = google.sheets("v4");


async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({spreadsheetId, auth}) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName
  });
  return res;
}


module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
}









async function run() {
  // create sheets client
  const sheets = google.sheets({ version: "v4", auth });
  // get a range of values
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1t1oIvoknE9fye4LAd2ZYzfIYlu49r5Jf6XbwNKt1saE",
    range: "Sheet1!A1:E"
  });
  // print results
  console.log(JSON.stringify(res.data, null, 2));
}

run().catch(err => console.error("ERR", err));*/