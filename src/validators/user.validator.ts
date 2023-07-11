import Joi from "joi";

import { regexConstansts } from "../constants";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(1).max(199);
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string()
    .regex(regexConstansts.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "This field is required",
      "string.email": "Wrong email address format",
    });
  static password = Joi.string().regex(regexConstansts.PASSWORD).trim();

  static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });
}
