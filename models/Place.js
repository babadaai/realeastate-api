const mongoose=require('mongoose')
const imageSchema = new mongoose.Schema({
  public_id: String,
  url: String
}, { _id: false });

const placeSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    mapImage: imageSchema,          
    heroImage: imageSchema,         

    galleryImages: [imageSchema],
    details: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    },
     isActive: {
      type: Boolean,
      default: true
    }
  },
 
 {
    timestamps: true
  }) 
  module.exports=mongoose.model("Place", placeSchema)
