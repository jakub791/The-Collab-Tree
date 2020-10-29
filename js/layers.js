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
        requires() {if(inChallenge("s", 11) || inChallenge("s", 12) || inChallenge("s", 21)) return new Decimal("1e9999999")
                    else return new Decimal(1)},
        type: "normal",
        exponent: 0.5,

        gainMult() {
            let mult = new Decimal(1)
            if (player.s.buyables[21] >= 1) mult = mult.mul(new Decimal(2).pow(player.s.buyables[21]).root(2));
            if (hasUpgrade("s", 33)) mult = mult.mul(upgradeEffect("s", 33));
            if (hasChallenge("s", 11)) mult = mult.mul(3)
            if (hasUpgrade("s", 34)) mult = mult.mul(buyableEffect("s", 11).sub(1).div(10).add(1))
            if (inChallenge("s", 21)) mult = new Decimal(0)
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
                    "upgrades", "clickables", "challenges"],
        },
            "Impatience": {
                buttonStyle() {return  {'border-color': 'red', 'color': 'red'};},
                content:
                    [
                    ["display-text",
                    function() {return player.s.buyables[21] >= 1 ? "You have " + format(player.s.buyables[21]) + " softcap warpers, lowering the ''Impatience'' upgrades costs by " + format(player.s.buyables[21].mul(10)) + "%, increasing plot gain by " + format(new Decimal(2).pow(player.s.buyables[21])) + "x, shenanigans gain by " + format(player.s.buyables[21].mul(new Decimal(2).pow(player.s.buyables[21])).root(2)) + " and weakening softcaps's tetration by " + format(player.s.buyables[21].add(1)) + "/." : ""},
                    {"color": "dark purple", "font-size": "25px",}],
                    ["blank", "5px"],
                    ["display-text",
                    function() {return getPointGen().mag >= 1.01 && inChallenge("s", 21) ? ((getPointGen().mag - 1) * 100).floor() + " out of 10 softcap levels are currently activated." : ""},
                    {"color": "white", "font-size": "15px",}],
                    ["blank", "5px"],
                    "buyables"],
        },
    },

    upgrades: {
        rows: 7,
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
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 11);
                if (inChallenge("s", 21) && player[this.layer].buyables[71] >= 1 && hasUpgrade("s", 11)) unlockable = true
                return unlockable
            },
            effect() {
                let ret = player[this.layer].points.add(1).root(2);
                if (hasUpgrade("s", 21)) ret = ret.pow(upgradeEffect("s", 21));
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if (inChallenge("s", 21) && player[this.layer].buyables[71] >= 1) ret = ret.mul(100).pow(buyableEffect("s", 12));
                else if(inChallenge("s", 21)) ret = new Decimal(1);
                return ret;
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        13: {
            title: "Degrading Upgrade.",
            description() {if(inChallenge("s", 21) & player[this.layer].buyables[51] >= 1) return "Boosts your plot gain by ^5 initally and decreases over time."
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
                return zatime
            },
            effectDisplay() {
                if(inChallenge("s", 21) && player[this.layer].buyables[51] >= 1) return "^" + format(this.effect());
                else return format(this.effect()) + "x";
            },
        },
        14: {
            title: "Negotiator.",
            description: "Unlocks a button, which resets ''Degrading Upgrade.'''s effect.",
            cost: new Decimal(1800),
            unlocked(){ 
                if(inChallenge("s", 11)) return false;
                else return hasUpgrade(this.layer, 13); 
            },
        },
        21: {
            title: "Tiny desk exponent.",
            description: "Adds ^1.05 to the previous upgrade.",
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
            description: "Unlocks 3 more upgrades, 2 challenges and halves ''But enough grinding, have at you!'''s root effect.",
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
            description: "Adds another ^1.05 to both ''T.D.E.'' and ''Exponent'' upgrades.",
            cost: new Decimal(100),
            unlocked(){ 
                return hasUpgrade(this.layer, 21);
            },
            effect() {
                let ret = new Decimal(1.05);
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
            description: "Exponents most of upgrades around ''S.H.'' based on unspent points.",
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
                if (hasUpgrade("s", 22)) ret = player.points.add(1).root(32);
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
            description: "Exponents the upgrade left to it by 1.420. Twice.\n\Currently: ^1.42^1.42",
            cost: new Decimal(400),
            unlocked(){ 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 31);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 1 && hasUpgrade("s", 23)) unlockable = true
                return unlockable
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
            description: "Boredom now weakly boosts shenanigans gain too, apparently.",
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
            eff = eff.pow(player.points.max(1)).pow(player.points.max(1))
            if (player.s.buyables[41] >= 1) eff = eff.pow(buyableEffect("s", 41))
            return eff;
        },
        display() {
        return "''Really? No, seriously, this game is a buggy mess.'' You said. ''How does that dude think I'm gonna reach such a goal without these two ever-expanding upgrades? I swear to god, I WILL break this game, even if that means I'll have to destroy this layer forever.'' Your impatience is getting transformed into anger, exponentionally boosting your plots gain, it's effect and growth by ^"  + format(buyableEffect(this.layer, this.id)) + "."; 
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
            title: "Softcap Warper.",
            unlocked() { return inChallenge("s", 21) && getPointGen().mag >= 1.01; }, 
            canAfford() { return getPointGen().mag >= new Decimal(1.01).add(player[this.layer].buyables[this.id].div(100)) },
            buy() { if(getPointGen().mag >= new Decimal(1.01).add(player[this.layer].buyables[this.id].div(100)))
            layerDataReset("s")
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
        },
        display() { // Everything else displayed in the buyable button after the title
            return "As you were about to hyperinflate the hell out of this layer, your plot gain suddenly got softcapped tremendously. You've lost your hope, knowing that it's basically impossible to complete this challenge... Until you notice this button. Pressing it will reset your progress. In exchange, you'll be granted with a single Softcap Warper, which decreases ''Impatience'' upgrade's cost, boosts your plot and shenanigans gain and weakens ''The Endgamer'' softcaps. <br> You need to generate " + new Decimal(1.01).add(player[this.layer].buyables[this.id].div(100)) + " plots per second in order to reset.";
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
            title: "Predict unpredicted boredoms.",
            unlocked() { return player[this.layer].unlocked; }, 
            canAfford() { if (hasChallenge("s", 12)) return false;
                          else return player[this.layer].unlocked;
            },
            buy() {
            player[this.layer].buyables[11] = player[this.layer].buyables[11].add(1);
            },
	},
        41: {
            title: "Hatred.",
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player[this.layer].unlocked },
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost() { 
                return new Decimal(10).mul(new Decimal(2).pow(player[this.layer].buyables[this.id].max(1)))
            },
            buy() {
                let data = tmp[this.layer].buyables[this.id]
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
                player.points = player.points.sub(data.cost)
            },
            effect() {
            return player.points.max(1).pow(player[this.layer].buyables[this.id].max(1)).mul(player.points.max(1).pow(player[this.layer].buyables[this.id].max(1)))
	    },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "''Impatience Transformation'' is now getting both exponented by ^(" + format(player.points.max(1).pow(player[this.layer].buyables[this.id].max(1))) + " x " + format(player.points.max(1).pow(player[this.layer].buyables[this.id].max(1))) + ").\n\Cost: " + format(data.cost) + " plots."
                },
            style() {
                if (player[this.layer].buyables[this.layer] = 684360934543543) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (!canAffordBuyable(this.layer, this.id)) return {
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
            canAfford() { return player[this.layer].unlocked },
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost() { 
                return new Decimal(10).mul(new Decimal(3).pow(player[this.layer].buyables[this.id]))
            },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {if (player[this.layer].buyables[61] >= 1) return "''Impatience Transformation'' boosts all the upgrades (excluding ''Every 60 seconds in real life a minute passes.'', ''Tetrate-inator'' and instead of boosting ''Degrading Upgrade'' like the rest of upgrades, it's multiplier is replaced by ^.)."
                           else return "''Impatience Transformation'' boosts all the upgrades (excluding ''Every 60 seconds in real life a minute passes.'' and instead of boosting ''Degrading Upgrade'' like the rest of upgrades, it's multiplier is replaced by ^.)."},
            style() {
                if (player[this.layer].buyables[this.layer] = 684360934543543) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (!canAffordBuyable(this.layer, this.id)) return {
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
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player[this.layer].buyables[this.id] < 1},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost() { 
                return new Decimal(60)
            },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {
                return "Nullifies some of second part of ''The Endgamer'', bringing you back two out of three previously removed upgrades."
            },
            style() {
                if (player[this.layer].buyables[this.layer] = 684360934543543) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (!canAffordBuyable(this.layer, this.id)) return {
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
        71: {
            title: "DUCK IT, I'M 100X MORE BUFFED NOW.",
            unlocked(){
                return inChallenge(this.layer, 21) && player[this.layer].buyables[61] >= 1;
	    },
            canAfford() { return inChallenge(this.layer, 21)},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost() { 
                return new Decimal(10).mul(new Decimal(7).pow(player[this.layer].buyables[this.id]))
            },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {
                return "Nullifies second part of ''The Endgamer'' completely, bringing you back ''Vibing'' and boosting it by 100x as bonus."
            },
            style() {
                if (player[this.layer].buyables[this.layer] = 684360934543543) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (!canAffordBuyable(this.layer, this.id)) return {
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
            challengeDescription() {if(hasUpgrade(this.layer, 34)) return "Tetrates your plot gain by 0.5 and removes ''Degrading Upgrade.'' and ''Negotiator.'', but predicted boredoms's first effect is increased to the power of 2.";
                                   else return "Tetrates your plot gain by 0.5 and removes ''Degrading Upgrade.'' and ''Negotiator.'', but predicted boredoms's effect is increased to the power of 2."
	    },
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
            challengeDescription() {if(hasUpgrade(this.layer, 34)) return "Predicted boredoms's first effect is divided by ten and then some (scales up once predicted boredom's first effect reaches 10.01x)."
                                    else return "Predicted boredoms's first effect is divided by ten and then some (scales up once predicted boredom's effect reaches 10.01x)."
	    },
            unlocked() {
                return hasUpgrade(this.layer, 22);
            },
            rewardDescription: "''Predict Boredom'' becomes passive, growing up at the rate of 10 clicks per second.",
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("50000"),
	},
        21: {
            name: "The Endgamer",
            challengeDescription: "Tetrates your plots gain by undecillionth times and removes ''Vibing.'', ''B.E.G,H.A.Y!'' and ''Tetrate-inator.'' upgrades. (Don't even think about bursting through it with hyperinflation, smartass).",
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
