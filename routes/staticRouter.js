const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch all URLs from the database
    const allUrls = await URL.find({});

    // Log the URLs for debugging
    console.log(allUrls);

    // Render the 'home' view and pass the URLs data
    return res.render("home", { urls: allUrls });
  } catch (error) {
    // If any error occurs, log it and send a response
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Something went wrong while fetching URLs.");
  }
});

module.exports = router;
