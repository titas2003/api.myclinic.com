const Doctor = require("../models/Doctor");

exports.getAll = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

exports.getById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.json(doctor);
};

exports.create = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).json(doctor);
};

exports.update = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(doctor);
};

exports.remove = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor deleted" });
};
