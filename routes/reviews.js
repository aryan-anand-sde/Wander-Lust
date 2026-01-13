import express from "express";
import WrapAsync from "../utility/WrapAsync.js";
import { addReview, deleteReview } from "../controllers/reviews.js";
import { isLoggedIn, isReviewAuthor, validateReview } from "../middlewares.js";

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter.post("/", isLoggedIn, validateReview, WrapAsync(addReview));

reviewsRouter.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(deleteReview)
);

export default reviewsRouter;
