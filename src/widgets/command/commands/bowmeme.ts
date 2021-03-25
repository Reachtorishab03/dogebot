import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");
import axios from "axios";

module.exports = new CommandBuilder()
  .setAliases(["bowmeme","meme"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
      let res= await axios.get("https://meme-api.herokuapp.com/gimme");
      let embed=new MessageEmbed()
        .setTitle(res.data.title)
        .setImage(res.data.url)
        .setColor("#d6a844")
        .setFooter("by "+res.data.author)
      message.channel.send(embed);
  });
