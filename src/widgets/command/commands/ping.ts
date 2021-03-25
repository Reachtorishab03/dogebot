import CommandBuilder from "../classes/CommandBuilder";

module.exports = new CommandBuilder()
  .setAliases(["p", "pong","ping"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    await message.channel.send(`<:doge:824583822502133780> Bow! ${Math.round(message.client.ws.ping)} ms`);
  });
