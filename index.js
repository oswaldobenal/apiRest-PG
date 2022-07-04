import  express  from "express";
//importing routes 
import router from "./src/routes/routes.js";

const app = express();
app.use(express.json()); // to read req.body in json format

//use the route when url is  http://localhost:5000/api
app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server runing in port ${PORT}`)
})