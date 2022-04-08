const express = require("express");

const patientController = require("../controllers").patient;
const appointmentController = require("../controllers").appointment;

const router = express.Router();

router.post("/patient", patientController.createPatient);
router.get("/patient/list", patientController.getAllPatients);
router.put("/patient/:patientId", patientController.updatePatient);
router.get("/patient/:patientId", patientController.getPatient);
router.delete("/patient/:patientId", patientController.deletePatient);

router.post("/appointment", appointmentController.createAppointment);
router.get("/appointment/list", appointmentController.getAllAppointments);
router.get("/appointment/list/patient/:patientId", appointmentController.getAppointmentsByPatient);
router.put("/appointment/:appointmentId", appointmentController.updateAppointment);
router.get("/appointment/:appointmentId", appointmentController.getAppointment);
router.delete("/appointment/:appointmentId", appointmentController.deleteAppointment);
router.post("/appointment/list/date", appointmentController.getAppointmentsByDate);
router.get("/appointment/list/unpaid", appointmentController.getAppointmentsByUnpaid);
router.get("/appointment/remain/bill/patient/:patientId", appointmentController.getRemainingBillingForPatient);
router.get("/patient/popularity/pet", appointmentController.getPopularPet);
router.post("/subscription/balance", appointmentController.getSubscriptionFee);

export default router;
