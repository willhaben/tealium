// This extension maps fields from tmsDataValues to xiti SCVs
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/763_BBX_XITI_map_SCVs.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

if (a == "view") {
    b.xiti_x7 = "willhaben";
    b.xiti_x13 = "1";
}

if (b.vertical_id === "5") {
    b.xiti_x9 = b.category_level_id_1;
    b.xiti_x10 = b.category_level_id_2;
    b.xiti_x11 = b.category_level_id_3;
    b.xiti_x12 = b.category_level_id_4;
}
