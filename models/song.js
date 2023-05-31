const { model, Schema } = require("mongoose");
const Joi = require("joi");

// const { GENRES } = require("../constants");
const { handleMongooseError } = require("../helpers");

const songMongooseSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

songMongooseSchema.post("save", handleMongooseError);

const songJoiSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

const Song = model("song", songMongooseSchema);

module.exports = { Song, songJoiSchema };

// {
//   user_id: null
//   title: ""
//   author:""
//   genre: []
//   pathToSong: ""
//   pathToVideo: ""
//   pathToImg: ""
//   text: {
//     intro: ""
//     verse: ""
//     chorus: ""
//     verse2: ""
//   }
//   chords: {
//     id: "Dm"
//     value: "Dm"
//   }
//   dowloaded: 0
//   watched: 0
//   listened: 0
//   created_by: ""
//   created_at: Date
//   updated_at: Date,
// }
