require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const { PG_USER, PG_PASS, PG_HOST, PG_DATABASE } = process.env;

const pgClient = new Client({
  user: PG_USER,
  password: PG_PASS,
  host: PG_HOST,
  database: PG_DATABASE,
  ssl: { rejectUnauthorized: false },
});

async function connectDB() {
  await pgClient
    .connect()
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function CreateTable() {
  try {
    await pgClient.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await pgClient.query("BEGIN");

    // await pgClient.query("DROP TABLE IF EXISTS ps.users CASCADE");
    // await pgClient.query("DROP TABLE IF EXISTS ps.project");

    await pgClient.query(`
      CREATE SCHEMA IF NOT EXISTS ps;
      CREATE TABLE IF NOT EXISTS ps.users(
        uid uuid DEFAULT gen_random_uuid(),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        PRIMARY KEY(uid)
      );
    `);

    await pgClient.query(`CREATE TABLE IF NOT EXISTS ps.project(
        pid uuid DEFAULT gen_random_uuid(),
        title VARCHAR(1000) NOT NULL,
        description VARCHAR(10000),
        uid uuid,
        PRIMARY KEY(pid),
        CONSTRAINT fk_customer
          FOREIGN KEY(uid)
            REFERENCES ps.users(uid)
      )`);
    await pgClient.query("COMMIT");
    console.log("SUCCESSFULLY CREATED");
  } catch (err) {
    await pgClient.query("ROLLBACK");
    console.log("ERROR OCCURED: ", err);
    return err;
  }
}

async function InsertUserData({ name, email, password }) {
  try {
    const hashPass = await bcrypt.hash(password, 10);

    const result = await pgClient.query(
      `INSERT INTO ps.users(name, email, password)
        VALUES ($1, $2, $3)
      RETURNING uid`,
      [name, email, hashPass]
    );

    return result.rows[0].uid;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function FindUserData({ email }) {
  try {
    const response = await pgClient.query(
      `
        SELECT uid, password 
        FROM ps.users
        WHERE email=$1
        `,
      [email]
    );

    if (response.rows.length > 0) {
      return response.rows[0];
    }

    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function InsertProjectData({ uid, title, description }) {
  try {
    const result = await pgClient.query(
      `INSERT INTO ps.project(uid, title, description)
        VALUES($1, $2, $3)
      RETURNING pid;
      `,
      [uid, title, description]
    );
    return result.rows[0].pid;
  } catch (err) {
    console.error("Error inserting project data: ", err);
    throw err;
  }
}

async function ViewProjectData({ uid }) {
  try {
    const result = await pgClient.query(
      `
        SELECT ps.users.uid, ps.users.name, ps.project.pid, ps.project.title, ps.project.description
        FROM ps.users
        INNER JOIN ps.project
          ON ps.users.uid=ps.project.uid
        WHERE ps.users.uid=$1
      `,
      [uid]
    );

    if (result.rows === null) {
      return null;
    }

    return result.rows;
  } catch (err) {
    console.error("Error viewing data: ", err);
    throw err;
  }
}

async function UpdateProjectData({ pid, title, description }) {
  console.log(pid + title + description);
  try {
    await pgClient.query(
      `UPDATE ps.project
          SET title=$1,
              description=$2
        WHERE pid=$3;
      `,
      [title, description, pid]
    );
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  connectDB,
  CreateTable,
  InsertUserData,
  FindUserData,
  InsertProjectData,
  ViewProjectData,
  UpdateProjectData,
};
