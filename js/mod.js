const modInfo = {
    name: "The Collab Tree",
    id: "mymod",
    author: "incremental_gamer, :;:, niko, thenonymous, downvoid, and jakub",
    pointsName: "points",
    modFiles: [
        "cheese.js",
        "time.js",
        "tree.js",
        "dice.js",
        "reipist.js",
        "lore.js"
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
    gain = gain.mul(tmp.tdr.rollSumEffect);
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
