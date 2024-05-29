const express = require("express");
const cors = require("cors");
const connectDB = require("./Databse/databse");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

connectDB();
app.use(express.json());

const routes = require("./Routes/routes");

app.use("/", routes);

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
