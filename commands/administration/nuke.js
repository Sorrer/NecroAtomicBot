const Discord = require('discord.js');

module.exports = {
    name: 'nuke',
    description: "Nukes a channel",
    async execute(message, args,client){
        if (!message.member.permissions.has('ADMINISTRATOR'))
            return message.channel.send('Perms Denied');
        let clearchannel = message.channel || message.channel.mentions.first()
        const filter = m => m.author.id === message.author.id
        message.channel.send("Are sure you want to nuke this channel? Type: `yes` or `no`. You have 10 seconds...").then(r => r.delete(10000))
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000
        }).then(collected => {

            if (collected.first().content === "no") {
                return message.reply("I have cancelled the nuke!")
            }
            if (collected.first().content === "yes") {
                
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Nuked!')
                    .setDescription(`Channel has been nuked`)
                    .setFooter(message.author.username)
                    .setImage('https://media.discordapp.net/attachments/772390491303575582/819086461739335720/tenor_5.gif?width=560&height=472')
                    .setTimestamp()
                clearchannel.clone().then(clearchannel => clearchannel.send(embed))
                clearchannel.delete()
            }
        }).catch(err => {
            message.channel.send("Your Time is over...")
        })
    }
}