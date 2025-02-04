require("dotenv").config();
const token = process.env.token;
const mongoPath = process.env.mongoPath;
const mongoose = require("mongoose");
const background = "./assets/background.jpg";
const youtube = process.env.youtube;
const botname = process.env.botname;
const colors = require("colors");
const fetch = require("node-fetch");
const logger = require("./logger");
const { red, green, blue, yellow, cyan } = require('colors');
const ascii = require("ascii-table");
const { Captcha } = require("captcha-canvas");
const captchaSchema = require("./schemas/captcha");

const giveawaySchema = require("./schemas/giveaways");



const buttonrr = require("./schemas/buttonrr");

const antiraid = require("./schemas/antiraid");
const ownerID = process.env.ownerid;
const { format } = require("./functions2");
const axios = require("axios");
const counterSchema = require("./schemas/count");
const Discord = require("discord.js");
const path = require("path");
const nsfwschema = require("./schemas/nsfw");

const { GiveawaysManager } = require("discord-giveaways");
const deepai = require("deepai");
const banner = "./assets/bot_long_banner.png";
require("dotenv").config();
const nsfwtoken = process.env.nsfw;
deepai.setApiKey(nsfwtoken);
const starboardSchema = require("./schemas/starboard");
const client = new Discord.Client({
  partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
  },
  restTimeOffset: 0,
});


const fs = require("fs");
const afk = new Discord.Collection();
const antiscam = require("./schemas/antiscam");
const unsafe = require("./unsafe.json");
const moment = require("moment");
const Levels = require("discord-xp");
const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);



const welcomeMessage = require('./schemas/welcomeMessage')



const { VoiceClient } = require("djs-voice");

const voiceClient = new VoiceClient({
  allowBots: false,
  client: client,
  debug: false,
  mongooseConnectionString: mongoPath,
});

const Dashboard = require("discord-easy-dashboard");

const dashboard = new Dashboard(client, {
  name: "NecroAtomicBot",
  description:
    "A powerful discord bot that allows for secure moderation of discord servers, while also providing other features such as music and utility commands",
  serverUrl: "https://discord.gg/jY8Esuxfh9",
  secret: process.env.secret,
});

client.dashboard = dashboard;

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return await giveawaySchema.find().lean().exec();
  }

  async saveGiveaway(messageId, giveawayData) {
    await giveawaySchema.create(giveawayData);

    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await giveawaySchema
      .updateOne({ messageId }, giveawayData, { omitUndefined: true })
      .exec();

    return true;
  }

  async deleteGiveaway(messageId) {
    await giveawaySchema.deleteOne({ messageId }).exec();

    return true;
  }
};

const manager = new GiveawaysManager(client, {
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    embedColorEnd: "#000000",
    reaction: "🎉",
  },
});

client.giveawaysManager = manager;

client.vcclient = voiceClient;
Levels.setURL(mongoPath);

const afkschema = require("./schemas/afk");

client.snipes = new Discord.Collection();
const Canvas = require("canvas");

const Schema = require("./schemas/welcomeChannel");
const guildSchema = require("./schemas/Guilds");

const ms = require("ms");
const altschema = require("./schemas/anti-alt");
const { DiscordTogether } = require("discord-together");
client.discordTogether = new DiscordTogether(client, {
  token: token,
});
const rpctoken = process.env.rpc;
const RPC = require("discord-rpc");
const rpc = new RPC.Client({ transport: "ipc" });

const countSchema = require("./schemas/member-count");
const autoroleschema = require("./schemas/autorole");
const blacklistserver = require("./schemas/blacklist-server");
const inviteschema = require("./schemas/anti-invite");
const blacklistedWords = new Discord.Collection();
const ghostpingschema = require("./schemas/ghostping");
const Pings = new Discord.Collection();
const chatschema = require("./schemas/chatbot-channel");
const muteschema = require("./schemas/mute");
const blacklistSchema = require("./schemas/blacklist");
const starboardcollection = new Discord.Collection();
client.slashCommands = new Discord.Collection();

module.exports = { blacklistedWords, afk, starboardcollection };
const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: true,
  deafenOnJoin: true,
  timeout: 60000,
  volume: 100,
});

client.player = player;

client.color = require('./colors.json')

