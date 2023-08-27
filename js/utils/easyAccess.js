/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the upgrade.
 * @returns {boolean} Whether or not you have bought the given upgrade.
 */
function hasUpgrade(layer, id) {
    return (
        player[layer].upgrades.includes(id.toString()) &&
        !tmp[layer].deactivated
    );
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the milestone.
 * @returns {boolean} Whether or not you have the given milestone.
 */
function hasMilestone(layer, id) {
    return (
        player[layer].milestones.includes(id.toString()) &&
        !tmp[layer].deactivated
    );
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the achievement.
 * @returns {boolean} Whether or not you have the given achievement.
 */
function hasAchievement(layer, id) {
    return (
        player[layer].achievements.includes(id.toString()) &&
        !tmp[layer].deactivated
    );
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the challenge.
 * @returns {boolean} Whether or not you have at least 1 completion of the given challenge.
 */
function hasChallenge(layer, id) {
    return player[layer].challenges[id] >= 1 && !tmp[layer].deactivated;
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the challenge.
 * @returns {boolean} Whether or not you have max completions of the gievn challenge..
 */
function maxedChallenge(layer, id) {
    return (
        player[layer].challenges[id] >=
            tmp[layer].challenges[id].completionLimit && !tmp[layer].deactivated
    );
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the challenge.
 * @returns {number} The amount of completions of the given challenge.
 */
function challengeCompletions(layer, id) {
    return player[layer].challenges[id];
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the buyable.
 * @returns {Decimal} The bought amount of the specified buyable.
 */
function getBuyableAmount(layer, id) {
    return player[layer].buyables[id];
}

/**
 * Sets the bought amount of a buyable.
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the buyable.
 * @param {Decimal} amount New amount of the buyable.
 */
function setBuyableAmount(layer, id, amount) {
    player[layer].buyables[id] = amount;
}

/**
 * Add to the bought amount of a buyable.
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the buyable.
 * @param {Decimal} amount The amount to add.
 */
function addBuyables(layer, id, amount) {
    player[layer].buyables[id] = player[layer].buyables[id].add(amount);
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the clickable.
 * @returns {string} The state of the given cickable.
 */
function getClickableState(layer, id) {
    return player[layer].clickables[id];
}

/**
 * Sets the state of a specified clickable.
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the buyable.
 * @param {string} state The new clickable state.
 */
function setClickableState(layer, id, state) {
    player[layer].clickables[id] = state;
}

function getGridData(layer, id) {
    return player[layer].grid[id];
}

function setGridData(layer, id, data) {
    player[layer].grid[id] = data;
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the upgrade.
 * @returns {Decimal} Effect of the given upgrade.
 */
function upgradeEffect(layer, id) {
    return tmp[layer].upgrades[id].effect;
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the challenge.
 * @returns {Decimal} Effect of the given upgrade.
 */
function challengeEffect(layer, id) {
    return tmp[layer].challenges[id].rewardEffect;
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the buyable.
 * @returns {Decimal} Effect of the given buyable.
 */
function buyableEffect(layer, id) {
    return tmp[layer].buyables[id].effect;
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the clickable.
 * @returns {Decimal} Effect of the given clickable.
 */
function clickableEffect(layer, id) {
    return tmp[layer].clickables[id].effect;
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the achievement.
 * @returns {Decimal} Effect of the given achievement.
 */
function achievementEffect(layer, id) {
    return tmp[layer].achievements[id].effect;
}

function gridEffect(layer, id) {
    return gridRun(layer, "getEffect", player[layer].grid[id], id);
}

/**
 * @param {string} layer Id of the layer.
 * @param {string} id Id of the milestone.
 * @returns {Decimal} Effect of the given milestone.
 */
function milestoneEffect(layer, id) {
    return tmp[layer].milestones[id].effect;
}
