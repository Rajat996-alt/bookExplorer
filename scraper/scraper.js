const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const baseUrl = "https://books.toscrape.com/catalogue/page-";
const MONGO_URI = "mongodb://127.0.0.1:27017/book_explorer";

// Connect DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const bookSchema = new mongoose.Schema({
  title: String,
  price: String,
  availability: String,
  rating: String,
  detailUrl: String,
  imageUrl: String,
});

const Book = mongoose.model("Book", bookSchema);

async function scrapeAllBooks() {
  let allBooks = [];

  for (let page = 1; page <= 50; page++) {
    const url = `${baseUrl}${page}.html`;
    console.log(`Scraping Page: ${page}`);
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      $(".product_pod").each((i, el) => {
        const title = $(el).find("h3 a").attr("title");
        const price = $(el).find(".price_color").text();
        const availability = $(el).find(".availability").text().trim();
        const rating = $(el)
          .find(".star-rating")
          .attr("class")
          .replace("star-rating", "")
          .trim();
        const detailUrl = $(el).find("h3 a").attr("href");
        const imageUrl = $(el).find("img").attr("src");

        allBooks.push({
          title,
          price,
          availability,
          rating,
          detailUrl: "https://books.toscrape.com/catalogue/" + detailUrl,
          imageUrl: "https://books.toscrape.com/" + imageUrl,
        });
      });
    } catch (err) {
      console.error("Error scraping page", page, err.message);
    }
  }

  console.log("Total books scraped:", allBooks.length);

  // Save to DB
  await Book.deleteMany({});
  await Book.insertMany(allBooks);
  console.log("✅ Books saved to DB");
  mongoose.disconnect();
}

scrapeAllBooks();
