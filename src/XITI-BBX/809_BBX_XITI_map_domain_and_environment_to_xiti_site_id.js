// This extension maps domain and environment to xiti site id
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/809_BBX_XITI_map_domain_and_environment_to_xiti_site_id.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

if (b.environment && b.environment.toLowerCase() === "prod") {
    b.xiti_site_id = "612451";
} else {
    b.xiti_site_id = "612450";
}
