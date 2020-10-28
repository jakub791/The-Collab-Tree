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
	num: "0.2.1.3.1.5",
	name: "It's 5:17AM already, go to sleep.",
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

	let gain = new Decimal(0.01666666666666666666666666666667).mul(player.s.buyables[21].mul(new Decimal(2).pow(player.s.buyables[21])).max(1));
        if (inChallenge("s", 12)) gain = gain.mul(buyableEffect("s", 11).div(buyableEffect("s", 11).pow(2)))
        else gain = gain.mul(buyableEffect("s", 11))
        if (hasUpgrade("s", 11)) gain = gain.times(new Decimal(60));
        if (hasUpgrade("s", 12)) gain = gain.times(upgradeEffect("s", 12));
        if (hasUpgrade("s", 13) && upgradeEffect("s", 13).gt(1)) gain = gain.times(upgradeEffect("s", 13));
        if (inChallenge("s", 11)) gain = gain.tetrate(new Decimal(0.5));
        if (inChallenge("s", 21)) gain = gain.tetrate(new Decimal(0.000000000000000000000000000000000001)).pow(buyableEffect("s", 12))
        let hahaSoftcapGoBrrrrrrrr = new Decimal(1024)
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.01))) gain = new Decimal(0.01).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(100).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.02))) gain = new Decimal(0.02).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(200).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.03))) gain = new Decimal(0.03).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(300).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.04))) gain = new Decimal(0.04).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(400).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.05))) gain = new Decimal(0.05).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(500).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.06))) gain = new Decimal(0.06).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(600).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.07))) gain = new Decimal(0.07).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(700).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.08))) gain = new Decimal(0.08).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(800).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.09))) gain = new Decimal(0.09).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(900).max(1))
        if (inChallenge("s", 21) && gain.gt(new Decimal(1.1))) gain = new Decimal(0.1).add(gain.log(new Decimal(2).tetrate(hahaSoftcapGoBrrrrrrrr)).root(1000).max(1))
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
