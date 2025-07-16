import { Router } from "express";
import { userValidator } from "../validator/userValidator.js";
import { registerUser, logoutUser } from "../controllers/authController.js";
import passport from "passport";

const router = Router();

router.post("/register", userValidator, registerUser);
router.post(
  "/login",
  userValidator,
  passport.authenticate("local"),
  (req, res) => {
    res.json({ message: "Logged in successfully" });
  }
);
router.post("/logout", logoutUser);

export default router;
