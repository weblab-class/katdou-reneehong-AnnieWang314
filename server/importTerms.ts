import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import TermModel, { Term } from "./models/Term";

dotenv.config({});

const mongoConnectionURL = process.env.MONGO_SRV as string;
const databaseName = "SlangDB";

mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    const jsonFilePath = path.resolve(__dirname, "./terms.json");

    fs.promises
      .readFile(jsonFilePath, "utf8")
      .then(async (data) => {
        const terms: Term[] = JSON.parse(data);

        try {
          await TermModel.insertMany(terms);
          console.log("Data imported successfully");
        } catch (error) {
          console.error("Error inserting data:", error);
        } finally {
          await mongoose.connection.close();
        }
      })
      .catch((err) => {
        console.error("Error reading JSON file:", err);
        process.exit(1);
      });
  })
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
