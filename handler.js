"use strict";

const { alert, setup } = require("./index");

module.exports = async (event, context) => {
  const body = event.body;
  try {
    switch (body.type) {
      case "alert":
        await alert();
        return context
          .status(200)
          .succeed({ body: JSON.stringify({ done: true }) });
      default:
        throw new Error("Command not found: " + body.type);
    }
  } catch (e) {
    return context.status(500).succeed({
      body: JSON.stringify({ type: "alert", done: false, error: e }),
    });
  }
};
