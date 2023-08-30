addLayer("P", {
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero
        };
    },
    color: "#FFFFFF",
    resource: "Points",
    row: 0,
    position: 0,
    baseResource: "points",
    baseAmount() {
        return player.points;
    },
    requires: Decimal.dTen,
    type: "none",
    layerShown: true,
    tabFormat: [
        [
            "display-text",
            () => `You have ${format(player.points)} points<br><br>`
        ]
    ]
});
