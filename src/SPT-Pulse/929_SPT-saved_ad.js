if (typeof b.event_name !== "undefined" && (b.event_name === "delete_favorite_ad")) {
    b.event_name = 'favorite_ad';
}

if (typeof b.event_name !== "undefined" && (b.event_name === "favorite_ad" || b.event_name === "favorite_ad_search_result") && a !== "view") {
    pulse(function (tracker){
        tracker.evaluateEventInputs().then(function (eventDefaults) {
            var clickEvent = {
                name: b.favorite_ad_saved ? "Ad saved": "Ad unsaved",
                type: b.favorite_ad_saved ? "Save": "Unsave",
                object: eventDefaults.object
            };
            //if this was a search page find the ad in the listing items
            var items;

            if (eventDefaults.object.items) {
                items = eventDefaults.object.items;
            } else if (b['items']) {
                items = JSON.parse(b['items'])
            }

            if (items) {
                var ads = items;
                for (var i= 0; i < ads.length; i++) {
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
