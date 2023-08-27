addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero
        };
    },
    color: "#4BDC13",
    requires: Decimal.dTen,
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {
        return player.points;
    },
    type: "normal",
    exponent: 0.5,
    gainMult: Decimal.dOne,
    gainExp: Decimal.dOne,
    row: 0,
    hotkeys: [
        {
            key: "p",
            description: "P: Reset for prestige points",
            onPress() {
                if (canReset("p")) doReset("p");
            }
        }
    ],
    layerShown: true
});
