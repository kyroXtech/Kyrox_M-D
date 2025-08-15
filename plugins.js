module.exports = [
  {
    command: "ping",
    description: "Teste la latence du bot.",
    async run(sock, msg, args, ctx) {
      await sock.sendMessage(ctx.from, { text: "Pong! ✅" }, { quoted: msg });
    }
  },
  {
    category: "CONVERT",
    commands: [
      { name: "stickertovideo" },
      { name: "toimg" },
      { name: "tomp3" },
      { name: "toptt" },
      { name: "write" }
    ],
    handler: (cmd, args, sender) => `Commande CONVERT : .${cmd} exécutée !`
  },
  {
    category: "DOWNLOAD",
    commands: [
      { name: "apk" },
      { name: "fb" },
      { name: "gdrive" },
      { name: "igdl2" },
      { name: "mediafire" },
      { name: "pair" },
      { name: "pindl" },
      { name: "twitter" },
      { name: "yts" }
    ],
    handler: (cmd, args, sender) => `Commande DOWNLOAD : .${cmd} exécutée !`
  },
  {
    category: "DOWNLOADER",
    commands: [
      { name: "gitclone" },
      { name: "tiktok" }
    ],
    handler: (cmd, args, sender) => `Commande DOWNLOADER : .${cmd} exécutée !`
  },
  {
    category: "FUN",
    commands: [
      { name: "animegirl" }, { name: "animegirl1" }, { name: "animegirl2" }, { name: "animegirl3" },
      { name: "animegirl4" }, { name: "animegirl5" }, { name: "awoo" }, { name: "bible" }, { name: "biblelist" },
      { name: "bite" }, { name: "blush" }, { name: "bonk" }, { name: "bully" }, { name: "cosplay" },
      { name: "cringe" }, { name: "cry" }, { name: "cuddle" }, { name: "dance" }, { name: "fancy" },
      { name: "getimage" }, { name: "glomp" }, { name: "handhold" }, { name: "happy" }, { name: "highfive" },
      { name: "hug" }, { name: "kill" }, { name: "kiss" }, { name: "lick" }, { name: "loli" }, { name: "neko" },
      { name: "nom" }, { name: "pat" }, { name: "poke" }, { name: "rdanime" }, { name: "slap" }, { name: "smile" },
      { name: "smug" }, { name: "stickersearch" }, { name: "waifu" }, { name: "wave" }, { name: "wink" }, { name: "yeet" }
    ],
    handler: (cmd, args, sender) => `Commande FUN : .${cmd} exécutée !`
  },
  {
    category: "GAME",
    commands: [
      { name: "konami" },
      { name: "squidgame" }
    ],
    handler: (cmd, args, sender) => `Commande GAME : .${cmd} exécutée !`
  },
  {
    category: "GROUP",
    commands: [
      { name: "add" }, { name: "antilinkkick" }, { name: "closetime" }, { name: "delete" }, { name: "deletelink" },
      { name: "demote" }, { name: "demoteall" }, { name: "ginfo" }, { name: "hidetag" }, { name: "ikeep" },
      { name: "kick" }, { name: "kickall" }, { name: "kickallfast" }, { name: "linkgroup" }, { name: "mute" },
      { name: "opentime" }, { name: "out" }, { name: "promote" }, { name: "promoteall" }, { name: "setgoodbye" },
      { name: "setwelcome" }, { name: "stop" }, { name: "tagadmin" }, { name: "tagadmins" }, { name: "tagall" }, { name: "unmute" }
    ],
    handler: (cmd, args, sender) => `Commande GROUP : .${cmd} exécutée !`
  },
  {
    category: "IMG_EDIT",
    commands: [
      { name: "ad" },
      { name: "jail" },
      { name: "rmbg" },
      { name: "wanted" }
    ],
    handler: (cmd, args, sender) => `Commande IMG_EDIT : .${cmd} exécutée !`
  },
  {
    category: "INFO",
    commands: [
      { name: "alive" },
      { name: "langcode" },
      { name: "phlogo" },
      { name: "repo" },
      { name: "version" }
    ],
    handler: (cmd, args, sender) => `Commande INFO : .${cmd} exécutée !`
  },
  {
    category: "LOGO",
    commands: [
      { name: "3dcomic" }, { name: "3dpaper" }, { name: "america" }, { name: "angelwings" }, { name: "bear" }, { name: "birthday" },
      { name: "blackpink" }, { name: "boom" }, { name: "bulb" }, { name: "castle" }, { name: "cat" }, { name: "clouds" },
      { name: "deadpool" }, { name: "devilwings" }, { name: "dragonball" }, { name: "eraser" }, { name: "frozen" },
      { name: "futuristic" }, { name: "galaxy" }, { name: "hacker" }, { name: "leaf" }, { name: "logo1" }, { name: "logo2" },
      { name: "luxury" }, { name: "naruto" }, { name: "neonlight" }, { name: "nigeria" }, { name: "paint" }, { name: "pornhub" },
      { name: "sadgirl" }, { name: "sans" }, { name: "sunset" }, { name: "tattoo" }, { name: "thor" }, { name: "typography" },
      { name: "valorant" }, { name: "zodiac" }
    ],
    handler: (cmd, args, sender) => `Commande LOGO : .${cmd} exécutée !`
  },
  {
    category: "MAIN",
    commands: [
      { name: "alive2" }, { name: "funnypics" }, { name: "hentai" }, { name: "mp3" }, { name: "mp4" },
      { name: "ping" }, { name: "ping2" }, { name: "ping3" }, { name: "uptime" }
    ],
    handler: (cmd, args, sender) => `Commande MAIN : .${cmd} exécutée !`
  },
  {
    category: "MEDIA",
    commands: [
      { name: "img" },
      { name: "music" },
      { name: "play3" }
    ],
    handler: (cmd, args, sender) => `Commande MEDIA : .${cmd} exécutée !`
  },
  {
    category: "MENU",
    commands: [
      { name: "adult" }, { name: "aimenu" }, { name: "animemenu" }, { name: "convertmenu" }, { name: "dlmenu" },
      { name: "funmenu" }, { name: "groupmenu" }, { name: "logo" }, { name: "mainmenu" }, { name: "menu" },
      { name: "menu2" }, { name: "othermenu" }, { name: "ownermenu" }, { name: "reactions" }
    ],
    handler: (cmd, args, sender) => `Commande MENU : .${cmd} exécutée !`
  },
  {
    category: "MISC",
    commands: [
      { name: "antidelete" }, { name: "bot" }, { name: "couplepp" }, { name: "eval" }, { name: "owner" }, { name: "update" }
    ],
    handler: (cmd, args, sender) => `Commande MISC : .${cmd} exécutée !`
  },
  {
    category: "MUSIC",
    commands: [
      { name: "lyrics" },
      { name: "lyrics2" }
    ],
    handler: (cmd, args, sender) => `Commande MUSIC : .${cmd} exécutée !`
  },
  {
    category: "OTHER",
    commands: [
      { name: "github" }, { name: "gpass" }, { name: "srepo" }, { name: "ss" }, { name: "trt" }, { name: "tts" }, { name: "weather" }
    ],
    handler: (cmd, args, sender) => `Commande OTHER : .${cmd} exécutée !`
  },
  {
    category: "OWNER",
    commands: [
      { name: "block" }, { name: "broadcast" }, { name: "chr" }, { name: "clearchats" }, { name: "delsudo" }, { name: "gjid" },
      { name: "jid" }, { name: "leave" }, { name: "listsudo" }, { name: "request" }, { name: "restart" }, { name: "setpp" },
      { name: "setsudo" }, { name: "settings" }, { name: "shutdown" }, { name: "tovv" }, { name: "unblock" }, { name: "updatecmd" },
      { name: "vv" }, { name: "vv2" }
    ],
    handler: (cmd, args, sender) => `Commande OWNER : .${cmd} exécutée !`
  },
  {
    category: "PRIVATE",
    commands: [
      { name: "diary" }, { name: "resetdiary" }, { name: "resetpassword" }, { name: "setdiary" }
    ],
    handler: (cmd, args, sender) => `Commande PRIVATE : .${cmd} exécutée !`
  },
  {
    category: "SETTINGS",
    commands: [
      { name: "always-online" }, { name: "anti-bad" }, { name: "anticall" }, { name: "antipromotte" }, { name: "auto-react" },
      { name: "auto-reply" }, { name: "auto-seen" }, { name: "auto-sticker" }, { name: "auto-voice" }, { name: "mode" },
      { name: "read-message" }, { name: "status-react" }, { name: "status-reply" }, { name: "welcome" }
    ],
    handler: (cmd, args, sender) => `Commande SETTINGS : .${cmd} exécutée !`
  },
  {
    category: "STATUS",
    commands: [
      { name: "available" },
      { name: "body" },
      { name: "composing" }
    ],
    handler: (cmd, args, sender) => `Commande STATUS : .${cmd} exécutée !`
  },
  {
    category: "STICKER",
    commands: [
      { name: "rename" },
      { name: "sticker" }
    ],
    handler: (cmd, args, sender) => `Commande STICKER : .${cmd} exécutée !`
  },
  {
    category: "TOOLS",
    commands: [
      { name: "angry" }, { name: "attp" }, { name: "confused" }, { name: "getpp" }, { name: "google" }, { name: "happy" },
      { name: "heart" }, { name: "hot" }, { name: "moon" }, { name: "newsletter" }, { name: "nikal" }, { name: "pdf" },
      { name: "sad" }, { name: "shy" }, { name: "spam" }, { name: "status" }, { name: "vsticker" }
    ],
    handler: (cmd, args, sender) => `Commande TOOLS : .${cmd} exécutée !`
  },
  {
    category: "UTILITY",
    commands: [
      { name: "check" }, { name: "country" }, { name: "define" }, { name: "fetch" }, { name: "listplugins" }, { name: "movieinfo" },
      { name: "plugin" }, { name: "recentplugins" }, { name: "remini" }, { name: "save" }, { name: "tempmail" }, { name: "tgs" },
      { name: "tourl" }, { name: "vcard" }, { name: "web" }
    ],
    handler: (cmd, args, sender) => `Commande UTILITY : .${cmd} exécutée !`
  }
];