player
  .on("channelEmpty", async (queue) => {
    queue.connection.leave();
    queue.data.channel.send("Left Channel as no one was with me");
  })
  .on("queueDestroyed", async (queue) => {
    queue.connection.leave();
  })
  .on('clientDisconnect',(queue) =>{
    queue.connection.leave();
  })
  .on("songFirst", async(queue, song) => {

   if(song.isFirst){
    if(song.name.includes("Official Video") || song.name.includes("Official Music Video") || song.name.includes("Official Audio")){
      const newname = song.name.replace("(Official Video)", "") || song.name.replace("(Official Music Video)", "") || song.name.replace("(Official Audio)", "")

        const embed = new Discord.MessageEmbed()
          .setColor(client.color.invis)
          .setTitle('**Now Playing**')
          .addField("Song Name: ", newname)
          .addField("Song Duration", song.duration, false)
          .setThumbnail(song.thumbnail)
          .setTimestamp()
        await queue.data.channel.send({embeds:[embed]})
    }
  

    else{

      const embed = new Discord.MessageEmbed()
        .setColor(client.color.invis)
        .addField("Song Name: ", song.name)
        .setTitle('**Now Playing**')
        .addField("Song Duration", song.duration, false)
        .setThumbnail(song.thumbnail)
        .setTimestamp()
      queue.data.channel.send({embeds:[embed]})
    }
  }
    
  })
  .on("playlist", async (raw, queue,requestedBy) => {
    const embed = new Discord.MessageEmbed()
      .setColor(client.color.invis)
      .setTitle('**Playlist Added**')
      .addField("Playlist Name: ", raw.name)
      .addField('Number of Songs', raw.songs)
      .addField("Song Duration", raw.duration, false)
      .setThumbnail(raw.thumbnail)
      .setTimestamp()
    await queue.data.channel.send({embeds:[embed]})

  })
  .on("songAdd", async(queue, song) => {

  if(!song.isFirst){
    if(song.name.includes("Official Video") || song.name.includes("Official Music Video") || song.name.includes("Official Audio")){
      const newname = song.name.replace("(Official Video)", "") ||song.name.replace("(Official Music Video)", "") || song.name.replace("(Official Audio)", "")

        const embed = new Discord.MessageEmbed()
        .setColor(client.color.invis)
        .setTitle('**Added Song to Queue**')
        .addField("Song Name: ", newname)
        .addField("Song Duration", song.duration, false)
        .setThumbnail(song.thumbnail)
        .setTimestamp()
        await queue.data.channel.send({embeds:[embed]})
    }

    else{
      const embed = new Discord.MessageEmbed()
        .setColor(client.color.invis)
        .addField("Song Name: ", song.name)
        .setTitle('**Added Song to Queue**')
        .addField("Song Duration", song.duration, false)
        .setThumbnail(song.thumbnail)
        .setTimestamp()
        await queue.data.channel.send({embeds:[embed]})
    }
    }
  })


client.commands = new Discord.Collection();

client.embed = async (message, options) => {
  const embed = new Discord.MessageEmbed(options);
  message.channel.send({ embeds: [embed] });
};

