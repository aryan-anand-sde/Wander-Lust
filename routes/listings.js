import express from "express";
import WrapAsync from "../utility/WrapAsync.js";
import multer from "multer";
import { isListingOwner, isLoggedIn, validateListing } from "../middlewares.js";
import {
  indexRoute,
  newListingForm,
  newListing,
  showListing,
  editListingForm,
  editListing,
  deleteListing,
} from "../controllers/listings.js";
import { storage } from "../cloudConfig.js";

const listingsRouter = express.Router();
const upload = multer({ storage: storage });

listingsRouter
  .route("/")
  .get(WrapAsync(indexRoute))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("image"),
    WrapAsync(newListing)
  );

listingsRouter.get("/newlisting", isLoggedIn, WrapAsync(newListingForm));

listingsRouter
  .route("/:id")
  .get(WrapAsync(showListing))
  .put(
    isLoggedIn,
    isListingOwner,
    validateListing,
    upload.single("image"),
    WrapAsync(editListing)
  )
  .delete(isLoggedIn, isListingOwner, WrapAsync(deleteListing));

listingsRouter.get(
  "/:id/edit",
  isLoggedIn,
  isListingOwner,
  WrapAsync(editListingForm)
);
export default listingsRouter;
