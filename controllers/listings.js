import Listing from "../models/Listing.js";
import { listingSchema } from "../Schema.js";
import ExpressError from "../utility/ExpressError.js";

const indexRoute = (req, res) => {
  Listing.find({}).then((listings) =>
    res.render("./listings/index.ejs", { listings })
  );
};

const newListingForm = (req, res) => {
  res.render("./listings/new.ejs");
};
const newListing = (req, res, next) => {
  listingSchema.validate(req.body).error
    ? next(
        new ExpressError(400, listingSchema.validate(req.body).error.message)
      )
    : null;
  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  newListing.image = { url: req.file.path, filename: req.file.filename };
  newListing.save().then(() => {
    req.flash("success", "Successfully added a new listing!");
    res.redirect("/listings");
  });
};

const showListing = (req, res) => {
  Listing.findById(req.params.id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .then((listing) => {
      if (!listing) {
        req.flash("error", "Listing you're looking for does not exists!");
        res.redirect("/listings");
      } else res.render("./listings/display.ejs", { listing });
    });
};

const editListingForm = (req, res) => {
  Listing.findById(req.params.id).then((listing) => {
    if (!listing) {
      req.flash("error", "Listing you're looking for does not exists!");
      res.redirect("/listings");
    } else {
      let resizedImageUrl = listing.image.url.replace(
        "/upload",
        "/upload/w_250/"
      );
      res.render("./listings/edit.ejs", { listing, resizedImageUrl });
    }
  });
};
const editListing = (req, res) => {
  if (req.file)
    req.body.image = { url: req.file.path, filename: req.file.filename };
  Listing.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(() => {
    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${req.params.id}`);
  });
};

const deleteListing = (req, res) => {
  Listing.findByIdAndDelete(req.params.id).then(() => {
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
  });
};

export {
  indexRoute,
  newListingForm,
  newListing,
  showListing,
  editListingForm,
  editListing,
  deleteListing,
};
