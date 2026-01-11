const express = require("express");
const router = express.Router();
const { createPlace } = require("../controllers/placeController");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.fields([
    { name: "mapImage", maxCount: 1 },
    { name: "heroImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 }
  ]),
  createPlace
);

module.exports = router;
