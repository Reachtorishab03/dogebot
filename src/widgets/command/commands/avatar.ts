import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");
import client from "../../../index";

module.exports = new CommandBuilder()
  .setAliases(["avatar","av","pfp"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    if(args.length==0){
      let embed=new MessageEmbed()
        .setAuthor(`${message.author.username}`,`${message.author.avatarURL()}`)
        .setImage(`${message.author.avatarURL()}`)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
    if(args.length>0){
      console.log(args[0],args[0].substring(2,(args[0].length)-2))
      const usr=client.users.cache.get(args[0].substring(2,(args[0].length)-1))
      let embed=new MessageEmbed()
        .setAuthor(`${usr.username}`,`${usr.displayAvatarURL()}`)
        .setImage(`${usr.displayAvatarURL()}`)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
  });
