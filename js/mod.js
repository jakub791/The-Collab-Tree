let modInfo = {
	name: "Shenanigans Tree.",
	id: "olegat",
	author: "Oleg (Holy Broly#0530)",
	pointsName: "plots",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
    offlineLimit: 8760,  // In hours
    initialStartPoints: new Decimal (0) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
	num: "0.35",
	name: "Butter Biscuit Update... Wait, what?",
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

	let gain = new Decimal(0.01666666666666666666666666666667).mul(new Decimal(2).pow(player.s.buyables[21]));
        let hahaSoftcapGoBrrrrrrrr = new Decimal(1024).div(player.s.buyables[21].add(1).mul(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10)))
        if (inChallenge("s", 12)) {
            if (player.s.buyables[11] > 900) gain = gain.div(new Decimal(10).add(buyableEffect("s", 11).sub(10)))
            else gain = gain.div(new Decimal(10))
	}
        else gain = gain.mul(buyableEffect("s", 11))
        if (hasUpgrade("s", 11)) gain = gain.times(new Decimal(60));
        if (hasUpgrade("s", 12)) gain = gain.times(upgradeEffect("s", 12));
        if (hasUpgrade("s", 13) && player.s.buyables[51].eq(2) && inChallenge("s", 21)) gain = gain.tetrate(upgradeEffect("s", 13));
        else if (hasUpgrade("s", 13) && player.s.buyables[51].eq(1) && inChallenge("s", 21)) gain = gain.pow(upgradeEffect("s", 13));
        else if (hasUpgrade("s", 13)) gain = gain.times(upgradeEffect("s", 13));
		if (hasUpgrade("c", 21)) gain = gain.mul(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10))
        if (inChallenge("s", 11)) gain = gain.tetrate(new Decimal(0.5));
        if (inChallenge("s", 21)) gain = gain.tetrate(new Decimal(0.000000000000000000000000000000000001)).pow(buyableEffect("s", 12))
        if (inChallenge("s", 21)) { 
        if (gain.gt(new Decimal(2))) gain = new Decimal(1).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(4096).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(3))) gain = new Decimal(2).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(13824).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(4))) gain = new Decimal(3).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(65536).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(5))) gain = new Decimal(4).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(400000).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(6))) gain = new Decimal(5).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(2985984).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(7))) gain = new Decimal(6).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(26353376).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(8))) gain = new Decimal(7).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(268435456).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(9))) gain = new Decimal(8).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(3099363912).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(10))) gain = new Decimal(9).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(40000000000).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(11))) gain = new Decimal(10).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(570623341222).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(12))) gain = new Decimal(11).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(8916100448256).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(13))) gain = new Decimal(12).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(151437553296126.5).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(14))) gain = new Decimal(13).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(2778001706389504).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(15))) gain = new Decimal(14).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(54736736297607421.875).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(16))) gain = new Decimal(15).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(1152921504606846976).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(17))) gain = new Decimal(16).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(25851258183948023880.53125).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(18))) gain = new Decimal(17).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(614787626176508399616).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(19))) gain = new Decimal(18).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(15456403559846199915031.0859375).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(20))) gain = new Decimal(19).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(409600000000000000000000).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(21))) gain = new Decimal(20).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(11411302770285122112072508.634766)).max(1))
        if (gain.gt(new Decimal(22))) gain = new Decimal(21).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(333425661488495661520162816).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(23))) gain = new Decimal(22).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(10195541015550738298024918413.363).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(24))) gain = new Decimal(23).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(325619086145088897570576531456).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(25))) gain = new Decimal(24).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(10842021724855044340074528008699).div(layers.t.effect())).max(1))
        if (gain.gt(new Decimal(26))) gain = new Decimal(25).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(375739720471628253832804827172860).div(layers.t.effect())).max(1))
		if (gain.gt(new Decimal(27))) gain = new Decimal(26).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(13532302497651299131721485309422000).div(layers.t.effect())).max(1))
		if (gain.gt(new Decimal(28))) gain = new Decimal(27).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(505760545551351545144237186483220000).div(layers.t.effect())).max(1))
		if (gain.gt(new Decimal(29))) gain = new Decimal(28).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(19589890694894494129652620046471000000).div(layers.t.effect())).max(1))
        if (hasMilestone("c", 2)) gain = gain.add(0.5)
        if (gain.gte(new Decimal(30))) gain = new Decimal(30)
		}
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
