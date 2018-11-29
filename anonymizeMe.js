const fs = require("fs");

fs.readFile("me.json", function(err, data){
  if (err){
    throw new Error("Error reading me.json");
  }

  const json = JSON.parse(data);

  Object.values(json.projects).forEach(p => {
    p.company = "Secret company AG";
  });

  fs.writeFile("dist/me.json", JSON.stringify(json), function(err) {
    if (err) throw new Error("Error writing me.json");
  });
});