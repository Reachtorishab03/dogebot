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
      console.log(message.author)
      let embed=new MessageEmbed()
        .setAuthor(`${message.author.username}`,`${message.author.avatarURL()}`)
        .setImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
    if(args.length>0){
      console.log(args[0],args[0].substring(3,(args[0].length)-1))
      const usr=client.users.cache.get(args[0].substring(2,(args[0].length)-1))
      console.log(usr);
      let embed=new MessageEmbed()
        .setAuthor(`${usr.username}`,`${usr.displayAvatarURL()}`)
        .setImage(`https://cdn.discordapp.com/avatars/${usr.id}/${usr.avatar}.png?size=1024`)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
  });
