import Listing from "./models/Listing.js";
import Review from "./models/Review.js";
import ExpressError from "./utility/ExpressError.js";
import { listingSchema, reviewSchema } from "./Schema.js";

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in!");
    res.redirect("/login");
  }
};

const isListingOwner = (req, res, next) => {
  Listing.findById(req.params.id).then((listing) => {
    if (!listing.owner.equals(req.user._id)) {
      req.flash(
        "error",
        "You do not have permission to do that as you're not the owner!"
      );
      res.redirect(`/listings/${req.params.id}`);
    } else next();
  });
};
const isReviewAuthor = (req, res, next) => {
  Review.findById(req.params.reviewId).then((review) => {
    if (!review.author.equals(req.user._id)) {
      req.flash(
        "error",
        "You do not have permission to do that as you've not created this review!"
      );
      res.redirect(`/listings/${req.params.id}`);
    } else next();
  });
};

const saveReturnTo = (req, res, next) => {
  if (req.session.returnTo) res.locals.returnTo = req.session.returnTo;
  next();
};

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, message);
  }
  next();
};
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, message);
  }
  next();
};

export {
  isLoggedIn,
  saveReturnTo,
  isReviewAuthor,
  isListingOwner,
  validateReview,
  validateListing,
};
