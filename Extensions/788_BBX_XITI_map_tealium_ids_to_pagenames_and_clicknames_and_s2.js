// This extension maps tealium page identifiers of barbarix to xiti page/click names and s2 parameter
// For a list of the tealium `event_name`s of page events, consult the tagging plan.
// The `event_name`s can also be found in barbarix code in taggingService.ts.
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/788_BBX_XITI_map_tealium_ids_to_pagenames_and_clicknames_and_s2.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

var map, params;

if (a === "view") {
    map = {
        contact_contact: {
            page: "Contact::Contact",
            s2: "5",
        },
        terms_conditions_general: {
            page: "GeneralTerms",
            s2: "5",
        },
        ad_rules: {
            page: "AdRules",
            s2: "5",
        },
        privacy_policy: {
            page: "PrivacyPolicy",
            s2: "5",
        },
        imprint: {
            page: "Imprint",
            s2: "5",
        },
        terms_conditions: {
            page: "TermsOfUse",
            s2: "5",
        },
        press_about_willhaben: {
            page: "Press::AboutWillhaben",
            s2: "5",
        },
        press_presstext: {
            page: "Press::PressText",
            s2: "5",
        },
        press_download: {
            page: "Press::Download",
            s2: "5",
        },
        security_hints_overview: {
            page: "SecurityHints::Overview",
            s2: "5",
        },
        security_hints_buy: {
            page: "SecurityHints::Buy",
            s2: "5",
        },
        security_hints_account: {
            page: "SecurityHints::Account",
            s2: "5",
        },
        security_hints_sell: {
            page: "SecurityHints::Sell",
            s2: "5",
        },
        security_hints_puppy: {
            page: "SecurityHints::Puppy",
            s2: "5",
        },
        mywillhaben_myprofile: {
            page: "MyWillhaben::MyProfile",
            s2: "10",
        },
        mywillhaben_changelogindata: {
            page: "MyWillhaben::MyProfile::Edit",
            s2: "10",
        },
    };

    params = map[b.event_name];

    if (!params) {
        utag.DB("ignoring unhandled event_name '" + b.event_name + "' in BBX XITI view map");
        return false;
    }

    b.xiti_page_chapter_name = params.page;
    b.xiti_s2 = params.s2;
} else if (a === "link") {
    map = {
        send_confirm: {
            click: "SendConfirm",
            s2: "5",
        },
        send_error: {
            click: "SendError",
            s2: "5",
        },
        mywillhaben_myprofile_save: {
            page: "MyProfile::Save",
            s2: "10",
        },
        mywillhaben_myprofile_seller_profile: {
            page: "MyProfile::SellerProfile",
            s2: "10",
        },
        mywillhaben_myprofile_privacy_policy: {
            page: "MyProfile::PrivacyPolicy",
            s2: "10",
        },
    };

    params = map[b.event_name];

    if (!params) {
        utag.DB("ignoring unhandled event_name '" + b.event_name + "' in BBX XITI link map");
        return false;
    }

    b.xiti_click_chapter_name = params.click;
    b.xiti_s2 = params.s2;
}
