addLayer("s", {
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            upgradeTime: new Decimal(0),
        };},

        name: "shenanigans",
        color: "#420420",
        resource: "shenanigans",
        row: 0,

        baseResource: "plots",
        baseAmount() {return player.points;},

        requires: new Decimal(1),
        type: "normal",
        exponent: 0.5,

        gainMult() {
            let mult = new Decimal(1);
            if (hasUpgrade("s", 33)) mult = mult.mul(upgradeEffect("s", 33));
            if (hasChallenge("s", 11)) mult = mult.mul(3)
            if (hasUpgrade("s", 34)) {
            if (inChallenge("s", 12)) mult = mult.mul(buyableEffect("s", 11));
            else mult = mult.mul(buyableEffect("s", 11).sub(1).div(10).add(1))
	    }
            if (inChallenge("s", 21)) mult = mult.tetrate(new Decimal(0.000000000000000000000000000000000001)).pow(buyableEffect("s", 12))
            return mult;
        },
        gainExp() {
            return new Decimal(1);
        },

        update(diff) {
        if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13).gt(1)) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(diff)
        if(player[this.layer].upgradeTime.gt(60)) player[this.layer].upgradeTime = new Decimal(60)
        if(hasChallenge(this.layer, 12)) player.s.buyables[11] = player.s.buyables[11].add(diff*10)
	},

        layerShown() {return true;},

        tabFormat: {
            "Shenanigans": {
                buttonStyle() {return  {'color': 'white'};},
                content:
                    ["main-display",
                    "prestige-button",
                    ["blank", "5px"], // Height
                    ["row", [["column", [["upgrade", 11]],], ["column", [["upgrade", 12]],], ["column", [["upgrade", 13]],], ["column", [["upgrade", 14]],]]], ["row", [["column", [["upgrade", 21]],], ["column", [["upgrade", 22]],], ["column", [["upgrade", 23]],]]], ["row", [["column", [["upgrade", 31]],], ["column", [["upgrade", 32]],], ["column", [["upgrade", 33]],], ["column", [["upgrade", 34]],]]] "clickables", "challenges"],
        },
            "Impatience": {
                buttonStyle() {return  {'border-color': 'red', 'color': 'red'};},
                content:
                    [
                    ["blank", "5px"],
                    "buyables", ["upgrade", 41], ["upgrade", 51], ["upgrade", 61]],
        },
    },

    upgrades: {
        rows: 6,
        cols: 4,
        11: {
            title: "Every 60 seconds in real life a minute passes.",
            description: "Boosts your plot gain by ALOT.",
            cost: new Decimal(1),
        },
        12: {
            title: "Vibing.",
            description: "Boosts your plot gain by unspent shenanigans.",
            cost: new Decimal(10),
            unlocked(){ 
                if(inChallenge("s", 21)) return false;
                else return hasUpgrade(this.layer, 11);
            },
            effect() {
                let ret = player[this.layer].points.add(1).root(2);
                if (hasUpgrade("s", 21)) ret = ret.pow(upgradeEffect("s", 21));
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if (inChallenge("s", 21)) ret = new Decimal(1);
                return ret;
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        13: {
            title: "Degrading Upgrade.",
            description: "Boosts your plot gain by 5x initally and decreases over time.",
            cost: new Decimal(1200),
            unlocked(){ 
                if(inChallenge("s", 11)) return false;
                else return hasUpgrade(this.layer, 22);                
            },
            effect () {
                let zatime = new Decimal(5)
                zatime = zatime.sub(player[this.layer].upgradeTime.div(15))
                if(inChallenge("s", 11)) zatime = new Decimal(1)
                if(inChallenge("s", 21) && hasUpgrade("s", 51)) zatime = zatime.pow(buyableEffect("s", 12));
                return zatime
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        14: {
            title: "Negotiator.",
            description: "Unlocks a button, which resets ''Degrading Upgrade.'''s effect.",
            cost: new Decimal(1800),
            unlocked(){ 
                if(inChallenge("s", 11)) return false;
                else return hasUpgrade(this.layer, 22); 
            },
        },
        21: {
            title: "Tiny desk exponent.",
            description: "Adds ^1.01 to the previous upgrade.",
            cost: new Decimal(20),
            unlocked(){ 
                return hasUpgrade(this.layer, 12);
            },
            effect() {
                let ret = new Decimal(1.01);
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if(inChallenge("s", 21) && hasUpgrade("s", 51)) return ret.pow(buyableEffect("s", 12));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        22: {
            title: "Supreme Hexagonity.",
            description: "Unlocks 4 more upgrades, 2 challenges and halves ''But enough grinding, have at you!'''s root effect.",
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
            description: "Adds another ^1.01 to both ''T.D.E.'' and ''Exponent'' upgrades.",
            cost: new Decimal(100),
            unlocked(){ 
                return hasUpgrade(this.layer, 21);
            },
            effect() {
                let ret = new Decimal(1.01);
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if (inChallenge("s", 21) && hasUpgrade("s", 51)) ret = ret.pow(buyableEffect("s", 12));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        31: {
            title: "But enough grinding, have at you!",
            description: "Exponents most of upgrades around ''S.H.'' based on unspent points.",
            cost: new Decimal(250),
            unlocked() { 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 23);
                if (inChallenge("s", 21) && hasUpgrade("s", 61) && hasUpgrade("s", 23)) unlockable = true
                return unlockable
            },
            effect() {
                let ret = {};
                if (hasUpgrade("s", 22)) ret = player.points.add(1).root(32);
                else ret = player.points.add(1).root(64);
                if (hasUpgrade("s", 32)) ret = ret.tetrate(upgradeEffect("s", 32));
                if (inChallenge("s", 21) && hasUpgrade("s", 61)) ret.pow(buyableEffect("s", 12));
                else if(inChallenge("s", 21)) ret = new Decimal(1);
                return ret;
            },
        },
        32: {
            title: "Tetrate-inator.",
            description: "Tetrates the upgrade left to it by 1.420.",
            cost: new Decimal(400),
            unlocked(){ 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 23);
                if (inChallenge("s", 21) && hasUpgrade("s", 61) && hasUpgrade("s", 23)) unlockable = true
                return unlockable
        },
            effect() {
                let ret = new Decimal(1.42);
                if (inChallenge("s", 21) && hasUpgrade("s", 61)) ret.pow(buyableEffect("s", 12));
                return ret;
            },
            effectDisplay() {
                return "^^1.42";
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
            if (inChallenge("s", 21) && hasUpgrade("s", 51)) ret = ret.pow(buyableEffect("s", 12));
             return ret
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        34: {
            title: "Ughh...",
            description: "Boredom now weakly boosts shenanigans gain too, apparently.",
            cost: new Decimal(15000),
            unlocked(){ 
                return hasUpgrade(this.layer, 22);
            },
        },
        41: {
            title: "Hatred.",
            description() {return "''Impatience Transformation'' is now getting both exponented by ^" + format(player.points) + " and multiplied by " + format(player.points) + "x."},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost: new Decimal(20),
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) return {
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
            description() {return "''Impatience Transformation'' boosts all the upgrades (excluding ''Every 60 seconds in real life a minute passes.''."},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost: new Decimal(30),
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) return {
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
        61: {
            title: "THE GREATEST SHENANIGANS.",
            description() {return "Nullifies some of second part of ''The Endgamer'', bringing you back two out of three previously removed upgrades."},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost: new Decimal(50),
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) return {
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
    buyables: {
        rows: 1,
        cols: 2,
        11: {
            title: "Predict boredom.",
            unlocked() { return player[this.layer].unlocked; }, 
            canAfford() { return player[this.layer].unlocked; },
            buy() {
            if (hasChallenge("s", 12)) player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id]
            else player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
        },
            effect() {
            let eff = player[this.layer].buyables[this.id].mul(0.01).add(1)
            if (inChallenge("s", 11)) eff = eff.pow(2)
            return eff;
        },
        display() { // Everything else displayed in the buyable button after the title
            if (inChallenge("s", 12)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(buyableEffect(this.layer, this.id).div(buyableEffect(this.layer, this.id).pow(2))) + "x and shenanigans gain by " + format(buyableEffect(this.layer, this.id)) + "x.";
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
            title: "Impatience Transformation",
            unlocked() { return inChallenge("s", 21); }, 
            canAfford() { return player[this.layer].unlocked; },
            buy() {;
        },
            effect() {
            let eff = player.points.div(100).add(1)
            eff = eff.pow(player.points.max(1)).pow(player.points.max(1))
            if (hasUpgrade(this.layer, 41)) eff = eff.pow(player.points.mul(player.points).max(1))
            return eff;
        },
        display() {
        return "''Really? No, seriously, this game is a buggy mess.'' You said. ''How does that dude think I'm gonna reach such a goal without these two ever-expanding upgrades? I swear to god, I WILL break this game, even if that means I'll have to destroy this layer forever.'' Your impatience are getting transformed into anger, exponentionally boosting your plot and shenanigans gain, it's effect and growth by ^"  + format(buyableEffect(this.layer, this.id)) + "."; 
	},
        style() {
            if(player[this.layer].unlocked) return {
                'background-color': '#AE4242',
                'border-color': '#9D3131',
                'height': '175px',
                'width': '250px'
                }
                return {
                'border-color': '#9D3131',
                'height': '175px',
                'width': '250px'
		}
	    },
	},
    },
clickables: {
        rows: 1,
        cols: 1,
        masterButtonPress() {
        if (player[this.layer].upgradeTime.eq(60)) return player[this.layer].upgradeTime = new Decimal(0);
        },
        masterButtonText() {
        if (player[this.layer].upgradeTime.lt(60)) return "Wait for " + Math.round(new Decimal(60).sub(player[this.layer].upgradeTime)) + " more second(s).";
        if (player[this.layer].upgradeTime.eq(60)) return "Reset 3rd upgrade's effect.";
	},// **optional** text to display on the Master Button
        showMasterButton() {
        if(inChallenge("s", 11)) return false;
        else return hasUpgrade(this.layer, 14);
        },
    },
    challenges: {
        rows: 2,
        cols: 2,
        11: {
            name: "Typical Challenge",
            challengeDescription: "Tetrates your plot gain by 0.5 and removes ''Degrading Upgrade.'' and ''Negotiator.'', but predicted boredoms's first effect is increased to the power of 2.",
            unlocked() {
                return hasUpgrade(this.layer, 22);
            },
            rewardDescription: "Triples your shenanigans gain because you were a good boy.",
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("24000"),
	},
        12: {
            name: "The Reverser",
            challengeDescription: "Predicted boredoms's first effect is divided by itself twice, making it weaker. In exchange, it's second effect is as powerful as first effect outside this challenge.",
            unlocked() {
                return hasUpgrade(this.layer, 22);
            },
            rewardDescription: "''Predict Boredom'' becomes passive, giving 10 predicted boredoms per second.",
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("50000"),
	},
        21: {
            name: "The Endgamer",
            challengeDescription: "Tetrates your plots and shenanigans gain by undecillionth times and removes ''Vibing.'', ''B.E.G,H.A.Y!'' and ''Tetrate-inator.'' upgrades. (Don't even think about bursting through it with hyperinflation, smartass).",
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
		{ key: "s", desc: "S: Reset for shenanigans", onPress() { doReset(this.layer); } },
	],
});
