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
            if (inChallenge("s", 21)) mult = mult.tetrate(new Decimal(0.000000000000000000000000000000000001))
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
                    "upgrades", "milestones", "clickables", "challenges"],
        },
            "Impatience": {
                buttonStyle() {return  {'border-color': 'red', 'color': 'red'};},
                content:
                    [["display-text",
                    function() {return 'You have ' + format(player.s.buyables[11]) + ' predicted boredoms.'},
                    {"color": "gray", "font-size": "32px", "font-family": "Arial"}],
                    "buyables"],
        },
    },

    upgrades: {
        rows: 3,
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
                if(inChallenge("s", 11)) return new Decimal(1)
                else return new Decimal(5).sub(player[this.layer].upgradeTime.div(15))
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
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        22: {
            title: "Supreme Hexagonity.",
            description: "Unlocks a bunch of things and buffs ''B.E.G,H.A.Y!'' upgrade.",
            cost: new Decimal(999),
            unlocked(){ 
                return hasUpgrade(this.layer, 21);
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
                if (inChallenge("s", 21)) return false;
                else return hasUpgrade(this.layer, 23);
            },
            effect() {
                let ret = {};
                if (hasUpgrade("s", 22)) ret = player.points.add(1).root(32);
        else ret = player.points.add(1).root(64);
                if (hasUpgrade("s", 32)) ret = ret.tetrate(upgradeEffect("s", 32));
                if (inChallenge("s", 21)) ret = new Decimal(1)
                return ret;
            },
        },
        32: {
            title: "Tetrate-inator.",
            description: "Tetrates the upgrade left to it by 1.420.",
            cost: new Decimal(400),
            unlocked(){ 
                return hasUpgrade(this.layer, 23);
        },
            effect() {
                let ret = new Decimal(1.42);
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
            return new Decimal(1).mul((new Decimal(player.timePlayed)).max(1).log(60).add(1));
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
        rows: 1,
        cols: 1,
        11: {
            title: "Predict boredom.",
            unlocked(){ return player[this.layer].unlocked; }, 
            canAfford() { return player[this.layer].unlocked; },
            buy() {
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
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
                return hasUpgrade(this.layer, 34);
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
                return hasUpgrade(this.layer, 34);
            },
            rewardDescription: "You gain 10 predicted boredoms per second.",
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("50000"),
	},
        21: {
            name: "The Endgamer",
            challengeDescription: "Tetrates your plots and shenanigans gain by undecillionth times and removes both ''Vibing.'' and ''B.E.G,H.A.Y!'' upgrades. (Don't even think about bursting through it with hyperinflation, smartass).",
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
