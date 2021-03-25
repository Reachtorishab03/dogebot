import CommandBuilder from "../classes/CommandBuilder";

module.exports = new CommandBuilder()
  .setAliases(["bowsay", "say","bow"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(0)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    message.delete();
    await message.channel.send(args.join(" "));
  });
