// kyrox_M-D_WhatsApp Bot - Baileys MD
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob');
const config = require('./config');

async function loadPlugins(dir) {
    if (!fs.existsSync(dir)) {
        console.log(chalk.yellow(`⚠️ Le dossier de plugins "${dir}" n'existe pas. Aucun plugin chargé.`));
        return [];
    }

    const files = glob.sync(`${dir}/**/*.js`);
    const plugins = [];

    for (const file of files) {
        try {
            const plugin = require(file);
            if (typeof plugin.run === "function" && plugin.command) {
                plugins.push(plugin);
                console.log(chalk.green(`[PLUGIN CHARGÉ] ${plugin.command}`));
            }
        } catch (e) {
            console.log(chalk.red(`[ERREUR PLUGIN] ${file}: ${e.message}`));
        }
    }

    if (plugins.length === 0) {
        console.log(chalk.yellow('⚠️ Aucun plugin valide trouvé dans le dossier.'));
    }

    return plugins;
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        auth: state,
        version,
        syncFullHistory: true,
        getMessage: async key => undefined,
        // pairingCode force la connexion Multi-device
        generateHighQualityPairingCode: true,
    });

    sock.ev.on('creds.update', saveCreds);

    // QR / Pairing code
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr, pairingCode } = update;

        if (pairingCode) console.log(chalk.blue(`Pairing Code KYROX509: ${pairingCode}`));
        else if (qr) qrcode.generate(qr, { small: true });

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
            console.log(chalk.green('Connecté à WhatsApp !'));
        }
    });

    // Charger les plugins
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

        const args = body.slice(config.prefix.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        for (const plugin of plugins) {
            if (Array.isArray(plugin.command) ? plugin.command.includes(command) : plugin.command === command) {
                try {
                    await plugin.run(sock, msg, args, { isGroup, from });
                } catch (e) {
                    await sock.sendMessage(from, { text: `Erreur: ${e.message}` });
                }
            }
        }
    });
}

startBot();
