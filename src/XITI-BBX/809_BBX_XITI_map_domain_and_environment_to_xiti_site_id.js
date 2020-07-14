// This extension maps domain and environment to xiti site id
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/809_BBX_XITI_map_domain_and_environment_to_xiti_site_id.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

var domain = b["dom.domain"];
var environment = b["environment"];
var mobileRegex = /^mobile(-.+)?.willhaben.at$/i;

var xitiSiteId;
if (mobileRegex.test(domain)) {
    if (environment && environment.toLowerCase() === "prod") {
        xitiSiteId = "474590";
    } else {
        xitiSiteId = "612450";
    }
} else {
    if (environment && environment.toLowerCase() === "prod") {
        xitiSiteId = "397816";
    } else {
        xitiSiteId = "612450";
    }
}

b.xiti_site_id = xitiSiteId;
