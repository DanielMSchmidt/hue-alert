#!/usr/bin/env node

const { alert } = require("./index");

alert().then(
  () => {
    console.log("Alerted");
  },
  (e) => {
    console.error("Error alerting", e);
  }
);
