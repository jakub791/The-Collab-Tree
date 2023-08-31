addLayer("je", {
  startData() {
    return {
      unlocked: true,
      points: Decimal.dZero,
    };
  },
  color: "purple", // The color for this layer, which affects many elements.
  row: 1, // The row this layer is on (0 is the first row).
  symbol: "JE", // The row this layer is on (0 is the first row).
  position: 10,
  layerShown() {
    return true;
  }, // Returns a bool for if this layer's node should be visible in the tree.
  upgrades: {
    // Look in the upgrades docs to see what goes here!
  },
  requires: new Decimal(3e9), // Can be a function that takes requirement increases into account
  resource: "Jacorbian Energy", // Name of prestige currency
  baseResource: "tuberculosis", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  branches: ["cv", "tb"], // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.44, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  hotkeys: [
    {
      key: "j",
      description: "J: Gain Jacorbian Energy",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],

  tabFormat: [
        "main-display",
        "prestige-button",
        ["raw-html", function () { return "<audio controls autoplay loop hidden><source src=music/jacorbtab.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>"  }],
      ],
});
