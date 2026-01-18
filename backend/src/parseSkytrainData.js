// import express from "express";
import commute from "./commute.js";

export const router = express.Router();

const fs = require("fs");
const path = require("path");
const data = path.join(__dirname, "../data/skytrain-stations.json");

function loadSkytrainStations() {
  const raw = fs.readFileSync(data, "utf-8");
  const parsed = JSON.parse(raw);
  return parsed;
}

router.get("/", (res) => {
  res.json(loadSkytrainStations());
});

const stations = loadSkytrainStations();

function findDistance(station_x, station_y) {
  const x = stations.find(station => station.name === station_x);
  const y = stations.find(station => station.name === station_y);

  if (x && y) {
    return commute.computeDistance(x.lat, x.lng, y.lat, y.lng);
  } else {
    console.error("One or both stations not found");
    return null;
  }
}

module.exports = {
  getSkytrainStations: () => stations
};
