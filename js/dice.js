addLayer("tdr", {
  name: "The Daily Roll",
  symbol() {
    return `${player.tdr.points.toNumber()}d${tmp.tdr.effect}`;
  }, // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: Decimal.dZero,
      totalroll: Decimal.dZero,
      lastRoll: "",
      rollType: "additive",
      cooldown: 0,
    };
  },
  color: "#4BDC13",
  branches: ["cv", "tb"],
  effectDescription() {
    return `each having ${formatWhole(tmp.tdr.effect)} sides.`;
  },
  effect() {
    let sides = new Decimal(2);
    if (hasUpgrade("tb", 14)) sides = sides.add(1);
    sides = sides.add(buyableEffect("tdr", 11));
    return sides;
  },
  requires: Decimal.dTen,
  resource: "dice",
  baseResource: "sickness",
  baseAmount() {
    return player.points;
  },
  type: "static",
  base: 10,
  exponent: Decimal.dOne,
  gainMult: Decimal.dOne,
  gainExp: Decimal.dOne,
  row: 1,
  hotkeys: [
    {
      key: "d",
      description: "D: Obtain some dice",
      onPress() {
        if (canReset("tdr")) doReset("tdr");
      },
    },
  ],
  layerShown() {
    return player.tdr.unlocked || hasUpgrade("cv", 14);
  },
  rollSumEffect() {
    const effect = player.tdr.totalroll.add(1);
    const exponent = Decimal.dOne;
    return effect.pow(exponent);
  },
  roll() {
    const rolls = [];
    for (let i = 0; i < player.tdr.points.toNumber(); i++) {
      rolls.push(
        new Decimal(Math.random())
          .mul(tmp.tdr.effect)
          .floor()
          .add(1)
          .toNumber(),
      );
    }
    player.tdr.lastRoll = rolls.join(", ");
    let score = Decimal.dZero;
    let sixes = 0;
    for (let i of rolls) {
      if (i == 6) sixes++;
    }
    if (sixes >= 6 && !hasMilestone("tdr", 2)) player.tdr.milestones.push(2);
    if (player.tdr.rollType === "additive") {
      score = rolls.reduce(
        (accumulated, current) => accumulated.add(current),
        Decimal.dZero,
      );
    } else {
      score = rolls.reduce(
        (accumulated, current) => accumulated.mul(current),
        Decimal.dOne,
      );
    }
    player.tdr.totalroll = player.tdr.totalroll.add(score);
    return;
  },
  clickables: {
    11: {
      title: "Roll",
      canClick() {
        return player.tdr.cooldown <= 0;
      },
      onClick() {
        layers.tdr.roll();
        player.tdr.cooldown = 86400;
      },
      display() {
        return `Roll your dice.
                Cooldown: ${formatTime(player.tdr.cooldown)}`;
      },
    },
  },
  buyables: {
    11: {
      title: "More spherical dice",
      cost(x = getBuyableAmount(this.layer, this.id)) {
        return new Decimal(100).pow(x.pow(2));
      },
      display() {
        return (
          "Add 1 side to all dice.<br>Cost: " +
          format(this.cost()) +
          " coronavirus<br>Currently: +" +
          formatWhole(getBuyableAmount(this.layer, this.id))
        );
      },
      canAfford() {
        return player.cv.points.gte(this.cost());
      },
      effect() {
        return getBuyableAmount(this.layer, this.id);
      },
      buy() {
        player.cv.points = player.cv.points.sub(this.cost());
        setBuyableAmount(
          this.layer,
          this.id,
          getBuyableAmount(this.layer, this.id).add(1),
        );
      },
      unlocked() {
        return hasMilestone(this.layer, 1);
      },
    },
  },
  milestones: {
    1: {
      requirementDescription: "10 dice",
      effectDescription: "Unlock a buyable",
      done() {
        return player.tdr.points.gte(10);
      },
    },
    2: {
      requirementDescription: "6 6s rolled",
      effectDescription: "Gain 666x coronavirus",
      done() {
        return false;
      },
    },
  },
  update(diff) {
    if (player.tdr.cooldown > 0) {
      player.tdr.cooldown -=
        diff *
        (hasUpgrade("tb", 15)
          ? tmp.t.timeCalculation.add(10).log10().toNumber()
          : 1);
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
              player.tdr.totalroll,
            )}, multiplying point gain by ${format(tmp.tdr.rollSumEffect)}`,
        ],
        "blank",
        "clickables",
        "blank",
        ["display-text", () => `Latest roll: ${player.tdr.lastRoll}`],
        "blank",
        "buyables",
      ],
    },
    Milestones: {
      unlocked() {
        return player.tdr.points.gte(5);
      },
      content: ["milestones"],
    },
  },
});
