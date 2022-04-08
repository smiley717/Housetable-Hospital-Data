import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Patient, {
        foreignKey: "patientId",
        onDelete: "CASCADE",
      });
    }
  }
  Appointment.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      date: DataTypes.DATEONLY,
      description: DataTypes.STRING,
      fee: DataTypes.REAL,
      paidFee: {
        type: DataTypes.REAL,
        defaultValue: 0,
      },
      paidType: DataTypes.ENUM('USD', 'EUR', 'Bitcoin'),
      feeCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
