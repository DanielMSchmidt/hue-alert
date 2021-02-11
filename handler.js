"use strict";

const { alert, setup } = require("./index");

module.exports = async (event, context) => {
  const body = event.body;
  console.log({ event, context });
  try {
    switch (body.type) {
      case "setup":
        await setup();
      case "alert":
        await alert();
      default:
        throw new Error("Command not found: " + body.type);
    }

    return context
      .status(200)
      .succeed({ body: JSON.stringify({ done: true }) });
  } catch (e) {
    return context.status(500).succeed({
      body: JSON.stringify({ type: "alert", done: false, error: e }),
    });
  }
};
