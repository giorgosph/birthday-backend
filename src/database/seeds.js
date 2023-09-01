const db = require("./db.js");
const fs = require("fs");

const seedTables = fs.readFileSync(__dirname + "/seeds.sql").toString();

db.query(seedTables, (err, result) => err ? console.error(err) : console.log(result));
