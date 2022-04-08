import { Sequelize, DataTypes } from "sequelize";
import configs from "../config/config";
const config = configs[process.env.NODE_ENV || "development"];

export const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

import AppointmentModel from "./appointment";
import PatientModel from "./patient";

const models = {
  Appointment: AppointmentModel(sequelize, DataTypes),
  Patient: PatientModel(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export const Patient = models.Patient as any;
export const Appointment = models.Appointment as any;