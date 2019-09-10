var client = (b.client || "").toLowerCase();
if (
    a === "view" &&
    ((client === "bbx" && b.event_name === "adimage_view") || (client === "desktop" && b.event_name === "ad_img") || (client === "mweb" && b.event_name === "adimg"))
) {
    // do not track change image events in Pulse
    return false;
}
