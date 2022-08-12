const mysql = require('mysql2');

const {
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_DB: DATABASE
} = process.env;

const stringifyData = (data) => {
  let keys = Object.keys(data);
  let values = keys.map((key) => {
    return data[key];
  });

  let keyString = JSON.stringify(keys);
  let valueString = JSON.stringify(values);

  return {
    keys: keyString.slice(1, keyString.length - 1),
    values: valueString.slice(1, valueString.length - 1)
  };
};

stringifyQuery = (keys) => {
  let output = '';
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    output.push('`' + key + '` = ?');
    if (i < keys.length - 1) {
      output.push(' AND ');
    }
  }
  return output;
};

let pool;

module.exports.init = async () => {
  return new Promise((resolve, reject) => {
    pool = mysql.createPool({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }).promise()
    resolve();
  })
    .then(() => {
      return pool.query(`
        CREATE TABLE IF NOT EXISTS tracks (
          id INT NOT NULL,
          title VARCHAR(30) NOT NULL,
          author VARCHAR(30) DEFAULT "Unknown" NOT NULL,
          source VARCHAR(50) NOT NULL,
          PRIMARY KEY (id)
        );
      `);
    })
    .then(() => {
      return pool.query(`
        CREATE TABLE IF NOT EXISTS effects (
          id INT NOT NULL,
          title VARCHAR(30) NOT NULL,
          author VARCHAR(30) DEFAULT "Unknown" NOT NULL,
          source VARCHAR(50) NOT NULL,
          PRIMARY KEY (id)
        );
      `);
    })
    .then(() => {
      return pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT NOT NULL,
          user VARCHAR(20) NOT NULL,
          hashkey VARCHAR(50) NOT NULL,
          PRIMARY KEY (id)
        );
      `);
    })
    .then(() => {
      return pool.query(`
        CREATE TABLE IF NOT EXISTS dungeons (
          id INT NOT NULL,
          creator INT NOT NULL,
          title VARCHAR(30),
          PRIMARY KEY (id),
          FOREIGN KEY (creator) REFERENCES users(id)
        );
      `);
    })
    .then(() => {
      return pool.query(`
        CREATE TABLE IF NOT EXISTS dungeons_tracks (
          id INT,
          track_id INT,
          dungeon_id INT,
          position INT,
          FOREIGN KEY (track_id) REFERENCES tracks(id),
          FOREIGN KEY (dungeon_id) REFERENCES dungeons(id)
        );
      `);
    })
    .then(() => {
      return pool.query(`
        CREATE TABLE IF NOT EXISTS dungeons_effects (
          id INT,
          effect_id INT,
          dungeon_id INT,
          icon VARCHAR(10),
          color VARCHAR(10),
          position INT,
          FOREIGN KEY (effect_id) REFERENCES effects(id),
          FOREIGN KEY (dungeon_id) REFERENCES dungeons(id)
        );
      `);
    })
    .then(() => {
      return pool.query(`
        CREATE TABLE IF NOT EXISTS user_sessions (
          cookie VARCHAR(30) NOT NULL,
          user INT NOT NULL,
          FOREIGN KEY (user) REFERENCES users(id)
        );
      `);
    })
    .then(() => {
      console.log('Connected to MYSQL');
    })
    .catch((err) => {
      console.log('Could not connect to MYSQL:');
      console.log(err);
    })
};

module.exports.POST = async (table, data) => {
  return pool.query(`
    INSERT INTO TABLE ${table}
    (${stringifyData(data).keys})
    VALUES (${stringifyData(data).values})
  `)
};

module.exports.GET = async (table, query) => {
  return pool.query(`
    SELECT ${stringifyData(query).keys} FROM TABLE
    WHERE ${stringifyQuery(query.params)}
  `, [query.values])
}