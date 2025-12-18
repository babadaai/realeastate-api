const Property = require('../models/Property');


const parseJSON = (value, fieldName, fallback) => {
  if (!value) {
    console.log(`${fieldName} is missing`);
    return fallback;
  }
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.log(`Invalid JSON in ${fieldName}:`, value);
    return fallback;
  }
};

exports.createProperty = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('Uploaded files:', req.files ? req.files.length : 0);

    const gallery = req.files ? req.files.map(file => file.path) : [];

   const details = parseJSON(req.body?.details, 'details', {});
const features = parseJSON(req.body?.features, 'features', []);


    const propertyData = {
      title: req.body.title?.trim(),
      price: req.body.price ? Number(req.body.price) : undefined,
      location: req.body.location?.trim(),
      description: req.body.description?.trim(),
      category: req.body.category || 'for-sale',
      details,
      features,
      gallery,
      featured: req.body.featured === 'true' || false,
      status: req.body.status || 'active',
    };

    if (!propertyData.title || !propertyData.price || !propertyData.location || !propertyData.description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, price, location, description',
      });
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('Create Property Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create property',
    });
  }
};


exports.getProperties = async (req, res) => {
  try {
    let query = { status: 'active' };

    if (req.query.category) query.category = req.query.category;
    if (req.query.featured === 'true') query.featured = true;

    const properties = await Property.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPropertyBySlug = async (req, res) => {
  try {
    const property = await Property.findOne({
      slug: req.params.slug,
      status: 'active',
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }


    const newImages = req.files ? req.files.map((file) => file.path) : [];

    const details = parseJSON(req.body.details, property.details);
    const features = parseJSON(req.body.features, property.features);

    let gallery = property.gallery;
    if (req.body.existingGallery) {
      try {
        gallery = JSON.parse(req.body.existingGallery);
      } catch (e) {
      }
    }

    if (newImages.length > 0) {
      gallery = [...gallery, ...newImages];
    }

    property.title = req.body.title || property.title;
    property.price = req.body.price ? Number(req.body.price) : property.price;
    property.location = req.body.location || property.location;
    property.description = req.body.description || property.description;
    property.category = req.body.category || property.category;
    property.details = details;
    property.features = features;
    property.gallery = gallery;
    property.featured = req.body.featured ? req.body.featured === 'true' : property.featured;
    property.status = req.body.status || property.status;

    await property.save();

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('Update Property Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update property',
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};