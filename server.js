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
/* import sqlite3 */

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = ':memory:';

const DB = new sqlite3.Database(DB_PATH, function(err){
  if (err) {
      console.log(err)
      return
  }
  console.log('Connected to ' + DB_PATH + ' database.')
});

DB.close()

const DBu= new sqlite3.Database(DB_PATH, function(err){
  if (err) {
      console.log(err)
      return
  }
  console.log('Connected to ' + DB_PATH + ' database.')

// ADD THIS CODE BELOW
  DBu.exec('PRAGMA foreign_keys = ON;', function(error)  {
      if (error){
          console.error("Pragma statement didn't work.")
      } else {
          console.log("Foreign Key Enforcement is on.")
      }
  });
});

CREATE TABLE IF NOT EXISTS Users
(
  id integer NOT NULL PRIMARY KEY,
  login text NOT NULL UNIQUE,
  password text NOT NULL,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text
);

CREATE TABLE IF NOT EXISTS Blogs (
  id integer NOT NULL PRIMARY KEY,
  user_id integer NOT NULL UNIQUE,  <-- Add this in
  blog text,
  title text NOT NULL,
  publish_date date,
      FOREIGN KEY (user_id) REFERENCES Users(id)  <-- Add this
);

dbSchema = `CREATE TABLE IF NOT EXISTS Users (
  id integer NOT NULL PRIMARY KEY,
  login text NOT NULL UNIQUE,
  password text NOT NULL,
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text
);

CREATE TABLE IF NOT EXISTS Blogs (
  id integer NOT NULL PRIMARY KEY,
  user_id integer NOT NULL UNIQUE,
  blog text&nbsp;,
  title text NOT NULL,
  publish_date date,
      FOREIGN KEY (user_id) REFERENCES Users(id)
);`

DB.exec(dbSchema, function(err){
if (err) {
  console.log(err)
}
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
