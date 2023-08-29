addLayer("t", {
    name: "Time",
    symbol: "T",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero,
            time: Decimal.dOne
        };
    },
    color: "",
    row: 0,
    layerShown: true,

    // ACTUAL CODE HERE ONWARDS
    update(delta) {
        player.t.time = player.t.time.add(tmp.t.timeCalculation.mul(delta));
    },
    timeCalculation() {
        let base = new Decimal(1);
        base = base.mul(buyableEffect("t", "FasterTimeI"));

        return base;
    },
    buyables: {
        FasterTimeI: {
            title: `<span class="CTextS">Time Fowarding</span>`,
            description: "1.25x Time Speed",
            cost(x) {
                return Decimal.pow(2, x).pow(2, x);
            },
            effect(x) {
                const power = new Decimal(1.75).add(
                    buyableEffect(this.layer, "BetterBaseI")
                );
                return power.pow(x);
            },
            display() {
                return `<span class="CTextXS">Times Bought: ${formatWhole(
                    getBuyableAmount("t", "FasterTimeI")
                )}
               ${format(tmp.t.buyables.FasterTimeI.effect)}x Time Speed<br>
               Cost: ${formatTime(
                   tmp.t.buyables.FasterTimeI.cost
               )} Time</span>`;
            },
            buy() {
                player.t.time = player.t.time.sub(
                    tmp.t.buyables.FasterTimeI.cost
                );
                addBuyables("t", "FasterTimeI", Decimal.dOne);
            },
            canAfford() {
                return player.t.time.gte(tmp.t.buyables.FasterTimeI.cost);
            }
        },
        BetterBaseI: {
            title: `<span class="CTextS">Time Streching</span>`,
            description: ``,
            cost(x) {
                return Decimal.pow(3, x).pow(2, x).mul(500);
            },
            effect(x) {
                return x.div(8);
            },
            display() {
                return `<span class="CTextXS">Times Bought: ${formatWhole(
                    getBuyableAmount("t", "BetterBaseI")
                )}
                    +${format(
                        buyableEffect("t", "BetterBaseI")
                    )} Time Forwarding base<br>
                    Cost: ${formatTime(
                        tmp.t.buyables.BetterBaseI.cost
                    )} Time</span>`;
            },
            buy() {
                player.t.time = player.t.time.sub(
                    tmp.t.buyables.BetterBaseI.cost
                );
                addBuyables("t", "BetterBaseI", Decimal.dOne);
            },
            canAfford() {
                return player.t.time.gte(tmp.t.buyables.BetterBaseI.cost);
            },
            unlocked() {
                return player.t.buyables.FasterTimeI.gte(5);
            }
        }
    },
    tabFormat: {
        Main: {
            content: [
                [
                    "raw-html",
                    () => {
                        return `<span class="CText">Time is at <span class="W-Highlighter">${formatTime(
                            player.t.time
                        )}</span></span>`;
                    }
                ],
                [
                    "raw-html",
                    () => {
                        return `<span class="CTextS">Time moves at speed of  <span class="W-Highlighter">${formatTime(
                            tmp.t.timeCalculation
                        )}</span> / sec</span>`;
                    }
                ],
                "blank",
                "blank",
                [
                    "row",
                    [
                        ["buyable", "FasterTimeI"],
                        ["buyable", "BetterBaseI"]
                    ]
                ]
            ]
        }
    }
});
