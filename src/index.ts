import dotenv from "dotenv"; 
dotenv.config();
import { Client } from "discord.js";

const client = new Client();

require("./core/loadWidgetListeners")(client);

client.login(process.env.DISCORD_BOT_TOKEN);
