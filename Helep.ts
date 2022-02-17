import MessageHandler from '../../Handlers/MessageHandler'

import BaseCommand from '../../lib/BaseCommand'

import WAClient from '../../lib/WAClient'

import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'

import { MessageType, Mimetype } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {

	constructor(client: WAClient, handler: MessageHandler) {		super(client, handler, {

			command: "help",

			description:

				"Displays the help menu or shows the info of the command provided",

			category: "general",

			usage: `${client.config.prefix}help (command_name)`,

			aliases: ["h"],

			baseXp: 30,

		});

	}

	run = async (

		M: ISimplifiedMessage,

		parsedArgs: IParsedArgs

	): Promise<void> => {

		const user = M.sender.jid;

		const lolino =

			"https://user-images.githubusercontent.com/88751177/147395042-50ab0ec2-1cdb-4c5d-984d-2fc1dca32150.mp4";

		if (!parsedArgs.joined) {

			const commands = this.handler.commands.keys();

			const categories: { [key: string]: ICommand[] } = {};

			for (const command of commands) {

				const info = this.handler.commands.get(command);

				if (!command) continue;

				if (!info?.config?.category || info.config.category === "dev") continue;

				if (Object.keys(categories).includes(info.config.category))

					categories[info.config.category].push(info);

				else {

					categories[info.config.category] = [];

					categories[info.config.category].push(info);

				}

			}

			let text = `*「 RUKIA 2.3 」*\n\nGreetings! *@${

				user.split("@")[0]

			}*, 𝙸'𝙼 𝚁𝚞𝚔𝚒𝚊 𝙺𝚞𝚌𝚑𝚒𝚔𝚒 𝚊𝚗𝚍 𝚒 𝚊𝚖 𝚊 𝚜𝚑𝚒𝚗𝚒𝚐𝚊𝚖𝚒 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝚜𝚎𝚛𝚎𝚝𝚎𝚒.\n\nmy prefix is ${this.client.config.prefix} \n\n`;

			const keys = Object.keys(categories);

			for (const key of keys)

				text += `*━━━❰᯽* ${

					this.emojis[keys.indexOf(key)]

				} *${this.client.util.capitalize(key)}* ${this.emojis[keys.indexOf(key)]} *᯽❱━━━*\n\n \`\`\`${categories[key]

					.map((command) => command.config?.command)

					.join(", ")}\`\`\`\n\n`;
                                  footertext: `© CODING FAMILY 2022`;

			return void this.client.sendMessage(

				M.from,

				{ url: lolino },

				MessageType.video,

				{

					quoted: M.WAMessage,

					mimetype: Mimetype.gif,

					caption: `${text} 
┌────────────────────────
         ᶜᵒᵈⁱⁿᵍ-ᶠᵃᵐⁱˡʸ.ⁱⁿᶜ

 *|»USER: ☞︎︎︎ @${        	user.split("@")[0]    }*

 *|»USERNAME:  ☞︎︎︎ ${M.sender.username}*
 
 *|»ABOUT: ☞︎︎︎ ${ 
					(await this.client.getStatus(user)).status || 'None' }*

*|»GROUP: ☞︎︎︎ ${M.groupMetadata?.subject}*
 
 *|»NAME: ☞︎︎︎ RUKIA KUCHIKI*

 *|»PREFIX: ☞︎︎︎ •${this.client.config.prefix}•*

 *|»TEAM: ☞︎︎︎ CODING FAMILY*

 *|»OWNER: ☞︎︎︎ LIL MANIAC/LLOYD*
 
 *|»GITHUB: ☞︎︎︎ github.com/lloyd4565*
 
 *|»CONTACT: ☞︎︎︎ https://wa.me/+27721753314*
 
      
└───────────────────────`,

					contextInfo: { mentionedJid: [user] },

				}

			);

		}

		const key = parsedArgs.joined.toLowerCase();

		const command =

			this.handler.commands.get(key) || this.handler.aliases.get(key);

		if (!command) return void M.reply(`No Command of Alias Found | "${key}"`);

		const state = await this.client.DB.disabledcommands.findOne({

			command: command.config.command,

		});

		M.reply(

			`💘 *Command:* ${this.client.util.capitalize(

				command.config?.command

			)}\n✍️ *Status:* ${

				state ? "Disabled" : "Available"

			}\n⛩ *Category:* ${this.client.util.capitalize(

				command.config?.category || ""

			)}${

				command.config.aliases

					? `\n🎯 *Aliases:* ${command.config.aliases

							.map(this.client.util.capitalize)

							.join("\n")}`

					: ""

			}\n💐 *Group Only:* ${this.client.util.capitalize(

				JSON.stringify(!command.config.dm ?? true)

			)}\n🍃 *Usage:* ${command.config?.usage || ""}\n\n✨ *Description:* ${

				command.config?.description || ""

			}`

		);

	};

	emojis = ['⚱️', '👑', '♻️', '🎭', '✨', '🎨', '🎖️', '🎈', '⚡', '💫','💡',]
       
}