client.on("ready", async () => {
  console.log(botname);

  const loading = String.raw`
  __         ______   __    __  __    __   ______   __    __  ______  __    __   ______  
 /  |       /      \ /  |  /  |/  \  /  | /      \ /  |  /  |/      |/  \  /  | /      \ 
 $$ |      /$$$$$$  |$$ |  $$ |$$  \ $$ |/$$$$$$  |$$ |  $$ |$$$$$$/ $$  \ $$ |/$$$$$$  |
 $$ |      $$ |__$$ |$$ |  $$ |$$$  \$$ |$$ |  $$/ $$ |__$$ |  $$ |  $$$  \$$ |$$ | _$$/ 
 $$ |      $$    $$ |$$ |  $$ |$$$$  $$ |$$ |      $$    $$ |  $$ |  $$$$  $$ |$$ |/    |
 $$ |      $$$$$$$$ |$$ |  $$ |$$ $$ $$ |$$ |   __ $$$$$$$$ |  $$ |  $$ $$ $$ |$$ |$$$$ |
 $$ |_____ $$ |  $$ |$$ \__$$ |$$ |$$$$ |$$ \__/  |$$ |  $$ | _$$ |_ $$ |$$$$ |$$ \__$$ |
 $$       |$$ |  $$ |$$    $$/ $$ | $$$ |$$    $$/ $$ |  $$ |/ $$   |$$ | $$$ |$$    $$/ 
 $$$$$$$$/ $$/   $$/  $$$$$$/  $$/   $$/  $$$$$$/  $$/   $$/ $$$$$$/ $$/   $$/  $$$$$$/  
                                                                                                                                                                                      
`;
  try {
    let slash = [];
    let table = new ascii("Slash commands");
    console.log("Slash Commands Loaded");
    console.log(red(`Starting ${client.user.tag}, hold on ...`))
    console.log(red(loading))
    const prefix = "!necro";
    console.log(``);
    console.log(green(`                                                    An Ok Bot`));
    console.log(``);
    console.log(``);
    console.log(yellow('               + ================================================================================== +'));
    console.log(cyan(`                                [i] :: ${prefix} help                :: Displays commands.                   `));
    console.log(cyan(`                                [i] :: ${prefix} ping                :: Displays bots ping.                  `));
    console.log(yellow('               + ================================Commands========================================== +'));
    console.log(cyan(`                       Author   [i] :: Programmed by [Arihant Tripathi]    :: © 2021 Necro Development                   `));
    console.log(cyan(`                       Bot info [i] :: Status                       :: ✅ Online                           `));
    console.log(cyan(`                       Users    [i] ::                              :: ${client.users.cache.size}  Users   `));
    console.log(cyan(`                       Guilds   [i] ::                              :: ${client.guilds.cache.size} Guilds  `));


    
console.log(red("Press [CTRL + C] to stop the Terminal ..."))
    fs.readdirSync("./slashcmd/").forEach((dir) => {
      const commands = fs
        .readdirSync(`./slashcmd/${dir}/`)
        .filter((file) => file.endsWith(".js"));

      for (let file of commands) {
        let pull = require(`./slashcmd/${dir}/${file}`);

        if (pull.name) {
          client.slashCommands.set(pull.name, pull);
          slash.push(pull);
          table.addRow(file, "✅");
        } else {
          table.addRow(file, `❌  -> missing command parameters`);
          continue;
        }
      }
    });
    console.log(table.toString());
    client.slashCommands.forEach((command) => {
      client.dashboard.registerCommand(command.name, command.description);
    });

    await client.application.commands.set(slash);
  } catch (error) {
    console.log(error);
  }

  await mongoose
    .connect(mongoPath, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
    })
    .then(console.log("Connected to Mongo"));

  if (!mongoPath) return;

  blacklistSchema.find().then((data) => {
    data.forEach((val) => {
      blacklistedWords.set(val.Guild, val.Words);
    });
  });
  setInterval(() => {
    countSchema.find().then((data) => {
      if (!data && !data.length) return;
      data.forEach((value) => {
        const guild = client.guilds.cache.get(value.Guild);
        const memberCount = guild.memberCount;
        if (value.Member != memberCount) {
          const channel = guild.channels.cache.get(value.Channel);

          channel.setName(`Members: ${memberCount}`);

          value.Member = memberCount;
          value.save();
        }
      });
    });
  }, ms("15 Minutes"));

  const arrayOfStatus = [
    `Multi-Purpose Bot`,
    `Watching Over Everyone`,
    `run !necro`,
    "/help for slash commands",
  ];

  let index = 0;
  setInterval(() => {
    if (index == arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    client.user.setActivity('Helping Out', { type: 'WATCHING' });
    client.user.setPresence({ activities: [{ name: status }], status: 'dnd' });
    index++;
  }, 5000);
});

client.once("disconnect", () => {
  console.log("Disconnect");
});

// rpc.on('ready', () => {
//     rpc.setActivity({
//         details: 'Working',
//         state: 'Working on stuff',
//         startTimestamp: new Date(),
//         largeImageKey: 'large-key',
//         largeImageText: 'Grind Season',
//         smallImageKey: 'small-key',
//         smallImageText: 'Chilling',
//         buttons: [{label : 'Github', url : 'https://github.com/Siris2314'},{label : 'Invite My Bot', url : 'https://dsc.gg/necroatomic'}]
//     });

//     console.log('RPC online');
// });

// rpc.login({
//     clientId: rpctoken
// });

var welcome = {};
welcome.create = Canvas.createCanvas(1024, 500);
welcome.context = welcome.create.getContext("2d");
welcome.context.font = "72px sans-serif";
welcome.context.fillStyle = "#ffffff";

Canvas.loadImage("./assets/background.jpg").then(async (img) => {
  welcome.context.drawImage(img, 0, 0, 1024, 500);
  welcome.context.fillText("Welcome", 360, 360);
  welcome.context.beginPath();
  welcome.context.arc(512, 166, 128, 0, Math.PI * 2, true);
  welcome.context.fill();
});

// process.on("unhandledRejection", (reason, p) => {
//     console.log(" [antiCrash] :: Unhandled Rejection/Catch");
//     // console.log(reason, p);
// });
// process.on("uncaughtException", (err, origin) => {
//     console.log(" [antiCrash] :: Uncaught Exception/Catch");
//     // console.log(err, origin);
// });
// process.on("uncaughtExceptionMonitor", (err, origin) => {
//     console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
//     // console.log(err, origin);
// });
// process.on("multipleResolves", (type, promise, reason) => {
//     console.log(" [antiCrash] :: Multiple Resolves");
//     // console.log(type, promise, reason);
// });

