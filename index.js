// XMD WhatsApp Bot - Baileys MD
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob');
const config = require('./config');

async function loadPlugins(dir) {
  const files = glob.sync(`${dir}/**/*.js`);
  const plugins = [];
  for (const file of files) {
    try {
      const plugin = require(file);
      if (typeof plugin.run === "function" && plugin.command) {
        plugins.push(plugin);
        console.log(chalk.green(`[PLUGIN CHARGÉ] ${plugin.command} de ${file}`));
      }
    } catch (e) {
      console.log(chalk.red(`[ERREUR PLUGIN] ${file}: ${e}`));
    }
  }
  return plugins;
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);
  const { version, isLatest } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    version,
    syncFullHistory: true,
    shouldIgnoreJid: () => false,
    getMessage: async key => undefined,
  });

  sock.ev.on('creds.update', saveCreds);

  // QR code
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr, pairingCode } = update;
    if (qr) qrcode.generate(qr, { small: true });
    if (pairingCode) console.log(chalk.blue(`Pairing Code: ${pairingCode}`));
    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log(chalk.yellow('Reconnexion...'));
        startBot();
      } else {
        console.log(chalk.red('Vous avez été déconnecté.'));
      }
    }
    if (connection === 'open') {
      console.log(chalk.green('Connecté à WhatsApp!'));
    }
  });

  // Charger tous les plugins
  const plugins = await loadPlugins(config.pluginsDir);

  // Gestion des messages
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || !msg.key.remoteJid) return;
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    let body = '';
    if (msg.message.conversation) body = msg.message.conversation;
    else if (msg.message.extendedTextMessage) body = msg.message.extendedTextMessage.text;
    else if (msg.message.imageMessage && msg.message.imageMessage.caption) body = msg.message.imageMessage.caption;
    if (!body.startsWith(config.prefix)) return;

    // Découpage de la commande
    const args = body.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Exécution du plugin correspondant
    for (const plugin of plugins) {
      if ((Array.isArray(plugin.command) ? plugin.command.includes(command) : plugin.command === command)) {
        try {
          await plugin.run(sock, msg, args, { isGroup, from, config });
        } catch (e) {
          await sock.sendMessage(from, { text: "Erreur: " + e }, { quoted: msg });
        }
      }
    }
  });
}

startBot();
