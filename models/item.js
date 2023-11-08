const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeSchema = new Schema(
    {
      title: { type: String, required: [true, "title is required"] },
      author: {type: Schema.Types.ObjectId, ref:'User'},
      category: { type: String, required: [true, "author is required"] },
      content: {
        type: String,
        required: [true , "content is required"],
        minLength: [10, " the content should have at least 10 characters"],
      },
      status: { type: String, required: [true, "status is required"] },
      image: {type: String, required: [true, 'Image is required']},
    },
  );

module.exports = mongoose.model('items', tradeSchema);
