function save(force) {
    NaNcheck(player);
    if (NaNalert && !force) return;
    localStorage.setItem(
        modInfo.id,
        btoa(unescape(encodeURIComponent(JSON.stringify(player))))
    );
    localStorage.setItem(
        `${modInfo.id}_options`,
        btoa(unescape(encodeURIComponent(JSON.stringify(options))))
    );
}
function startPlayerBase() {
    return {
        tab: layoutInfo.startTab,
        navTab: layoutInfo.showTree ? layoutInfo.startNavTab : "none",
        time: Date.now(),
        notify: {},
        versionType: modInfo.id,
        version: VERSION.num,
        beta: VERSION.beta,
        timePlayed: 0,
        keepGoing: false,
        hasNaN: false,
        notation: "Standard",
        points: modInfo.initialStartPoints,
        subtabs: {},
        lastSafeTab: layoutInfo.showTree ? "none" : layoutInfo.startTab
    };
}
function getStartPlayer() {
    const playerData = startPlayerBase();

    Object.assign(playerData, addedPlayerData());

    playerData.infoboxes = {};
    for (const layer in layers) {
        playerData[layer] = getStartLayerData(layer);

        if (
            layers[layer].tabFormat &&
            !Array.isArray(layers[layer].tabFormat)
        ) {
            playerData.subtabs[layer] = {};
            playerData.subtabs[layer].mainTabs = Object.keys(
                layers[layer].tabFormat
            )[0];
        }
        if (layers[layer].microtabs) {
            playerData.subtabs[layer] ??= {};
            for (const item in layers[layer].microtabs)
                playerData.subtabs[layer][item] = Object.keys(
                    layers[layer].microtabs[item]
                )[0];
        }
        if (layers[layer].infoboxes) {
            playerData.infoboxes[layer] ??= {};
            for (constitem in layers[layer].infoboxes) {
                playerData.infoboxes[layer][item] = false;
            }
        }
    }
    return playerData;
}

function getStartLayerData(layer) {
    const layerData = layers[layer].startData?.() ?? {};

    layerData.unlocked ??= true;
    layerData.total ??= Decimal.dZero;
    layerData.best ??= Decimal.dZero;
    layerData.resetTime ??= 0;
    layerData.forceTooltip ??= false;
    layerData.buyables = getStartBuyables(layer);
    layerData.noRespecConfirm ??= false;
    layerData.clickables = getStartClickables(layer);
    layerData.spentOnBuyables = Decimal.dZero;
    layerData.upgrades = [];
    layerData.milestones = [];
    layerData.lastMilestone = null;
    layerData.achievements = [];
    layerData.challenges = getStartChallenges(layer);
    layerData.grid = getStartGrid(layer);
    layerData.prevTab = "";
    return layerData;
}

function getStartBuyables(layer) {
    const data = {};
    if (!("buyables" in layers[layer])) return data;
    for (const id in layers[layer].buyables)
        if (isPlainObject(layers[layer].buyables[id])) data[id] = Decimal.dZero;
    return data;
}

function getStartClickables(layer) {
    const data = {};
    if (!("clickables" in layers[layer])) return data;
    for (const id in layers[layer].clickables)
        if (isPlainObject(layers[layer].clickables[id])) data[id] = "";
    return data;
}

function getStartChallenges(layer) {
    const data = {};
    if (!("challenges" in layers[layer])) return data;
    for (const id in layers[layer].challenges)
        if (isPlainObject(layers[layer].challenges[id])) data[id] = 0;
    return data;
}

function getStartGrid(layer) {
    const data = {};
    if (!("grid" in layers[layer])) return data;
    layers[layer].grid.maxRows ??= layers[layer].grid.rows;
    layers[layer].grid.maxCols ??= layers[layer].grid.cols;

    for (let y = 1; y <= layers[layer].grid.maxRows; y++) {
        for (let x = 1; x <= layers[layer].grid.maxCols; x++) {
            data[100 * y + x] = layers[layer].grid.getStartData(100 * y + x);
        }
    }
    return data;
}

