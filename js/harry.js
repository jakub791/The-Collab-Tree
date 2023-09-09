// Oh god here it goes

addLayer("Hr", {
    name: "Rabbits",
    tooltip: "Rabbits.",
    row: "side",
    color: "#5f575c",
    position: 2,
    symbol: "🐰",
    startData() {
        return {
          unlocked: true,
          male: new Decimal(1),
          female: new Decimal(1),
          baby: new Decimal(0),
          total: new Decimal(2),
          interval: 0.05,
          gtick: 0
        };
    },
    tabFormat: {
        "Rabbits": {
            content: [
                [
                    "display-text",
                    () => {
                        return `You have <big><big>${format(player.Hr.male)}</big></big> male rabbits.`
                    }
                ],
                [
                    "display-text",
                    () => {
                        return `You have <big><big>${format(player.Hr.female)}</big></big> female rabbits.`
                    }
                ],
                [
                    "display-text",
                    () => {
                        return `<small>You have <big><big>${format(player.Hr.baby.floor())}</big></big> baby rabbits.</small>`
                    }
                ],
                "blank",
                "blank",
                [
                    "display-text",
                    () => {
                        return `Your rabbits are currently producing <big><big>${format(
                            player.Hr.total.lte(1e12) ? player.Hr.male.min(player.Hr.female).mul(0.075)
                            : player.Hr.male.min(player.Hr.female).mul(0.075).pow(player.Hr.soft1)
                        )}</big></big> baby rabbits per second.<br><small>(${1}-uplets)`
                    }
                ],
                [
                    "display-text",
                    () => {
                        return `Half of your baby rabbits are growing up every ${player.Hr.interval} seconds.`
                    }
                ],
                [
                    "display-text",
                    () => {
                        return `<small>${Math.round((player.Hr.interval*20 - player.Hr.gtick) / 20)} seconds until growth.</small>`
                    }
                ],
                "blank",
                "blank",
                "blank",
                [
                    "display-text",
                    () => {
                        return (player.Hr.total.lte(1e12)) ? `` :
                        `
                            Your rabbits are experiencing overcrowdedness!<br>
                            <big>Debuffs:</big><br>
                            Baby rabbit gain ^${format(player.Hr.soft1)}<br>
                            Rabbit amount reduced by ÷${format(player.Hr.soft2)} each game tick (only if over 1e20 rabbits)<br>
                            Rabbits are feeling sad :(
                        `
                    }
                ],
            ]
        },
        "Upgrades": {
            content: [
                "infoboxes",
                "upgrades"
            ]
        }
    },
    automate() {
        player.Hr.gtick++
        player.Hr.baby = player.Hr.baby.add(
            player.Hr.total.lte(1e12) ? player.Hr.male.min(player.Hr.female).mul(0.075).div(20)
            : player.Hr.male.min(player.Hr.female).mul(0.075).pow(player.Hr.soft1).div(20)
        )

        if (player.Hr.total.gte(1e20)) {
            player.Hr.male = player.Hr.male.div(player.Hr.soft2)
            player.Hr.female = player.Hr.female.div(player.Hr.soft2)
            player.Hr.baby = player.Hr.baby.div(player.Hr.soft2)
        }

        if (player.Hr.gtick > player.Hr.interval*20 || true) {
            let grow = player.Hr.baby.div(2)
            player.Hr.baby = player.Hr.baby.div(2)
            if (grow.lte(100)) {
                for (;grow.gt(0);grow=grow.sub(1)) {
                    (Math.random() > 0.5) ? player.Hr.male = player.Hr.male.add(1) : player.Hr.female = player.Hr.female.add(1)
                }
            } else {
                player.Hr.female = player.Hr.female.add(grow.div(2).floor())
                grow = grow.div(2).floor()
                player.Hr.male = player.Hr.male.add(grow)
            }
            player.Hr.gtick = 0
        }
        player.Hr.total = player.Hr.male.add(player.Hr.female).add(player.Hr.baby)
        player.Hr.soft1 = new Decimal(0.99).pow(player.Hr.total.div(1e12).max(1).log(10))
        player.Hr.soft2 = new Decimal(1.002).pow(player.Hr.total.div(1e20).max(1).log(10))
    }
});

/* in development :P
addLayer("Hm", {
    name: "Machines",
    tooltip: "Automation awaits... (Just kidding)",
    row: "side",
    color: "#FEDCBA",
    position: 2,
    symbol: "⚙️",
    tabFormat: {
        "Inventory": {
            content: ["clickables"]
        },
        "Ore Prospector": [""]
    },
    clickables: {
        11: {display() {return `Slot 1\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(1)},style: {"width": "120px"}},
        12: {display() {return `Slot 2\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(2)},style: {"width": "120px"}},
        13: {display() {return `Slot 3\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(3)},style: {"width": "120px"}},
        14: {display() {return `Slot 4\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(4)},style: {"width": "120px"}},
        15: {display() {return `Slot 5\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(5)},style: {"width": "120px"}},
        21: {display() {return `Slot 6\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(6)},style: {"width": "120px"}},
        22: {display() {return `Slot 7\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(7)},style: {"width": "120px"}},
        23: {display() {return `Slot 8\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(8)},style: {"width": "120px"}},
        24: {display() {return `Slot 9\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(9)},style: {"width": "120px"}},
        25: {display() {return `Slot 10\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(10)},style: {"width": "120px"}},
        31: {display() {return `Slot 11\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(11)},style: {"width": "120px"}},
        32: {display() {return `Slot 12\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(12)},style: {"width": "120px"}},
        33: {display() {return `Slot 13\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(13)},style: {"width": "120px"}},
        34: {display() {return `Slot 14\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(14)},style: {"width": "120px"}},
        35: {display() {return `Slot 15\n${"test"}`}, canClick: true, onClick() {player.Hm.invSwap(15)},style: {"width": "120px"}},
    },
    slotSelected: 1,
    invSwap(x) {
        if (slotSelected) {
            player["Hm"].clickables[String(Math.floor((x-1)/5)+1) + String((x-1)%5+1)]
        }
    },
    addItem(x, item) {

    }
})*/
