addLayer("s", {
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            upgradeTime: new Decimal(0),
        };},

        name: "Shenanigans",
        color: "#420420",
        resource: "shenanigans",
        row: 0,
        resetDescription: "Obliterate your plots for ",
        baseResource: "plots",
        baseAmount() {return player.points},
        requires() { if (inChallenge("s", 11) || inChallenge("s", 12) || inChallenge("s", 21)) return new Decimal(Infinity)
                     else return new Decimal(1)
                   },
        type: "normal",
        exponent: 0.5,

        gainMult() {
            let mult = new Decimal(1)
			if (player.a.achievementsLol >= 6) mult = mult.mul(6)
			if (player.ab.points >= 1) mult = new Decimal(0.5)
			if (player.c.unlocked) mult = mult.mul(layers.c.effect())
            if (player.s.buyables[21] >= 1) mult = mult.mul(new Decimal(2).pow(player.s.buyables[21]).root(2));
            if (hasUpgrade("s", 33)) mult = mult.mul(upgradeEffect("s", 33));
			if (hasChallenge("s", 11) && hasAchievement("a", 16)) mult = mult.mul(3)
            else if (hasChallenge("s", 11)) mult = mult.mul(3)
            if (hasUpgrade("s", 34)) mult = mult.mul(buyableEffect("s", 11).sub(1).div(10).add(1))
            if (inChallenge("s", 11) || inChallenge("s", 12) || inChallenge("s", 21)) mult = new Decimal(0)
            return mult;
        },
        gainExp() {
            return new Decimal(1);
        },

        update(diff) {
        if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13).gt(1) && player.ab.points >= 1 && hasAchievement("a", 15)) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(diff * 2)
        else if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13).gt(1) && player.ab.points >= 1) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(diff * 4)
        else if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13).gt(1)) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(diff)
        if(player[this.layer].upgradeTime.gt(60)) player[this.layer].upgradeTime = new Decimal(60)
        if(hasChallenge(this.layer, 12) && hasAchievement("a", 16)) player.s.buyables[11] = player.s.buyables[11].add(diff*15)
        else if(hasChallenge(this.layer, 12)) player.s.buyables[11] = player.s.buyables[11].add(diff*10)
	},

        layerShown() {return true;},

        tabFormat: {
            "Shenanigans": {
                buttonStyle() {return  {'color': 'white'};},
                content:
                    ["main-display",
                    "prestige-button",
                    ["blank", "5px"], // Height
                    "upgrades", "clickables", "challenges"],
        },
            "Impatience": {
                buttonStyle() {return  {'border-color': 'red', 'color': 'red'};},
                content:
                    [
                    ["display-text",
                    function() {
                                let absolutecost = new Decimal(100)
                                let absoluteoof
                                if (player.s.buyables[21] >= 1) { for (absoluteoof = 0; absoluteoof < player.s.buyables[21]; absoluteoof++) {
                                absolutecost = absolutecost.sub(absolutecost.div(10))
                                }
								}
                                if (player.s.buyables[21] >= 0) return player.s.buyables[21] >= 1 ? "You have " + format(player.s.buyables[21]) + " softcap warpers, lowering the Impatience upgrades's costs by " + format(new Decimal(100).sub(absolutecost)) + "%, increasing plot gain by " + format(new Decimal(2).pow(player.s.buyables[21])) + "x, shenanigans gain by " + format(new Decimal(2).pow(player.s.buyables[21]).root(2)) + " and weakening softcaps's tetration by " + format(player.s.buyables[21].add(1).mul(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10))) + "/." : ""
								else return player.s.buyables[21] <= -1 ? "You have " + format(player.s.buyables[21]) + " softcap warpers, increasing the Impatience upgrades's costs by 10.00%, increasing plot gain by " + format(new Decimal(2).pow(player.s.buyables[21])) + "x, shenanigans gain by " + format(new Decimal(2).pow(player.s.buyables[21]).root(2)) + " and strengthing softcaps's tetration by " + format(new Decimal(2).div(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10))) + "x." : ""},
                    {"color": "dark purple", "font-size": "25px",}],
                    ["blank", "5px"],
                    ["display-text",
                    function() {let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
						        if (getPointGen().mag < new Decimal(29).mul(Adapter).add(0.5) && hasMilestone("c", 2)) return getPointGen().mag >= new Decimal(2).mul(Adapter) && inChallenge("s", 21) ? format(getPointGen().mag - (new Decimal(1).mul(Adapter).add(1))) + " out of 28 softcap levels are currently activated." : ""
                                else if (getPointGen().mag < new Decimal(29).mul(Adapter)) return getPointGen().mag >= new Decimal(2).mul(Adapter) && inChallenge("s", 21) ? format(getPointGen().mag - (new Decimal(1).mul(Adapter))) + " out of 28 softcap levels are currently activated." : ""
                                else return inChallenge("s", 21) ? "28 out of 28 softcap levels are currently activated." : ""},
                    {"color": "white", "font-size": "15px",}],
                    ["blank", "5px"],
                    ["display-text",
                    function() {let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
						        return getPointGen().mag >= new Decimal(30).mul(Adapter) && inChallenge("s", 21) ? "get hardcapped lmao." : ""},
                    {"color": "white", "font-size": "10px", "font-family": "Comic Sans MS",}],
                    ["blank", "5px"],
                    ["row", [["column", [["buyable", 11]]], ["blank", "14px"], ["column", [["buyable", 12]]]]], ["blank", "14px"], ["buyable", 21], ["blank", "14px"], ["buyable", 31], ["blank", "14px"], ["buyable", 41], ["blank", "14px"], ["buyable", 51], ["blank", "14px"], ["buyable", 61], ["blank", "14px"], ["buyable", 71]],
        },
    },

    upgrades: {
        rows: 7,
        cols: 4,
        11: {
            title: "Every 60 seconds, a minute passes in real life.",
            description: "Boosts your plot gain by ALOT.",
            cost: new Decimal(1),
        },
        12: {
            title: "Vibing.",
            description: "Boosts your plot gain by unspent shenanigans.",
            cost: new Decimal(10),
            unlocked(){ 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 11);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 2 && hasUpgrade("s", 11)) unlockable = true
                return unlockable
            },
            effect() {
				let vibeCheck = new Decimal(1)
				if (hasAchievement("a", 12)) vibeCheck = player.s.points.root(2)
                let ret = player[this.layer].points.add(1).root(new Decimal(2).root(vibeCheck));
                if (hasUpgrade("s", 21)) ret = ret.pow(upgradeEffect("s", 21));
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 2) ret = ret
                else if (inChallenge("s", 21)) ret = new Decimal(1);
                if (inChallenge("s", 21) && player[this.layer].buyables[71] >= 1 && player[this.layer].buyables[61] >= 2) ret = ret.mul(buyableEffect("s", 71));
				if (ret > 1.79e308 && !inChallenge("s", 21)) ret = 1.79e308
                return ret;
            },
            effectDisplay() {
				if (this.effect() >= 1.79e308) return format(this.effect()) + "x (Hardcapped)"
                else return format(this.effect()) + "x";
            },
        },
        13: {
            title: "Degrading Upgrade.",
            description() {if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(2)) return "Boosts your plot gain by ^^5 initally and decreases over time."
                    else if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(1)) return "Boosts your plot gain by ^5 initally and decreases over time."
                    else return "Boosts your plot gain by 5x initally and decreases over time."
	    },
            cost: new Decimal(1200),
            unlocked(){ 
                if(inChallenge("s", 11)) return false;
                else return hasUpgrade(this.layer, 22);                
            },
            effect () {
                let zatime = new Decimal(5)
                zatime = zatime.sub(player[this.layer].upgradeTime.div(15))
                if(inChallenge("s", 11)) zatime = new Decimal(1)
                if(hasMilestone("c", 5)) zatime = new Decimal(5)
                return zatime
            },
            effectDisplay() {
                if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(2)) return "^^" + format(this.effect());
                else if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(1)) return "^" + format(this.effect());
                else return format(this.effect()) + "x";
            },
        },
        14: {
            title: "Negotiator.",
            description: "Unlocks a button, which resets \"Degrading Upgrade.\"'s effect.",
            cost: new Decimal(1800),
            unlocked(){ 
                if(inChallenge("s", 11)) return false;
                else return hasUpgrade(this.layer, 13) && !hasMilestone("c", 5); 
            },
        },
        21: {
            title: "Tiny desk exponent.",
            description() {
                if (hasAchievement("a", 13)) return "Adds ^1.05 to \"Vibing.\" upgrade and boosts \"A.E...?\" by 1.05x."
			    else return "Adds ^1.05 to \"Vibing.\" upgrade."
			},
            cost: new Decimal(20),
            unlocked(){ 
                return hasUpgrade(this.layer, 12);
            },
            effect() {
                let ret = new Decimal(1.05);
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if(inChallenge("s", 21) && player[this.layer].buyables[51] >= 1) ret = ret.pow(buyableEffect("s", 12));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        22: {
            title: "Supreme Hexagonity.",
            description: "Unlocks 3 more upgrades, 2 challenges and halves \"But enough grinding, have at you!\"'s root effect.",
            cost: new Decimal(999),
            unlocked(){ 
                return hasUpgrade(this.layer, 21);
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#1a9cb2',
                    'border-color': '#00353F',
                    'height': '200px',
                    'width': '200px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id))  return {
                            'height': '200px',
                            'width':  '200px',
                        }
                    return {
                            'background-color': '#00353F', 
                            'border-color': '#1a9cb2',
                            'height': '200px',
                            'width':  '200px',
		        }
	          },
	    },
        23: {
            title: "Another exponent...?",
            description: "Adds another ^1.05 to both \"T.D.E.\" and \"Vibing.\" upgrades.",
            cost: new Decimal(100),
            unlocked(){ 
                return hasUpgrade(this.layer, 21);
            },
            effect() {
                let ret = new Decimal(1.05);
                if (hasUpgrade("s", 21) && hasAchievement("a", 13)) ret = ret.mul(1.05);
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if (inChallenge("s", 21) && player[this.layer].buyables[51] >= 1) ret = ret.pow(buyableEffect("s", 12));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        31: {
            title: "But enough grinding, have at you!",
            description: "Exponents most of upgrades around \"S.H.\" based on unspent points.",
            cost: new Decimal(250),
            unlocked() { 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 23);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 1 && hasUpgrade("s", 23)) unlockable = true
                return unlockable
            },
            effect() {
                let ret = {};
				if (hasAchievement("a", 14) && hasUpgrade("s", 22)) ret = player.points.add(1).root(16);
                else if (hasUpgrade("s", 22)) ret = player.points.add(1).root(32);
                else ret = player.points.add(1).root(64);
                if (hasUpgrade("s", 32)) ret = ret.pow(1.42).pow(1.42);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 1) ret = ret.pow(buyableEffect("s", 12));
                else if(inChallenge("s", 21)) ret = new Decimal(1);
                if (ret.gt(2)) ret = ret.log(84).add(1.8435622116579284502939499524034);
                if (ret.gt(3)) ret = ret.log(422).add(2.8853355548008346985287640482641);
                if (ret.gt(4)) ret = ret.log(35448).add(3.9338336244075997599970639650263);
                if (ret.gt(5)) ret = ret.log(new Decimal(422).pow(84)).add(4.9986349470809623178396281434317);
                if (ret.gt(6)) ret = ret.log(new Decimal(84).pow(422)).add(5.9996292943404216313988008292711);
                if (ret.gte(9000)) ret = new Decimal(8999.99);
                return ret;
            },
            effectDisplay() {
            if (this.effect().gte(9000)) return "^" + format(this.effect()) + " (Hardcapped)"
            else if (this.effect().gt(2)) return "^" + format(this.effect()) + " (Softcapped)";
            else return "^" + format(this.effect());
	    },
        },
        32: {
            title: "Tetrate-inator.",
            description: "Exponents the upgrade left to it by 1.420. Twice.",
            cost: new Decimal(400),
            unlocked(){ 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 31);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 1 && hasUpgrade("s", 23)) unlockable = true
                return unlockable
            },
            effectDisplay() {
                return "^1.42^1.42";
            },
        },
        33: {
            title: "haha shenanigans go brrrr.",
            description: "Boosts shenanigans gain by the passed time at reduced rate.",
            cost: new Decimal(2500),
            unlocked(){ 
                return hasUpgrade(this.layer, 22);
            },
            effect() {
            let ret = new Decimal(1).mul((new Decimal(player.timePlayed)).max(1).log(60).add(1));
            if (inChallenge("s", 21) && player[this.layer].buyables[51] >= 1) ret = ret.pow(buyableEffect("s", 12));
            return ret
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        34: {
            title: "Ughh...",
            description: "\"Predicted boredom.\" now weakly boosts shenanigans gain too, apparently.",
            cost: new Decimal(15000),
            unlocked(){ 
                return hasUpgrade(this.layer, 22);
            },
        },
    },
    buyables: {
        rows: 7,
        cols: 2,
        11: {
            title: "Predicted boredom.",
            unlocked() { return player[this.layer].unlocked; }, 
            canAfford() { return false; },
            buy() {
            if (hasChallenge("s", 12)) player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id]
            else player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
        },
            effect() {
            let eff = player[this.layer].buyables[this.id].mul(0.01).add(1)
            if (inChallenge("s", 11)) eff = eff.pow(2)
		    if (hasUpgrade("t", 31)) eff = eff.pow(3)
            return eff;
        },
        display() { // Everything else displayed in the buyable button after the title
            if (inChallenge("s", 12) && hasUpgrade("s", 34) && player.s.buyables[11] > 900) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(new Decimal(1).div(new Decimal(10).add(buyableEffect("s", 11).sub(10)))) + "x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
            else if (inChallenge("s", 12) && hasUpgrade("s", 34)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by 0.1x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
            else if (inChallenge("s", 12) && player[this.layer].buyables[this.id] > 900) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(new Decimal(1).div(new Decimal(10).add(buyableEffect("s", 11).sub(10)))) + "x.";
            else if (inChallenge("s", 12)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by 0.1x.";
            else if (hasUpgrade("s", 34)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(buyableEffect(this.layer, this.id)) + "x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
            else return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(buyableEffect(this.layer, this.id)) + "x.";
	    },
        style() {
            if(player[this.layer].unlocked) return {
                'background-color': '#808080',
                'border-color': '#707070',
                'height': '175px',
                'width': '250px'
                }
                return {
                'border-color': '#707070',
                'height': '175px',
                'width': '250px'
		}
	    },
	},
        12: {
            title: "Impatient Transformation.",
            unlocked() { return inChallenge("s", 21); }, 
            canAfford() { return false; },
            buy() {;
        },
            effect() {
            let eff = player.points.div(100).add(1)
            eff = eff.pow(player.points.max(1))
            if (player.s.buyables[41] >= 1) eff = eff.pow(buyableEffect("s", 41))
            return eff;
        },
        display() {
        return "\"Really? No, seriously, this game is a buggy mess.\" You said. \"How does that dude think I'm gonna reach such a goal without these two ever-expanding upgrades? I swear to god, I WILL bend this game to my will, even if that means I'll have to break the game.\" Your impatience is getting transformed into anger, exponentionally boosting your plots gain and it's own effect by ^"  + format(buyableEffect(this.layer, this.id)) + "."; 
	},
        style() {
            if(player[this.layer].unlocked) return {
                'background-color': '#AE4242',
                'border-color': '#9D3131',
                'height': '175px',
                'width': '250px'
                }
                return {
                'background-color': '#AE4242',
                'border-color': '#9D3131',
                'height': '175px',
                'width': '250px'
		}
	    },
	},
        21: {
            title: "Warp of Nonsense.",
            unlocked() { if(hasUpgrade("c", 22)) return inChallenge("s", 21) && getPointGen().mag >= new Decimal(2).mul(upgradeEffect("c", 22))
                         else return inChallenge("s", 21) && getPointGen().mag >= 2 }, 
            canAfford() { if(hasUpgrade("c", 22)) return getPointGen().mag >= new Decimal(2).add(player[this.layer].buyables[this.id]).mul(upgradeEffect("c", 22))
                          else return getPointGen().mag >= new Decimal(2).add(player[this.layer].buyables[this.id]) },
            buy() { 
			if (!hasMilestone("t", 2)) {
            if (hasMilestone("c", 3)) layerDataReset("s", ["buyables", "challenges"])
            else layerDataReset("s", ["buyables"])
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player[this.layer].buyables[11] = new Decimal(0)
            player[this.layer].buyables[41] = new Decimal(0)
            player[this.layer].buyables[51] = new Decimal(0)
            player[this.layer].buyables[61] = new Decimal(0)
            if (hasMilestone("c", 1)) player[this.layer].buyables[71] = player[this.layer].buyables[71]
            else player[this.layer].buyables[71] = new Decimal(0)
            player.points = new Decimal(0)
			}
			else player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        display() { // Everything else displayed in the buyable button after the title
            if(hasUpgrade("c", 22)) return "As you were about to hyperinflate the hell out of this layer, your plot gain suddenly got softcapped tremendously. You've lost your hope, knowing that it's basically impossible to complete this challenge... Until you notice this mythical button. <br> Pressing it will reset your progress. In exchange, you'll be granted with a single softcap warper, which decreases Impatience upgrades's cost, boosts your plot and shenanigans gain and weakens \"The Endgamer\"'s softcaps. <br> You need to generate " + format(new Decimal(2).add(player[this.layer].buyables[this.id]).mul(upgradeEffect("c", 22))) + " plots per second in order to reset."
			else return "As you were about to hyperinflate the hell out of this layer, your plot gain suddenly got softcapped tremendously. You've lost your hope, knowing that it's basically impossible to complete this challenge... Until you notice this mythical button. <br> Pressing it will reset your progress. In exchange, you'll be granted with a single softcap warper, which decreases Impatience upgrades's cost, boosts your plot and shenanigans gain and weakens \"The Endgamer\"'s softcaps. <br> You need to generate " + format(new Decimal(2).add(player[this.layer].buyables[this.id])) + " plots per second in order to reset.";
	    },
        style() {
            if(player[this.layer].unlocked) return {
                    'background-color': '#c37fd0',
                    'border-color': '#b26ebf',
                    'height': '250px',
                    'width': '250px',
                    }
                    else if (!canAffordBuyable(this.layer, this.id)) return {
                    'height': '250px',
                    'width': '250px',
		    }
                    return {
                    'background-color': '#6e3978',
                    'border-color': '#5d7867',
                    'height': '250px',
                    'width': '250px',
		}
	    },
	},
        31: {
            title: "Predict unpredicted boredom.",
            unlocked() { if (hasChallenge("s", 12)) return false; 
                         else return player[this.layer].unlocked;}, 
            canAfford() { return true },
            buy() {
            player[this.layer].buyables[11] = player[this.layer].buyables[11].add(1);
            },
            style() { if (player[this.layer].unlocked) return {
            'height': '54px',
            'width': '200px',
	            }
                },
	    },
        41: {
            title: "Hatred.",
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[41].cost()) },
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost1 = new Decimal(10)
                let oof1
                if (player.s.buyables[21] >= 0) { for (oof1 = 0; oof1 < player.s.buyables[21]; oof1++) {
                cost1 = cost1.sub(cost1.div(10))
                }
				}
				else cost1 = new Decimal(11)
                let cost = new Decimal(10).sub(new Decimal(10).sub(cost1)).mul(new Decimal(1.1).pow(x))
                return cost
            },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[41].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            effect() {
            return player.points.max(1).pow(player[this.layer].buyables[this.id].max(1)).mul(layers.c.effect()).mul(player.points.max(1).pow(player[this.layer].buyables[this.id].max(1).mul(layers.c.effect())))
	    },
            display() {
                if (player[this.layer].buyables[41].gte(1)) return "\"Impatience Transformation\"'s effect will be now exponented by ^(" + format(player.points.max(1).pow(player[this.layer].buyables[this.id].add(1).max(1)).mul(layers.c.effect())) + " x " + format(player.points.max(1).pow(player[this.layer].buyables[this.id].add(1).max(1)).mul(layers.c.effect())) + ") instead. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                else return "\"Impatience Transformation\"'s effect will be exponented by ^(" + format(player.points.max(1).mul(layers.c.effect())) + " x " + format(player.points.max(1).mul(layers.c.effect())) + "). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                },
            style() {
                    if (player.points.gte(layers["s"].buyables[41].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[41].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
                    return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
        51: {
            title: "Ascended Annoyance.",
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[51].cost()) && player[this.layer].buyables[this.id].lt(2) },
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost2 = new Decimal(150)
                let oof2
                if (player.s.buyables[21] >= 0) { for (oof2 = 0; oof2 < player.s.buyables[21]; oof2++) {
                cost2 = cost2.sub(cost2.div(10))
                }
				}
				else cost2 = new Decimal(165)
                let cost = new Decimal(150).sub(new Decimal(150).sub(cost2)).mul(new Decimal(4).pow(x))
                return cost
            },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[51].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {if (player[this.layer].buyables[61].gte(1) && player[this.layer].buyables[this.id].eq(0)) return "\"Impatience Transformation\" boosts all the upgrades (excluding \"Every 60 seconds, a minute passes in real life.\", \"Tetrate-inator\" and instead of boosting \"Degrading Upgrade.\" like the rest of upgrades, it's multiplier is replaced by ^). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                       else if (player[this.layer].buyables[this.id].eq(0)) return "\"Impatience Transformation\" boosts all the upgrades (excluding \"Every 60 seconds, a minute passes in real life.\" and instead of boosting \"Degrading Upgrade.\" like the rest of upgrades, it's multiplier is replaced by ^). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                       if (player[this.layer].buyables[this.id].eq(1)) return "\"Degrading Upgrade.\"'s exponent is replaced with tetration. <nr> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                       if (player[this.layer].buyables[this.id].eq(2)) return "[LOCKED]"
		       },
            style() {
                    if (player[this.layer].buyables[this.id].gte(2)) return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
                    else if (player.points.gte(layers["s"].buyables[51].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[51].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
        61: {
            title: "THE GREATEST SHENANIGANS.",
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[61].cost()) && player[this.layer].buyables[this.id].lt(2)},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost3 = new Decimal(10)
                let oof3
                if (player.s.buyables[21] >= 0) { for (oof3 = 0; oof3 < player.s.buyables[21]; oof3++) {
                cost3 = cost3.sub(cost3.div(10))
                }
				}
				else cost3 = new Decimal(11)
                let cost = new Decimal(10).sub(new Decimal(10).sub(cost3)).mul(new Decimal(1.5).pow(x))
                return cost
            },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[61].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {
                if(player[this.layer].buyables[this.id].eq(0)) return "Nullifies some of second part of \"The Endgamer\"'s effect, bringing you back two out of three previously removed upgrades. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                if(player[this.layer].buyables[this.id].eq(1)) return "Nullifies second part of \"The Endgamer\"'s effect completely, bringing you back \"Vibing.\" upgrade. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                if(player[this.layer].buyables[this.id].eq(2)) return "\"I've upgraded enough. I'm satisfied.\""
            },
            style() {
                    if (player[this.layer].buyables[this.id].gte(2)) return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
                    else if (player.points.gte(layers["s"].buyables[61].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[61].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
        71: {
            title() {
                let seventeenone2 = new Decimal(100)
                let seventeenonesvalue2
                for (seventeenonesvalue2 = 0; seventeenonesvalue2 < player.s.buyables[71]; seventeenonesvalue2++) {
                seventeenone2 = seventeenone2.pow(seventeenone2)
                }
                if (player[this.layer].buyables[71].gte(1)) return "DUCK IT, I'M " + format(seventeenone2) + " TIMES MORE BUFFED NOW."
                else return "DUCK IT, I'M 100 TIMES MORE BUFFED NOW."
	    },
            unlocked(){
                return inChallenge(this.layer, 21) && player[this.layer].buyables[61].gte(2);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[71].cost())},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost4 = new Decimal(10)
                let oof4
                if (player.s.buyables[21] >= 0) { for (oof4 = 0; oof4 < player.s.buyables[21]; oof4++) {
                cost4 = cost4.sub(cost4.div(10))
                }
				}
				else cost4 = new Decimal(11)
                let cost = new Decimal(10).sub(new Decimal(10).sub(cost4)).mul(new Decimal(2.5).pow(x))
                return cost
            },
            effect() {
            let seventeenone = new Decimal(100)
            let seventeenonesvalue
            for (seventeenonesvalue = 1; seventeenonesvalue < player.s.buyables[71]; seventeenonesvalue++) {
            seventeenone = seventeenone.pow(seventeenone)
            }
            if (player[this.layer].buyables[71].gte(2)) return seventeenone
            else if (player[this.layer].buyables[71].eq(1)) return new Decimal(100)
	    },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[71].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {
                if (player[this.layer].buyables[71].eq(0)) return "You know what? Let's just crank the #%@& up and boost \"Vibing.\" upgrade by 100 times. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                else if (player[this.layer].buyables[71].eq(1)) return "Exponents \"Vibing.\" upgrade by itself (NOW THAT'S A LOT OF MULTIPLIER). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                else if (player[this.layer].buyables[71].gte(2)) return "Exponents \"Vibing.\" upgrade by itself, again (HOW ABOUT A LITTLE MORE?). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
            },
            style() {
                    if (player.points.gte(layers["s"].buyables[71].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[71].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
                    return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
    },
clickables: {
        rows: 1,
        cols: 1,
        masterButtonPress() {
        if (player[this.layer].upgradeTime.eq(60) || hasMilestone("c", 0)) return player[this.layer].upgradeTime = new Decimal(0);
        },
        masterButtonText() {
        if (player[this.layer].upgradeTime.lt(60) && hasMilestone("c", 0)) return "Reset 3rd upgrade's effect.";
        else if (player[this.layer].upgradeTime.lt(60)) return "Wait for " + Math.round(new Decimal(60).sub(player[this.layer].upgradeTime)) + " more second(s).";
        if (player[this.layer].upgradeTime.eq(60)) return "Reset 3rd upgrade's effect.";
	},// **optional** text to display on the Master Button
        showMasterButton() {
        if(inChallenge("s", 11)) return false;
        else return hasUpgrade(this.layer, 14) && !hasMilestone("c", 5);
        },
    },
    challenges: {
        rows: 2,
        cols: 2,
        11: {
            name: "Typical Challenge",
            challengeDescription() {if(hasUpgrade(this.layer, 34)) return "Tetrates your plot gain by 0.5 and removes \"Degrading Upgrade.\" and \"Negotiator.\", but \"Predicted boredom.\"'s first effect is increased to the power of 2.";
                                   else return "Tetrates your plot gain by 0.5 and removes \"Degrading Upgrade.\" and \"Negotiator.\", but \"Predicted boredom.\"'s effect is increased to the power of 2."
	    },
            unlocked() {
                return hasUpgrade(this.layer, 22) || hasMilestone("c", 3) && hasChallenge("s", 11);
            },
            rewardDescription() {
                if(hasAchievement("a", 16)) return "Quintuples your shenanigans gain because you were a good boy."
				else return "Triples your shenanigans gain because you were a good boy."
			},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("24000"),
	},
        12: {
            name: "The Reverser",
            challengeDescription() {if(hasUpgrade(this.layer, 34)) return "\"Predicted boredom.\"'s first effect is divided by ten and then some (scales up once \"Predicted boredom.\"'s first effect reaches 10.01x)."
                                    else return "\"Predicted boredom.\"'s effect is divided by ten and then some (scales up once \"Predicted boredom.\"'s effect reaches 10.01x)."
	    },
            unlocked() {
                return hasUpgrade(this.layer, 22) || hasMilestone("c", 3) && hasChallenge("s", 12);
            },
            rewardDescription() {
                if(hasAchievement("a", 16)) return "You lose the ability to gain \"Predict boredom.\" by yourself and \"Predict boredom.\" becomes passive, growing up at the rate of 15 clicks per second."
				else return "You lose the ability to gain \"Predict boredom.\" by yourself and \"Predict boredom.\" becomes passive, growing up at the rate of 10 clicks per second."
			},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("50000"),
	},
        21: {
            name: "The Endgamer",
            challengeDescription: "Tetrates your plots gain by undecillionth times and removes \"Vibing.\", \"B.E.G,H.A.Y!\" and \"Tetrate-inator.\" upgrades. (Don't even think about bursting through it with hyperinflation, smartass).",
            unlocked() {
                return hasChallenge(this.layer, 11) && hasChallenge(this.layer, 12);
            },
            rewardDescription: "no.",
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("1e420"),
	},
    },
	hotkeys: [
		{ key: "s", desc: "S: Reset for shenanigans.", onPress() { doReset(this.layer); } },
	],
    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row == layers.ab.row) {
        layerDataReset("s")
        player.s.buyables[21] = new Decimal(-1)
		player.s.buyables[11] = new Decimal(-99)
		player.s.upgrades = [11]
		player.c.upgrades = [32]
        }
        else if(layers[resettingLayer].row > this.row) {
        if(hasMilestone("c", 4))  layerDataReset("s",["upgrades"])
		if(player.ab.points >= 1) {
		player.s.buyables[11] = new Decimal(-99)
		}
	    else layerDataReset("s")
		if(player.ab.points >= 1) {
		player.s.buyables[11] = new Decimal(-99)
		}
        }
    },
});

addLayer("c", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                    // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
            best: new Decimal(0),
            total: new Decimal(0),
            chaoticEnergy: new Decimal(0),
        }},
        effect() {
            eff = player.c.points.add(1).pow(player.c.points.add(1))
            return eff
        },
        effectDescription() {
            return "boosting your shenanigans gain and \"Hatred.\"'s effect by " + format(this.effect()) + "x."
        },
    midsection: [
        ["display-text", function() {if(hasUpgrade("c", 21) && player.c.chaoticEnergy < 0) return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect and plot gain by 0.01x."
			                         else if(hasUpgrade("c", 21)) return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect and plot gain by " + format(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10)) + "x."
		                             else if (player.c.chaoticEnergy < 0) return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect by 0.01x."
		                             else return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect by " + format(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10)) + "x."},
        {"color": "white", "font-size": "17.6px",}],
    ],
        name: "Chaos",
        color: "#6d6dc0",                       // The color for this layer, which affects many elements
        resource: "condensed chaoses",            // The name of this layer's main prestige resource
        row: 1,                                 // The row this layer is on (0 is the first row)
        resetDescription: "YEET all of your softcap warpers into the void for ",
        baseResource() {if (player.s.buyables[21] >= 1 || player[this.layer].total >= 1 || player.ab.points >= 1) return "softcap warpers"
                        else return "???"
		       },                 // The name of the resource your prestige gain is based on
        baseAmount() {return player.s.buyables[21]},    // A function to return the current value of that resource

        requires: new Decimal(2),            // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
        
        type: "static",                         // Determines the formula used for calculating prestige currency.
        base: 1.5,
        exponent: 1,                          // "normal" prestige gain is (currency^exponent)
        roundUpCost: true,
	    canBuyMax() {return hasMilestone("t", 0)},
		position: 1,

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },

        update(diff) {
			let chaoticGrowth = diff
			if(hasUpgrade(this.layer, 11)) chaoticGrowth = chaoticGrowth * upgradeEffect("c", 11)
            if(hasUpgrade(this.layer, 12)) player[this.layer].chaoticEnergy = player[this.layer].chaoticEnergy.add(chaoticGrowth)
            if(hasMilestone("c", 3)) generatePoints("s", diff / 100)
	},

        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return true},             // Returns a bool for if this layer's node should be visible in the tree.

        branches: [["s"]],

        milestones: {
            0: {
               requirementDescription: "1 Condensed Chaos",
               effectDescription: "Allows you to reset \"Degrading Upgrade.\"'s effect whenever you want.",
               done: function() {return player.c.best.gte(1)}
               },
            1: {
               requirementDescription: "2 Condensed Chaoses",
               effectDescription: "You keep your \"DUCK IT, I'M (insert the current number here) TIMES MORE BUFFED.\" upgrades on \"Warp of Nonsense.\" reset.",
               done: function() {return player.c.best.gte(2)}
               },
            2: {
               requirementDescription: "3 Condensed Chaoses",
               effectDescription: "You'll gain +0.5 plots per second (that are immune against softcaps.) in \"The Endgamer.\" challenge.",
               done: function() {return player.c.best.gte(3)}
               },
            3: {
               requirementDescription: "4 Condensed Chaoses",
               effectDescription: "You keep both \"Typical Challenge\" and \"The Reverser\" challenges completion on \"Warp of Nonsense.\" reset. You also gain 1% of shenanigans gain per second.",
               done: function() {return player.c.best.gte(4) && player.ab.points == 0}
               },
            4: {
               requirementDescription: "5 Condensed Chaoses",
               effectDescription: "You keep Shenanigans upgrades on Chaos reset.",
               done: function() {return player.c.best.gte(5)},
			   },
            5: {
               requirementDescription: "7 Condensed Chaoses",
               effectDescription: "\"Degrading Upgrade\"'s effect never decreases. Period.",
               done: function() {return player.c.best.gte(7)},
			   },
	},

    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "Warp Dilation.",
            description: "Softcap warpers boosts your chaotic energy production.",
            cost: new Decimal(1),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
			effect() {
			return player.s.buyables[21].add(1).root(1.35)
            },
			effectDisplay() {
            return format(this.effect()) + "x";
            },
		    },
		12: {
            title: "Endless Possibilities.",
            description: "Generates one chaotic energy per second.",
            cost: new Decimal(1),
		    },
		13: {
            title: "Full House.",
            description: "You permanently keep one Impatience upgrade each on \"Warp of Nonsense.\".",
            cost: new Decimal(1),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
			effect() {
			if (player.s.buyables[41] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[41] = new Decimal(1)
			else player.s.buyables[41] = player.s.buyables[41]
			if (player.s.buyables[51] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[51] = new Decimal(1)
			else player.s.buyables[51] = player.s.buyables[51]
			if (player.s.buyables[61] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[61] = new Decimal(1)
			else player.s.buyables[61] = player.s.buyables[61]
            if (hasMilestone("c", 1) && player.s.buyables[71] < 1) player.s.buyables[71] = new Decimal(1)
            else if (hasMilestone("c", 1)) player.s.buyables[71] = player.s.buyables[71]
			else if (player.s.buyables[71] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[71] = new Decimal(1)
			},
            },
        21: {
            title: "Live and Learn.",
            description: "Chaotic energies boosts your plot gain too.",
            cost: new Decimal(3),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
		    },
        22: {
            title: "Box of C.B.B.",
            description: "\"Warp of Nonsense.\"'s reqirement is decreased by 10% (where the hell did this box came from anyways?).",
            cost: new Decimal(3),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
			effect() {
			if(hasUpgrade("t", 21)) return new Decimal(0.9).mul(upgradeEffect("t", 21))
		    else return new Decimal(0.9)
			},
			effectDisplay() {
            return format(new Decimal(100).sub(this.effect().mul(100))) + "%";
		    },
		    },
        31: {
            title() {let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
				     if (hasUpgrade(this.layer, 32) || getPointGen().mag >= new Decimal(30).mul(Adapter)) return "Open Your Heart,"
			         else return "Open Your Heart."
		    },
            description: "Unlocks a new layer.",
            cost: new Decimal(10),
            currencyLocation() {return player.s.buyables},
            currencyDisplayName: "softcap warpers",
            currencyInternalName: 21,
			unlocked(){ 
            return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, 22); 
            },
		    },
        32: {
            title: "It's Was Terrible.",
            description: "Unlocks an another layer... Wait, what?",
            cost: new Decimal(194),
            currencyLocation() {return player.s.buyables},
            currencyDisplayName: "softcap warpers",
            currencyInternalName: 21,
			unlocked(){let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
            return getPointGen().mag >= new Decimal(30).mul(Adapter) || hasUpgrade(this.layer, 32); 
            },
		    },
        },
	hotkeys: [
		{ key: "c", desc: "C: Reset for condensed chaoses.", onPress() { doReset(this.layer); } },
	],
    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row == layers.ab.row) {
        layerDataReset("c")
        player.c.chaoticEnergy = new Decimal(-2000)
        }
        else if(layers[resettingLayer].row > this.row) {
        layerDataReset("c")
        }
    },
    });
	
addLayer("t", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                    // You can add more variables here to add them to your layer.
            points: new Decimal(1),             // "points" is the internal name for the main resource of the layer.
        }},

        update(diff) {
			let TransPower = new Decimal(1)
			if(hasMilestone("t", 1) && hasUpgrade("t", 11) && hasUpgrade("t", 32)) TransPower = TransPower.add(player.t.points.log(player.t.points.root(1.7)))
		    else if(hasMilestone("t", 1) && hasUpgrade("t", 11)) TransPower = TransPower.add(player.t.points.log(player.t.points.root(1.8)))
			else if(hasMilestone("t", 1)) TransPower = TransPower.add(player.t.points.log(player.t.points.root(2)))
		    if(hasUpgrade("c", 31) && hasUpgrade("t", 32) && hasUpgrade("t", 33)) player.t.points = player.t.points.add(new Decimal(diff).mul(TransPower).mul(new Decimal(4.5).mul(upgradeEffect("t", 33))))
			else if(hasUpgrade("c", 31) && hasUpgrade("t", 32)) player.t.points = player.t.points.add(new Decimal(diff).mul(TransPower).mul(4.5))
		    else if(hasUpgrade("c", 31) && hasUpgrade("t", 33)) player.t.points = player.t.points.add(new Decimal(diff).mul(TransPower).mul(new Decimal(3).mul(upgradeEffect("t", 33))))
			else if(hasUpgrade("c", 31) && hasUpgrade("t", 22)) player.t.points = player.t.points.add(new Decimal(diff).mul(TransPower).mul(3))
		    else if(hasUpgrade("c", 31)) player.t.points = player.t.points.add(new Decimal(diff).mul(TransPower))
	},

        color: "#fefbaa",                       // The color for this layer, which affects many elements
        resource: "Transcended points",            // The name of this layer's main prestige resource
        row: 1,                                 // The row this layer is on (0 is the first row)

        baseResource: "Transcended points",                 // The name of the resource your prestige gain is based on
        baseAmount() {return player.t.points},    // A function to return the current value of that resource
		position: 3,

		effect() {
            eff = player.t.points.add(1).log(3).max(1)
            return eff
        },
        effectDescription() {
            return "nerfing softcap's root effect by " + format(this.effect()) + "/."
        },
        type: "none",                         // Determines the formula used for calculating prestige currency.
		
        branches: [["s"], ["c"]],

        layerShown() {return hasUpgrade("c", 31)},             // Returns a bool for if this layer's node should be visible in the tree.
  milestones: {
           0: {
               requirementDescription: "Unlock Transcendence layer",
               effectDescription: "You can bulk buy condensed chaoses now.",
               done: function() {return hasUpgrade("c", 31)}
               },
           1: {
               requirementDescription() {
			   if (player.ab.points >= 1) return "60 Transcended points"
			   else return "10 Transcended points"
			   },
               effectDescription: "Transcended points gain is now stronger based on transcended points.",
               done: function() {if (player.ab.points >= 1) return player.t.points.gte(60)
			                     else return player.t.points.gte(10)},
               },
           2: {
               requirementDescription() {
			   if (player.ab.points >= 1) return "10000 Transcended points"
			   else return "5000 Transcended points"
			   },
               effectDescription: "\"Warp of Nonsense.\" no longer resets anything.",
               done: function() {if (player.ab.points >= 1) return player.t.points.gte(10000)
				                 else return player.t.points.gte(5000)},
               },
	},
	upgrades: {
	    rows: 4,
        cols: 3,
		  11: {
			   title: "Ascended Transcendence.",
               description: "2nd milestone's effect is buffed.",
               cost: new Decimal(75),		   
			   },
		  21: {
			   title: "Transcended C.B.B.",
               description: "\"Box of C.B.B.\"'s effect is stronger based on Transcendence upgrades.",
               cost: new Decimal(300),
			   unlocked(){ 
               return hasUpgrade(this.layer, 11); 
               },
               effect() {
                   let eff = new Decimal(0.9)
                   if(hasUpgrade("t", 32)) eff = new Decimal(0.85)
				   if(hasUpgrade("t", 21)) return new Decimal(eff).pow(player.t.upgrades.length).mul(upgradeEffect("t", 41))
                   else return new Decimal(eff).pow(player.t.upgrades.length)	   
			   },
               effectDisplay() {
                   return "+" + format(new Decimal(100).sub(upgradeEffect("c", 22).mul(100)).sub(10)) + "%";
               },
		       },
		  22: {
			   title: "M O R E .",
               description: "Your transcendend points gain is tripled.",
               cost: new Decimal(400),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 11); 
               },			   
			   },
		  31: {
			   title: "AND THIS IS... TO GO... EVEN FURTHER BEYOND!",
               description: "Predicted boredom's effect is heavily buffed.",
               cost: new Decimal(1500),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22); 
               },			   
			   },
		  32: {
			   title: "Peace and Tranquility",
               description: "Boosts upgrades above by 1.5x.",
               cost: new Decimal(3000),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22); 
               },			   
			   },
		  33: {
			   title: "Goal is relative too.",
               description: "\"haha shenanigans go brrrr.\" boosts transcended points gain at reduced rate.",
               cost: new Decimal(1800),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22); 
               },			   
			   effect() {
               return new Decimal(1).mul((new Decimal(player.timePlayed)).max(1).log(60).add(1)).root(2)
			   },
			   effectDisplay() {
			   return format(this.effect()) + "x"
		       },
		       },
		  41: {
			   title: "Yo dawg, I heard you liked references...",
               description: "\"T.C.B.B.\"'s effect is stronger based on Chaos upgrades.",
               cost: new Decimal(35),	
               currencyLocation() {return player.s.buyables},
               currencyDisplayName: "softcap warpers",
               currencyInternalName: 21,			   
			   unlocked(){ 
               return hasUpgrade(this.layer, 31) && hasUpgrade(this.layer, 32) && hasUpgrade(this.layer, 33); 
               },			   
               effect() {
                   return new Decimal(0.9).pow(player.c.upgrades.length)					   
			   },
               effectDisplay() {
                   return "+???%";
               },
		       },
	},
});

