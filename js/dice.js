addLayer("tdr", {
    name: "The Daily Roll", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            totalroll: new Decimal(0),
            lastRoll: "",
            rollType: "additive",
            cooldown: 0
        };
    },
    color: "#4BDC13",
    effectDescription() {
        return "each having " + formatWhole(this.effect()) + " sides.";
    },
    effect() {
        let faces = new Decimal(2);
        return faces;
    },
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "dice", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {
        return player.points;
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 10,
    exponent() {
        return 1;
    }, // Prestige currency exponent
    gainMult() {
        // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        // Calculate the exponent on main currency from bonuses
        return new Decimal(1);
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "d",
            description: "D: Obtain some dice",
            onPress() {
                if (canReset(this.layer)) doReset(this.layer);
            }
        }
    ],
    layerShown() {
        return true;
    },
    rollSumEffect() {
        let eff = player.tdr.totalroll.add(1);
        let exp = new Decimal(1);
        return eff.pow(exp);
    },
    roll() {
        let rolls = [];
        for (let i = 0; i < player.tdr.points.toNumber(); i++) {
            rolls.push(
                new Decimal(Math.random())
                    .mul(tmp.tdr.effect)
                    .floor()
                    .add(1)
                    .toNumber()
            );
        }
        player.tdr.lastRoll = rolls.join(", ");
        let score = new Decimal(0);
        if (player.tdr.rollType == "additive") {
            for (let m of rolls) {
                score = score.add(m);
            }
        } else {
            score = new Decimal(1);
            for (let m of rolls) {
                score = score.mul(m);
            }
        }
        player.tdr.totalroll = player.tdr.totalroll.add(score);
        return;
    },
    clickables: {
        11: {
            canClick() {
                return player.tdr.cooldown <= 0;
            },
            onClick() {
                layers.tdr.roll();
                player.tdr.cooldown = 60;
            },
            display() {
                return (
                    "Roll your dice.\nCooldown: " +
                    formatTime(player.tdr.cooldown)
                );
            }
        }
    },
    update(diff) {
        if (player.tdr.cooldown > 0) {
            player.tdr.cooldown -= diff;
        }
        player.tdr.cooldown = Math.max(player.tdr.cooldown, 0);
    },
    tabFormat: {
        Dice: {
            unlocked() {
                return true;
            },
            content: [
                "main-display",
                "prestige-button",
                [
                    "display-text",
                    function () {
                        return (
                            "Your rolls have added up to " +
                            formatWhole(player.tdr.totalroll) +
                            ", multiplying point gain by " +
                            format(tmp.tdr.rollSumEffect)
                        );
                    }
                ],
                "blank",
                "clickables",
                "blank",
                [
                    "display-text",
                    function () {
                        return "Latest roll: " + player.tdr.lastRoll;
                    }
                ]
            ]
        }
    }
});
