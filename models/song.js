const { model, Schema } = require("mongoose");
const Joi = require("joi");

const { GENRES } = require("../constants");
const { handleMongooseError } = require("../helpers");

const songMongooseSchema = new Schema(
  {
    user_id: { type: String, required: true },
    created_by: { type: String, require: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genres: { type: GENRES, default: [] },
    path_to_song: String,
    path_to_video: String,
    path_to_img: String,
    text: {
      type: [
        {
          block_title: String,
          block_text: String,
        },
      ],
      required: true,
    },
    chords: {
      type: [String],
      default: [],
    },
    dowloaded: Number,
    watched: Number,
    listened: Number,
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
