const modInfo = {
    name: "The ??? Tree",
    id: "mymod",
    author: "nobody",
    pointsName: "points",
    modFiles: ["layers.js", "tree.js", "Oleg's layer/cheese.js"],
    discordName: "",
    discordLink: "",
    initialStartPoints: Decimal.dTen, // Used for hard resets and new players
    offlineLimit: 1 // In hours
};

// Set your version in num and name
let VERSION = {
    num: "0.0",
    name: "Literally nothing"
};

const changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`;

let winText =
    "Congratulations! You have reached the end and beaten this game, but for now...";

const doNotCallTheseFunctionsEveryTick = [];

function getStartPoints() {
    return modInfo.initialStartPoints;
}

function canGenPoints() {
    return true;
}

function getPointGen() {
    if (!canGenPoints()) return new Decimal(0);

    let gain = new Decimal(1);
	if(tmp.cheese.currentState==6) gain = gain.mul(0.5)
    return gain;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
    return {};
}

// Display extra things at the top of the page
const displayThings = [];

// Determines when the game "ends"
function isEndgame() {
    return player.points.gte("e280000000");
}

// Less important things beyond this point!

// Style for the background, can be a function
const backgroundStyle = {};

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
    return 3600; // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}
