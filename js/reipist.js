addLayer("poi", {
  startData() {
    return {
      unlocked: true,
      points: Decimal.dZero,
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
    ["display-text", () => `You have ${format(player.points)} points<br><br>`],
    "blank",
    "upgrades",
  ],
  upgrades: {
    11: {
      title: "Fever.",
      description: "Multiply sickness gain by 2.",
      cost: new Decimal(100),
      currencyDisplayName: "sickness",

      currencyInternalName: "points",
    },
    12: {
      title: "Nausea.",
      description: "Multiply sickness gain based on sickness Upgrades.",
      cost: new Decimal(1000),
      currencyDisplayName: "sickness",

      currencyInternalName: "points",
    },
    13: {
      title: "Bacterial Infection.",
      description: "Unlock Bacteria",
      cost: new Decimal(1e7),
      currencyDisplayName: "sickness",

      currencyInternalName: "points",
    },
  },
});
addLayer("ba", {
  startData() {
    return {
      // startData is a function that returns default data for a layer.
      unlocked: true, // You can add more variables here to add them to your layer.
      points: new Decimal(0), // "points" is the internal name for the main resource of the layer.
    };
  },

  color: "#338844", // The color for this layer, which affects many elements.
  resource: "Bacteria", // The name of this layer's main prestige resource.
  row: 1, // The row this layer is on (0 is the first row).
  position: 2,
  baseResource: "points", // The name of the resource your prestige gain is based on.
  baseAmount() {
    return player.points;
  }, // A function to return the current amount of baseResource.

  requires: new Decimal(1e8), // The amount of the base needed to  gain 1 of the prestige currency.
  // Also the amount required to unlock the layer.

  type: "normal", // Determines the formula used for calculating prestige currency.
  exponent: 0.1, // "normal" prestige gain is (currency^exponent).

  gainMult() {
    // Returns your multiplier to your gain of the prestige resource.
    return new Decimal(1); // Factor in any bonuses multiplying gain here.
  },
  gainExp() {
    // Returns the exponent to your gain of the prestige resource.
    return new Decimal(1);
  },

  layerShown() {
    return hasUpgrade("poi", 13);
  }, // Returns a bool for if this layer's node should be visible in the tree.
  upgrades: {
    11: {
      title: "Pathogens",
      style: { width: "300px" },
      cost: new Decimal(1),
      description() {
        let s = `Per lycoris flower up to 5 unlock a new effect.<br>Keep all bacteria upgrades on Lycoris reset.<br><br><b>Effects:</b>`;
        if (player.e.points.eq(0))
          s += "<br>Oh no, you don't have any lycoris flowers!";
        if (player.e.points.gte(1)) s += "<br>Double Jacorbian Energy gain.";
        if (player.e.points.gte(2)) s += "<br>Dice gain 2 extra sides.";
        if (player.e.points.gte(3)) s += "<br>Tuberculosis gain ^1.05.";
        if (player.e.points.gte(4))
          s +=
            "<br>Bacteria boosts Jacorbian Energy gain. Currently: *" +
            format(tmp.ba.upgrades[11].effect1);
        if (player.e.points.gte(5))
          s += "<br>Unlock a new row of coronavirus upgrades.";
        return s;
      },
      effect1() {
        return player.ba.points.sqrt().add(1);
      },
    },
    21: {
      title: "The Massive QoL Upgrade",
      style: { width: "300px" },
      cost: new Decimal(10),
      description() {
        let s = `Every 2 lycoris flowers unlocks a new effect, up to 10 flowers.<br><br><b>Effects:</b>`;
        if (player.e.points.lt(2))
          s += "<br>Oh no, you don't have enough lycoris flowers!";
        if (player.e.points.gte(2))
          s += "<br>Jacorbian Energy doesn't reset CV or TB upgrades.";
        if (player.e.points.gte(4))
          s += "<br>You always have the 20 dice milestone no matter what.";
        if (player.e.points.gte(6))
          s += "<br>6 6s milestone now only requires 3 6s.";
        if (player.e.points.gte(8))
          s += "<br>The 2 lycoris flower milestone is 50x as powerful.";
        if (player.e.points.gte(10))
          s += "<br>You start lycoris resets with the 10 dice milestone.";
        return s;
      },
    },
  },

  doReset(l) {
    if (l == "e") {
      return;
    }
    if (layers[l].row > this.row) {
      let keep = ["upgrades"];
      layerDataReset(this.layer, keep);
    }
  },
});
