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

if (b.event_name === "contact_contact") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "terms_conditions_general") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "ad_rules") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "privacy_policy") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "imprint") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "terms_conditions") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "press_about_willhaben") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "press_presstext") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "press_download") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "security_hints_overview") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "security_hints_buy") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "security_hints_account") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "security_hints_sell") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "security_hints_puppy") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else if (b.event_name === "mywillhaben_myprofile") {
    b.oewa_categorypath_sktg = "Service/Unternehmenskommunikation/Unternehmenskommunikation";
    b.oewa_categorypath_pageid = "";
} else {
    // ignore unknown pages
    return false;
}
