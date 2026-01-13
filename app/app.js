// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// --- MIDDLEWARE ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// --- IMPORT ROUTES ---
const indexRoutes = require("./routes/index");
const mahasiswaRoutes = require("./routes/mahasiswa");
const absensiRoutes = require("./routes/absensi");

// --- USE ROUTES ---
app.use("/", indexRoutes);
app.use("/mahasiswa", mahasiswaRoutes);
app.use("/absensi", absensiRoutes);

// --- START SERVER ---
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});