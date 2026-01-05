require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ name: "api.myclinic.com", status: "running" });
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Clinic API running on port ${PORT}`)
);
