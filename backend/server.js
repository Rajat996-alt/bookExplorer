const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/book_explorer")
  .then(() => console.log("✅ Backend connected to MongoDB"))
  .catch((err) => console.error("Mongo Error:", err));

// Schema & Model
const bookSchema = new mongoose.Schema({
  title: String,
  price: String,
  availability: String,
  rating: String,
  detailUrl: String,
  imageUrl: String,
});

const Book = mongoose.model("Book", bookSchema);

// ✅ Main route with search + filter + pagination
app.get("/api/books", async (req, res) => {
  try {
    const { page = 1, limit = 20, rating, minPrice, maxPrice, search } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (rating) {
      filter.rating = rating;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = `£${minPrice}`;
      if (maxPrice) filter.price.$lte = `£${maxPrice}`;
    }

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// ✅ Single Book Endpoint
app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Error fetching book" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
