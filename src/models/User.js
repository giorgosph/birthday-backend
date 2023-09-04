const db = require("../database/db");

module.exports = class User {
  constructor(data) {
    this.username = data.username;
    this.name = data.first_name;
    this.surname = data.last_name;
    this.birthDate = data.birth_date;
    this.password = data.password;
  }

  static async findUser(username) {
    const user = await db.query("SELECT * FROM users WHERE username=$1;", [username]);

    if (user.rows.length) return new User(user.rows[0]);
    else return false;
  }

  static async register(data) {
    const user = await db.query(
      "INSERT INTO users (username, first_name, last_name, birth_date, password) \
      VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [data.username, data.name, data.surname, data.birthDate, data.password]
    );

    if (user.rows.length) return new User(user.rows[0]);
    else return false;
  }

  static async getTodaysDates() {
    const dates = await db.query(
      "SELECT username, first_name, last_name, birth_date FROM users \
      WHERE EXTRACT(MONTH FROM birth_date) = EXTRACT(MONTH FROM CURRENT_DATE) \
      AND EXTRACT(DAY FROM birth_date) = EXTRACT(DAY FROM CURRENT_DATE);");

    if (!dates.rows.length) return false;
    const birthDates = dates.rows.map((date) => new User(date));
    return birthDates;
  }
};
