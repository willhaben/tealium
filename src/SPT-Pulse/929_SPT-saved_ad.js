var client = (b.client || "").toLowerCase();
if (client === "bbx") {
    if (a === "link" && (b.event_name === "addetail_favorite_ad_saved" || b.event_name === "addetail_favorite_ad_unsaved")) {
        pulse(function(tracker) {
            tracker.evaluateEventInputs().then(function(eventDefaults) {
                var isSaved = b.event_name === "addetail_favorite_ad_saved";
                var clickEvent = {
                    name: isSaved ? "Ad saved" : "Ad unsaved",
                    type: isSaved ? "Save" : "Unsave",
                    object: eventDefaults.object,
                };

                var tempTracker = tracker.clone();
                tempTracker.builders.object = {};
                tempTracker.track("trackerEvent", clickEvent);
            });
        });
    }
} else if (client === "desktop" || client === "mweb") {
    if (
        typeof b.event_name !== "undefined" &&
        a !== "view" &&
        (b.event_name === "favorite_ad" || b.event_name === "favorite_ad_search_result" || b.event_name === "delete_favorite_ad")
    ) {
        pulse(function(tracker) {
            tracker.evaluateEventInputs().then(function(eventDefaults) {
                var clickEvent = {
                    name: b.favorite_ad_saved ? "Ad saved" : "Ad unsaved",
                    type: b.favorite_ad_saved ? "Save" : "Unsave",
                    object: eventDefaults.object,
                };
                //if this was a search page find the ad in the listing items
                var items;

                if (eventDefaults.object.items) {
                    items = eventDefaults.object.items;
                } else if (b["spt_items"]) {
                    items = b["spt_items"];
                }

                if (items && !(client === "mweb" && b['page_type'] !== 'Favorits' && b.event_name === "favorite_ad")) {
                    var ads = items;
                    for (var i = 0; i < ads.length; i++) {
                        if (ads[i].adId == b.favorite_ad) {
                            clickEvent.object = ads[i];
                            if (clickEvent.object.price === 0 && clickEvent.object.adType === "sell") {
                                clickEvent.object.adType = "give";
                            }
                            break;
                        }
                    }
                }

                var tempTracker = tracker.clone();
                tempTracker.builders.object = {};
                tempTracker.track("trackerEvent", clickEvent);
            });
        });
    }
}