addLayer("ab", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                    // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        color: "#006080",                       // The color for this layer, which affects many elements
        resource: "anti-balancers",            // The name of this layer's main prestige resource
        row: 2,                                 // The row this layer is on (0 is the first row
		symbol: "AB",
		effect(){
		let eff = player.ab.points.mul(10)
		return eff
		},
		effectDescription() {
			return "increasins hardcap's limit by " + format(this.effect()) + " plots per second."
		},

        midsection: [
        ["display-text", function() {if(player.ab.points.eq(0))  return "The current mod: N/A <br> <br> The next mod: NG-"
	                                 else if(player.ab.points.eq(1)) return "Current mod: NG- <br> <br> The next mod: NG--"
		                             else if(player.ab.points.eq(2)) return "Current mod: NG-- <br> <br> The next mod: NG---"
		                             else if(player.ab.points.eq(3)) return "Current mod: NG--- <br> <br> The next mod: NG----"
		                             else if(player.ab.points.eq(4)) return "Current mod: NG---- <br> <br> The next mod: NG-----"
		                             else if(player.ab.points.eq(5)) return "Current mod: NG----- <br> <br> The next mod: NG+... wait."
		                             },
        {"color": "white", "font-size": "17.6px",}],
        ],

        baseResource: "plots per second",                 // The name of the resource your prestige gain is based on
        baseAmount() {return getPointGen()},    // A function to return the current value of that resource

        requires(){
		if(inChallenge("s", 21)){
        if(player.ab.points.eq(0)) return new Decimal(30)
	    else if(player.ab.points.eq(1)) return new Decimal(41)
		else if(player.ab.points.eq(2)) return new Decimal(50)
		else if(player.ab.points.eq(3)) return new Decimal(60)
		else if(player.ab.points.eq(4)) return new Decimal(70)
		else if(player.ab.points.eq(5)) return new Decimal(80)
		}
	    else return new Decimal(Infinity)
		},

        resetDescription: "Abandon your progress entirely, getting ",
        
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 1.7e308,                          // "normal" prestige gain is (currency^exponent)
	    canBuyMax() {return false},

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return inChallenge("s", 21) && hasUpgrade("c", 32) || player.ab.points >= 1},             // Returns a bool for if this layer's node should be visible in the tree.

        branches: [["s"]],
    });

