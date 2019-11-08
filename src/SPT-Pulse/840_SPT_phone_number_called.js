var client = (b.client || "").toLowerCase();
if (client === "desktop" || client === "mweb" || client === "bbx") {
    if (a === "link" && (b.event_name == "call_number" || b.event_name == "call_button" || b.event_name == "addetail_call_phone_click")) {
        var classifiedId = b.ad_id + "";
        var isPrivate = b.is_private === "true";
        var urlDecode = function(value) {
            return value ? decodeURIComponent(value.replace(/\+/g, " ")) : value;
        };

        pulse(function(tracker) {
            tracker.evaluateEventInputs().then(function(eventDefaults) {
                var clickEvent = {
                    name: "Ad phone number called",
                    type: "Call",
                    target: { type: "PhoneContact", inReplyTo: eventDefaults.object },
                    object: {
                        type: "PhoneContact",
                        "@id": "sdrn:willhabenat:classified:" + classifiedId,
                        name: urlDecode(b.seller_name),
                        inReplyTo: {
                            "@id": "sdrn:willhabenat:classified:" + classifiedId,
                            "@type": "ClassifiedAd",
                            category: eventDefaults && eventDefaults.object ? eventDefaults.object.category : undefined,
                            categories: eventDefaults && eventDefaults.object ? eventDefaults.object.categories : undefined,
                            adType: eventDefaults && eventDefaults.object ? eventDefaults.object.adType : undefined,
                            publisherType: isPrivate ? "private" : "pro",
                            contentId: eventDefaults && eventDefaults.object ? eventDefaults.object.contentId : undefined,
                            name: eventDefaults && eventDefaults.object ? eventDefaults.object.name : undefined,
                            adId: eventDefaults && eventDefaults.object ? eventDefaults.object.adId : undefined,
                            location: eventDefaults && eventDefaults.object ? eventDefaults.object.location : undefined,
                            publisher: {
                                "@id": "sdrn:willhabenat:user:" + b.seller_uuid,
                                "@type": "Account",
                            },
                        },
                        category: eventDefaults && eventDefaults.object ? eventDefaults.object.category : undefined,
                        price: b.price,
                    },
                    origin: eventDefaults.object,
                };
                var tempTracker = tracker.clone();
                tempTracker.builders.object = {};
                tempTracker.track("trackerEvent", clickEvent);
            });
        });
    }
}
