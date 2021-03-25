import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");
import axios from "axios";

module.exports = new CommandBuilder()
  .setAliases(["dog", "doge","dogs"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    const breeds={
      "chihuahua":"chihuahua",
      "shiba":"shiba",
      "dachshund":"dachshund",
      "husky":"husky",
      "pitbull":"pitbull",
      "pug":"pug",
      "chow":"chow",
      "beagle":"beagle",
      "bulldog":"bulldog",
      "doberman":"doberman"
    }
    if(args.length==0){
      let res=await axios.get("https://dog.ceo/api/breeds/image/random")
      let embed=new MessageEmbed()
        .setImage(`${res.data.message}`)
        .setColor("#d6a844")
        .setFooter("Powered by dog.ceo")
      message.channel.send(embed);
    }
    if(args.length>0){
      if(args[0].toLowerCase()=="breeds" || args[0].toLowerCase=="breed"){
        let embed=new MessageEmbed()
          .setDescription(`${Object.keys(breeds).join("\n")}`)
          .setColor("#d6a844")
          .setFooter("Powered by dog.ceo")
        message.channel.send(embed);
      }
      else{
        let res=await axios.get(`https://dog.ceo/api/breed/${breeds[args[0].toLowerCase()]}/images/random`)
        let embed=new MessageEmbed()
          .setImage(`${res.data.message}`)
          .setColor("#d6a844")
          .setFooter("Powered by dog.ceo")
        message.channel.send(embed);
      }
    }
  });
