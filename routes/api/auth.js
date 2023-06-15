const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.registerUserSchema),
  ctrl.register
);
router.post("/login", validateBody(schemas.loginUserSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.post("/refresh", authenticate, ctrl.refresh);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.setAvatar);

module.exports = router;