client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) {
    return;
  }

  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (message.content.startsWith(":") && message.content.endsWith(":")) {
    let emojis = message.content.match(/(?<=:)([^:\s]+)(?=:)/g);
    if (!emojis) return;
    emojis.forEach((m) => {
      let emoji = client.emojis.cache.find((x) => x.name === m);
      if (!emoji) return;
      let temp = emoji.toString();
      if (new RegExp(temp, "g").test(message.content))
        message.content = message.content.replace(
          new RegExp(temp, "g"),
          emoji.toString()
        );
      else
        message.content = message.content.replace(
          new RegExp(":" + m + ":", "g"),
          emoji.toString()
        );
    });

    let webhook = await message.channel.fetchWebhooks();
    let number = randomNumber(1, 2);
    webhook = webhook.find((x) => x.name === "NQN" + number);

    if (!webhook) {
      webhook = await message.channel.createWebhook(`NQN` + number, {
        avatar: client.user.displayAvatarURL({ dynamic: true }),
      });
    }

    await webhook.edit({
      name: message.member.nickname
        ? message.member.nickname
        : message.author.username,
      avatar: message.author.displayAvatarURL({ dynamic: true }),
    });

    message.delete().catch((err) => {});
    webhook.send(message.content).catch((err) => {});

    await webhook.edit({
      name: `NQN` + number,
      avatar: client.user.displayAvatarURL({ dynamic: true }),
    });
  }

  const randomXP = Math.floor(Math.random() * 29) + 1;
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXP
  );

  if (
    message.content.includes("https://twitter.com/") &&
    message.guild.id === "684462232679219242"
  ) {
    message.delete();
    let str = message.content.replace("https://twitter.com/", "");
    let newstr = `https://fxtwitter.com/${str}`;

    message.channel.send({ content: newstr });
  }

  await antiscam.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return;

    const punishment = String(data.Punishment);
    unsafe.forEach(async (item) => {
      if (message.content === item || message.content.startsWith(item)) {
        message.delete();
        const Member = await message.guild.members.fetch(message.author.id);
        message.channel.send(`Scam link sent by ${message.author.username}`);

        if (punishment === "mute") {
          const role = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === "muted"
          );
          if (!role) {
            try {
              message.channel.send({
                content:
                  "Muted role is not found, attempting to create muted role.",
              });

              let muterole = await message.guild.roles.create({
                data: {
                  name: "muted",
                  permissions: [],
                },
              });
              message.guild.channels.cache
                .filter((c) => c.type === "text")
                .forEach(async (channel, id) => {
                  await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                  });
                });
              message.channel.send({
                content: "Muted role has sucessfully been created.",
              });
            } catch (error) {
              console.log(error);
            }
          }
          let role2 = message.guild.roles.cache.find(
            (r) => r.name.toLowerCase() === "muted"
          );
          if (Member.roles.cache.has(role2.id))
            return message.channel.send({
              content: `${Member.displayName} has already been muted.`,
            });
          await Member.roles.add(role2);
        } else if (punishment === "warn") {
          const reason = "Sending Scam Links";
          Member.send({
            embeds: [
              new MessageEmbed()
                .setTitle("You Have Been Warned")
                .setDescription(`${reason}`),
            ],
          });
        } else if (punishment === "ban") {
          Member.ban({ reason: "Sending Scam Links" });
          Member.send({
            embeds: [
              new MessageEmbed()
                .setTitle(`You Have Been Banned from ${message.guild.name}`)
                .setDescription(`Sending Scam Links`),
            ],
          });
        } else if (punishment === "kick") {
          Member.kick({ reason: "Sending Scam Links" });
          Member.send({
            embeds: [
              new MessageEmbed()
                .setTitle(`You Have Been Kicked from ${message.guild.name}`)
                .setDescription(`Sending Scam Links`),
            ],
          });
        }
      }
    });
  });

  await inviteschema.findOne(
    { Server: message.guild.id },
    async (err, data) => {
      if (!data) return;
      if (data.Server === message.guild.id) {
        const InviteLinks = [
          "discord.gg/",
          "discord.com/invite/",
          "discordapp.com/invite/",
        ];

        if (
          InviteLinks.some((link) =>
            message.content.toLowerCase().includes(link)
          )
        ) {
          const UserCode = message.content.split(
            "discord.gg/" || "discord.com/invite/" || "discordapp.com/invite/"
          )[1];
          message.guild.fetchInvites().then((invites) => {
            let InviteArray = [];
            for (let inviteCode of invites) {
              InviteArray.push(inviteCode[0]);
            }
            if (!InviteArray.includes(UserCode)) {
              message.delete();
              return message.channel.send({
                content: "Please do not send links to other servers",
              });
            }
          });
        }
      }
    }
  );

  const splittedMsgs = message.content.split(" ");

  let deleting = false;

  await Promise.all(
    splittedMsgs.map((content) => {
      if (
        blacklistedWords.get(message.guild.id)?.includes(content.toLowerCase())
      )
        deleting = true;
    })
  );

  if (deleting) return message.delete();

  await counterSchema.findOne(
    { Guild: message.guild.id },
    async (err, data) => {
      if (data == null) return;
      if (message.channel.id !== data.Channel) return;

      let number = parseInt(message.content);
      let current = parseInt(data.Count);
      if (!isNaN(number)) {
        if (message.author.id == data.UserID) {
          data.Count = 0;
          await data.save();
          message.react("❌");
          data.UserID = null;
          await data.save();
          return message.channel.send({
            content: `${message.author.username} has messed it up, stopped at ${
              number - 1
            } ,resetting game to start at 1`,
          });
        } else {
          if (number == current + 1) {
            data.Count = data.Count + 1;
            data.UserID = message.author.id;
            await data.save();
            message.react("✅");
          } else {
            data.Count = 0;
            data.UserID = null;
            await data.save();
            message.react("❌");
            message.channel.send({
              content: `${message.author.username} has messed it up, stopped at ${current} ,resetting game to start at 1`,
            });
          }
        }
      }
    }
  );

  await ghostpingschema.findOne(
    { Guild: message.guild.id },
    async (err, data) => {
      if (!data || data.Guild == null) return;
      if (!message.mentions.members.first()) return;
      if (message.mentions.members.first().id === message.author.id) return;
      const time = 50000;

      if (message.guild.id === data.Guild) {
        Pings.set(
          `pinged:${message.mentions.members.first().id}`,
          Date.now() + time
        );

        setTimeout(() => {
          Pings.delete(`pinged:${message.mentions.members.first().id}`);
        }, time);
      }
    }
  );

  if (message.attachments.first()) {
    await nsfwschema.findOne(
      { Server: message.guild.id },
      async (err, data) => {
        if (!data || !data.Server == null) return;

        const image = message.attachments.first().url;

        let response = await deepai.callStandardApi("nsfw-detector", {
          image: image,
        });
        const score = response.output.nsfw_score;

        if (score + 0.2 >= 0.5) {
          message.delete();
          message.channel.send({ content: "NO NSFW Images allowed" });
        }
      }
    );
  }

  await chatschema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return;

    if (message.channel.id !== data.Channel) return;

    message.channel.sendTyping();

    fetch(
      `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
        message.content
      )}&botname=${client.user.username}&ownername=EndofLeTime#6747`
    )
      .then((res) => res.json())
      .then((data) => {
        message.reply(`${data.message}`);
      });
  });

  afkschema.findOne(
    { Guild: message.guild.id, Member: message.author.id },
    async (err, data) => {
      if (err) throw err;
      if (data) {
        data.delete();
        const afk = new Discord.MessageEmbed()
          .setTitle("Afk Removed")
          .setDescription(`${message.author.tag} afk has been removed`)
          .setFooter(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp();

        message.channel.send({ embeds: [afk] });
      } else {
        return;
      }
    }
  );

  if (message.mentions.members.first()) {
    afkschema.findOne(
      { Guild: message.guild.id, Member: message.mentions.members.first().id },
      async (err, data) => {
        if (err) throw err;
        if (!data) return;
        if (data) {
          const member = message.guild.members.cache.get(data.Member);
          const afk = new Discord.MessageEmbed()
            .setTitle(`${member.user.tag} is Afk`)
            .setDescription(
              `${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`
            )
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp();

          message.channel.send({ embeds: [afk] });
        } else return;
      }
    );
  }

  const settings = await guildSchema.findOne(
    {
      guildID: message.guild.id,
    },
    (err, guild) => {
      if (err) console.error(err);
      if (!guild) {
        const newGuild = new guildSchema({
          _id: mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          guildName: message.guild.name,
          prefix: process.env.prefix,
        });
        newGuild
          .save()
          .then((result) => console.log(result))
          .catch((err) => console.error(err));

        return message.channel
          .send({
            content:
              "This server was not in our database! We have now added and you should be able to use bot commands.",
          })
          .then((m) => m.delete({ timeout: 10000 }));
      }
    }
  );

  var prefix = "";
  try {
    prefix = settings.prefix || process.env.prefix;
  } catch (err) {
    return message.channel
      .send({
        content:
          "This server was not in our database! We have now added and you should be able to use bot commands.",
      })
      .then((m) => m.delete({ timeout: 10000 }));
  }

  if (!message.content.startsWith(prefix)) return;

  try {
    if (message.mentions.has(client.user.id) && !message.mentions.everyone) {
      client.embed(message, {
        title: `Greetings ${message.author.username}`,
        description: `Your prefix in this server is **${prefix}**\n\n To get started you can do **${prefix} help**\n\n To use slash commands, simply type in /help`,
        color: "BLUE",
        thumbnail: {
          url: message.author.client.user.displayAvatarURL({ dynamic: true }),
        },
        footer: {
          text: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
        },
        timestamp: Date.now(),
      });
    }
  } catch (err) {}

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  var getDirectories = function (src, callback) {
    glob(src + "/**/*", callback);
  };
  getDirectories("./commands", async function (err, res) {
    if (err) {
      console.log(err);
    } else {
      var commandFiles = [];
      commandFiles = res.filter((v, i) => v.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(file);
        client.commands.set(command.name, command);
      }
      if (!client.commands.has(command)) {
        return;
      }
      try {
        client.commands.get(command).execute(message, args, client);
      } catch (error) {
        console.error(error);
        message.reply("Issue loading command");
      }

      if (command) {
        const blacklisted = await blacklistserver.findOne({
          Server: message.guild.id,
        });

        if (blacklisted)
          return message.channel.send({
            content: "Cannot use commands as owner has blacklisted this server",
          });
        const channel = client.channels.cache.get("800421170301501470");

        channel.send(
          `**${message.author.tag}** has used ${command} command in **${message.guild.name}**`
        );
      }
    }
  });
});

