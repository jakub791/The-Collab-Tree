addLayer("cheese", {
    name: "cheese",
    symbol: "C",
    position: 1,
    startData() {
        return {
            unlocked: true,
            points: Decimal.dZero,
            badCheese: Decimal.dZero,
            goodCheese: Decimal.dZero,
            cycle: Decimal.dZero,
            activity: Decimal.dZero,
            bruh: Decimal.dZero,
            bruh2: Decimal.dZero,
            hunger: new Decimal(5),
            unlocked2: false,
            blessings: Decimal.dZero,
            goodBlessings: Decimal.dZero,
            currentState: 0
        };
    },
    state: [
        ["Neutral", "(No buffs or nerfs are applied)"],
        ["Intrigued", "(x1.1 🧀 gain)"],
        ["Entertained", "(^1.1 🧀 gain)"],
        ["Hunger", "(x0.25 🧀 gain)"],
        ["Satisfaction", "(x1.75 🧀 gain and ???)"],
        ["Boredom", "(x0.8 🧀 gain)"],
        ["Annoyance", "(x0.5 point and 🧀 gain)"],
        ["metal pipe", "(x0 🧀 gain)"],
        [
            "Entertained...?",
            "(^0.85 🧀 gain and you can't sacrifice for one minute)"
        ]
    ],
    color: "rgb(255,217,131)",
    requires: Decimal.dTen,
    resource: "🧀",
    type: "none",
    bars: {
        feedMe: {
            direction: RIGHT,
            width: 375,
            height: 100,
            progress() {
                return player.cheese.hunger.div(Decimal.dTen);
            },
            display() {
                return `<h2>Hunger Meter:<br>${formatWhole(
                    player.cheese.hunger
                )} / 5`;
            },
            fillStyle: {
                backgroundColor: "brown"
            }
        }
    },
    upgrades: {
        a0: {
            fullDisplay: `<h3 style="font-family: Bahnschrift SemiBold">Downfall</h2><br>
            <span style="font-family: Bahnschrift SemiBold">"It's best if you do not buy this upgrade, god who knows what might happen next."<br>(x4 🧀 gain)<br><br>Cost: 1 blessing`,
            cost: Decimal.dOne,
            canAfford() {
                return player.cheese.blessings.gte(this.cost);
            },
            currencyInternalName: "blessings",
            currencyDisplayName: "blessing",
            currencyLayer: "cheese"
        },
        b0: {
            fullDisplay() {
                return `<h3 style="font-family: Bahnschrift SemiBold">
                Self-Irony
                </h2><br>
                <span style='font-family: Bahnschrift SemiBold;'>"I told you to not buy this!... Oh well, might as well go full-on zaburple mode"<br>(Blessings boost 🧀 gain by x${format(
                    this.effect()
                )})<br><br>Cost: ${formatWhole(this.cost())} blessings`;
            },
            effect() {
                return player.cheese.blessings
                    .add(Decimal.dOne)
                    .log(777)
                    .add(Decimal.dOne);
            },
            cost() {
                return new Decimal(hasUpgrade("cheese", "b1") ? 30 : 10);
            },
            currencyInternalName: "blessings",
            currencyDisplayName: "blessing",
            currencyLayer: "cheese",
            unlocked() {
                return hasUpgrade("cheese", "a0");
            },
            branches: [["a0", "rgb(255,217,131)"]]
        },
        b1: {
            fullDisplay() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Permabooster</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"I heard your sacrifices are pretty strong. Let me fight them."<br>(You can sacrifice your blessings for additional 🧀 gain boost)<br><br>Cost: ${formatWhole(
                            this.cost()
                        )} blessings`;
            },
            cost() {
                return new Decimal(hasUpgrade("cheese", "b0") ? 30 : 10);
            },
            canAfford() {
                return player.cheese.blessings.gte(this.cost());
            },
            currencyInternalName: "blessings",
            currencyDisplayName: "blessing",
            currencyLayer: "cheese",
            onPurchase() {
                player.cheese.upgrades.push("b1");
            },
            unlocked() {
                return hasUpgrade("cheese", "a0");
            },
            branches: [["a0", "rgb(255,217,131)"]]
        },
        b2: {
            fullDisplay() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>??? (wip)</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"tl;dr. eat shit"<br>(You can sacrifice stuff to HER)<br><br>Cost: 1e20 🧀`;
            },
            cost: new Decimal("1e20"),
            canAfford() {
                return false;
            },
            unlocked() {
                return hasUpgrade("cheese", "c1");
            },
            branches: [["c1", "#006080"]]
        },
        c0: {
            fullDisplay() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>God Forsaken Feedback</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"why would you do this to me bruh"<br>(🧀 boost blessing gain by x${format(
                            this.effect()
                        )})<br><br>Cost: ${formatWhole(this.cost())} blessings`;
            },
            effect() {
                return player.cheese.points.root(10).add(1).log(10).add(1);
            },
            cost() {
                return new Decimal(hasUpgrade("cheese", "c2") ? 100 : 60);
            },
            currencyInternalName: "blessings",
            currencyDisplayName: "blessing",
            currencyLayer: "cheese",
            unlocked() {
                return hasUpgrade("cheese", "b0");
            },
            branches: [["b0", "rgb(255,217,131)"]]
        },
        c1: {
            fullDisplay() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Triangular Systematics</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"Shouldn't inflate above 1e20."<br>(Unlocks 2 🧀 buyables)<h5>(Cheesy Synchronization doesn't affect these buyables)</h5><br>Cost: 2,020 blessings`;
            },
            effect() {
                return player.cheese.blessings.add(1).log(777).add(1);
            },
            cost() {
                return new Decimal(2020);
            },
            currencyInternalName: "blessings",
            currencyDisplayName: "blessing",
            currencyLayer: "cheese",
            unlocked() {
                return hasUpgrade("cheese", "c0") && hasUpgrade("cheese", "c2");
            },
            branches: [
                ["c0", "rgb(255,217,131)"],
                ["c2", "rgb(255,217,131)"]
            ]
        },
        c2: {
            fullDisplay() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Cheesy Synchronization</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"An approriate name for such silly upgrade"<br>(Sacrificed blessings affect 🧀 buildings as well)<br><br>Cost: ${formatWhole(
                            this.cost()
                        )} blessings`;
            },
            effect() {
                return player.cheese.blessings.add(1).log(777).add(1);
            },
            cost() {
                return new Decimal(hasUpgrade("cheese", "c0") ? 100 : 60);
            },
            currencyInternalName: "blessings",
            currencyDisplayName: "blessing",
            currencyLayer: "cheese",
            onPurchase() {
                player.cheese.upgrades.push("c2");
            },
            unlocked() {
                return hasUpgrade("cheese", "b1");
            },
            branches: [["b1", "rgb(255,217,131)"]]
        }
    },
    update(diff) {
        player.cheese.points = player.cheese.points.add(
            tmp.cheese.cheeseGain.mul(diff)
        );
        if (player.offTime == undefined)
            player.cheese.cycle = player.cheese.cycle.add(diff);
        if (player.cheese.cycle.gte(60)) {
            player.cheese.cycle = Decimal.dZero;
            player.cheese.hunger = player.cheese.hunger.sub(1).max(0);
            player.cheese.currentState =
                Math.ceil(Math.random() * 60) == 21
                    ? 7
                    : player.cheese.activity.gte(30) &&
                      player.cheese.currentState == 1 &&
                      player.cheese.bruh2.gte(10)
                    ? 8
                    : player.cheese.bruh.gte(6)
                    ? 6
                    : player.cheese.hunger.gte(6)
                    ? 4
                    : player.cheese.hunger.lte(0)
                    ? 3
                    : player.cheese.activity.gte(30) &&
                      (player.cheese.currentState == 1 ||
                          player.cheese.currentState == 2 ||
                          player.cheese.currentState == 4)
                    ? 2
                    : player.cheese.activity.gte(10) ||
                      player.cheese.currentState == 2
                    ? 1
                    : player.cheese.activity.eq(0) ||
                      player.cheese.bruh.gte(player.cheese.activity.div(3))
                    ? 5
                    : 0;
            player.cheese.activity = Decimal.dZero;
            player.cheese.bruh = Decimal.dZero;
            player.cheese.bruh2 = Decimal.dZero;
            if (new Decimal(Math.random() * 60).ceil().eq(21))
                player.cheese.currentState = 7;
        }
    },
    cheeseGain() {
        return player.cheese.currentState == 7
            ? new Decimal(0)
            : tmp.cheese.buyables[11].effect
                  .mul(tmp.cheese.buyables[12].effect)
                  .mul(tmp.cheese.buyables[13].effect)
                  .mul(tmp.cheese.buyables[14].effect)
                  .mul(tmp.cheese.buyables[21].effect)
                  .mul(tmp.cheese.buyables[22].effect)
                  .mul(
                      player.cheese.currentState == 6
                          ? 0.5
                          : player.cheese.currentState == 4
                          ? 1.75
                          : player.cheese.currentState == 3
                          ? 0.25
                          : player.cheese.currentState == 1
                          ? 1.1
                          : 1
                  )
                  .mul(hasUpgrade("cheese", "a0") ? 4 : 1)
                  .mul(
                      hasUpgrade("cheese", "b0")
                          ? tmp.cheese.upgrades["b0"].effect
                          : 1
                  )
                  .pow(
                      player.cheese.currentState == 8
                          ? 0.85
                          : player.cheese.currentState == 2
                          ? 1.1
                          : 1
                  );
    },
    buyables: {
        feed: {
            title: "Feed la creatura",
            cost() {
                let cost = player.cheese.buyables["feed"].add(1).mul(1000);
                if (tmp.cheese.cheeseGain.gte(cost))
                    cost = cost.mul(tmp.cheese.cheeseGain.div(cost).pow(1.6));
                return cost;
            },
            canAfford() {
                return (
                    player.cheese.points.gte(this.cost()) &&
                    player.cheese.hunger.lt(10)
                );
            },
            buy() {
                player.cheese.points = player.cheese.points.sub(this.cost());
                player.cheese.buyables["feed"] =
                    player.cheese.buyables["feed"].add(1);
                player.cheese.hunger = player.cheese.hunger.add(1);
                player.cheese.activity = player.cheese.activity.add(1);
            },
            display() {
                return `Requirement: ${format(this.cost())} 🧀`;
            },
            style() {
                return {
                    height: "80px",
                    "border-color": "rgba(0,0,0,0.125)",
                    "background-color": this.canAfford() ? "#006080" : ""
                };
            }
        },
        prestige: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Ascend",
            canAfford() {
                return player.cheese.points.gte(1000000);
            },
            gain() {
                return player.cheese.points
                    .div(1000000)
                    .root(2.95305888531)
                    .mul(
                        hasUpgrade("cheese", "c0")
                            ? tmp.cheese.upgrades["c0"].effect
                            : 1
                    )
                    .floor();
            },
            getNextAt() {
                return this.gain()
                    .add(1)
                    .div(
                        hasUpgrade("cheese", "c0")
                            ? tmp.cheese.upgrades["c0"].effect
                            : 1
                    )
                    .pow(2.95305888531)
                    .mul(1000000)
                    .max(1000000);
            },
            buy() {
                let gain = player.cheese.blessings.add(this.gain());
                let keep = [
                    player.cheese.cycle,
                    player.cheese.activity.add(1),
                    player.cheese.bruh,
                    player.cheese.hunger,
                    player.cheese.currentState,
                    player.cheese.buyables["feed"],
                    player.cheese.upgrades,
                    player.cheese.buyables[22],
                    player.cheese.goodBlessings,
                    player.cheese.bruh2.add(1)
                ];
                layerDataReset("cheese");
                player.cheese.cycle = keep[0];
                player.cheese.activity = keep[1];
                player.cheese.bruh = keep[2];
                player.cheese.hunger = keep[3];
                player.cheese.currentState = keep[4];
                player.cheese.buyables["feed"] = keep[5];
                player.cheese.upgrades = keep[6];
                player.cheese.buyables[22] = keep[7];
                player.cheese.goodBlessings = keep[8];
                player.cheese.bruh2 = keep[9];
                player.cheese.blessings = gain;
                player.cheese.unlocked2 = true;
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Abandon all of your progress and be blessed by Cheese Overlord in return, gaining +${formatWhole(
                    this.gain()
                )} blessings<br><br>You may be blessed further once you have ${formatWhole(
                    this.getNextAt()
                )} 🧀`;
            },
            style() {
                return {
                    height: "150px",
                    width: "350px",
                    border: "5px solid",
                    "border-radius": "300px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,12)" : ""
                };
            }
        },
        11: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Cheese Generator",
            cost() {
                return player.cheese.buyables[11]
                    .mul(player.cheese.buyables[11].add(1))
                    .pow(1.15)
                    .pow(
                        player.cheese.buyables[11].gte(100)
                            ? player.cheese.buyables[11]
                                  .sub(100)
                                  .mul(0.015)
                                  .add(1)
                            : 1
                    )
                    .pow(
                        player.cheese.buyables[11].gte(255)
                            ? player.cheese.buyables[11]
                                  .sub(255)
                                  .mul(0.15)
                                  .add(1)
                            : 1
                    );
            },
            canAfford() {
                return player.cheese.points.gte(this.cost());
            },
            effect() {
                return player.cheese.buyables[11].mul(
                    hasUpgrade("cheese", "c2")
                        ? tmp.cheese.buyables[22].effect
                        : 1
                );
            },
            buy() {
                player.cheese.points = player.cheese.points.sub(this.cost());
                player.cheese.buyables[11] = player.cheese.buyables[11].add(1);
                player.cheese.activity = player.cheese.activity.add(1);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>You currently gain ${format(
                    this.effect()
                )} 🧀/sec<br>Amount: ${formatWhole(
                    player.cheese.buyables[this.id]
                )}<br>Cost: ${format(this.cost())} 🧀`;
            },
            style() {
                return {
                    height: "112px",
                    border: "5px solid",
                    "border-radius": "112px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,12)" : ""
                };
            }
        },
        12: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Cheddar Generalizer",
            cost() {
                return new Decimal(400)
                    .mul(Decimal.pow(1.15, player.cheese.buyables[12].pow(1.3)))
                    .pow(
                        player.cheese.buyables[12].gte(100)
                            ? player.cheese.buyables[12]
                                  .sub(100)
                                  .mul(0.03)
                                  .add(1)
                            : 1
                    )
                    .pow(
                        player.cheese.buyables[12].gte(255)
                            ? player.cheese.buyables[12]
                                  .sub(255)
                                  .mul(0.3)
                                  .add(1)
                            : 1
                    );
            },
            canAfford() {
                return player.cheese.points.gte(this.cost());
            },
            effect() {
                return Decimal.pow(
                    new Decimal(1.15).add(tmp.cheese.buyables[15].effect),
                    player.cheese.buyables[12]
                ).mul(
                    hasUpgrade("cheese", "c2")
                        ? tmp.cheese.buyables[22].effect
                        : 1
                );
            },
            buy() {
                player.cheese.points = player.cheese.points.sub(this.cost());
                player.cheese.buyables[12] = player.cheese.buyables[12].add(1);
                player.cheese.activity = player.cheese.activity.add(1);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Multiplies 🧀 gain by x${format(
                    this.effect()
                )}<br>Amount: ${formatWhole(
                    player.cheese.buyables[this.id]
                )}<br>Cost: ${format(this.cost())} 🧀`;
            },
            style() {
                return {
                    height: "112px",
                    border: "5px solid",
                    "border-radius": "112px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,12)" : ""
                };
            }
        },
        13: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Chevre Graduator",
            cost() {
                return new Decimal(8000)
                    .mul(Decimal.pow(4, player.cheese.buyables[13].pow(1.45)))
                    .pow(
                        player.cheese.buyables[13].gte(100)
                            ? player.cheese.buyables[13]
                                  .sub(100)
                                  .mul(0.045)
                                  .add(1)
                            : 1
                    )
                    .pow(
                        player.cheese.buyables[13].gte(255)
                            ? player.cheese.buyables[13]
                                  .sub(255)
                                  .mul(0.45)
                                  .add(1)
                            : 1
                    );
            },
            canAfford() {
                return player.cheese.points.gte(this.cost());
            },
            effect() {
                return Decimal.pow(
                    new Decimal(2).root(
                        new Decimal(10).root(
                            player.cheese.points.max(1).root(10)
                        )
                    ),
                    player.cheese.buyables[13]
                ).mul(
                    hasUpgrade("cheese", "c2")
                        ? tmp.cheese.buyables[22].effect
                        : 1
                );
            },
            buy() {
                player.cheese.points = player.cheese.points.sub(this.cost());
                player.cheese.buyables[13] = player.cheese.buyables[13].add(1);
                player.cheese.activity = player.cheese.activity.add(1);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Multiplies 🧀 gain by x${format(
                    this.effect()
                )} based on 🧀<br>Amount: ${formatWhole(
                    player.cheese.buyables[this.id]
                )}<br>Cost: ${format(this.cost())} 🧀`;
            },
            style() {
                return {
                    height: "112px",
                    border: "5px solid",
                    "border-radius": "112px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,12)" : ""
                };
            }
        },
        14: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Classy Gargantuan-or",
            cost() {
                return new Decimal("1.6e12")
                    .mul(Decimal.pow(1612, player.cheese.buyables[14].pow(1.6)))
                    .pow(
                        player.cheese.buyables[14].gte(100)
                            ? player.cheese.buyables[14]
                                  .sub(100)
                                  .mul(0.06)
                                  .add(1)
                            : 1
                    )
                    .pow(
                        player.cheese.buyables[14].gte(255)
                            ? player.cheese.buyables[14]
                                  .sub(255)
                                  .mul(0.6)
                                  .add(1)
                            : 1
                    );
            },
            canAfford() {
                return player.cheese.points.gte(this.cost());
            },
            effect() {
                return Decimal.pow(4, player.cheese.buyables[14]);
            },
            buy() {
                player.cheese.points = player.cheese.points.sub(this.cost());
                player.cheese.buyables[14] = player.cheese.buyables[14].add(1);
                player.cheese.activity = player.cheese.activity.add(1);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Multiplies 🧀 gain by x${format(
                    this.effect()
                )}<br>Amount: ${formatWhole(
                    player.cheese.buyables[this.id]
                )}<br>Cost: ${format(this.cost())} 🧀`;
            },
            style() {
                return {
                    height: "112px",
                    border: "5px solid",
                    "border-radius": "112px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,12)" : ""
                };
            },
            unlocked() {
                return hasUpgrade("cheese", "c1");
            }
        },
        15: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>ciao gator",
            cost() {
                return new Decimal("3.2e13")
                    .mul(
                        Decimal.pow(3213, player.cheese.buyables[15].pow(1.75))
                    )
                    .pow(
                        player.cheese.buyables[15].gte(100)
                            ? player.cheese.buyables[15]
                                  .sub(100)
                                  .mul(0.075)
                                  .add(1)
                            : 1
                    )
                    .pow(
                        player.cheese.buyables[15].gte(255)
                            ? player.cheese.buyables[15]
                                  .sub(255)
                                  .mul(0.75)
                                  .add(1)
                            : 1
                    );
            },
            canAfford() {
                return player.cheese.points.gte(this.cost());
            },
            effect() {
                return player.cheese.buyables[15].pow(1.15).mul(0.015);
            },
            buy() {
                player.cheese.points = player.cheese.points.sub(this.cost());
                player.cheese.buyables[15] = player.cheese.buyables[15].add(1);
                player.cheese.activity = player.cheese.activity.add(1);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Increases Cheddar Generalizer's base by +${format(
                    this.effect()
                )}<br>Amount: ${formatWhole(
                    player.cheese.buyables[this.id]
                )}<br>Cost: ${format(this.cost())} 🧀`;
            },
            style() {
                return {
                    height: "112px",
                    border: "5px solid",
                    "border-radius": "112px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,154,12)" : ""
                };
            },
            unlocked() {
                return hasUpgrade("cheese", "c1");
            }
        },
        21: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Sacrifice all of your 🧀 to Cheese Overlord",
            canAfford() {
                return player.cheese.points.gt(0) && !(tmp.cheese.state == 8);
            },
            effect() {
                return player.cheese.goodCheese.add(1).log(7).add(1).max(1);
            },
            buy() {
                player.cheese.goodCheese = player.cheese.goodCheese.add(
                    player.cheese.points
                );
                player.cheese.points = Decimal.dZero;
                player.cheese.activity = player.cheese.activity.add(1);
                player.cheese.bruh2 = player.cheese.bruh2.add(1);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Multiplies 🧀 gain by x${format(
                    this.effect()
                )}<br>You'll gain +x${format(
                    player.cheese.points
                        .add(player.cheese.goodCheese)
                        .add(1)
                        .log(7)
                        .add(1)
                        .sub(this.effect())
                        .max(0)
                )} upon sacrifice<br>You sacrificed ${format(
                    player.cheese.goodCheese
                )} 🧀`;
            },
            style() {
                return {
                    height: "144px",
                    width: "256px",
                    border: "5px solid",
                    "border-radius": "144px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,12)" : ""
                };
            }
        },
        22: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Sacrifice all of your blessings to Cheese Overlord",
            canAfford() {
                return (
                    player.cheese.blessings.gt(Decimal.dZero) &&
                    tmp.cheese.state !== 8
                );
            },
            effect() {
                return player.cheese.goodBlessings
                    .add(Decimal.dOne)
                    .log(77)
                    .add(Decimal.dOne)
                    .max(Decimal.dOne);
            },
            buy() {
                player.cheese.goodBlessings = player.cheese.goodBlessings.add(
                    player.cheese.blessings
                );
                player.cheese.blessings = Decimal.dZero;
                player.cheese.activity = player.cheese.activity.add(
                    Decimal.dOne
                );
                player.cheese.bruh2 = player.cheese.bruh2.add(Decimal.dOne);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Permanently multiplies 🧀 gain by x${format(
                    this.effect()
                )}<br>You'll gain +x${format(
                    player.cheese.blessings
                        .add(player.cheese.goodBlessings)
                        .add(Decimal.dOne)
                        .log(77)
                        .add(Decimal.dOne)
                        .sub(this.effect())
                        .max(Decimal.dZero)
                )} upon sacrifice<br>You sacrificed ${format(
                    player.cheese.goodBlessings
                )} blessings`;
            },
            style() {
                return {
                    height: "150px",
                    width: "300px",
                    border: "5px solid",
                    borderRadius: "144px",
                    borderColor: this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,12)" : ""
                };
            },
            unlocked() {
                return hasUpgrade("cheese", "b1");
            }
        }
    },
    tabFormat: {
        "La Creatura": {
            content: [
                [
                    "display-text",
                    () =>
                        `
                    <h2 style='font-family: Bahnschrift SemiBold;'>You have 
                    <h2 style='font-family: Bahnschrift SemiBold; color: ${
                        tmp.cheese.color
                    }; text-shadow: ${tmp.cheese.color} 0 0 5px;'>${formatWhole(
                            player.cheese.points
                        )} 
                    <h2 style='transform: scale(2, 2)'>🧀` +
                        (player.cheese.unlocked2
                            ? `<h2 style='font-family: Bahnschrift SemiBold;'> and 
                    <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
                        player.cheese.blessings
                    )}
                    <h2 style='font-family: Bahnschrift SemiBold;'> blessings`
                            : ``) +
                        (tmp.cheese.cheeseGain.gt(Decimal.dZero)
                            ? `<h4 style='font-family: Bahnschrift SemiBold;'>You gain ${format(
                                  tmp.cheese.cheeseGain
                              )} 🧀/sec`
                            : ``)
                ],
                "blank",
                [
                    "display-text",
                    () => `
                    <h2>AB's Current State:<br> 
                    <h3> ${tmp.cheese.state[player.cheese.currentState][0]}<br>
                    <h4>${
                        tmp.cheese.state[player.cheese.currentState][1]
                    }<br>Next cycle in ${formatWhole(
                        new Decimal(60).sub(player.cheese.cycle).ceil()
                    )} seconds`
                ],
                "blank",
                "blank",
                ["tree", [["ab"]]],
                ["bar", "feedMe"],
                "blank",
                ["buyable", "feed"]
            ],
            buttonStyle: {
                color: "rgb(0,48,64)",
                borderRadius: "50px",
                borderColor: "rgb(0,84,112)",
                backgroundColor: "#006080"
            }
        },
        Cheese: {
            content: [
                [
                    "display-text",
                    () =>
                        `
                    <h2 style='font-family: Bahnschrift SemiBold;'>You have 
                    <h2 style='font-family: Bahnschrift SemiBold; color: ${
                        tmp.cheese.color
                    }; text-shadow: ${tmp.cheese.color} 0 0 5px;'>${formatWhole(
                            player.cheese.points
                        )} 
                    <h2 style='transform: scale(2, 2)'>🧀` +
                        (player.cheese.unlocked2
                            ? `<h2 style='font-family: Bahnschrift SemiBold;'> and 
                    <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
                        player.cheese.blessings
                    )}
                    <h2 style='font-family: Bahnschrift SemiBold;'> blessings`
                            : ``) +
                        (tmp.cheese.cheeseGain.gt(Decimal.dZero)
                            ? `<h4 style='font-family: Bahnschrift SemiBold;'>You gain ${format(
                                  tmp.cheese.cheeseGain
                              )} 🧀/sec`
                            : ``)
                ],
                "blank",
                [
                    "row",
                    [
                        ["buyable", 11],
                        "blank",
                        ["buyable", 12],
                        "blank",
                        ["buyable", 13]
                    ]
                ],
                "blank",
                ["row", [["buyable", 14], "blank", ["buyable", 15]]],
                "blank",
                ["buyable", [21]]
            ],
            buttonStyle: {
                color: "rgb(244,144,12)",
                borderRadius: "50px"
            }
        },
        "Cheese Overlord's Heaven": {
            content: [
                [
                    "display-text",
                    () =>
                        `
                    <h2 style='font-family: Bahnschrift SemiBold;'>You have 
                    <h2 style='font-family: Bahnschrift SemiBold; color: ${
                        tmp.cheese.color
                    }; text-shadow: ${tmp.cheese.color} 0 0 5px;'>${formatWhole(
                            player.cheese.points
                        )} 
                    <h2 style='transform: scale(2, 2)'>🧀` +
                        (player.cheese.unlocked2
                            ? `<h2 style='font-family: Bahnschrift SemiBold;'> and 
                    <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
                        player.cheese.blessings
                    )}
                    <h2 style='font-family: Bahnschrift SemiBold;'> blessings`
                            : ``) +
                        (tmp.cheese.cheeseGain.gt(Decimal.dZero)
                            ? `<h4 style='font-family: Bahnschrift SemiBold;'>You gain ${format(
                                  tmp.cheese.cheeseGain
                              )} 🧀/sec`
                            : ``)
                ],
                "blank",
                ["buyable", "prestige"],
                "blank",
                ["buyable", 22],
                "blank",
                ["upgrade", "a0"],
                "blank",
                "blank",
                [
                    "row",
                    [
                        ["upgrade", "b0"],
                        "blank",
                        "blank",
                        ["upgrade", "b2"],
                        "blank",
                        "blank",
                        ["upgrade", "b1"]
                    ]
                ],
                "blank",
                "blank",
                [
                    "row",
                    [
                        ["upgrade", "c0"],
                        "blank",
                        "blank",
                        ["upgrade", "c1"],
                        "blank",
                        "blank",
                        ["upgrade", "c2"]
                    ]
                ]
            ],
            buttonStyle: {
                color: "rgb(244,144,12)",
                borderRadius: "50px"
            },
            unlocked() {
                return (
                    player.cheese.points.gte(1000000) || player.cheese.unlocked2
                );
            }
        }
    },
    row: "side",
    nodeStyle: {
        color: "rgb(244, 144, 12)",
        borderColor: "rgb(255, 172, 51)",
        fontFamily: "Bahnschrift SemiBold;"
    },
    layerShown: true
});

addNode("ab", {
    symbol: "AB",
    color: "#006080",
    layerShown: true,
    canClick: true,
    onClick() {
        player.cheese.bruh = player.cheese.bruh.add(1);
    },
    tooltip() {
        return player.cheese.currentState == 8
            ? "Thought you were slick, huh?"
            : player.cheese.currentState == 7
            ? "shut up bozo<br>https://tenor.com/view/metal-pipe-gif-27050590<br>metal pipe"
            : player.cheese.currentState == 6
            ? "bruh i ain't big cookie bro"
            : player.cheese.currentState == 5
            ? ". . ."
            : player.cheese.currentState == 4
            ? "Hell yeah, dude! Here is your reward, as promised"
            : player.cheese.currentState == 3
            ? "YOU.<br>🧀.<br>ME.<br>NOW."
            : player.cheese.currentState == 2
            ? "You're doing some pretty good progress, not gonna lie."
            : player.cheese.currentState == 1
            ? "Not bad..."
            : "Oh, hey there.<br>I'm not quite sure how did I get here, but you don't have to worry about me...<br>Speaking of which. Could you get some 🧀 for me please?";
    },
    nodeStyle: {
        borderRadius: "50%"
    }
});
