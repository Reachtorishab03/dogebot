import CommandBuilder from "../classes/CommandBuilder";

module.exports = new CommandBuilder()
  .setAliases(["l","leave","exit","stop"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    message.channel.startTyping();

        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel){
            return message.channel.send("Bow! Doge needs you to be in the Voice Channel to stop the music!");
        }

        try{
            await voiceChannel.leave();
            await message.channel.send("Hope you had a great time with Me 👋!");
        } catch (e){
            message.channel.send("Bow! I'm having trouble in leaving the Voice Channel.")
        }
        
        message.channel.stopTyping();
  });
