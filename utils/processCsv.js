import fs from "fs";
import csv from "csv-parser";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//adjust delayMs to test it yourself, was told to use 1200000 or 20 mins)
const processCsv = async (filePath, schema, lastRowTracker, delayMs = 5000) => {
  return new Promise((resolve, reject) => {
    const rows = []; // Buffer to store all rows

    // Read CSV file into memory
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row); // Store each row in the buffer
      })
      .on("end", async () => {
        console.log(`Starting to process ${filePath}`);

        for (const row of rows) {
          const lastRow = lastRowTracker.lastRow;

          // Check if the row has changed
          const rowChanged =
            !lastRow ||
            Object.keys(row).some((key) => row[key] !== lastRow[key]);

          if (rowChanged) {
       
            lastRowTracker.lastRow = row;

            // Save the entire row to MongoDB(if changed)
            const data = new schema(row);
            await data.save();
            console.log(
              `Row updated in MongoDB - ${filePath}: ${JSON.stringify(row)}`
            );
          } else {
            console.log(`Row ignored - ${filePath}: ${JSON.stringify(row)}`);
          }

          // Delay after every row
          await delay(delayMs);
        }

        resolve(`Finished processing ${filePath}`);
      })
      .on("error", (error) => reject(error));
  });
};

export default processCsv;
//we will replace this with sockets when we actually have real data from the sensors, this is just for showcasing
