const Discord = require('discord.js')
module.exports = {

    name:'channelunlock',
    description: 'Unlocks channels that are in lock down',

    async execute(message,args,client){
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send({content:'Perms Denied'})

        if(!args[0]) return message.channel.send({content:'Please mention a channel'})

        const role = message.guild.roles.everyone;

        let lockChannel = message.mentions.channels.first()
        
        if(!lockChannel) return message.channel.send({content:'Please provide a valid channel'})

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: true
        
        }).catch(err => console.log(err))


        return message.channel.send({content:'This channel has been unlocked'})


    }


}