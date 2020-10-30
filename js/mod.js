let modInfo = {
	name: "Shenanigans Tree.",
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
	num: "0.3",
	name: "Expect for the next layer in 5 hours.",
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

	let gain = new Decimal(0.01666666666666666666666666666667)
        if (player.s.buyables[21] > 0.999) gain = gain.mul(new Decimal(2).pow(player.s.buyables[21]));
        if (inChallenge("s", 12)) {
            if (player.s.buyables[11] > 900) gain = gain.div(new Decimal(10).add(buyableEffect("s", 11).sub(10)))
            else gain = gain.div(new Decimal(10))
	}
        else gain = gain.mul(buyableEffect("s", 11))
        if (hasUpgrade("s", 11)) gain = gain.times(new Decimal(60));
        if (hasUpgrade("s", 12)) gain = gain.times(upgradeEffect("s", 12));
        if (hasUpgrade("s", 13) && player[this.layer].buyables[51].eq(2) && inChallenge("s", 21)) gain = gain.tetrate(upgradeEffect("s", 13));
        else if (hasUpgrade("s", 13) && player[this.layer].buyables[51].eq(1) && inChallenge("s", 21)) gain = gain.pow(upgradeEffect("s", 13));
        else if (hasUpgrade("s", 13)) gain = gain.times(upgradeEffect("s", 13));
        if (inChallenge("s", 11)) gain = gain.tetrate(new Decimal(0.5));
        if (inChallenge("s", 21)) gain = gain.tetrate(new Decimal(0.000000000000000000000000000000000001)).pow(buyableEffect("s", 12))
        let hahaSoftcapGoBrrrrrrrr = new Decimal(10).div(player.s.buyables[21])
        if (inChallenge("s", 21) && gain.gt(new Decimal(2))) gain = new Decimal(1).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(2).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(3))) gain = new Decimal(2).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(3).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(4))) gain = new Decimal(3).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(4).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(5))) gain = new Decimal(4).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(5).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(6))) gain = new Decimal(5).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(6).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(7))) gain = new Decimal(6).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(7).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(8))) gain = new Decimal(7).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(8).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(9))) gain = new Decimal(8).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(9).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(10))) gain = new Decimal(9).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(10).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(11))) gain = new Decimal(10).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(11).max(1))
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
	return player.points.gte(new Decimal("1eee420"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}
