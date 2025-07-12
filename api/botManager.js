import { Client, GatewayIntentBits } from 'discord.js'

let botClient = null
let botToken = null
let botCode = `import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.on('ready', () => { console.log(\`Bot online as \${client.user.tag}\`); });
client.on('messageCreate', message => {
  if(message.author.bot) return;
  if(message.content.startsWith('$generatecode')) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = 'blizzardadmin_';
    const len = Math.floor(Math.random() * 3) + 7;
    for(let i=0;i<len;i++) code += chars[Math.floor(Math.random()*chars.length)];
    message.channel.send(\`Generated code: \${code}\`);
  }
});
client.login('your_token_here');`

async function startBot(token) {
  if(botClient) return false
  botClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
  botToken = token
  try {
    await botClient.login(token)
    botClient.on('ready', () => console.log(`Bot started: ${botClient.user.tag}`))
    botClient.on('messageCreate', message => {
      if(message.author.bot) return
      if(message.content.startsWith('$generatecode')) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let code = 'blizzardadmin_'
        const len = Math.floor(Math.random() * 3) + 7
        for(let i=0; i<len; i++) code += chars[Math.floor(Math.random()*chars.length)]
        message.channel.send(`Generated code: ${code}`)
      }
    })
    return true
  } catch {
    botClient = null
    return false
  }
}

async function stopBot() {
  if(!botClient) return false
  await botClient.destroy()
  botClient = null
  botToken = null
  return true
}

function getBotCode() {
  return botCode
}

function setBotCode(newCode) {
  botCode = newCode
}

export { startBot, stopBot, getBotCode, setBotCode }
