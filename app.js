const express = require("express");

const menuRoutes = require("./routes/menuRoutes");
const typeRoutes = require("./routes/typeRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/menu", menuRoutes);
app.use("/api/type", typeRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
