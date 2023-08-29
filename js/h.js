addLayer("t", {
  name: "Time",
  symbol: "T",
  position: 0,
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      time: new Decimal(1),
    };
  },
  color: "",
  row: 0,
  layerShown: true,


  // ACTUAL CODE HERE ONWARDS
  update(delta) {
    player.t.time = player.t.time.add((tmp.t.timeCalculation).mul(delta))
  },
  timeCalculation() {
    let base = new Decimal(1)
    base = base.mul(buyableEffect("t", "FasterTimeI"))

    return base
  },
  buyables: {
    "FasterTimeI": {
      title: `<t class='CTextS'>Time Fowarding</t>`,
      description: `1.25x Time Speed`,
      cost(x) { return new Decimal.pow(2, x).pow(2, x) },
      effect(x) {
        let pow = new Decimal(1.75)
        pow = pow.add(buyableEffect(this.layer, "BetterBaseI"))
        return new Decimal.pow(pow, x)
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `<t class='CTextXS'>Times Bought: ${format(SV, 0)}
               ${format(S.effect)}x Time Speed<br>
               Cost: ${formatTime(S.cost)} Time</t>`
      },
      buy() {
        player[this.layer].time = player[this.layer].time.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].time.gte(this.cost())
      }
    },
    "BetterBaseI": {
      title: `<t class='CTextS'>Time Streching</t>`,
      description: ``,
      cost(x) { return new Decimal.pow(3, x).pow(2, x).mul(500) },
      effect(x) { return new Decimal.mul(0.125, x) },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var SV = player[this.layer].buyables[this.id]
        return `<t class='CTextXS'>Times Bought: ${format(SV, 0)}
                    +${format(S.effect)} Time Forwarding base<br>
                    Cost: ${formatTime(S.cost)} Time</t>`
      },
      buy() {
        player[this.layer].time = player[this.layer].time.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].time.gte(this.cost())
      },
      unlocked() {
        return player[this.layer].buyables["FasterTimeI"].gte(5)
      }
    }
  },
  tabFormat: {
    "Main": {
      content: [
      ['raw-html', () => { return `<t class="CText">Time is at <t class="W-Highlighter">${formatTime(player.t.time)}</t></t>` }],
      ['raw-html', () => { return `<t class="CTextS">Time moves at speed of  <t class="W-Highlighter">${formatTime(tmp.t.timeCalculation)}</t> / sec</t>` }],
      "blank",
      "blank",
      ["row", [["buyable", "FasterTimeI"], ["buyable", "BetterBaseI"]]]
      ]
    }
  }
});