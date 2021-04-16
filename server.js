const fetch = require('node-fetch');
let HTMLParser = require('node-html-parser');
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', gotMessage);

async function gotMessage(msg) {
    if (msg.content == '!lastspin' || msg.content == '!ls') {
        let url = 'https://mazesp.in/';
        let response = await (await fetch(url)).text();
        let h = HTMLParser.parse(response);
        let last_spin = h.querySelector('#last-spin').querySelector('.countup').getAttribute('data-timestamp').toString();


        let Embed = new Discord.MessageEmbed()
            .setColor('#2ECC71')
            .setTitle(timeDifference(Date.now(), last_spin))
            .attachFiles(['images/mazespin.gif'])
            .setImage('attachment://mazespin.gif')
            .addField("When did mazespin spin?", "https://whendidmazepinspin.com")

        msg.channel.send(Embed);

    }
}

function timeDifference(current, previous) {

    let sPerMinute = 60;
    let sPerHour = sPerMinute * 60;
    let sPerDay = sPerHour * 24;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    let elapsed = (current - previous) / 1000;

    while (elapsed >= sPerDay) {
        days += 1;
        elapsed -= sPerDay;
    }

    while (elapsed >= sPerHour) {
        hours += 1;
        elapsed -= sPerHour;
    }

    while (elapsed >= sPerMinute) {
        minutes += 1;
        elapsed -= sPerMinute;
    }

    seconds = Math.round(elapsed);

    return "It's been " + days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds since his last spin.";

}



