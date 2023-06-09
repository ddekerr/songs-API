const { model, Schema } = require("mongoose");
const Joi = require("joi");

const { GENRES } = require("../constants");
const { handleMongooseError } = require("../helpers");

const songMongooseSchema = new Schema(
  {
    is_public: { type: Boolean, required: true, default: false },
    is_moderate: { type: Boolean, required: true, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    author: { type: String, default: "" },
    genres: { type: GENRES, default: [] },
    path_to_song: { type: String, default: "" },
    path_to_video: { type: String, default: "" },
    path_to_img: { type: String, default: "" },
    text: {
      type: [
        {
          block_title: String,
          block_text: String,
        },
      ],
      required: true,
      default: [],
    },
    chords: {
      type: [String],
      default: [],
    },
    dowloaded: { type: Number, default: 0 },
    watched: { type: Number, default: 0 },
    listened: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

songMongooseSchema.post("save", handleMongooseError);

const songJoiSchema = Joi.object({
  is_public: Joi.boolean(),
  is_moderate: Joi.boolean(),
  title: Joi.string().required(),
  author: Joi.string(),
  genres: Joi.array().items(Joi.string().valid(...GENRES)),
  path_to_song: Joi.string(),
  path_to_video: Joi.string(),
  path_to_img: Joi.string(),
  text: Joi.array()
    .items(Joi.object({ block_title: Joi.string(), block_text: Joi.string() }))
    .required(),
  chords: Joi.array().items(Joi.string()),
  dowloaded: Joi.number(),
  watched: Joi.number(),
  listened: Joi.number(),
});

const Song = model("song", songMongooseSchema);

module.exports = { Song, songJoiSchema };
