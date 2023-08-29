addLayer("lore", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        };
    },
    color: "#123456", // The color for this layer, which affects many elements.
    row: "side", // The row this layer is on (0 is the first row).
    symbol: "L", // The row this layer is on (0 is the first row).

    layerShown() {
        return true;
    }, // Returns a bool for if this layer's node should be visible in the tree.


    tabFormat: [

    ],
});
