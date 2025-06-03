import {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  REST,
  Routes,
} from 'discord.js';

import { connect } from 'mongoose';

import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import 'dotenv/config';

const {
  Guilds,
  GuildMembers,
  GuildMessages,
  GuildMessageReactions,
  MessageContent,
} = GatewayIntentBits;

const { Message, Channel, Reaction, User } = Partials;

export class DiscordClient {
  constructor() {
    this.client = new Client({
      intents: [
        Guilds,
        GuildMembers,
        GuildMessages,
        GuildMessageReactions,
        MessageContent,
      ],
      partials: [Message, Channel, Reaction, User],
    });

    this.client.commands = new Collection();
  }

  /**
   * Function to load and handle client events
   */
  handleEvents() {
    try {
      const eventsPath = join(process.cwd(), 'src', 'events');
      const eventFiles = readdirSync(eventsPath).filter((file) =>
        file.endsWith('.js')
      );

      for (const file of eventFiles) {
        const filePath = join(eventsPath, file);

        import(`file://${filePath}`).then(({ default: event }) => {
          if (event.once) {
            this.client.once(event.name, (...args) => {
              event.execute(...args);
            });
          } else {
            this.client.on(event.name, (...args) => {
              event.execute(...args);
            });
          }
        });
      }
    } catch (err) {
      console.error('Error loading events:', err);
      process.exit(1);
    }
  }

  /**
   * Function to load and handle interaction commands
   */
  handleCommands() {
    try {
      const commandsPath = join(
        process.cwd(),
        'src',
        'interactions',
        'commands'
      );

      const commandFiles = readdirSync(commandsPath).filter((file) =>
        file.endsWith('.js')
      );

      for (const file of commandFiles) {
        const filePath = join(commandsPath, file);

        import(`file://${filePath}`).then(({ default: command }) => {
          if (command.data && command.execute) {
            this.client.commands.set(command.data.name, command);
          } else {
            console.warn(`Invalid command in ${filePath}, skipping.`);
          }
        });
      }
    } catch (err) {
      console.error('Error loading commands:', err);
      process.exit(1);
    }
  }

  /**
   * Function to deploy interaction commands using discord api
   */
  async deployCommands() {
    try {
      const commands = [];
      const commandsPath = join(
        process.cwd(),
        'src',
        'interactions',
        'commands'
      );

      const commandFiles = readdirSync(commandsPath).filter((file) =>
        file.endsWith('.js')
      );

      for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const { default: command } = await import(`file://${filePath}`);

        if (command.data && command.execute) {
          commands.push(command.data.toJSON());
        } else {
          console.warn(`Invalid command in ${filePath}, skipping.`);
        }
      }

      const rest = new REST().setToken(process.env.DISCORD_TOKEN);

      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
        {
          body: commands,
        }
      );
    } catch (err) {
      console.error('Error deploying commands:', err);
      process.exit(1);
    }
  }

  /**
   * Function to connect to mongo database
   */
  async connectDatabase() {
    try {
      await connect(process.env.MONGO_URI);
    } catch (err) {
      console.error('Error connecting to mongo database:', err);
      process.exit(1);
    }
  }

  /**
   * Function to init and start client
   */
  async init() {
    this.handleEvents();
    this.handleCommands();

    await this.connectDatabase();

    await this.deployCommands();

    await this.client.login(process.env.DISCORD_TOKEN);
  }
}
