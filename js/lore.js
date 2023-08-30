addLayer("lore", {
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero
        };
    },
    color: "#567890", // The color for this layer, which affects many elements.
    row: "side", // The row this layer is on (0 is the first row).
    symbol: "L", // The row this layer is on (0 is the first row).

    layerShown() {
        return true;
    }, // Returns a bool for if this layer's node should be visible in the tree.
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    type: "none",                         // Determines the formula used for calculating prestige currency.

    tabFormat: [

    ],
});