function fixSave() {
    const defaultData = getStartPlayer();
    fixData(defaultData, player);

    for (const layer in layers) {
        if (player[layer].best !== undefined)
            player[layer].best = new Decimal(player[layer].best);
        if (player[layer].total !== undefined)
            player[layer].total = new Decimal(player[layer].total);

        if (
            layers[layer].tabFormat &&
            !Array.isArray(layers[layer].tabFormat)
        ) {
            if (!(player.subtabs[layer].mainTabs in layers[layer].tabFormat))
                player.subtabs[layer].mainTabs = Object.keys(
                    layers[layer].tabFormat
                )[0];
        }
        if (layers[layer].microtabs) {
            for (const item in layers[layer].microtabs)
                if (
                    !(
                        player.subtabs[layer][item] in
                        layers[layer].microtabs[item]
                    )
                )
                    player.subtabs[layer][item] = Object.keys(
                        layers[layer].microtabs[item]
                    )[0];
        }
    }
}
function fixData(defaultData, newData) {
    for (item in defaultData) {
        if (defaultData[item] == null) {
            if (newData[item] === undefined) newData[item] = null;
        } else if (Array.isArray(defaultData[item])) {
            if (newData[item] === undefined) newData[item] = defaultData[item];
            else fixData(defaultData[item], newData[item]);
        } else if (defaultData[item] instanceof Decimal) {
            if (newData[item] === undefined) newData[item] = defaultData[item];
            else newData[item] = new Decimal(newData[item]);
        } else if (
            !!defaultData[item] &&
            typeof defaultData[item] === "object"
        ) {
            if (
                newData[item] === undefined ||
                typeof defaultData[item] !== "object"
            )
                newData[item] = defaultData[item];
            else fixData(defaultData[item], newData[item]);
        } else {
            if (newData[item] === undefined) newData[item] = defaultData[item];
        }
    }
}
function load() {
    const get = localStorage.getItem(modInfo.id);
    if (get === null) {
        player = getStartPlayer();
        options = getStartOptions();
    } else {
        player = Object.assign(
            getStartPlayer(),
            JSON.parse(decodeURIComponent(escape(atob(get))))
        );
        fixSave();
        loadOptions();
    }

    if (options.offlineProd) {
        if (player.offTime === undefined) player.offTime = { remain: 0 };
        player.offTime.remain += (Date.now() - player.time) / 1000;
    }
    player.time = Date.now();
    versionCheck();
    changeTheme();
    changeTreeQuality();
    updateLayers();
    setupModInfo();
    setupTemp();
    updateTemp();
    updateTemp();
    updateTabFormats();
    loadVue();
}

function loadOptions() {
    const get = localStorage.getItem(modInfo.id + "_options");
    options =
        get !== null
            ? Object.assign(
                  getStartOptions(),
                  JSON.parse(decodeURIComponent(escape(atob(get))))
              )
            : getStartOptions();
    if (themes.indexOf(options.theme) < 0) theme = "default";
    fixData(options, getStartOptions());
}

function setupModInfo() {
    modInfo.changelog = changelog;
    modInfo.winText = winText;
}

function fixNaNs() {
    NaNcheck(player);
}

function NaNcheck(data) {
    for (item in data) {
        if (data[item] == null) {
        } else if (Array.isArray(data[item])) {
            NaNcheck(data[item]);
        } else if (data[item] !== data[item] || checkDecimalNaN(data[item])) {
            if (!NaNalert) {
                clearInterval(interval);
                NaNalert = true;
                alert(
                    "Invalid value found in player, named '" +
                        item +
                        "'. Please let the creator of this mod know! You can refresh the page, and you will be un-NaNed."
                );
                return;
            }
        } else if (data[item] instanceof Decimal) {
        } else if (!!data[item] && data[item].constructor === Object) {
            NaNcheck(data[item]);
        }
    }
}

function exportSave() {
    const saveData = btoa(JSON.stringify(player));
    const textarea = document.createElement("textarea");
    textarea.value = saveData;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

function importSave(imported = prompt("Paste your save here"), forced = false) {
    try {
        const tempPlayer = Object.assign(
            getStartPlayer(),
            JSON.parse(atob(imported))
        );
        if (
            tempPlayer.versionType !== modInfo.id &&
            !forced &&
            !confirm(
                "This save appears to be for a different mod! Are you sure you want to import?"
            )
        ) {
            return;
        }
        player = tempPlayer;
        player.versionType = modInfo.id;
        fixSave();
        versionCheck();
        NaNcheck(save);
        save();
        location.reload();
    } catch {
        return;
    }
}
function versionCheck() {
    if (player.versionType === undefined || player.version === undefined) {
        player.versionType = modInfo.id;
        player.version = 0;
    }

    if (player.versionType == modInfo.id && VERSION.num > player.version) {
        player.keepGoing = false;
        fixOldSave(player.version);
    }
    player.versionType = getStartPlayer().versionType;
    player.version = VERSION.num;
    player.beta = VERSION.beta;
}

let saveInterval = setInterval(() => {
    if (player === undefined) return;
    if (tmp.gameEnded && !player.keepGoing) return;
    if (options.autosave) save();
}, 5000);

addEventListener("beforeunload", () => {
    if (player.autosave) save();
});
