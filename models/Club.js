class Club {
  constructor(db) {
    this.collection = db.collection("clubs");
  }

  async create(club) {
    const result = await this.collection.insertOne(club);
    return result;
  }
}

module.exports = Club;