client.on("guildMemberAdd", async (member) => {


  await welcomeMessage.findOne({Guild:member.guild.id}, async (err, data)=>{
    if(!data) return;

    const channel = client.channels.cache.get(data.Channel);
    const rulesChannel = client.channels.cache.get(data.RulesChannel);
    const rolesChannel = client.channels.cache.get(data.RolesChannel);
    const modTag = member.guild.roles.cache.get(data.ModeratorTag);
    const adminTag = member.guild.roles.cache.get(data.AdminTag);



    if(channel != null){

      await channel.send({content: `Hello ${member.user.username} and welcome to ${member.guild.name}! Be sure to read ${rulesChannel} and click on 🌱 at the bottom left to access the rest of the server. Then head over to ${rolesChannel} and tag yourself with the games you play. If you have any questions, please message ${adminTag} or our mods ${modTag}. Enjoy your times among the Beans!`})
     
    }
    


  })



  await captchaSchema.findOne({ Guild: member.guild.id }, async (err, data) => {

    if (!data) return;

    const captcha = new Captcha();
    captcha.async = true;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha();

    const attachment = new Discord.MessageAttachment(
      await captcha.png,
      "captcha.png"
    );

    const msg = await member.send({
      files: [attachment],
      content:
        "Please answer the following Captcha to make sure you are not a bot",
    });


    const role = member.guild.roles.cache.get(data.Role);

    const filter = (message) => {
      if (message.author.id !== member.id) return;
      if (message.content == captcha.text) return true;
      else member.send(`:x: Wrong Captcha Answer`);
    };

    const collector = await msg.channel.awaitMessages({
      filter,
      max: 1,
      time: 60000,
      errors: ["time"],
    });

    if (collector) {
      member.roles.add(role);
      member.send(`Thank you for verifying, welcome to ${member.guild.name}`);
    }
  });
  Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
    if (!data) return;
    const user = member.user;

    let canvas = welcome;
    (canvas.context.font = "42px sans-serif"),
      (canvas.context.textAlign = "center"),
      canvas.context.fillText(user.username, 512, 410);
    canvas.context.font = "32px sans-serif";
    canvas.context.fillText(
      `The ${member.guild.memberCount}th member to join this server`,
      512,
      455
    );
    canvas.context.beginPath();
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
    canvas.context.closePath();
    canvas.context.clip();
    await Canvas.loadImage(
      user.displayAvatarURL({ dynamic: false, format: "png", size: 1024 })
    ).then((img) => {
      canvas.context.drawImage(img, 393, 47, 238, 238);
    });

    let image = new Discord.MessageAttachment(
      canvas.create.toBuffer(),
      `Welcome.png`
    );

    try {
      const channel = client.channels.cache.get(data.Channel);
      channel.send({ files: [image] });
    } catch (err) {
      console.log(err);
    }
  });

  const data = await muteschema.findOne({ Guild: member.guild.id });
  if (!data) return;
  const user = data.Users.findIndex((prop) => prop === member.id);
  if (user == -1) return;
  const role = member.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === "muted"
  );
  member.roles.add(role.id);

  autoroleschema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;

    const role = member.guild.roles.cache.get(data.Role);

    member.roles.add(role);
  });


  antiraid.findOne({ Guild: member.guild.id }, async (err, data) => {
    const kickReason = "Anti-raidmode activated";
    if (!data) return;
    if (data) {
      try {
        member.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle(`Server Under Lockdown`)
              .setDescription(
                `You have been kicked from **${member.guild.name}** with reason: **${kickReason}**`
              )
              .setColor("RED"),
          ],
        });
      } catch (e) {
        throw e;
      }
      member.kick(kickReason);
    }
  });

  altschema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;

    const days = data.Days;
    const option = data.Option;

    const channel = member.guild.channels.cache.get(data.Channel);

    const timeSpan = ms(`${days} days`);

    const createdAt = new Date(member.user.createdAt).getTime();
    const difference = Date.now() - createdAt;

    if (difference < timeSpan) {
      member.send("Alt Account Detected");

      if (option.toLowerCase() == "kick") {
        const id = member.id;
        await member.kick();

        channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle("Alt Account Detected(Kick Option)")
              .setDescription(
                `Member ${id}, Kicked due to detection of alt account - Account Age: ${createdAt}`
              )
              .setColor("RANDOM")
              .setTimestamp(),
          ],
        });
      } else if (option.toLowerCase() == "ban") {
        const id = member.id;
        member.ban();

        channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle("Alt Account Detected(Ban Option)")
              .setDescription(
                `Member ${id}, Ban due to detection of alt account - Account Age: ${createdAt}`
              )
              .setColor("RANDOM")
              .setTimestamp(),
          ],
        });
      } else {
        channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle("Alt Account Detected(Warning)")
              .setDescription(
                `:warning: Alt Account has been detected - Account Age: ${createdAt}`
              )
              .setColor("RANDOM")
              .setTimestamp(),
          ],
        });
      }
    }
  });
});

