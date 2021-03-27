import CommandBuilder from "../classes/CommandBuilder";
import ytdl from "ytdl-core";
import ytSearch from "yt-search";
const {MessageEmbed}=require("discord.js");

module.exports = new CommandBuilder()
  .setAliases(["play"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send("Bow! I'am scared of being alone in a Voice Channel! Please join a Voice Channel before executing this command <:doge:824583822502133780>.");
        }

        //Check if Mr.Hooman has all the necessary perms
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send("Bow! I he dont have the CONNECT permissions <:doge:824583822502133780>");
        } if (!permissions.has('SPEAK')) {
            return message.channel.send("Bow! I can't SPEAK in the Voice Channel <:doge:824583822502133780>.");
        } if (!args.length) {
            return message.channel.send("Bow! I can't read your mind! So add in a query after the PLAY Command!")
        }

        //Typing indicator
        message.channel.startTyping();

        //Playing by given URL
        if (ytdl.validateURL(args[0])) {
            try {
                const connection = await voiceChannel.join();
                const stream = ytdl(args[0], { filter: 'audioonly' });

                connection.play(stream, { seek: 0, volume: 1 })
                    .on('finish', () => {
                        voiceChannel.leave();
                        message.channel.send('leaving channel');
                    });

                var info = await ytdl.getInfo(args[0]);
                console.log(info.videoDetails);
                //await message.channel.send(`:thumbsup: Now Playing ***${info.videoDetails.title}***`)
                let embed=await new MessageEmbed()
                  .setTitle("Now Playing")
                  .setDescription(`[${info.videoDetails.title}](${info.videoDetails.video_url}) \n\nRequested By : <@${message.author.id}>`)
                  .setFooter("type `.play <song_name/url>` to play ur favourite songs!")
                  .setColor("#d6a844")
                  .setThumbnail(info.videoDetails.thumbnails[0].url)
                await message.channel.send(embed);
            } catch (e) {
                console.log(e)
                message.channel.send("Bow! I'am having trouble playing the music. Please contact my therapist! <:doge:824583822502133780>");
            } finally {
                message.channel.stopTyping();
                return;
            }
        }

        //Play by searching through a query
        try {
            const connection = await voiceChannel.join();
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(' '));

            if (video) {
                const stream = ytdl(video.url, { filter: 'audioonly' });
                connection.play(stream, { seek: 0, volume: 1 })
                    .on('finish', () => {
                        voiceChannel.leave();
                    });
                //await message.reply(`👍 Now Playing ***${video.title}***`);
                console.log(video);
                let embed=await new MessageEmbed()
                  .setTitle("Now Playing")
                  .setDescription(`[${video.title}](${video.url}) \`${video.duration.timestamp}\`\n\nRequested By : <@${message.author.id}>`)
                  .setFooter("type `.play <song_name/url>` to play ur favourite songs!")
                  .setColor("#d6a844")
                  .setThumbnail(video.thumbnail)
                await message.channel.send(embed)
            } else {
                message.channel.send("Bow! I couldn't find any video <:doge:824583822502133780>");
            }
        } catch (e) {
            console.log(e);
            message.channel.send("Bow! I'm having trouble playing the music. Please contact my therapist! <:doge:824583822502133780>");
        } finally {
            message.channel.stopTyping();
            return;
        }
  });
