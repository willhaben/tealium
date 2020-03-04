var client = (b.client || "").toLowerCase();
if (client === "desktop" || client === "mweb" || client === "bbx") {
    if (a === "link" && b.event_name == "payment_delivery_choose_parcel_size") {
        var classifiedId = b.ad_id + "";
        var isPrivate = b.is_private === "true";

        pulse(function(tracker) {
            tracker.evaluateEventInputs().then(function(eventDefaults) {
                var engagementEvent = {
                    name: "Payment&Delivery parcel size chosen",
                    type: "Engagement",
                    object: {
                        "@type": "UIElement",
                        "@id": "sdrn:willhabenat:classified:" + classifiedId + ":element:parcelSizeRadio",
                        action: "Click",
                        elementType: "Radio",
                        name: "Choose parcel size",
                    },
                    target: {
                        "@id": "sdrn:willhabenat:classified:" + classifiedId,
                        category: eventDefaults && eventDefaults.object ? eventDefaults.object.category : undefined,
                        categories: eventDefaults && eventDefaults.object ? eventDefaults.object.categories : undefined,
                        contentId: eventDefaults && eventDefaults.object ? eventDefaults.object.contentId : undefined,
                        adId: eventDefaults && eventDefaults.object ? eventDefaults.object.adId : undefined,
                        publisherType: isPrivate ? "private" : "pro",
                    },
                    origin: eventDefaults.object,
                };
                var tempTracker = tracker.clone();
                tempTracker.builders.object = {};
                tempTracker.track("trackerEvent", engagementEvent);
            });
        });
    }
}
