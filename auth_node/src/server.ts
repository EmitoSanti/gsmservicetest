"use strict";

import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
import * as env from "./server/environment";
import { Config } from "./server/environment";
import * as express from "./server/express";

// Variables de entorno
const conf: Config = env.getConfig(process.env);
const port = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || "local";
let urlMongodb: string;
if (process.env.NODE_ENV === "local") {
  urlMongodb = "mongodb://localhost/gsidemo";
} else {
  urlMongodb = "mongodb+srv://emisemis:emisemis@gsidemo-26gzw.mongodb.net/test?retryWrites=true&w=majority";
}
process.env.URLDB = urlMongodb;
// admin mongoDB usuario: emisemis pass: emisemis
// Mejoramos el log de las promesas
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
});

// Establecemos conexión con MongoDD
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.URLDB, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }, function (err: MongoError) {
  if (err) {
    console.error("No se pudo conectar a MongoDB!");
    console.error(err.message);
    process.exit();
  } else {
    console.log("MongoDB conectado.");
  }
});

// Se configura e inicia express
const app = express.init(conf);

app.listen(port, () => {
  console.log(`Auth Server escuchando en puerto ${port}`);
});

module.exports = app;
