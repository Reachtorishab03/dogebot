import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");
import axios from "axios";

module.exports = new CommandBuilder()
  .setAliases(["calc"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    if(args.length>0){
      var eq=args.join("")
      for(let i=0;i<eq.length;i++){
        eq=eq.replace(" ","")
      }
      let res= await axios.get("https://api.mathjs.org/v4/?expr="+eq);
      let embed=new MessageEmbed()
        .setTitle("Result")
        .setDescription(res.data)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
  });
