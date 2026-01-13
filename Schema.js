import joi from "joi";

const listingSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.object({
    url: joi.string().uri().required().allow("", null),
    filename: joi.string().required().allow("", null),
  }),
  price: joi.number().required().min(0),
  location: joi.string().required(),
  country: joi.string().required(),
});

const reviewSchema = joi.object({
  comment: joi.string().required(),
  rating: joi.number().required().min(1).max(5),
});

export { listingSchema, reviewSchema };
