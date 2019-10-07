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
        checkout: {
            page: "AI::".concat(privateOrProfessionalString).concat("::Checkout"),
            s2: "4",
        },
        billrequest: {
            page: "MyWillhaben::MyAds::RequestInvoice",
            s2: "10",
        },
        invoices: {
            page: "MyWillhaben::MyAds::Invoices",
            s2: "10",
        },
        renew_ad_page: {
            page: "MyWillhaben::MyAds::RenewAd",
            s2: "10",
        },
        my_ads: {
            page: "MyWillhaben::MyAds",
            s2: "10",
        },
        my_saved_ads: {
            page: "MyWillhaben::MySavedAds",
            s2: "10",
        },
        chat_view: {
            page: "MyWillhaben::Messages",
            s2: "10",
        },
        adview: {
            page: "AdDetail",
            s2: "3",
        },
        adimage_view: {
            page: "AdImg",
            s2: "3",
        },
        adimage_view_fullscreen: {
            page: "AdImg_FullScreen",
            s2: "3",
        },
        contact_seller_confirmation: {
            page: "MessageConfirmation",
            s2: "3",
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
        renew_ad_renew_click: {
            click: "RenewAd::Publish",
            s2: "10",
        },
        my_ads_click_open_context_menu: {
            click: "MyAds::Edit",
            s2: "10",
        },
        my_ads_click_delete_ad: {
            click: "MyAds::Delete",
            s2: "10",
        },
        my_ads_click_share_ad: {
            click: "MyAds::Share",
            s2: "10",
        },
        my_ads_click_upselling: {
            click: "MyAds::Upselling",
            s2: "10",
        },
        my_ads_click_finalize: {
            click: "MyAds::Resume",
            s2: "10",
        },
        my_ads_click_activate: {
            click: "MyAds::Activate",
            s2: "10",
        },
        my_ads_click_republish: {
            click: "MyAds::Resubmit",
            s2: "10",
        },
        my_ads_contextmenu_click_edit_images: {
            click: "MyAds::Edit::Image",
            s2: "10",
        },
        my_ads_contextmenu_click_edit_text: {
            click: "MyAds::Edit::Description",
            s2: "10",
        },
        my_ads_contextmenu_click_activate: {
            click: "MyAds::Edit::Activate",
            s2: "10",
        },
        my_ads_contextmenu_click_deactivate: {
            click: "MyAds::Edit::Deactivate",
            s2: "10",
        },
        my_ads_contextmenu_click_toggle_availability: {
            click: "MyAds::Edit::ToggleAvailability",
            s2: "10",
        },
        my_ads_contextmenu_click_finalize: {
            click: "MyAds::Edit::Resume",
            s2: "10",
        },
        my_ads_contextmenu_click_republish: {
            click: "MyAds::Edit::Resubmit",
            s2: "10",
        },
        my_ads_contextmenu_click_upselling: {
            click: "MyAds::Edit::Upselling",
            s2: "10",
        },
        my_ads_contextmenu_click_delete: {
            click: "MyAds::Edit::Delete",
            s2: "10",
        },
        my_ads_contextmenu_click_request_bill: {
            click: "MyAds::Edit::RequestInvoice",
            s2: "10",
        },
        my_ads_click_goto_aza: {
            click: "MyAds::EmptyState::CreateAd",
            s2: "10",
        },
        my_saved_ads_click_renew: {
            click: "MySavedAds::Save::Renewed",
            s2: "10",
        },
        my_saved_ads_click_sorting_DATE_ADDED: {
            click: "MySavedAds::Sort::Date",
            s2: "10",
        },
        my_saved_ads_click_sorting_MARKET: {
            click: "MySavedAds::Sort::AdType",
            s2: "10",
        },
        my_saved_ads_click_sorting_PRICE_DESC: {
            click: "MySavedAds::Sort::PriceDescending",
            s2: "10",
        },
        my_saved_ads_click_sorting_PRICE_ASC: {
            click: "MySavedAds::Sort::PriceAscending",
            s2: "10",
        },
        header_click_logo: {
            click: "Menu::Logo",
            s2: "11",
        },
        header_click_messages: {
            click: "Menu::Messages",
            s2: "11",
        },
        header_click_login: {
            click: "Menu::Login",
            s2: "11",
        },
        header_click_register: {
            click: "Menu::Register",
            s2: "11",
        },
        header_click_myWillhaben: {
            click: "Menu::MyWillhaben",
            s2: "11",
        },
        header_click_insertAd: {
            click: "Menu::InsertAd",
            s2: "11",
        },
        header_click_marketplace: {
            click: "Menu::Generalist",
            s2: "11",
        },
        header_click_realestate: {
            click: "Menu::RealEstate",
            s2: "11",
        },
        header_click_motor: {
            click: "Menu::Motor",
            s2: "11",
        },
        header_click_jobs: {
            click: "Menu::Jobs",
            s2: "11",
        },
        header_usermenu_click_myAdverts: {
            click: "Menu::MyWillhaben::MyAds",
            s2: "11",
        },
        header_usermenu_click_mySearches: {
            click: "Menu::MyWillhaben::MySearchAgents",
            s2: "11",
        },
        header_usermenu_click_myFindings: {
            click: "Menu::MyWillhaben::MySavedAds",
            s2: "11",
        },
        header_usermenu_click_chat: {
            click: "Menu::MyWillhaben::MyMessages",
            s2: "11",
        },
        header_usermenu_click_jobsProfile: {
            click: "Menu::MyWillhaben::MyJob",
            s2: "11",
        },
        header_usermenu_click_editUser: {
            click: "Menu::MyWillhaben::MyProfile",
            s2: "11",
        },
        header_usermenu_click_logout: {
            click: "Menu::MyWillhaben::Logout",
            s2: "11",
        },
        addetail_previous_ad_click: {
            click: "AdDetail::Navigation::Previous",
            s2: "3",
        },
        addetail_next_ad_click: {
            click: "AdDetail::Navigation::Next",
            s2: "3",
        },
        addetail_favorite_ad_click: {
            click: "AdDetail::SaveAd",
            s2: "3",
        },
        addetail_share_email_click: {
            click: "AdDetail::Share::Email",
            s2: "3",
        },
        addetail_share_whatsapp_click: {
            click: "AdDetail::Share::Whatsapp",
            s2: "3",
        },
        addetail_share_facebook_click: {
            click: "AdDetail::Share::Facebook",
            s2: "3",
        },
        addetail_share_twitter_click: {
            click: "AdDetail::Share::Twitter",
            s2: "3",
        },
        addetail_share_link_click: {
            click: "AdDetail::Share::Link",
            s2: "3",
        },
        addetail_print_click: {
            click: "AdDetail::Print",
            s2: "3",
        },
        addetail_dealer_website_click: {
            click: "AdDetail::DealerWebsite",
            s2: "3",
        },
        addetail_contact_seller_top_click: {
            click: "AdDetail::ContactSeller",
            s2: "3",
        },
        addetail_show_phone_number_click: {
            click: "AdDetail::ShowPhoneNumber",
            s2: "3",
        },
        addetail_more_ads_click: {
            click: "AdDetail::SellerProfile",
            s2: "3",
        },
        addetail_show_opening_hours_click: {
            click: "AdDetail::ShowOpeningHours",
            s2: "3",
        },
        addetail_expand_description_click: {
            click: "AdDetail::ShowDescription",
            s2: "3",
        },
        addetail_more_from_dealer_ad_click: {
            click: "AdDetail::MoreFromDealer",
            s2: "3",
        },
        addetail_similar_ad_click: {
            click: "AdDetail::MoreSimilarCars",
            s2: "3",
        },
        addetail_warranty_click: {
            click: "AdDetail::Warranty",
            s2: "3",
        },
        addetail_defects_liability_click: {
            click: "AdDetail::DefectsLiability",
            s2: "3",
        },
        addetail_warranty_logo_click: {
            click: "AdDetail::Warranty::Logo",
            s2: "3",
        },
        addetail_dealer_profile_click: {
            click: "AdDetail::ShowDealerProfile",
            s2: "3",
        },
        addetail_map_click: {
            click: "AdDetail::ShowMap",
            s2: "3",
        },
        addetail_send_email_click: {
            click: "AdDetail::SendEmail",
            s2: "3",
        },
        addetail_send_message_click: {
            click: "AdDetail::SendMessage",
            s2: "3",
        },
        addetail_call_phone_click: {
            click: "AdDetail::Call",
            s2: "3",
        },
        // -------- self-promotions ----------
        addetail_more_from_dealer_viewed_selfpromotion: {
            xiti_selfpromotion_impression: {
                adId: "3",
                productId: "AdDetail",
                format: "SimilarAdsWidgetCarB2C",
            },
        },
        addetail_similar_ads_viewed_selfpromotion: {
            xiti_selfpromotion_impression: {
                adId: "3",
                productId: "AdDetail",
                format: "SimilarAdsWidgetCar",
            },
        },
    };

    params = map[b.event_name];

    if (!params) {
        utag.DB("ignoring unhandled event_name '" + b.event_name + "' in BBX XITI link map");
        return false;
    }

    b.xiti_click_chapter_name = params.click;
    b.xiti_s2 = params.s2;

    b.xiti_selfpromotion_impression = params.xiti_selfpromotion_impression;
}
