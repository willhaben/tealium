// This extension maps fields from tmsDataValues to xiti SCVs
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/901_BBX_XITI_map_SCVs.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

function isNumberString(numberString) {
    if (!numberString) {
        return false;
    }

    var numberRegex = /^[0-9]+$/i;
    return numberRegex.test(numberString.trim());
}

// do not set xiti SCVs for clicks, otherwise additional page views will be tagged
if (a === "view") {
    if (typeof b.is_private !== "undefined") {
        // 1=C2C, 2=B2C
        b.xiti_x1 = b.is_private === "true" ? "1" : "2";
    }
    b.xiti_x5 = b.region_level_id_2;
    b.xiti_x6 = b.ad_id;
    b.xiti_x7 = "willhaben";
    b.xiti_x8 = b.vertical;
    b.xiti_x13 = "1";

    if (b.vertical_id === "5") {
        // BAP
        b.xiti_x9 = b.category_level_id_1;
        b.xiti_x10 = b.category_level_id_2;
        b.xiti_x11 = b.category_level_id_3;
        if (b.category_level_max) {
            var category_level_max = "category_level_id_" + b.category_level_max;
            b.xiti_x12 = b[category_level_max];
        }
    } else if (b.vertical_id === "3") {
        // MOTOR
        var adTypeId = b.ad_type_id;
        if (adTypeId) {
            b.xiti_x2 = "100" + adTypeId;
        }

        // the make_id will NOT be a number in case there are multiple makes selected in the search - in that case the make names are concatenated with semicolons
        var multipleMakes = !isNumberString(b.make_id);
        if (multipleMakes) {
            b.xiti_x3 = 1;
        } else {
            if (b.make_id && b.category_level_id_1 === "52") {
                // wohnwagen
                b.xiti_x3 = "333" + b.make_id;
            } else if (b.make_id && b.category_level_id_1 === "50") {
                // nutzfahrzeug
                b.xiti_x3 = "222" + b.make_id;
            } else {
                b.xiti_x3 = b.make_id;
            }
        }
    } else if (b.vertical_id === "2") {
        // ESTATE

        if (b.category_level_id_1 === "90") {
            b.xiti_x2 = "1";
        } else if (b.category_level_id_1 === "101") {
            b.xiti_x2 = "1";
        } else if (b.category_level_id_1 === "102") {
            b.xiti_x2 = "1";
        } else if (b.category_level_id_1 === "131") {
            b.xiti_x2 = "2";
        } else if (b.category_level_id_1 === "132") {
            b.xiti_x2 = "2";
        } else if (b.category_level_id_1 === "15") {
            b.xiti_x2 = "3";
        } else if (b.category_level_id_1 === "16") {
            b.xiti_x2 = "4";
        } else if (b.category_level_id_1 === "12") {
            b.xiti_x2 = "5";
        } else if (b.category_level_id_1 === "32") {
            b.xiti_x2 = "6";
        } else if (b.category_level_id_1 === "14") {
            b.xiti_x2 = "8";
        } else if (b.category_level_id_1 === "35") {
            b.xiti_x2 = "15";
        }

        // TODO result list and landing pages
        // if (b.dom.query_string.indexOf("TYPE_OF_SALE=Versteigerungen") > -1) {
        //     if (!b.ad_type_id) {
        //         b.xiti_x2 = "7777";
        //     }
        // }

        if (b.property_type && b.property_type.indexOf(";") === -1) {
            b.xiti_x3 = "999" + b.property_type;
        } else if (b.property_type_val && !isNaN(b.property_type_val)) {
            b.xiti_x3 = "999" + b.property_type_val;
        }
    }
}