client.on("messageDelete", async (message) => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });

  await ghostpingschema.findOne(
    { Guild: message.guild.id },
    async (err, data) => {
      if (!data) return;

      if (!message.mentions.members.first()) return;

      console.log("Mentioned");

      if (Pings.has(`pinged:${message.mentions.members.first().id}`)) {
        const embed = new Discord.MessageEmbed()
          .setTitle("Ghost Ping Detected")
          .addField("Author", message.author.username, false)
          .addField("Content", message.content, true)
          .setColor("RANDOM")
          .setFooter(
            message.author.username,
            `${message.author.displayAvatarURL({ dynamic: true })}`
          )
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      }
    }
  );
});

client.on("guildCreate", async (guild) => {
  const id = guild.ownerId;

  let attachments = new Discord.MessageAttachment(banner, "banner.png");

  client.users.fetch(id).then((user) => {
    user.send({
      content: `\`\`\`Greetings ${user.username}, thank you for inviting me to your server, I am NecroAtomicBot a multiple purpose bot built to serve all your Discord needs.\nMy default prefix is !necro to change it simply use **!necro** prefix <custom prefix> to change it. Thanks again for inviting me \`\`\``,
      files: [attachments],
    });
  });
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd)
      return interaction.followUp({
        content: "Error Interacting With Slash Commands",
      });

    if (cmd.permission) {
      const authorPerms = interaction.channel.permissionsFor(
        interaction.member
      );
      if (!authorPerms || !authorPerms.has(cmd.permission))
        return interaction.followUp({
          content: "You do not have perms to run this command",
        });
    }

    // function replyOrEdit(interaction, ...data) {
    //   if (interaction.replied || interaction.deferred)
    //     return interaction.editReply(...data);
    //   else interaction.reply(...data);
    // }

    cmd.run(client, interaction);
  }
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }

  if (interaction.isButton()) {
    // if(interaction.customId !== 'reaction_role_menu'){
    //   return;
    // }

    const emoji = interaction?.component?.emoji;

    const menu = await buttonrr.findOne({ message: interaction.message.id });

    if (
      !menu ||
      menu.roles.length == 0 ||
      !menu.roles.some((v) => v.emoji === emoji.id || v.emoji === emoji.name)
    ) {
      return;
    }

    const member = interaction.guild.members.cache.get(interaction.user.id);

    menu.roles.forEach((v) => {
      const role = interaction.guild.members.cache.get(v.role);

      if ((v.emoji !== emoji.name && v.emoji !== emoji.id) || !role) {
        return;
      }

      if (!member.roles.cache.has(role.id)) {
        member.roles
          .add(role)
          .then(() => {
            interaction.reply({
              content: `You have been given the role ${role.name}`,
              ephemeral: true,
            });
          })
          .catch((err) => {
            interaction.reply({
              content: `An error occured while giving you the role ${role.name}`,
              ephemeral: true,
            });
          });
      } else {
        member.roles
          .remove(role)
          .then(() => {
            interaction.reply({
              content: `You have been removed from the role ${role.name}`,
              ephemeral: true,
            });
          })
          .catch(() => {
            interaction.reply({
              content: `An Error Has Occurred`,
              ephemeral: true,
            });
          });
      }
    });
  }

  if (interaction.isSelectMenu()) {
    if (interaction.customId !== "reaction-roles") {
      return;
    }
    await interaction.deferReply({ ephemeral: true });
    const roleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(roleId);

    const allroles = interaction.member.roles;

    const obtained = allroles.cache.has(roleId);

    if (obtained) {
      allroles.remove(roleId);
      interaction.followUp(`${role.name} has been removed from you`);
    } else {
      allroles.add(roleId);
      interaction.followUp(`${role.name} has been given to you`);
    }
  }
});

