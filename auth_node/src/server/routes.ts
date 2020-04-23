"use strict";

import * as express from "express";
import * as passport from "passport";
import * as rabbit from "../rabbit";
import { Payload } from "../token";
import * as token from "../token";
import * as error from "../server/error";
import { ArticlesController } from "../articles/articles.controller";
import { SheetsController } from "../sheets/sheet.controller"; // ver esto falla index.ts creo
import { UsersController } from "../user/users.controller";
/**
 * Modulo de seguridad, login/logout, cambio de contraseñas, etc
 */
export function init(app: express.Express) {
  // app.route("/v1/user/password").post(passport.authenticate("jwt", { session: false }), UsersController.changePassword);
  app.route("/v1/user/signin").post(UsersController.login);
  app.route("/v1/user/signout").get(passport.authenticate("jwt", { session: false }), UsersController.logout);
  // app.route("/v1/users/:userID/grant").post(passport.authenticate("jwt", { session: false }), UsersController.grantPermissions);
  // app.route("/v1/users/:userID/revoke").post(passport.authenticate("jwt", { session: false }), UsersController.revokePermissions);
  // app.route("/v1/users/:userID/enable").post(passport.authenticate("jwt", { session: false }), UsersController.enableUser);
  // app.route("/v1/users/:userID/disable").post(passport.authenticate("jwt", { session: false }), UsersController.disableUser);
  // app.route("/v1/users").get(passport.authenticate("jwt", { session: false }), UsersController.getAll);
  app.route("/v1/users/current").get(passport.authenticate("jwt", { session: false }), UsersController.current);
  // sheet
  app.route("/v1/google/newcode").get(SheetsController.getNewCode); // nuevo token Auth
  app.route("/v1/google/code/").get(SheetsController.setNewCode); // front-end no lo debe usar
  app.route("/v1/google/authorize").get(SheetsController.authorize); // verifica si el token esta habilitado
  app.route("/v1/google/startmigration").get(SheetsController.startMigration);
  // aricles
  app.route("/v1/articles/getbrands/").get(ArticlesController.getBrands);
  app.route("/v1/articles/getarticles/").get(ArticlesController.getArticles);
}

interface ISessionRequest extends express.Request {
  user: Payload;
}
