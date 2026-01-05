const Appointment = require("../models/Appointment");

exports.getAll = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("doctor")
    .populate("patient");

  res.json(appointments);
};

exports.create = async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
};
