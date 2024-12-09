const express = require("express");
const urlRoute = require("./routes/url.route");
const { connectToMongooDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

connectToMongooDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
// return res.render("home", { allUrls });
// });

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  // Find the URL by shortId and update the visitHistory
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId }, // Look for the matching shortId
    { $push: { visitHistory: { timestamp: Date.now() } } }, // Push the timestamp into visitHistory
    { new: true } // Ensure we return the updated document
  );

  if (!entry) {
    // If no entry is found for the shortId, send a 404 or an appropriate message
    return res.status(404).send("URL not found");
  }

  // Redirect the user to the original URL
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
