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
  // users
  app.route("/v1/user").post(UsersController.signUp);
  app.route("/v1/user/signin").post(UsersController.login);
  app.route("/v1/user/signout").get(passport.authenticate("jwt", { session: false }), UsersController.logout);
  app.route("/v1/user/password").post(passport.authenticate("jwt", { session: false }), UsersController.changePassword);
  app.route("/v1/users/:userID/grant").post(passport.authenticate("jwt", { session: false }), UsersController.grantPermissions);
  app.route("/v1/users/:userID/revoke").post(passport.authenticate("jwt", { session: false }), UsersController.revokePermissions);
  app.route("/v1/users/:userID/enable").post(passport.authenticate("jwt", { session: false }), UsersController.enableUser);
  app.route("/v1/users/:userID/disable").post(passport.authenticate("jwt", { session: false }), UsersController.disableUser);
  app.route("/v1/users").get(passport.authenticate("jwt", { session: false }), UsersController.getUsers);
  app.route("/v1/users/current").get(passport.authenticate("jwt", { session: false }), UsersController.current);

  // sheets
  app.route("/v1/google/newcode").get(passport.authenticate("jwt", { session: false }), SheetsController.getNewCode); // nuevo token Auth
  app.route("/v1/google/code/").get(SheetsController.setNewCode); // front-end no lo debe usar
  app.route("/v1/google/authorize").get(passport.authenticate("jwt", { session: false }), SheetsController.authorize); // verifica si el token esta habilitado
  app.route("/v1/google/startmigration").get(passport.authenticate("jwt", { session: false }), SheetsController.startMigration);

  // articles
  app.route("/v1/articles/getbrands/").get(ArticlesController.getBrands);
  app.route("/v1/articles/getarticles/").get(ArticlesController.getArticles);
}

interface ISessionRequest extends express.Request {
  user: Payload;
}
