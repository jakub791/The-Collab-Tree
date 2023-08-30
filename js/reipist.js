addLayer("poi", {
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero
        };
    },
    color: "#FFFFFF",
    resource: "Points",
    row: "side",
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
    ],
    upgrades: {
      11: {
        title: "Lazy Upgrade...",
        description: "Multiply point gain by 2.",
        cost: new Decimal(100)
      },
        12: {
        title: "Crazy? I was crazy once...",
        description: "Multiply point gain based on Upgrades.",
        cost: new Decimal(1000)
      },
      
    }
});
