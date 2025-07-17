import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./config/configPassport.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

await connectDB();

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
