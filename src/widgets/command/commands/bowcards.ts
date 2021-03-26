import CommandBuilder from "../classes/CommandBuilder";
const {MessageEmbed}=require("discord.js");
import axios from "axios";

module.exports = new CommandBuilder()
  .setAliases(["bowcards","trump","cards"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    if(args.length<=0){
      let embed=new MessageEmbed()
        .setTitle("Bow Cards!")
        .setDescription(`Use the command \`.bowcards new\` to start a new deck!`)
        .setColor("#d6a844")
      message.channel.send(embed);
    }
    if(args[0]=="new" || args[0]=="shuffle" || args[0]=="newdeck" || args[0]=="deck"){
      let res= await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      let embed=new MessageEmbed()
        .setTitle("You suffled a new deck of cards")
        .setDescription(`Your deck-id is **\`${res.data.deck_id}\`**, use it for future draws\nRemaining : **\`${res.data.remaining}\`**`)
        .setColor("#d6a844")
        .setFooter("type `.bowcards draw <deck_id>` to draw a card!")
      message.channel.send(embed);
    }
    if(args[0]=="draw" && args.length>=2){
      let res= await axios.get(`https://deckofcardsapi.com/api/deck/${args[1]}/draw/`);
      if(res.data.remaining>0){
        let embed=new MessageEmbed()
          .setTitle(`You drawn a/an ${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
          .addField("Deck-ID",res.data.deck_id)
          .addField("Remaining",res.data.remaining)
          .setImage(res.data.cards[0].image)
          .setColor("#d6a844")
          .setFooter("type `.bowcards draw <deck_id>` to draw a card!")
        message.channel.send(embed);
      }
      else{
        let embed=new MessageEmbed()
          .setTitle(`Not enough cards are remaining to draw from deck-${res.data.deck_id}`)
          .addField("Deck-ID",res.data.deck_id)
          .addField("Remaining",res.data.remaining)
          .setColor("#d6a844")
          .setFooter("Use the command \`.bowcards new\` for start a new deck!")
        message.channel.send(embed);
      }
    }
  });
