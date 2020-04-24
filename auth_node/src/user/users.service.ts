"use strict";

import * as env from "../server/environment";
import * as error from "../server/error";
import { IUser, User } from "./user";
import { resolve } from "path";
import { pbkdf2Sync } from "crypto";

const conf = env.getConfig(process.env);

export interface SignUpRequest {
    name?: string;
    password?: string;
    login?: string;
}
export interface SignInRequest {
    id?: string;
    password?: string;
    login?: string;
}
export interface ChangePasswordRequest {
    currentPassword?: string;
    newPassword?: string;
}

export class UsersService {
    static currentUser(id: any): Promise<IUser> {
        console.log("migrationArticles");
        return Promise.resolve(User.findById(id));
    }

    static login(body: SignInRequest): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            try {
                resolve(User.findOne({ login: body.login, enabled: true }).exec());
            }
            catch (error) {
               reject(error);
            }
        });
    }
    static updateLastLogin(id: any) {
        return User.findByIdAndUpdate(id, {$set: {lastLogin: new Date()}});
    }

    static authenticatePassword(passIN: string, pass: string): Boolean {
        const password = pbkdf2Sync(passIN, conf.passwordSalt, 10000, 64, "SHA1").toString("base64");
        return (pass && pass === password);
    }

    static validateLogin(body: SignInRequest, user: IUser): Promise<SignInRequest> {
        const result: error.ValidationErrorMessage = {
            messages: []
        };

        if (!body.password) {
            result.messages.push({ path: "password", message: "No puede quedar vacío." });
        }

        if (!UsersService.authenticatePassword(body.password, user.password)) {
            result.messages.push({ path: "password", message: "Password incorrecto." });
        }

        if (!body.login || body.login.length <= 0) {
            result.messages.push({ path: "login", message: "No puede quedar vacío." });
        }

        if (result.messages.length > 0) {
            return Promise.reject(result);
        }
        return Promise.resolve(body);
    }

    static register(body: SignUpRequest): Promise<IUser> {
        const user = {
            name: body.name,
            login: body.login,
            permissions: ["user"],
            password: pbkdf2Sync(body.password, conf.passwordSalt, 10000, 64, "SHA1").toString("base64")
        };
        return new Promise<IUser>((resolve, reject) => {
            try {
                resolve(User.create(user));
            }
            catch (error) {
               reject(error);
            }
        });
    }

    static validateRegister(body: SignUpRequest): Promise<SignUpRequest> {
        const result: error.ValidationErrorMessage = {
            messages: []
        };

        if (!body.name || body.name.length <= 0) {
            result.messages.push({ path: "name", message: "No puede quedar vacío." });
        } else if (body.name.length > 256) {
            result.messages.push({ path: "name", message: "Hasta 255 caracteres solamente." });
        }

        if (!body.password) {
            result.messages.push({ path: "password", message: "No puede quedar vacío." });
        } else if (body.password.length < 6) {
            result.messages.push({ path: "password", message: "Mas de 5 caracteres." });
        } else if (body.password.length > 64) {
            result.messages.push({ path: "password", message: "Hasta 63 caracteres solamente." });
        }

        if (!body.login || body.login.length <= 0) {
            result.messages.push({ path: "login", message: "No puede quedar vacío." });
        } else if (body.login.length > 256) {
            result.messages.push({ path: "login", message: "Hasta 255 caracteres solamente." });
        }

        if (result.messages.length > 0) {
            return Promise.reject(result);
        }
        return Promise.resolve(body);
    }

    static async findById(userId: string): Promise<IUser> {
        console.log("findById");
        try {
            const user = await User.findOne({ _id: userId }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            return Promise.resolve(user);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static findAllUsers(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve, reject) => {
            User.find({}, function (err: any, user: IUser[]) {
                if (err) return reject(err);
                resolve(user);
            });
        });
    }

    static async changePassword(userId: string, body: ChangePasswordRequest): Promise<void> {
        console.log("Service changePassword");
        try {
            const user = await User.findByIdAndUpdate(userId, 
                {$set: {password: pbkdf2Sync(body.newPassword, conf.passwordSalt, 10000, 64, "SHA1").toString("base64")}}).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static validateChangePassword(body: ChangePasswordRequest, user: IUser): Promise<any> {
        const result: error.ValidationErrorMessage = {
            messages: []
        };

        if (!body.currentPassword) {
            result.messages.push({ path: "currentPassword", message: "No puede quedar vacío." });
        } else if (body.currentPassword.length < 6) {
            result.messages.push({ path: "currentPassword", message: "Mas de 5 caracteres." });
        } else if (body.currentPassword.length > 64) {
            result.messages.push({ path: "currentPassword", message: "Hasta 63 caracteres solamente." });
        }

        if (!body.newPassword) {
            result.messages.push({ path: "newPassword", message: "No puede quedar vacío." });
        } else if (body.newPassword.length < 6) {
            result.messages.push({ path: "newPassword", message: "Mas de 5 caracteres." });
        } else if (body.newPassword.length > 64) {
            result.messages.push({ path: "newPassword", message: "Hasta 63 caracteres solamente." });
        } else if (UsersService.authenticatePassword(body.newPassword, user.password)) {
            result.messages.push({ path: "password", message: "Password incorrecto." });
        }

        if (result.messages.length > 0) {
            console.log("reject: " + JSON.stringify(result));
            return Promise.reject(result);
        }
        return Promise.resolve(body);
    }

    static async hasPermission(userId: string, permission: string): Promise<void> {
        console.log("Service hasPermission");
        try {
            const user = await User.findOne({ _id: userId, enabled: true }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra.");
            }
            if (!user.hasPermission(permission)) {
                throw error.newError(error.ERROR_UNAUTHORIZED, "Accesos insuficientes");
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async grantPermissions(userId: string, permissions: string[]): Promise<void> {
        console.log("Service grantPermissions");
        try {
            if (!permissions || !(permissions instanceof Array)) {
                throw error.newArgumentError("permissions", "Invalid value");
            }
            let user = await User.findByIdAndUpdate(userId, {$set: {permissions: permissions}}).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async revokePermissions(userId: string, permissions: string[]): Promise<void> {
        console.log("Service revokePermissions");
        try {
            if (!permissions || !(permissions instanceof Array)) {
                throw error.newArgumentError("permissions", "Invalid value");
            }
            let user = await User.findByIdAndUpdate(userId, {$unset: "permissions"}).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async enableUser(userId: string): Promise<void> {
        console.log("Service enableUser");
        try {
            let user = await User.findByIdAndUpdate(userId, {$set: {enabled: true}}).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async disableUser(userId: string): Promise<void> {
        console.log("Service disableUser");
        try {
            let user = await User.findByIdAndUpdate(userId, {$set: {enabled: false}}).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
