import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   require: true,
   min: 3,
   max: 20,
   unique: true,
  },
 },
 { timestamps: true }
);

const Tag = mongoose.model('Tag', TagSchema);
export default Tag;
