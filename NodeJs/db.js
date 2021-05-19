const mongoose = require("mongoose");

const CS =
  "mongodb+srv://Alex:1234@cluster1.ijdqm.mongodb.net/BookCatalog_18052021?retryWrites=true&w=majority";

const startDb = async () => {
  try {
    await mongoose.connect(CS, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("DbConnection succeeded");
  } catch (error) {
    console.log(`DbConnection failed: ${error}`);
  }
};

startDb();

module.exports = mongoose;
