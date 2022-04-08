import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.Appointment, {
        foreignKey: "patientId",
      });
    }
  }
  Patient.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      petName: DataTypes.STRING,
      petType: DataTypes.ENUM('cat', 'dog', 'bird'),
      ownerName: DataTypes.STRING,
      ownerAddress: DataTypes.STRING,
      ownerPhoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
