import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");
import axios from "axios";

module.exports = new CommandBuilder()
  .setAliases(["isthisforthat","thisforthat","itft","tft"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
      let res= await axios.get("http://itsthisforthat.com/api.php?json");
      let embed=new MessageEmbed()
        .setTitle("Wait, what does your startup do?")
        .setDescription(`So, basically, it's like a ${res.data.this} for ${res.data.that}`)
        .setColor("#d6a844")
      message.channel.send(embed);
  });
