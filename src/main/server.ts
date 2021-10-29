import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
  console.log('Ready!')
})

void client.login(process.env.DISCORD_TOKEN)
