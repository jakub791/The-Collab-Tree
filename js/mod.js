const modInfo = {
	name: "The Collab Tree",
	id: "thecollabtree-9978665485",
	author: "incremental_gamer, harry(psi), niko, thenonymous, downvoid, icecreamdude, reip, and jakub",
	pointsName: "sickness",
	modFiles: [
		"cheese.js",
		"tree.js",
		"dice.js",
		"reipist.js",
		"lore.js",
		"covidtube.js",
		"h.js",
		"eden.js",
		"side-layers.js",
		"je.js",
		"harry.js", // Oh god it begins
	],
	discordName: "",
	discordLink: "",
	initialStartPoints: Decimal.dTen,
	offlineLimit: 1,
};

const VERSION = {
	num: "0.0",
	name: "The beginning",
};

const changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Add content...
    - Quack. `;

const winText =
	"Congratulations! You have reached the end and beaten this game, but for now...";

const doNotCallTheseFunctionsEveryTick = ["roll", "invSwap"];

function getStartPoints() {
	return modInfo.initialStartPoints;
}

function canGenPoints() {
	return true;
}

function getPointGen() {
	if (!canGenPoints()) return Decimal.dZero;

	let gain = Decimal.dOne;
	let treNerf = player.e.bpm.div(3).div(100);
	if (tmp.cheese.currentState === 6) gain = gain.div(Decimal.dTwo);
	if (hasUpgrade("tb", 11)) gain = gain.add(upgradeEffect("tb", 11));
	if (hasUpgrade("cv", 11)) gain = gain.mul(Decimal.dTwo);
	if (hasUpgrade("tb", 13)) gain = gain.mul(upgradeEffect("tb", 13));
	if (hasUpgrade("poi", 11)) gain = gain.mul(2);
	if (hasUpgrade("cheese", "ab31")) gain = gain.mul(4);
	if (hasUpgrade("poi", 12))
		gain = gain.times(player.poi.upgrades.length.add(1).pow(1.25));
	gain = gain.mul(tmp.tdr.rollSumEffect);
	if (hasMilestone("e", 0)) gain = gain.mul(5);
	gain = gain.mul(tmp.je.effect);
	gain = gain.mul(player.tdr.lastWeekly);
	if (hasUpgrade("cv", 13)) gain = gain.pow(1.25);
	if (inChallenge("e", 11)) gain = gain.pow(treNerf);
	if (inChallenge("e", 12)) gain = gain.pow(0.0667185);
	if (inChallenge("e", 13)) gain = gain.pow(Math.random());
	if (inChallenge("tdr", 12))
		gain = gain.div(player.tdr.points.mul(tmp.tdr.effect).max(1));
	return gain.mul(player.Hr.total.max(1).log10().mul(2).add(1));
}

function addedPlayerData() {
	return {
		jacorbcutscene: new Decimal(1),
		jacorbscene: new Decimal(0),
	};
}
function colored(layer, text, tag = "h2") {
	return `<${tag} style='color:${temp[layer].color};text-shadow:${temp[layer].color} 0px 0px 10px;'>${text}</${tag}>`;
}
const displayThings = [
	() =>
		`${
			inChallenge("e", 11)
				? `TremENDouS BPM is currently ${format(player.e.bpm)}`
				: ""
		}`,
	() =>
		`${
			inChallenge("tdr", 11) ||
			inChallenge("tdr", 12) ||
			inChallenge("tdr", 13)
				? `You have ${formatTime(player.tdr.luck)} seconds left.`
				: ""
		}`,
];

function isEndgame() {
	return player.points.gte("e280000000");
}

const backgroundStyle = {};

function spinEternal() {
	let spin = new Decimal(0);
	if (inChallenge("e", 14)) spin = Math.random(0, 360);
	return spin;
}

function maxTickLength() {
	return 3600;
}

function fixOldSave(oldVersion) {}
