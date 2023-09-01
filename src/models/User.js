const db = require("../database/db");

module.exports = class User {
  constructor(data) {
    this.username = data.username;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.birthDate = data.birth_date;
    this.password = data.password;
  }

  static async findUser(username) {
    try {
      const user = await db.query("SELECT * FROM users WHERE username=$1;", [username]);

      if (user.rows.length) return new User(user.rows[0]);
      else return false;
    } catch (err) {
      throw new Error("Query Error:\n\t", err);
    }
  }

  static async register(data) {
    try {
      const user = await db.query(
        "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *;",
        [data.username, data.firstName, data.lastName, data.password]
      );

      if (user.rows.length) return new User(user.rows[0]);
      else return false;
    } catch (err) {
      throw new Error("Query Error:\n\t", err);
    }
  }
};
