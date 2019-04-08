// This extension maps tealium page identifiers of barbarix to xiti page/click names and s2 parameter
// For a list of the tealium `event_name`s of page events, consult the tagging plan.
// The `event_name`s can also be found in barbarix code in taggingService.ts.
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/788_BBX_XITI_map_tealium_ids_to_pagenames_and_clicknames_and_s2.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

var map, params;

function isPrivateAd() {
    if (b.ad_type_id === "69") {
        return false;
    }

    // as a fallback we always assume private
    return true;
}

var privateOrProfessionalString = isPrivateAd() ? "Private" : "Professional";

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
        login: {
            page: "MyWillhaben::MyAccount::Login",
            s2: "10",
        },
        register_form: {
            page: "MyWillhaben::MyAccount::Registration",
            s2: "10",
        },
        register_confirm: {
            page: "MyWillhaben::MyAccount::RegistrationDone",
            s2: "10",
        },
        forgot_password: {
            page: "MyWillhaben::MyAccount::ForgotPassword",
            s2: "10",
        },
        forgot_password_confirm: {
            page: "MyWillhaben::MyAccount::ForgotPasswordDone",
            s2: "10",
        },
        change_password: {
            page: "MyWillhaben::MyAccount::ChangePassword",
            s2: "10",
        },
        my_search_agents: {
            page: "MyWillhaben::MySearchAgents",
            s2: "10",
        },
        my_search_agents_create: {
            page: "MyWillhaben::MySearchAgents_Create",
            s2: "10",
        },
        my_search_agents_edit: {
            page: "MyWillhaben::MySearchAgents_Edit",
            s2: "10",
        },
        my_search_agents_edit_modal: {
            page: "MyWillhaben::MySearchAgents_Edit_Overlay",
            s2: "10",
        },
        upselling: {
            page: "AI::".concat(privateOrProfessionalString).concat("::Upselling"),
            s2: "4",
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
            click: "MyProfile::Save",
            s2: "10",
        },
        mywillhaben_myprofile_seller_profile: {
            click: "MyProfile::SellerProfile",
            s2: "10",
        },
        mywillhaben_myprofile_privacy_policy: {
            click: "MyProfile::PrivacyPolicy",
            s2: "10",
        },
        login_success: {
            click: "Login::SendConfirm",
            s2: "10",
        },
        login_error: {
            click: "Login::SendError",
            s2: "10",
        },
        register_success: {
            click: "Registration::SendConfirm",
            s2: "10",
        },
        register_error: {
            click: "Registration::SendError",
            s2: "10",
        },
        my_search_agents_detail: {
            click: "MySearchAgents::Open::SearchResult_List",
            s2: "10",
        },
        my_search_agents_edit_click: {
            click: "MySearchAgents::Edit",
            s2: "10",
        },
        my_search_agents_deactivate: {
            click: "MySearchAgents::InactiveOn",
            s2: "10",
        },
        my_search_agents_activate: {
            click: "MySearchAgents::ActiveOn",
            s2: "10",
        },
        my_search_agents_delete: {
            click: "MySearchAgents::Delete",
            s2: "10",
        },
        my_search_agents_save: {
            click: "MySearchAgents_Edit::Save",
            s2: "10",
        },
        my_search_agents_change_criteria: {
            click: "MySearchAgents_Edit::ChangeCriteria",
            s2: "10",
        },
        upselling_purchase_click: {
            click: "Upselling::Purchase",
            s2: "4",
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
