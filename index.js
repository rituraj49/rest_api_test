import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

connectDb();

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res)=>{
    res.send("Server running...");
});

app.listen(PORT, ()=>console.log("server is running"));