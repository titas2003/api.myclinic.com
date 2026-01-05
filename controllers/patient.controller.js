const Patient = require("../models/Patient");

exports.getAll = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

exports.create = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
};
