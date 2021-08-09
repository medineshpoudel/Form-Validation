const express = require("express");
const { check, validationResult } = require("express-validator");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
const port = 3000;
app.get("/", (req, res) => {
  res.render("submit");
});
app.get("/submit", (req, res) => {
  res.render("submit");
});
app.post(
  "/submit",
  [
    check("name").notEmpty().withMessage("username is required").trim(),
    check("name")
      .trim()
      .isLength({ min: 5 })
      .withMessage("username must be of 5 characters"),
    check("email").notEmpty().withMessage("Please Enter the Email"),
    check("email", "The email must be valid").isEmail().normalizeEmail(),
    check("phone", "The phone no must be numeric").isNumeric(),
    check("hobbie", "Plesase Select one hobby").notEmpty(),
    check("gender", "Plesase Select your Gender").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    const alert = errors.array();
    if (!errors.isEmpty()) {
      res.render("submit", {
        alert,
      });
    } else {
      res.send("Form Submitted Successfully");
    }
    // return res.status(422).jsonp(errors.array());
  }
);
app.listen(port, () => {
  console.log("server stated running on 3000");
});
