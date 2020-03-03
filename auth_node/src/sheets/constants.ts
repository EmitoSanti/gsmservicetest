export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
export const TOKEN_PATH = "token.json";
export const SPREAD_SHEET_ID = "1B0qopCbei9rLXQbfmUzC1try8l93lTdtgBT4LILjDT0";
export const VERSION_GOOGLE_API = "v4";

export const SHEET_NAME = "Sheet1";
export const RANGE_EASY = `${SHEET_NAME}!A:D`; // column start:column end
export const RANGE_HARD = {
    sheetId: 0, // index sheet
    startRowIndex: 0, // index start row // se puede borrar para que sea infinita
    endRowIndex: 11, // index end row // se puede borrar para que sea infinita
    startColumnIndex: 0, // index start column // se puede borrar para que sea infinita
    endColumnIndex: 4 // index end column // se puede borrar para que sea infinita
  };