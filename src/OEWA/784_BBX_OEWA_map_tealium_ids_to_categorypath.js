// This extension maps tealium page identifiers of barbarix to oewa categorypath parts.
// For a list of the tealium `event_name`s of page events, consult the tagging plan.
// The `event_name`s can also be found in barbarix code in taggingService.ts.
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/784_BBX_OEWA_map_tealium_ids_to_categorypath.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

if (a !== "view") {
    return false;
}

function replaceUmlauts(string) {
    if (!string) {
        return string;
    }
    string = string.replace(/\u00c4/g, "Ae");
    string = string.replace(/\u00e4/g, "ae");
    string = string.replace(/\u00d6/g, "Oe");
    string = string.replace(/\u00f6/g, "oe");
    string = string.replace(/\u00dc/g, "Ue");
    string = string.replace(/\u00fc/g, "ue");
    string = string.replace(/\u00df/g, "ss");
    return string;
}

function oewaVerticalName(verticalId) {
    switch (verticalId) {
        case "1":
            return "Jobs";
        case "2":
            return "Immobilienmarkt";
        case "3":
            return "Automarkt";
        case "5":
            return "Sonstiges";
    }

    // this is a fallback, since slightly wrong oewa tags are better than broken ones
    return "Sonstiges";
}

function oewaCategory(category_level_id_1) {
    switch (category_level_id_1) {
        case "2":
            return "Auto";
        case "4":
            return "Motorraeder";
        case "52":
            return "Wohnmobile";
        case "50":
            return "Nutzfahrzeuge";
        case "131":
            return "Wohnungen_zu_vermieten";
        case "101":
            return "Wohnungen_zu_verkaufen";
        case "132":
            return "Haeuser_zu_vermieten";
        case "102":
            return "Haeuser_zu_verkaufen";
        case "32":
            return "Ferienimmobilien_zu_vermieten";
        case "12":
            return "Ferienimmobilien_zu_verkaufen";
        case "16":
            return "Gewerbeobjekte_zu_vermieten";
        case "15":
            return "Gewerbeobjekte_zu_verkaufen";
        case "14":
            return "Grundstuecke";
    }

    return "";
}

function createStartPageTag(vertical_id, category_level_id_1) {
    switch (vertical_id) {
        case 2:
            return "Home";
        case 3:
            switch (category_level_id_1) {
                case "2":
                    return "Auto";
                case "4":
                    return "Motorraeder";
            }
    }

    return "Home";
}

function createVerticalSKTG(vertical_id) {
    switch (vertical_id) {
        case "2":
            return "Service/Rubrikenmaerkte/Immobilienmarkt";
        case "3":
            return "Service/Rubrikenmaerkte/Automarkt";
        case "5":
            return "Service/Rubrikenmaerkte/Sonstiges";
    }

    return "Service/Rubrikenmaerkte/Sonstiges";
}

function createAdDetailPageId(vertical_id, make, model, category, region_level_2) {
    switch (vertical_id) {
        case "2":
            return (category || "Sonstige").concat("/DA/").concat(region_level_2);
        case "3":
            return "Auto/DA/".concat(make || "", "/", model || "");
    }

    return "";
}

function createAdDetailContactSellerConfirmationPageId(vertical_id, make, model, category, region_level_2) {
    switch (vertical_id) {
        case "2":
            return (category || "Sonstige").concat("/K_G/").concat(region_level_2);
        case "3":
            return "Auto/K_G/".concat(make || "", "/", model || "");
    }

    return "";
}

var vertical = oewaVerticalName(b.vertical_id);
var category = oewaCategory(b.category_level_id_1);
var startPageId = createStartPageTag(b.vertical_id, b.category_level_id_1);
var verticalSKTG = createVerticalSKTG(b.vertical_id);
var region_level_2_without_umlauts = replaceUmlauts(b.region_level_2 || "");
var adDetailPageId = createAdDetailPageId(b.vertical_id, b.make, b.model, category, region_level_2_without_umlauts);
var adDetailContactSellerConfirmationPageId = createAdDetailContactSellerConfirmationPageId(b.vertical_id, b.make, b.model, category, region_level_2_without_umlauts);

var map = {
    contact_contact: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    terms_conditions_general: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    terms_conditions_payment_and_delivery: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    ad_rules: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    privacy_policy: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    imprint: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    terms_conditions: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    press_about_willhaben: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    press_presstext: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    press_download: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    security_hints_overview: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    security_hints_buy: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    security_hints_account: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    security_hints_sell: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    security_hints_puppy: {
        sktg: "Service/Unternehmenskommunikation/Unternehmenskommunikation",
    },
    mywillhaben_myprofile: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    mywillhaben_changelogindata: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    login: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    register_form: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    register_confirm: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    forgot_password: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    forgot_password_confirm: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    change_password: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    my_search_agents: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    my_search_agents_create: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    my_search_agents_edit: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    my_search_agents_edit_modal: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    upselling: {
        sktg: "Service/Rubrikenmaerkte/".concat(vertical),
        pageid: "Anzeigenaufgabe",
    },
    checkout: {
        sktg: "Service/Rubrikenmaerkte/".concat(vertical),
        pageid: "Anzeigenaufgabe",
    },
    billrequest: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    invoices: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    renew_ad_page: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    my_ads: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    my_saved_ads: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    chat_view: {
        sktg: "Service/Sonstiges/Sonstiges",
        pageid: "Meinwillhaben",
    },
    adview: {
        sktg: verticalSKTG,
        pageid: adDetailPageId,
    },
    contact_seller_confirmation: {
        sktg: verticalSKTG,
        pageid: adDetailContactSellerConfirmationPageId,
    },
    search_result_list: {
        sktg: verticalSKTG,
        pageid: (category || "Sonstige").concat("/TL"),
    },
    detail_search: {
        sktg: verticalSKTG,
        pageid: (category || "Sonstige").concat("/Suche"),
    },
    vertical_home: {
        sktg: verticalSKTG,
        pageid: startPageId,
    },
    immotips: {
        sktg: "Service/Rubrikenmaerkte/Immobilienmarkt",
        pageid: "Immotipps",
    },
};

var params = map[b.event_name];

if (!params) {
    utag.DB("ignoring unhandled event_name '" + b.event_name + "' in BBX OEWA map");
    return false;
}

b.oewa_categorypath_sktg = params.sktg;
b.oewa_categorypath_pageid = params.pageid;
