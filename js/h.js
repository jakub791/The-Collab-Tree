addLayer("t", {
    name: "Time",
    symbol: "T",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            time: new Decimal(1)
        };
    },
    color: "#4BDC13",
    row: 0,
    layerShown: true,

    // ACTUAL CODE HERE ONWARDS
    update(delta) {
        player.t.time = player.t.time.mul(tmp.t.timeCalculation.pow(delta));
    },
    timeCalculation() {
        let base = new Decimal(1.1);
        base = base.mul(buyableEffect("t", "FasterTimeI"));

        // For Softcap
        let threshold = new Decimal(1e3);
        threshold = threshold.mul(buyableEffect("t", "MoreTimeI"));

        let power = new Decimal(1);
        power = power.div(buyableEffect("t", "MoreTimeI"));
        let log = new Decimal.log(player.t.time, 10).add(1);
        if (player.t.time.gte(threshold)) {
            log = log.sub(3);
            let powerlog = Decimal.pow(log, 3);
            power = power.mul(powerlog);
            power = power.pow(1.25);
            base = base.div(power);
        }
        // f(x) = ( ( log10( time + 1 ) ) ^ 3 ) ^ 1.25
        return base;
    },
    timeSCDisplay() {
        let threshold = new Decimal(1e3);
        threshold = threshold.mul(buyableEffect("t", "MoreTimeI"));

        let power = new Decimal(1);
        power = power.div(buyableEffect("t", "MoreTimeI"));
        let log = new Decimal.log(player.t.time, 10).add(1);
        if (player.t.time.gte(threshold)) {
            log = log.sub(3);
            let powerlog = new Decimal.pow(log, 3);
            power = power.mul(powerlog);
            power = power.pow(1.25);
            power = power.mul(log);
        }
        return [threshold, power];
    },
    buyables: {
        FasterTimeI: {
            title: `Time Fowarding`,
            description: `1.25x Time Speed`,
            cost(x) {
                return new Decimal.pow(2, x).pow(2, x);
            },
            effect(x) {
                return new Decimal.pow(1.1, x);
            },
            display() {
                var S = tmp[this.layer].buyables[this.id];
                var SV = player[this.layer].buyables[this.id];
                return `Times Bought: ${format(SV, 0)}
               ${format(S.effect)}x Time Speed<br>
               Cost: ${format(S.cost)} Time`;
            },
            buy() {
                player[this.layer].time = player[this.layer].time.sub(
                    this.cost()
                );
                setBuyableAmount(
                    this.layer,
                    this.id,
                    getBuyableAmount(this.layer, this.id).add(1)
                );
            },
            canAfford() {
                return player[this.layer].time.gte(this.cost());
            }
        },
        MoreTimeI: {
            title: `Bigger Universe`,
            description: `10x Time Softcap I`,
            cost(x) {
                return new Decimal.pow(3, x).pow(3.5, x).mul(1e3);
            },
            effect(x) {
                return new Decimal.pow(10, x);
            },
            display() {
                let S = tmp[this.layer].buyables[this.id];
                let SV = player[this.layer].buyables[this.id];
                return `Times Bought: ${format(SV, 0)}
                    ${format(S.effect)}x smaller Time Softcap I<br>
                    Cost: ${format(S.cost)} Time`;
            },
            buy() {
                player[this.layer].time = player[this.layer].time.sub(
                    this.cost()
                );
                setBuyableAmount(
                    this.layer,
                    this.id,
                    getBuyableAmount(this.layer, this.id).add(1)
                );
            },
            canAfford() {
                return player[this.layer].time.gte(this.cost());
            },
            unlocked() {
                return player[this.layer].buyables["FasterTimeI"].gte(5);
            }
        }
    },
    tabFormat: {
        Main: {
            content: [
                [
                    "raw-html",
                    () => {
                        return `Time is at ${format(player.t.time)} μs`;
                    }
                ],
                [
                    "raw-html",
                    () => {
                        return `Time moves at speed of ${formatSmall(
                            tmp.t.timeCalculation
                        )}x / sec`;
                    }
                ],
                [
                    "raw-html",
                    () => {
                        const [threshold, power] = tmp.t.timeSCDisplay;
                        if (player.t.time.gte(threshold)) {
                            return `SOFTCAP I: After ${format(
                                threshold
                            )} worth of Time, it gets a debuff of /${format(
                                power
                            )} gain`;
                        }
                        return ``;
                    }
                ],
                "blank",
                "blank",
                [
                    "row",
                    [
                        ["buyable", "FasterTimeI"],
                        ["buyable", "MoreTimeI"]
                    ]
                ]
            ]
        }
    }
});
