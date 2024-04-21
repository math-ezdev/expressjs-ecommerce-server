const mongoose = require("mongoose");

const databaseConfig = {
  url:
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/ecommerce-database",
  options: {
    // useNewUrlParser: true, useUnifiedTopology: true
  },
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(databaseConfig.url, databaseConfig.options);
  } catch (error) {
    console.log(`Error connecting to database: ${JSON.stringify(error)}!`);
    process.exit(1);
  }
};

const databaseConnection = mongoose.connection;

databaseConnection.on("connected", function () {
  console.log(`The database is connected: ${this.name}.`);
});

databaseConnection.on("disconnected", function () {
  console.log(`The database is disconnected: ${this.name}.`);
});

databaseConnection.on("error", function (error) {
  console.log(`The database error occurred: ${JSON.stringify(error)}!`);
});

process.on("SIGINT", async function () {
  await databaseConnection.close();
  process.exit(0);
});

/*
proccess.exit(code)
0 - normal exit
1 - Uncaught Fatal Exception
*/

module.exports = { connect: connectToDatabase, connection: databaseConnection };
