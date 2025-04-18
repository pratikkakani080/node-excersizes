const fs = require("fs");

// Write to a file
fs.writeFile("sample.txt", "Hello, Node.js!", (err) => {
  if (err) throw err;
  console.log("File written successfully.");

  // Read from the file
  fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File contents:", data);

    // Append to the file
    fs.appendFile("sample.txt", "\nAppended line.", (err) => {
      if (err) throw err;
      console.log("Line appended.");

      // Read again
      fs.readFile("sample.txt", "utf8", (err, updatedData) => {
        if (err) throw err;
        console.log("Updated contents:", updatedData);
      });
    });
  });
});
