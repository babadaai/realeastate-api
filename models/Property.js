const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a property title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a detailed description'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['just-listed', 'for-sale', 'for-rent', 'sold', 'featured'],
    default: 'for-sale',
  },

  details: {
    type: {
      type: String, 
      required: true,
    },
    garages: {
      type: Number,
      default: 0,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    landSize: {
      type: String, 
      required: true,
    },
    yearBuilt: {
      type: Number, 
    },
    size: {
      type: String, 
      required: true,
    },
  },

  features: [{
    type: String,
    trim: true,
  }],


  gallery: [{
    type: String, 
    required: true,
  }],

  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'sold'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});


propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();

  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') 
      .replace(/\s+/g, '-') 
      .replace(/-+/g, '-'); 
  }

});

module.exports = mongoose.model('Property', propertySchema);