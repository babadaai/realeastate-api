const Place = require("../models/Place");
const cloudinary = require("../config/cloudinary");

const createPlace = async (req, res) => {
  try {
    const { name, title, description } = req.body;

    if (!name || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Place.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Place already exists" });
    }

    const mapImageUpload = await cloudinary.uploader.upload(
      req.files.mapImage[0].path
    );

    const heroImageUpload = await cloudinary.uploader.upload(
      req.files.heroImage[0].path
    );

    const galleryUploads = await Promise.all(
      req.files.galleryImages.map(file =>
        cloudinary.uploader.upload(file.path)
      )
    );

    const galleryImages = galleryUploads.map(img => ({
      public_id: img.public_id,
      url: img.secure_url
    }));

    const place = await Place.create({
      name,
      mapImage: {
        public_id: mapImageUpload.public_id,
        url: mapImageUpload.secure_url
      },
      heroImage: {
        public_id: heroImageUpload.public_id,
        url: heroImageUpload.secure_url
      },
      galleryImages,
      details: {
        title,
        description
      }
    });

    res.status(201).json({
      success: true,
      message: "Place created",
      place
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createPlace = createPlace;
