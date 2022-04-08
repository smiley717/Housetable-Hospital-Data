import { sequelize } from '../models';
const { Op } = require("sequelize");

const { Appointment } = require("../models");

async function updateAppointment( req, res) {
  try {
    await Appointment.update(
      {
        ...req.body
      },
      {
        where: {
          id: req.params.appointmentId,
        },
      }
    );
    res.status(201).send(
      JSON.stringify({
        message: "Appointment was successfully updated!",
      })
    );
  } catch (error) {
    console.error(`Unable to update Appointment because of this error: ${error}`);
    res.status(500).send(`Unable to update Appointment because of this error: ${error}`);
  }
}

async function createAppointment(req, res) {
  try {
    const response = await Appointment.create({
      ...req.body,
    });
    res.status(201).json({
      message: "Appointment was successfully created!",
      data: response
    })
  } catch (error) {
    console.error(`Unable to create Appointment because of this error: ${error}`);
    res.status(500).send();
  }
}

async function getAllAppointments(req, res) {
  try {
    const response = await Appointment.findAll();
    if (response) {
      res.status(200).json({
        message: "Appointments has been successfully retrieved",
        data: response
      });
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.error(
      `Unable to find all Appointments because of this error: ${error}`
    );
    res.status(500).send();
  }
}

async function getAppointmentsByPatient(req, res) {
  try {
    const response = await Appointment.findAll({
      where: {
        patientId: req.params.patientId,
      },
    });
    if (response) {
      res.status(200).json({
        message: "Appointments has been successfully retrieved",
        data: response
      });
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.error(
      `Unable to find all Appointments because of this error: ${error}`
    );
    res.status(500).send();
  }
}

async function getAppointment(req, res) {
  try {
    const response = await Appointment.findOne({
      where: {
        id: req.params.appointmentId
      },
    });
    if (response) {
      res.status(200).send({
        message: "Appointment has been successfully retrieved",
        data: response
      });
    } else {
      res.status(201).send({});
    }
  } catch (error) {
    console.error(`Unable to find Appointment because of this error: ${error}`);
    res.status(500).send();
  }
}

async function deleteAppointment(req, res) {
  try {
    await Appointment.destroy({
      where: {
        id: req.params.appointmentId
      },
    });
    res.status(200).send({
      message: "Appointment has been deleted successfully.",
    });
  } catch (error) {
    console.error(`Unable to delete Appointment because of this error: ${error}`);
    res.status(500).send();
  }
}

async function getAppointmentsByDate(req, res) {
  try {
    const response = await Appointment.findAll({
      where: {
        date: req.body.date,
      },
    });
    if (response) {
      res.status(200).json({
        message: "Appointments has been successfully retrieved",
        data: response
      });
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.error(
      `Unable to find all Appointments because of this error: ${error}`
    );
    res.status(500).send(`Unable to find all Appointments because of this error: ${error}`);
  }
}

/**
 * fee: to be paid billing
 * paidFee: paid billing
 * paidType: USD, EUR, Bitcoin
 * feeCompleted: default is false, once fully paid, it will be true.
 * */
async function getAppointmentsByUnpaid(req, res) {
  try {
    const response = await Appointment.findAll({
      where: {
        feeCompleted: false,
      },
    });
    if (response) {
      res.status(200).json({
        message: "Unpaid appointments has been successfully retrieved",
        data: response
      });
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.error(
      `Unable to find all Appointments because of this error: ${error}`
    );
    res.status(500).send(`Unable to find all Appointments because of this error: ${error}`);
  }
}

async function getRemainingBillingForPatient(req, res) {
  try {
    const response = await Appointment.findAll({
      where: {
        feeCompleted: false,
        patientId: req.params.patientId
      },
      attributes: ["fee", "paidFee", "paidType"],
    });
    if (response) {
      const usdRemain = response.filter(item => item.paidType === 'USD').reduce((acc, cur) => acc + (cur.fee - cur.paidFee), 0);
      const eurRemain = response.filter(item => item.paidType === 'EUR').reduce((acc, cur) => acc + (cur.fee - cur.paidFee), 0);
      const bitcoinRemain = response.filter(item => item.paidType === 'Bitcoin').reduce((acc, cur) => acc + (cur.fee - cur.paidFee), 0);
      res.status(200).json({
        message: "Unpaid appointments has been successfully retrieved",
        remain: {
          usd: usdRemain,
          eur: eurRemain,
          bitcoin: bitcoinRemain,
        },
        list: response
      });
    } else {
      res.status(200).send({
        message: "Unpaid billing doesn't exist for this patient."
      });
    }
  } catch (error) {
    console.error(
      `Unable to find all Appointments because of this error: ${error}`
    );
    res.status(500).send(`Unable to find all Appointments because of this error: ${error}`);
  }
}

/**
 * TODO: We need to categorize by paidType like USD, EUR, Bitcoin
 *  There are more complex logic to calculate top one pet.
 *  Solution is that all paid mount can be converted to usd price
 *
 *  For now I've implemented by paidFee as a test task. we can get one pet from there who total value is max.
 **/
async function getPopularPet(req, res) {
  try {
    const response = await Appointment.findAll({
      attributes: ['patientId',
        [sequelize.fn('sum', sequelize.col('paidFee')), 'total']],
      group: ['patientId']
    });
    if (response) {
      res.status(200).json({
        message: "Unpaid appointments has been successfully retrieved",
        data: response
      });
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.error(
      `Unable to find all Appointments because of this error: ${error}`
    );
    res.status(500).send(`Unable to find all Appointments because of this error: ${error}`);
  }
}

/**
 *  TODO: We need to convert eur/bitcoin to usd.
 * */
async function getSubscriptionFee(req, res) {
  try {
    const response = await Appointment.findAll({
      where: {
        date: { [Op.between]: [req.body.startDate, req.body.endDate] },
      },
      attributes: ["fee", "paidFee", "paidType"],
    });
    if (response) {
      const usdPaid = response.filter(item => item.paidType === 'USD').reduce((acc, cur) => acc + cur.paidFee, 0);
      const eurPaid = response.filter(item => item.paidType === 'EUR').reduce((acc, cur) => acc + cur.paidFee, 0);
      const bitcoinPaid = response.filter(item => item.paidType === 'Bitcoin').reduce((acc, cur) => acc + cur.paidFee, 0);
      const usdRemain = response.filter(item => item.paidType === 'USD').reduce((acc, cur) => acc + (cur.fee - cur.paidFee), 0);
      const eurRemain = response.filter(item => item.paidType === 'EUR').reduce((acc, cur) => acc + (cur.fee - cur.paidFee), 0);
      const bitcoinRemain = response.filter(item => item.paidType === 'Bitcoin').reduce((acc, cur) => acc + (cur.fee - cur.paidFee), 0);
      res.status(200).json({
        message: "Unpaid appointments has been successfully retrieved",
        paid: {
          usd: usdPaid,
          eur: eurPaid,
          bitcoin: bitcoinPaid
        },
        unpaid: {
          usd: usdRemain,
          eur: eurRemain,
          bitcoin: bitcoinRemain
        },
        data: response
      });
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.error(
      `Unable to find all Appointments because of this error: ${error}`
    );
    res.status(500).send(`Unable to find all Appointments because of this error: ${error}`);
  }
}

module.exports = {
  updateAppointment,
  createAppointment,
  getAppointment,
  getAllAppointments,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDate,
  getAppointmentsByUnpaid,
  getRemainingBillingForPatient,
  getPopularPet,
  getSubscriptionFee
};
