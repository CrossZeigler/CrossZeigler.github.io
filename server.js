// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import countries from './public/lab_6/countries.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
