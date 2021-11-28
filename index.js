const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
const Discord = require("discord.js")
const client = new Discord.Client()
const db = require("quick.db")
const prefix = "$"
const cmd_1 = "set-ch"// Command set-channel
const cmd_2 = "setup"//Command set-auto
const cmd_3 = "report"//Command report
client.login(process.env.token)



//Command set channel ordinary
client.on("message", async message => {
  if(message.content.startsWith(prefix + cmd_2)) {
    const cmd = message.content.split(" ")
    const Channel = message.mentions.channels.first() || cmd[1]
    if(!Channel) return message.reply("❌****Please Mention The Channel****")
    db.set(`auto_${message.guild.id}`, Channel.id)
    message.channel.send(new Discord.MessageEmbed().setTitle("**Done Save**").setColor("BLUE").setDescription(`>>> ** Done Save Auto Reports Channel
Channel : ${Channel}
By : ${message.author}
**`))
  }
})

//Command set auto channel report 
client.on("message", async message => {
  if(message.content.startsWith(prefix + cmd_1)) {
   const cmd = message.content.split(" ")
    const Channel = message.mentions.channels.first() || cmd[1]
    if(!Channel) return message.reply("❌****Please Mention The Channel****")
    db.set(`channel_${message.guild.id}`, Channel.id)
    message.channel.send(new Discord.MessageEmbed().setTitle("**Done Save**").setColor("BLUE").setDescription(`>>> ** Done Save Reports Channel
Channel : ${Channel}
By : ${message.author}
**`)) 
  }
})


//Command send Report
client.on("message", async message => {
  if(message.content.startsWith(prefix + cmd_3)) {
    const cmd = message.content.split(" ").slice(1).join(" ")
    const ch = await db.fetch(`channel_${message.guild.id}`)
    if(!ch) return message.reply("**The chat was not specified by any of the administrators**")
if(!cmd) return message.channel.send(">>> ** ✍ | Write Report**")
    
    const embed = new Discord.MessageEmbed()
    .setTitle("**New Report**")
    .setColor("RED")
      .setTimestamp()    .setThumbnail(client.user.avatarURL())
.setDescription(`>>> **** By ${message.author}


Report 

__${cmd}__
****`)
    client.channels.cache.get(ch).send(embed).then((m) => {
    message.channel.send(`Done Send Report
Go to <#${ch}>`)
      message.react("✅")
    })
  }
})


client.on('message', function(message) {
let args = message.content.split(" ").slice('').join(" ");
if(message.author.bot)return;
const auto = message.channel.id === db.fetch(`auto_${message.guild.id}`)
if (!auto) return false
if(message.content.startsWith('')){ message.delete()
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username,message.author.avatarURL())
.setColor("00fff7")
.setThumbnail(message.author.avatarURL())
.setDescription(`> **${args}**`)
.setFooter(`By | ${message.author.tag}`)
.setTimestamp()
message.channel.send(embed).then(msg => { 
  msg.react('👍').then( r => { msg.react('👎') 
                                                    })           
          })
       }
   });
