import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found !"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings !"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted !");
  } catch (error) {
    next(error);
  }
};
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    next(errorHandler(404, "Listing not found !"));
  } else if (req.user.id !== listing.userRef) {
    next(errorHandler(401, "You can only update your own listings!"));
  }
  //we did new:True so that it will update and show the updated details
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found !"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    //parseInt is used for the conversion of the string to the integer form
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      //if we the offer undefined or false then we search the database on the basis of both true or false
      //The $in operator allows you to specify multiple values that should be matched against a field in the database documents. It is often used in queries to filter documents based on whether the value of a particular field matches any of the values in the specified array.
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    // $regex is an operator used in query conditions to perform pattern matching on string values using regular expressions. It allows you to search for documents where a specific field matches a given regular expression pattern.
    //$options (optional): Additional options that modify the behavior of the regular expression matching. Common options include 'i' for case-insensitive matching, 'm' for multiline matching, 'x' for ignoring whitespace in the pattern, and 's' for allowing the dot (.) to match newline characters.
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    }).sort({[sort]:order}).limit(limit).skip(startIndex);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
