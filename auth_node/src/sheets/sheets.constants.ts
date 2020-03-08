export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
export const TOKEN_PATH = "./public/token.json"; // cambiar a carpeta
// export const CREDENCIALS_PATH = "key.json"; // cambiar a carpeta BORRAR PORQUE SE USA ACA LAS CREDENCIALES
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

export const CREDENCIALS = {
  web: {
    client_id: "490988118352-r3fb1me16obtaut2dq9q37j15712jms0.apps.googleusercontent.com",
    project_id: "quickstart-1582685898423",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "0ZhjQeqDK6kwgo-h10Hton7-",
    redirect_uris: [
      "http://localhost:3000/v1/user/code/"
    ],
    javascript_origins: [
      "http://localhost:3000"
    ]
  }
};