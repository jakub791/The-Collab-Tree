let modInfo = {
	name: "Antimatter Tree.",
	id: "olegat",
	author: "Oleg (Low Poly Pichu#0530)",
	pointsName: "plots",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
    offlineLimit: 8760,  // In hours
    initialStartPoints: new Decimal (0) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
	num: "0.2.1.3.1",
	name: "Fork Update.",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) {
		if (isStuck()) {
			return new Decimal(0.1);
		}
		return new Decimal(0)
	}

	let gain = new Decimal(0.01666666666666666666666666666667);
        if (inChallenge("s", 12)) gain = gain.mul(buyableEffect("s", 11).div(buyableEffect("s", 11).pow(2)))
        else gain = gain.mul(buyableEffect("s", 11))
        if (hasUpgrade("s", 11)) gain = gain.times(new Decimal(60));
        if (hasUpgrade("s", 12)) gain = gain.times(upgradeEffect("s", 12));
        if (hasUpgrade("s", 13) && upgradeEffect("s", 13).gt(1)) gain = gain.times(upgradeEffect("s", 13));
        if (inChallenge("s", 11)) gain = gain.tetrate(new Decimal(0.5));
        if (inChallenge("s", 21)) gain = gain.hexate(new Decimal(0.0001))
	return gain
}

function rowReset(row, layer) {
	for (lr in ROW_LAYERS[row]) {
		if (layers[lr].doReset) {
			player[lr].active = null // Exit challenges on any row reset on an equal or higher row
			layers[lr].doReset(layer)
		}
		else
			if (layers[layer].row > layers[lr].row) fullLayerReset(lr)
	}
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1eee69"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}
