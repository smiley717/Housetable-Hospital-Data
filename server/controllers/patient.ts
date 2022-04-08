const { Patient } = require("../models");

async function updatePatient( req, res) {
  try {
    await Patient.update(
      {
        ...req.body
      },
      {
        where: {
          id: req.params.patientId,
        },
      }
    );
    res.status(201).send(
      JSON.stringify({
        message: "Patient was successfully updated!",
      })
    );
  } catch (error) {
    console.error(`Unable to update Patient because of this error: ${error}`);
    res.status(500).send(`Unable to update Patient because of this error: ${error}`);
  }
}

async function createPatient(req, res) {
  try {
    const response = await Patient.create({
      ...req.body
    });
    res.status(201).json({
      message: "Patient was successfully created!",
      data: response
    })
  } catch (error) {
    console.error(`Unable to create Patient because of this error: ${error}`);
    res.status(500).send();
  }
}

async function getAllPatients(req, res) {
  try {
    const response = await Patient.findAll();
    if (response) {
      res.status(200).json({
        message: "Patients has been successfully retrieved",
        data: response
      });
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.error(
      `Unable to find all Patients because of this error: ${error}`
    );
    res.status(500).send();
  }
}

async function getPatient(req, res) {
  try {
    const response = await Patient.findOne({
      where: {
        id: req.params.patientId
      },
    });
    if (response) {
      res.status(200).send({
        message: "Patient has been successfully retrieved",
        data: response
      });
    } else {
      res.status(201).send({});
    }
  } catch (error) {
    console.error(`Unable to find Patient because of this error: ${error}`);
    res.status(500).send();
  }
}

async function deletePatient(req, res) {
  try {
    await Patient.destroy({
      where: {
        id: req.params.patientId
      },
    });
    res.status(200).send({
      message: "Patient has been deleted successfully.",
    });
  } catch (error) {
    console.error(`Unable to delete Patient because of this error: ${error}`);
    res.status(500).send();
  }
}

module.exports = {
	updatePatient,
  createPatient,
  getPatient,
  getAllPatients,
  deletePatient
};
