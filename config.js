const fs = require("fs");
const dotenv = require("dotenv");
const {
	Sequelize
} = require("sequelize");

function toBool(value) {
	return value === "true";
}

if (fs.existsSync("config.env")) {
	dotenv.config({
		path: "./config.env"
	});
}

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://prince_w867_user:qHG1G6POO533Ubsg3TkUxpHdHByaJzrJ@dpg-d121r1buibrs73eo03eg-a.oregon-postgres.render.com/prince_w867"; // Corrected SQLite format

if (!DATABASE_URL.startsWith("sqlite://") && !DATABASE_URL.startsWith("postgres://") && !DATABASE_URL.startsWith("postgresql://")) {
	throw new Error("Invalid DATABASE_URL format. Use 'sqlite://' or 'postgres://'");
}

const DATABASE = DATABASE_URL.startsWith("sqlite://") ? new Sequelize(DATABASE_URL, {
	dialect: "sqlite",
	storage: DATABASE_URL.replace("postgresql://prince_w867_user:qHG1G6POO533Ubsg3TkUxpHdHByaJzrJ@dpg-d121r1buibrs73eo03eg-a.oregon-postgres.render.com/prince_w867", ""),
	logging: false
}) : new Sequelize(DATABASE_URL, {
	dialect: "postgres",
	protocol: "postgres",
	ssl: true,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		},
	},
	logging: false,
});

DATABASE.authenticate().then(() => console.log("Database connection established successfully.")).catch((err) => console.error("Database connection failed:", err.message));

module.exports = {
	VERSION: require("./package.json").version,
	ALIVE: process.env.ALIVE || "Hello i'm prince",
	ALWAYS_ONLINE: toBool(process.env.ALWAYS_ONLINE || "false"),
	BGMBOT : toBool(process.env.BGMBOT || "true"),
	API: "https://api-aswin-sparky.koyeb.app",
	AUDIO_DATA: process.env.AUDIO_DATA || "X BOT MD;ASWIN SPARKY;https://i.ibb.co/88TXFkJ/645cfc6eb7e1.jpg",
	AUTO_STATUS_VIEW: toBool(process.env.AUTO_STATUS_VIEW || "true"),
	BOT_INFO: process.env.BOT_INFO || "• 𝑆 𝑇 𝑃 𝐵 𝑂 𝑇 𐎓;✆ 𝐒 𝚻  𝚸𝚪𝚰𝚴𝐂𝚵-✦ 🫴🏻💗",
	CALL_BLOCK: toBool(process.env.CALL_BLOCK || "false"),
	CALL_BLOCK_MSG: process.env.CALL_BLOCK_MSG || "_Calls are not allowed. Please don’t call again!._",
	DATABASE_URL,
	DATABASE,
	DISABLE_PM: toBool(process.env.DISABLE_PM || "false"),
	HANDLERS: (process.env.HANDLERS || process.env.HANDLER || "false").trim(),
	HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
	HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
	KOYEB_API_KEY: process.env.KOYEB_API_KEY || "",
	KOYEB_SERVICE_NAME: process.env.KOYEB_SERVICE_NAME || "",
	RENDER_API_KEY: process.env.RENDER_API_KEY || "rnd_zEZ5JfhzzkOcBkGJE0HrdlwKGdL6",
	RENDER_APP_NAME: process.env.RENDER_APP_NAME || "ponnu",
	LANGUAGE: process.env.LANGUAGE || "english",
	LOGS: toBool(process.env.LOGS || "false"),
	MENU_TYPE: process.env.MENU_TYPE || "small", // Menu style: big, small, image, document, text, call, payment
	MENU_FONT: process.env.MENU_FONT || "tiny", // randomStyle, strikeThrough, wingdings, vaporwave, typewriter, analucia, tildeStrikeThrough, underline, doubleUnderline, slashThrough, sparrow, heartsBetween, arrowBelow, crossAboveBelow, creepify, bubbles, mirror, squares, roundsquares, flip, tiny, createMap, serif_I, manga, ladybug, runes, serif_B, serif_BI, serif_I, fancy1, fancy2, fancy3, fancy4, fancy5, fancy6, fancy7, fancy8, fancy9, fancy10, fancy11, fancy12, fancy13, fancy14, fancy15, fancy16, fancy17, fancy18, fancy19, fancy20, fancy21, fancy22, fancy23, fancy24, fancy25, fancy26, fancy27, fancy28, fancy29, fancy30, fancy31, fancy32, fancy33
	PORT: process.env.PORT || 8080,
	PING: process.env.PING || "Latency",
	PM_BLOCK: toBool(process.env.PM_BLOCK || "false"),
	READ_MESSAGES: toBool(process.env.READ_MESSAGES || "false"),
	REJECT_CALL: toBool(process.env.REJECT_CALL || "false"),
	REJECT_CALL_MSG: process.env.REJECT_CALL_MSG || "_Calls are not allowed. Please don’t call again!._",
	SESSION_ID: process.env.SESSION_ID || "A-S-W-I-N-S-P-A-R-K-Y:7b185e3b986c896ab15828c845349f58",
	START_MSG: toBool(process.env.START_MSG || "true"),
	STICKER_DATA: process.env.STICKER_DATA || `• 𝑆 𝑇 𝑃 𝐵 𝑂 𝑇 𐎓;✆ 𝐒 𝚻  𝚸𝚪𝚰𝚴𝐂𝚵-✦`,
	SUDO: process.env.SUDO || "917012984396",
	WORK_TYPE: process.env.WORK_TYPE || "public",
	SAVE_STATUS: toBool(process.env.SAVE_STATUS || "false"),
	STATUS_REPLY: toBool(process.env.STATUS_REPLY || "false"),
	STATUS_REPLY_MSG: process.env.STATUS_REPLY_MSG || "Nice Status Brother 🦫✨",
	STATUS_REACTION: toBool(process.env.STATUS_REACTION || "true"),
	STATUS_REACTION_EMOJI: process.env.STATUS_REACTION_EMOJI || "🍉,🍓,🎀,💀,💗,📍,🔪,🛒,☠️,🐍,👍🏻",
	WARN_COUNT: process.env.WARN_COUNT || "3"
};
