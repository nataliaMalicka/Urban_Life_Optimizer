import fs from "fs";
import express from "express";

export const router = express.Router();

const data = '../data/dog-off-leash-parks.json'

function loadDogParks() {
  const raw = fs.readFileSync(data, "utf-8");
  const parks = JSON.parse(raw);

  console.log(parks)
  
  return parks;
}

router.get("/", (res) => {
  res.json(loadDogParks());
});
