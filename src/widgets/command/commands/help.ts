import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");

const help={
  "fun":{
    "bowtalk":"get random topics to start up your conversations.",
    "bowsay":"afraid to say it yourself? make doge say it out!",
    "bowcards":"Who doesn't love to play with cards! Try it, feel free to make up some cool game of cards using it",
    "bowmeme":"Who doesn't love memes! Try it out.",
    "isthisforthat":"Need some quirky ideas for startup? Type it down fast then <:doge:824583822502133780>",
    "embed":"Put text that you specify inside an embed",
    "dog":"Shows random cute images of dog from dog.ceo",
  },
  "info":{
    "avatar":"Get a bigger image of a user's avatar, don't embarass them though.",
    "help":"Provides you with the command list",
    "userinfo":"Shows information about you or the specified user",
    "ping":"Show's Doge's latency to Discord's API, hard words eh? I dont understand either.",
  },
  "utility":{
    "calc":"Does all the maths for you"
  }
}

function isCategoryValid(arg){
  const arr=Object.keys(help);
  if(arr.includes(arg)){
    return true;
  }
  return false;
}

function isCmdValid(arg,cmd){
  const arr=Object.keys(arg);
  if(arr.includes(cmd)){
    return true;
  }
  return false;
}

module.exports = new CommandBuilder()
  .setAliases(["help"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    if(args.length==0){
      const embed=new MessageEmbed();
      embed.addField(":tada: Fun",`\`${Object.keys(help.fun).join("`, `")}\``)
      embed.addField(":information_source: Info",`\`${Object.keys(help.info).join("`, `")}\``)
      embed.addField(":wrench: Utility",`\`${Object.keys(help.utility).join("`, `")}\``)
      embed.setColor("#d6a844")
      embed.setFooter("To get more info on a command, do .help category.command eg:`.help fun.bowtalk`")
      message.channel.send(embed)
    }
    if(args.length>0){
      const arg=args[0].split(".");
      const category=arg[0];
      const cmd=arg[1];
      console.log(category,cmd,isCategoryValid(category), isCmdValid(help[category],cmd))
      if(isCategoryValid(category) && isCmdValid(help[category],cmd)){
        const embed=new MessageEmbed();
        embed.setTitle(cmd);
        embed.setDescription(help[category][cmd]);
        embed.setColor("#d6a844");
        message.channel.send(embed);
    }
    }
  });
