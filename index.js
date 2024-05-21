const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const db = require("./db");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is healthy...");
});

// Routes
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)


app.listen(port, () => {
  console.log("Server is running on the port", port);
});
