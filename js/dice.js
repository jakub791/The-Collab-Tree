addLayer("tdr", {
    name: "The Daily Roll",
    symbol() {
        return `${player.tdr.points.toNumber()}d${tmp.tdr.effect}`;
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero,
            totalroll: Decimal.dZero,
            lastRoll: "",
            rollType: "additive",
            cooldown: 0
        };
    },
    color: "#4BDC13",
    effectDescription() {
        return `each having ${formatWhole(tmp.tdr.effect)} sides.`;
    },
    effect: Decimal.dTwo,
    requires: Decimal.dTen,
    resource: "dice",
    baseResource: "points",
    baseAmount() {
        return player.points;
    },
    type: "static",
    base: 10,
    exponent: Decimal.dOne,
    gainMult: Decimal.dOne,
    gainExp: Decimal.dOne,
    row: 0,
    hotkeys: [
        {
            key: "d",
            description: "D: Obtain some dice",
            onPress() {
                if (canReset("tdr")) doReset("tdr");
            }
        }
    ],
    layerShown: true,
    rollSumEffect() {
        const effect = player.tdr.totalroll.add(Decimal.dOne);
        const eponent = Decimal.dOne;
        return effect.pow(eponent);
    },
    roll() {
        const rolls = [];
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
        let score = Decimal.dZero;
        if (player.tdr.rollType === "additive") {
            score = rolls.reduce(
                (accumulated, current) => accumulated.add(current),
                Decimal.dZero
            );
        } else {
            score = rolls.reduce(
                (accumulated, current) => accumulated.mul(current),
                Decimal.dOne
            );
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
                return `Roll your dice.
                Cooldown: ${formatTime(player.tdr.cooldown)}`;
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
            unlocked: true,
            content: [
                "main-display",
                "prestige-button",
                [
                    "display-text",
                    () =>
                        `Your rolls have added up to ${formatWhole(
                            player.tdr.totalroll
                        )}, multiplying point gain by ${format(
                            tmp.tdr.rollSumEffect
                        )}`
                ],
                "blank",
                "clickables",
                "blank",
                ["display-text", () => `Latest roll: ${player.tdr.lastRoll}`]
            ]
        }
    }
});