client.on("guildDelete", async (guild) => {
  await guildSchema.findOne({ guildID: guild.id }, async (err, data) => {
    if (!data) return;
    data.delete();
  });
});

const voiceCollection = new Discord.Collection();

client.on("voiceStateUpdate", async (oldState, newState) => {
  voiceClient.startListener(oldState, newState);
});

client.on("messageReactionAdd", async (reaction, user) => {
  const handleStarboard = async () => {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {
        if (data == null) return;
        const starboardchannel = data.Channel;
        const starboard = client.channels.cache.get(starboardchannel);
        const msgs = await starboard.messages.fetch({ limit: 100 });
        const existingMsg = msgs.find((msg) =>
          msg.embeds.length === 1
            ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
              ? true
              : false
            : false
        );
        if (existingMsg)
          existingMsg.edit(
            `${reaction.count} - ⭐ | ${reaction.message.channel}`
          );
        else {
          const embed = new Discord.MessageEmbed()
            .setAuthor(
              reaction.message.author.tag,
              reaction.message.author.displayAvatarURL()
            )
            .setDescription(
              `**[Jump to this message](${reaction.message.url})**\n\n${
                reaction.message.content || ""
              }\n`
            )
            .setFooter(
              reaction.message.id +
                " - " +
                new Date(reaction.message.createdTimestamp)
            );

          if (reaction.message.attachments.array().length > 0) {
            embed.setImage(reaction.message.attachments.first().url);
          }

          if (starboard)
            starboard.send(
              { content: `1 - ⭐ | ${reaction.message.channel}` },
              { embeds: [embed] }
            );
        }
      }
    );
  };
  if (reaction.emoji.name === "⭐") {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {
        if (data == null) return;
        const starboardchannel = data.Channel;
        const starboard = client.channels.cache.get(starboardchannel);

        if (reaction.message.channel.id == starboard.id) return;
        if (reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
        } else handleStarboard();
      }
    );
  }

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
});

client.on("messageReactionRemove", async (reaction, user) => {
  const handleStarboard = async () => {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {
        if (data == null) return;
        const starboardchannel = data.Channel;
        const starboard = client.channels.cache.get(starboardchannel);
        const msgs = await starboard.messages.fetch({ limit: 100 });
        const existingMsg = msgs.find((msg) =>
          msg.embeds.length === 1
            ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
              ? true
              : false
            : false
        );
        if (existingMsg) {
          if (reaction.count === 0) existingMsg.delete({ timeout: 2500 });
          else
            existingMsg.edit(
              `${reaction.count} - | ${reaction.message.channel}`
            );
        }
      }
    );
  };

  if (reaction.emoji.name === "⭐") {
    starboardSchema.findOne(
      { Guild: reaction.message.guild.id },
      async (err, data) => {
        if (data == null) return;
        const starboardchannel = data.Channel;
        const starboard = client.channels.cache.get(starboardchannel);

        if (reaction.message.channel.id == starboard.id) return;
        if (reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
        } else handleStarboard();
      }
    );
  }

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
});

logger(client);
client.login(token);
