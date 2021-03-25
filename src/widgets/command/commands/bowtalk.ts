import CommandBuilder from "../classes/CommandBuilder";
import axios from "axios";

module.exports = new CommandBuilder()
  .setAliases(["bowtalk", "talk","talkbout", "talkabout"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    if(args.length==0){
      let res=await axios.get("https://j2c7f6d6.rocketcdn.me/wp-content/tools/topicgenerator/topics.txt")
      const topics=res.data.split("\r\n");
      message.channel.send(`**${topics[Math.floor(Math.random()*topics.length)]}** <:doge:824583822502133780>`)
    }
  });
