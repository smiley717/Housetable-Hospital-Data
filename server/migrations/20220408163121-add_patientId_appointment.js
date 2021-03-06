module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Appointments", // name of Source model
      "patientId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Patients", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Appointments", "patientId");
  },
};
