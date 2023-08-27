addLayer("cheese", {
    name: "cheese",
    symbol: "C",
    position: 1,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            badCheese: new Decimal(0),
            goodCheese: new Decimal(0),
            cycle: new Decimal(0),
            activity: new Decimal(0),
            bruh: new Decimal(0),
            hunger: new Decimal(5),
            unlocked2: false,
            blessings: new Decimal(0)
        };
    },
    state: [
        "Neutral",
        "Intrigued",
        "Entertained",
        "Hunger",
        "Satisfaction",
        "Boredom",
        "Annoyance",
        "metal pipe"
    ],
    stateDescription: [
        "(No buffs or nerfs are applied)",
        "(x1.1 🧀 gain)",
        "(^1.1 🧀 gain)",
        "(x0.25 🧀 gain)",
        "(x1.75 🧀 gain and ???)",
        "(x0.8 🧀 gain)",
        "(x0.5 point and 🧀 gain)",
        "(x0 🧀 gain)"
    ],
    currentState: 0,
    color: "rgb(255, 217, 131)",
    requires: Decimal.dTen,
    resource: "🧀",
    baseResource: "points",
    baseAmount() {
        return player.points;
    },
    type: "none",
    exponent: 0.5,
    gainMult: Decimal.dOne,
    bars: {
        feedMe: {
            direction: RIGHT,
            width: 375,
            height: 100,
            progress() {
                return player.cheese.hunger.div(Decimal.dTen);
            },
            display() {
                return `<h2>Hunger Meter:<br>
                    ${formatWhole(player.cheese.hunger)} / 5`;
            },
            fillStyle: {
                backgroundColor: "brown"
            }
        }
    },
    update(diff) {
        player.cheese.points = player.cheese.points.add(
            tmp.cheese.cheeseGain.mul(diff)
        );
        if (player.offTime == undefined)
            player.cheese.cycle = player.cheese.cycle.add(diff);
        if (player.cheese.cycle.gte(60)) {
            player.cheese.cycle = new Decimal(0);
            player.cheese.hunger = player.cheese.hunger.sub(1).max(0);
            tmp.cheese.currentState = player.cheese.bruh.gte(6)
                ? 6
                : player.cheese.hunger.gte(6)
                ? 4
                : player.cheese.hunger.lte(0)
                ? 3
                : player.cheese.activity.gte(30) && tmp.cheese.currentState == 1
                ? 2
                : player.cheese.activity.gte(10) || tmp.cheese.currentState == 2
                ? 1
                : player.cheese.activity.eq(0)
                ? 5
                : 0;
            player.cheese.activity = new Decimal(0);
            player.cheese.bruh = new Decimal(0);
            if (new Decimal(Math.random() * 60).ceil().eq(21))
                tmp.cheese.currentState = 7;
        }
    },
    cheeseGain() {
        return tmp.cheese.currentState == 7
            ? new Decimal(0)
            : tmp.cheese.buyables[11].effect
                  .mul(tmp.cheese.buyables[12].effect)
                  .mul(tmp.cheese.buyables[13].effect)
                  .mul(tmp.cheese.buyables[21].effect)
                  .mul(
                      tmp.cheese.currentState == 6
                          ? 0.5
                          : tmp.cheese.currentState == 4
                          ? 1.75
                          : tmp.cheese.currentState == 3
                          ? 0.25
                          : tmp.cheese.currentState == 1
                          ? 1.1
                          : 1
                  )
                  .pow(tmp.cheese.currentState == 2 ? 1.1 : 1);
    },
    buyables: {
        feed: {
            title: "Feed la creatura",
            cost() {
                return player.cheese.buyables.feed.add(Decimal.dOne).mul(1000);
            },
            canAfford() {
                return (
                    player.cheese.points.gte(this.cost()) &&
                    player.cheese.hunger.lt(Decimal.dTen)
                );
            },
            buy() {
                player.cheese.points = player.cheese.points.sub(this.cost());
                player.cheese.buyables.feed = player.cheese.buyables.feed.add(
                    Decimal.dOne
                );
                player.cheese.hunger = player.cheese.hunger.add(Decimal.dOne);
                player.cheese.activity = player.cheese.activity.add(
                    Decimal.dOne
                );
            },
            display() {
                return `Requirement: ${format(
                    tmp.cheese.buyables.feed.cost
                )} 🧀`;
            },
            style() {
                return {
                    height: "80px",
                    borderColor: "rgba(0, 0, 0, 0.125)",
                    backgroundColor: canBuyBuyable("cheese", "feed")
                        ? "#006080"
                        : ""
                };
            }
        },
        prestige: {
            title: `<h3 style="font-family: Bahnschrift SemiBold">Ascend</h3>`,
            canAfford() {
                return player.cheese.points.gte(1000000);
            },
            gain() {
                return player.cheese.points
                    .div(1000000)
                    .root(2.95305888531)
                    .floor();
            },
            getNextAt() {
                return this.gain()
                    .add(1)
                    .pow(2.95305888531)
                    .mul(1000000)
                    .max(1000000);
            },
            buy() {
                let gain = player.cheese.blessings.add(this.gain());
                let keep = [
                    player.cheese.cycle,
                    player.cheese.activity,
                    player.cheese.bruh,
                    player.cheese.hunger,
                    tmp.cheese.currentState
                ];
                layerDataReset("cheese");
                player.cheese.cycle = keep[0];
                player.cheese.activity = keep[1];
                player.cheese.bruh = keep[2];
                player.cheese.hunger = keep[3].max(5);
                tmp.cheese.currentState = keep[4];
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
                return player.cheese.buyables[11].mul(
                    player.cheese.buyables[11].add(1)
                );
            },
            canAfford() {
                return player.cheese.points.gte(this.cost());
            },
            effect() {
                return player.cheese.buyables[11];
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
                return new Decimal(400).mul(
                    Decimal.pow(1.15, player.cheese.buyables[12].pow(1.15))
                );
            },
            canAfford() {
                return player.cheese.points.gte(this.cost());
            },
            effect() {
                return Decimal.pow(1.15, player.cheese.buyables[12]);
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
                return new Decimal(8000).mul(
                    Decimal.pow(4, player.cheese.buyables[13])
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
                    height: "113px",
                    border: "5px solid",
                    "border-radius": "113px",
                    "border-color": this.canAfford() ? "rgb(255,172,51)" : "",
                    color: this.canAfford() ? "rgb(244,144,13)" : ""
                };
            }
        },
        21: {
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Sacrifice 🧀 to Cheese Overlord",
            canAfford() {
                return player.cheese.points.gt(player.cheese.goodCheese);
            },
            effect() {
                return player.cheese.goodCheese.add(1).log(7).add(1).max(1);
            },
            buy() {
                player.cheese.goodCheese = player.cheese.points;
                player.cheese.points = new Decimal(0);
                player.cheese.activity = player.cheese.activity.add(1);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Permanently multiplies 🧀 gain by x${format(
                    this.effect()
                )}<br>You'll gain +x${format(
                    player.cheese.points
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
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Sacrifice 🧀 to la creatura",
            canAfford() {
                return true;
            },
            effect() {
                return player.cheese.badCheese.add(1).root(4);
            },
            buy() {
                player.cheese.badCheese = player.cheese.badCheese.add(
                    player.cheese.points
                );
                player.cheese.points = new Decimal(0);
            },
            display() {
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Permanently multiplies 🧀 gain by x${format(
                    this.effect()
                )}<br>You'll gain +x${format(
                    player.cheese.badCheese
                        .add(player.cheese.points)
                        .add(1)
                        .root(4)
                        .sub(this.effect())
                        .max(0)
                )} upon sacrifice`;
            },
            style() {
                return {
                    height: "160px",
                    border: "5px solid",
                    "border-radius": "50px",
                    "border-color": "rgba(0,0,0,0.125)",
                    "background-color": this.canAfford() ? "#006080" : ""
                };
            },
            unlocked() {
                return false;
            }
        }
    },
    tabFormat: {
        "La Creatura": {
            content: [
                [
                    "display-text",
                    function () {
                        return (
                            `<h2 style='font-family: Bahnschrift SemiBold;'>You have <h2 style='font-family: Bahnschrift SemiBold; color: ${
                                tmp.cheese.color
                            }; text-shadow: ${
                                tmp.cheese.color
                            } 0 0 5px;'>${formatWhole(
                                player.cheese.points
                            )} <h2 style='transform: scale(2, 2)'>🧀</h2></h2>` +
                            (player.cheese.unlocked2
                                ? `<h2 style='font-family: Bahnschrift SemiBold;'> and you have <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
                                      player.cheese.blessings
                                  )}<h2 style='font-family: Bahnschrift SemiBold;'> blessings`
                                : ``)
                        );
                    }
                ],
                [
                    "display-text",
                    function () {
                        return (
                            "<h3 style='font-family: Bahnschrift SemiBold;'>AB's Current State:</h3><br><h2 style='font-family: Bahnschrift SemiBold;'>" +
                            tmp.cheese.state[tmp.cheese.currentState] +
                            "</h2><br><span style='font-family: Bahnschrift SemiBold;'>" +
                            tmp.cheese.stateDescription[
                                tmp.cheese.currentState
                            ] +
                            "<br>Next cycle in " +
                            formatWhole(
                                new Decimal(60).sub(player.cheese.cycle).ceil()
                            ) +
                            " seconds"
                        );
                    }
                ],
                ["blank", ["0px", "64px"]],
                ["tree", [["ab"]]],
                ["bar", "feedMe"],
                "blank",
                ["buyable", "feed"]
            ],
            buttonStyle() {
                return {
                    color: "rgb(0,48,64)",
                    "border-radius": "50px",
                    "border-color": "rgb(0,84,112)",
                    "background-color": "#006080"
                };
            }
        },
        Cheese: {
            content: [
                [
                    "display-text",
                    function () {
                        return (
                            `<h2 style='font-family: Bahnschrift SemiBold;'>You have <h2 style='font-family: Bahnschrift SemiBold; color: ${
                                tmp.cheese.color
                            }; text-shadow: ${
                                tmp.cheese.color
                            } 0 0 5px;'>${formatWhole(
                                player.cheese.points
                            )} <h2 style='transform: scale(2, 2)'>🧀</h1></h1>` +
                            (player.cheese.unlocked2
                                ? `<h2 style='font-family: Bahnschrift SemiBold;'> and you have <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
                                      player.cheese.blessings
                                  )}<h2 style='font-family: Bahnschrift SemiBold;'> blessings`
                                : ``) +
                            `<br>` +
                            (tmp.cheese.cheeseGain.gte(1)
                                ? `<span style='font-family: Bahnschrift SemiBold;'>You gain ${format(
                                      tmp.cheese.cheeseGain
                                  )} 🧀/sec`
                                : ``)
                        );
                    }
                ],
                "blank",
                ["buyables", [1]],
                "blank",
                ["buyables", [2]]
            ],
            buttonStyle() {
                return { color: "rgb(244,144,12)", "border-radius": "50px" };
            }
        },
        "Cheese Overlord's Heaven": {
            content: [
                [
                    "display-text",
                    function () {
                        return (
                            `<h2 style='font-family: Bahnschrift SemiBold;'>You have <h2 style='font-family: Bahnschrift SemiBold; color: ${
                                tmp.cheese.color
                            }; text-shadow: ${
                                tmp.cheese.color
                            } 0 0 5px;'>${formatWhole(
                                player.cheese.points
                            )} <h2 style='transform: scale(2, 2)'>🧀</h2>` +
                            (player.cheese.unlocked2
                                ? `<h2 style='font-family: Bahnschrift SemiBold;'> and you have <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
                                      player.cheese.blessings
                                  )}<h2 style='font-family: Bahnschrift SemiBold;'> blessings`
                                : ``)
                        );
                    }
                ],
                "blank",
                ["buyable", "prestige"]
            ],
            buttonStyle() {
                return {
                    color: "rgb(244, 144, 12)",
                    borderRadius: "50px"
                };
            },
            unlocked() {
                return (
                    player.cheese.points.gte(1000000) || player.cheese.unlocked2
                );
            }
        }
    },
    gainExp() {
        // Calculate the exponent on main currency from bonuses
        return new Decimal(1);
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    nodeStyle() {
        return {
            color: "rgb(244,144,12)",
            "border-color": "rgb(255,172,51)",
            "font-family": "Bahnschrift SemiBold;"
        };
    },
    layerShown() {
        return true;
    }
});

addNode("ab", {
    symbol: "AB",
    color: "#006080",
    layerShown() {
        return true;
    },
    canClick() {
        return true;
    },
    onClick() {
        player.cheese.bruh = player.cheese.bruh.add(1);
    },
    tooltip() {
        return tmp.cheese.currentState == 6
            ? "fuck you"
            : "Oh, hey there.<br>I never through that my final destination would just so happens to be within my own arch-nemesis's world.<br>Look, buddy. I need your help.<br>Gather 🧀 for me and I'll give you cool buffs";
    },
    nodeStyle() {
        return { "border-radius": "50%" };
    }
});
