const fs = require("fs");

fs.copyFile("./sample.resume.json", "./dist/my.resume.json", function(err){
  if(err) throw new Error("Error copying sample.resume.json to dist folder.");
});