require("dotenv").config();
const { Client } = require("discord.js");

const client = new Client();
const express = require("express");

client.on("message", (msg) => {
  client.user.setActivity("with Cats", {
    type: "PLAYING",
  });
});

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

require("./core/loadWidgetListeners")(client);

client.login(process.env.DISCORD_BOT_TOKEN);
