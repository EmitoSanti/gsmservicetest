/* Sheets */
export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
export const SPREAD_SHEET_ID = "1po59n5wlRkBCdFdNJCR8z5tkAMCra2qCMxdVBodgbpw";
export const VERSION_GOOGLE_API = "v4";
export const SHEET_NAME = "Sheet1";
export const RANGE_EASY = `${SHEET_NAME}!A:I`; // column start:column end
export const RANGE_HARD = {
    sheetId: 0, // index sheet
    startRowIndex: 0, // index start row // se puede borrar para que sea infinita
    // endRowIndex: 8, // index end row // se puede borrar para que sea infinita
    startColumnIndex: 0, // index start column // se puede borrar para que sea infinita
    endColumnIndex: 8 // index end column // se puede borrar para que sea infinita
  };

/* Auth Google */
export const TOKEN_PATH = "./public/token.json";
export const CREDENCIALS = {
  web: {
    client_id: "573966476276-1l9s8402u3o8jsdoucord0qo2dkcib7o.apps.googleusercontent.com",
    project_id: "sheet-demo-270600",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "ygfhJDpooa7h4y8xx7LF6bMI",
    redirect_uris: [
      "http://localhost:3000/v1/google/code/"
    ],
    javascript_origins: [
      "http://localhost:3000"
    ]
  }
};