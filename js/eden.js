addLayer("e", {
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero
        };
    },
    color: "#E0E1CC",
    resource: "prestige points",
    row: 1,

    baseResource: "points",
    baseAmount() {
        return player.points;
    },
    requires: Decimal.dTen,
    type: "normal",
    exponent: 0.5,
    gainMult: Decimal.dOne,
    gainExp: Decimal.dOne,
    layerShown: true
});
