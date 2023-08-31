addLayer("e", {
    name: "Lycoris",
    symbol: "L",
    startData() {
        return {
            unlocked: false,
            points: Decimal.dZero
        };
    },
    color: "#E0E1CC",
    resource: "Lycoris Flowers",
    row: 2,

    baseResource: "Dice Roll Points",
    baseAmount() {
        return player.tdr.totalroll;
    },
    requires: new Decimal(222),
    type: "static",
    exponent: 0.5,
    gainMult: Decimal.dOne,
    gainExp: Decimal.dOne,
    layerShown() { return player.tdr.totalroll.gte(100) || player.e.unlocked},
    tabFormat: {
        milestones: {
            unlocked: true,
            content: [
                ["display-text", () => `You have planted ${player.e.points} Lycoris Flowers, in the Amnehilesie of Eden.`],
                "prestige-button",
                "blank",
                "milestones"
            ]
        }
    },
    milestones: {
        0: {
            requirementDescription: "Welcome to the Amnehilesie of Eden, Esteemed Guests. (1 total Lycoris Flower Planted)",
            effectDescription: "Oh, You only started planting these flowers? Don't worry, our butlers will give you a 5x boost to point gain to help you plant these faster.",
            done() { return player.e.total.gte(1)}
        },
        1: {
            requirementDescription: "These flowers aren't going to plant themselves... (2 Total Lycoris Flowers planted)",
            effectDescription: "Maybe you'll need some more help. Don't worry, we will support you with upgrades and passive gain to your previous endenavors, although, passive gain will have to be at a minimum since this is still experimental for us. Only 1%!",
            done() { return player.e.total.gte(2)}
        },
        2: {
            requirementDescription: "You're starting to get the hang of it, congrats. (5 Total Lycoris Flowers planted)",
            effectDescription: "I think you will need another boost from our butlers. The Gambles you make in total are now boosted by 2x.",
            done() { return player.e.total.gte(5)}
        },
        3: {
            requirementDescription: "You planted a potful of Lycoris Flowers. (10 Total Lycoris Flowers planted)",
            effectDescription: "You are really helping us out, however, we are starting to run out of things to give you... Boost Tuber and COVID gain by 3x.",
            done() { return player.e.total.gte(10)}
        },
        4: {
            
        }
    },
});
