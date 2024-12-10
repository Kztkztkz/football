const Club = require("../models/Club");
async function listClubs(req, res) {
  res.render("index");
}

async function createClub(req, res) {
  console.log(req.body);
    const clubName = req.body.name;
    const newClub = new Club(req.app.locals.db);
    await newClub.create({ name: clubName });
    res.redirect("/clubs");
}

module.exports = { createClub, listClubs };

