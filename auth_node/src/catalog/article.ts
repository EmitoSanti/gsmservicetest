"use strict";

import { Document, model, Schema } from "mongoose";

export interface IServices extends Document {
  name: string,
  value: string,
  description: string
}
export interface IArticle extends Document {
  mpn: string;
  brand: string;
  name: string;
  services: IServices[];
  created: Date;
  updated: Date;
  enabled: Boolean;
}

/**
 * Esquema Article
 */
// http://whatthetech.co/mongodb-with-nodejs-using-mongoose-connection/
const ArticleSchema = new Schema({
  mpn: {
    type: String,
    trim: true,
    required: "MPN is required"
  },
  brand: {
    type: String,
    trim: true,
    required: "Cell Phone Brand is required"
  },
  name: {
    type: String,
    trim: true,
    required: "Cell Phone Model is required"
  },
  services: [
    {
      name: {
        type: String,
        trim: true
      },
      value: {
        type: String,
        trim: true
      },
      description: {
        type: String,
        trim: true
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "article" });

ArticleSchema.index({ name: 1, enabled: -1 });
ArticleSchema.index({ name: 1, mpn: 1 });

/**
 * Trigger antes de guardar
 */
ArticleSchema.pre("save", function (this: IArticle, next) {
  this.updated = new Date();
  next();
});

export let Article = model<IArticle>("Article", ArticleSchema);
