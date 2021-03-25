import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");
import client from "../../../index";

module.exports = new CommandBuilder()
  .setAliases(["userinfo","info","whois"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    if(args.length==0){
      //const guildRoles=[]
      const usrRoles=[]
      /*message.guild.roles.cache.forEach(role => {
        guildRoles.push(role.id)
      });
      */
      const usr=message.guild.member(message.author)
      message.member.roles.cache.find(r=> {
        if(r.name=="@everyone"){
          usrRoles.push("@everyone")
        }
        else{
          usrRoles.push("<@&"+r.id+">")
        }
      })
      if(usrRoles.length==0){
        usrRoles.push("None")
      }
      console.log(usrRoles)
      let embed=new MessageEmbed()
        .setAuthor(`${message.author.tag}`,`${message.author.avatarURL()}`)
        .setDescription(`<@${message.author.id}>`)
        .addField("ID",`${message.author.id}`)
        .addField("Nickname",`${message.author.username}`)
        .addField("Roles",`${usrRoles.join(", ")}`)
        .addField("Joined Server On",`${usr.joinedAt}`)
        .addField("Account Created On",`${usr.user.createdAt}`)
        .setThumbnail(`${message.author.avatarURL()}`)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
    if(args.length>0){
      var usr=client.users.cache.get(args[0].substring(2,(args[0].length)-1))
      var usrref=message.guild.member(usr)
      const usrRoles=[]
      console.log(usrref.user.roles);
      usrref.roles.cache.map(r=> {
        if(r.name=="@everyone"){
          usrRoles.push("@everyone")
        }
        else{
          usrRoles.push("<@&"+r+">")
        }
      })

      if(usrRoles.length==0){
        usrRoles.push("None")
      }

      let embed=new MessageEmbed()
        .setAuthor(`${usr.tag}`,`${usr.displayAvatarURL()}`)
        .setDescription(`<@${usr.id}>`)
        .addField("ID",`${usr.id}`)
        .addField("Nickname",`${usr.username}`)
        .addField("Roles",`${usrRoles.join(", ")}`)
        .addField("Joined Server On",`${usrref.joinedAt}`)
        .addField("Account Created On",`${usr.createdAt}`)
        .setThumbnail(`${usr.displayAvatarURL()}`)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
  });
