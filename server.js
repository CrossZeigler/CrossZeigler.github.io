// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import countries from './public/lab_6/countries.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

/* Sqlite stuff start */
const dbSettings = {
  filename: './tmp/database.db',
  driver: sqlite3.Database
};
const dbu = open.dbSettings;
/* import sqlite3 */
async function dataFetch() {
  const muData = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const muJson = await muData.json();
  res.json(muJson);
  console.log('POST request detected');

  return muJson.json();
}

async function insertIntoDB(data) {
  try {
    const restaurantName = data.name;
    /* const category = data.category; */
    const {category} = data;

    await db.exec(`INSERT INTO restaurants (restaurant_name, category) VALUES ("${restaurant_name}", "${category}")`);
    console.log(`${restaurantName} and ${category} inserted`);
  }

  catch (e) {
    console.log('Error on insertion');
    console.log(e);
  }
}

async function databaseInitialize(dbSettings) {
  try {
    const db = await open(dbSettings);
    await db.exec(`CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_name TEXT,
      category TEXT)
      `)
    const data = await dataFetch();
    data.forEach((entry) => { insertIntoDB(entry) });
    const test = await db.get('SELECT * FROM restaurants')
    console.log('Success');
  }
  catch (e) {
    console.log('Error loading Database');
    console.log(e);
  }
}

async function query(db) {
  const result = await db.all('SELECT category, COUNT(restaurant_name) FROM restaurants GROUP BY category');
  return result;
}

app.route('/sql')
  .get((req, res) => {
    console.log('GET detected');
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    // This is where the SQL retrieval function will be:
    // Please remove the below variable
    const db = await open(dbSettings);
    const output = await query(db);
    // This output must be converted to SQL
    res.json(output);
  });

/* Sqlite stuff end */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    /* const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json); */
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  /* Callback for lab 7 */
  .post(async (req, res) => {
    /* First await statement */
    /* API for PG County restaurants */
    /* And second await statement for restaurants */
    /* const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const nuJson = await data.json();
    res.json(nuJson);
    console.log('POST request detected'); */
    /* And second await statement for crimes */
    /* API for PG County Crimes */
    const nuData = await fetch('https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json');
    const nuJson2 = await nuData.json();
    res.json(nuJson2);
    console.log('POST request detected');
    /* res.status(200).send('Hello World'); */
    res.json(countries);
    /* console.log('Form data in res.body', req.body); */
    console.log('fetch request data', nuJson);
    /* Second log statement for crimes */
    console.log('fetch request data', nuJson2);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
