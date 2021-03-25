import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");

module.exports = new CommandBuilder()
  .setAliases(["embed"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    let embed=new MessageEmbed()
      .setAuthor(`${message.author.username}`,`${message.author.avatarURL()}`)
      .setDescription(`${args.join(" ")}`)
      .setColor("#d6a844")
    message.delete();
    message.channel.send(embed);
  });
