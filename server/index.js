const express = require("express");
const cors = require("cors");
const connectDB = require("./Databse/databse");
const app = express();
const PORT = 3001;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5174", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
    credentials: true,
  })
);

// Connect to the database
connectDB();

const routes = require("./Routes/routes");

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