addLayer("a", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                    // You can add more variables here to add them to your layer.
			achievementsLol: new Decimal(0)
        }},

        color() {
			if(player.a.achievementsLol == 6) return "#5AC467"
            else return "A3A3A3"
		},

        row: "side",                                 // The row this layer is on (0 is the first row)

        baseAmount() {return player.ab.points},    // A function to return the current value of that resource

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return player.ab.points >= 1},             // Returns a bool for if this layer's node should be visible in the tree.
		
        tooltip() {
			return "Achievements"
		},
		
        tabFormat: {
			"Achievements": {
                buttonStyle() {return  {'border-color': 'lime', 'color': 'white'};},
                content:
				    ["main-display",
                    ["display-text",
                    function() {if (player.a.achievementsLol < 6) return player.a.achievementsLol + " out of 6 achievements are completed."
					            else return "6 out of 6 achievements are completed. <br> You've got 1 bad Bingo Pungo, multiplying your plot and shenanigans gain by 6x."},
                    {"color": "white", "font-size": "17px", "font-family": "Inconsolata"}],
                    "achievements"],
            },
	    },
		
        achievements: {
        rows: 1,
        cols: 6,
        11: {
            name: "The Beginning of End",
			done() {return player.ab.points.gte(1)},
            tooltip: "Do your first Anti-Balance reset. \n Reward: You get to keep your first upgrade, so you wouldn't literally die from boredom.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		12: {
            name: "Vibe Check",
			done() {return hasUpgrade("s", 12) && player.ab.points.gte(1)},
            tooltip: "Get \"Vibing.\" upgrade. \n Reward: \"Vibing.\"'s root effect is weakened based on your unspent shenanigans.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
		},
		13: {
			name: "It's Raining Exponents!",
			done() {return hasUpgrade("s", 21) && hasUpgrade("s", 23) && hasUpgrade("s", 31) && hasUpgrade("s", 32) && player.ab.points.gte(1)},
			tooltip: "Get all 3 exponent-based Shenanigans upgrades. \n Reward: \"Tiny Desk Exponent.\" boosts \"Another Exponent...?\" back.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		14: {
            name: "Hyper Hexagonest",
			done() {return hasUpgrade("s", 22) && player.ab.points.gte(1)},
            tooltip: "Get \"Supreme Hexagonity.\" upgrade. \n Reward: \"Supreme Hexagonity.\" halves \"B.E.G,H.A.Y!\"'s root effect again.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		15: {
            name: "Megaupgrade",
			done() {return hasUpgrade("s", 14) && hasUpgrade("s", 32) && hasUpgrade("s", 22) && hasUpgrade("s", 34) && player.ab.points.gte(1)},
            tooltip: "Get all of Shenanigans upgrades. \n Reward: \"Degrading Upgrade.\"'s effect decreases twice slower.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		16: {
            name: "Truthgod",
			done() {return hasChallenge("s", 11) && hasChallenge("s", 12) && player.ab.points.gte(1)},
            tooltip: "Complete the first two Shenanigans challenges. \n Reward: Shenanigans challenges has better rewards.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
    },
    })
