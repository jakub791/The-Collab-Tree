const modInfo = {
    name: "The Collab Tree",
    id: "mymod",
    author: "incremental_gamer, :;:, niko, thenonymous, downvoid, icecreamdude, and jakub",
    pointsName: "points",
    modFiles: [
        "cheese.js",
        "time.js",
        "tree.js",
        "dice.js",
        "reipist.js",
        "lore.js",
        "covidtube.js"
    ],
    discordName: "",
    discordLink: "",
    initialStartPoints: Decimal.dTen,
    offlineLimit: 1
};

const VERSION = {
    num: "0.0",
    name: "The beginning"
};

const changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Add content...`;

const winText =
    "Congratulations! You have reached the end and beaten this game, but for now...";

const doNotCallTheseFunctionsEveryTick = ["roll"];

function getStartPoints() {
    return modInfo.initialStartPoints;
}

function canGenPoints() {
    return true;
}

function getPointGen() {
    if (!canGenPoints()) return Decimal.dZero;

    let gain = Decimal.dOne;
    if (tmp.cheese.currentState === 6) gain = gain.div(Decimal.dTwo);
    if (hasUpgrade("t", 11)) gain = gain.add(upgradeEffect("t",11))
  if (hasUpgrade("c", 11)) gain = gain.mul(2)
  if (hasUpgrade("t", 13)) gain = gain.mul(upgradeEffect("t",13))
  gain = gain.mul(tmp.tdr.rollSumEffect);
  if (hasUpgrade("c",14)) gain=gain.pow(1.25)

    return gain;
}

function addedPlayerData() {
    return {};
}

const displayThings = [];

function isEndgame() {
    return player.points.gte("e280000000");
}

const backgroundStyle = {};

function maxTickLength() {
    return 3600;
}

function fixOldSave(oldVersion) {}
