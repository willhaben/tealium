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
                            category: b.category_level_2 ? b.category_level_1 + " > " + b.category_level_2 : b.category_level_1,
                            categories: eventDefaults && eventDefaults.object ? eventDefaults.object.categories : undefined,
                            adType: eventDefaults && eventDefaults.object ? eventDefaults.object.adType : undefined,
                            publisherType: isPrivate ? "private" : "pro",
                            contentId: b.ad_id,
                            adId: b.ad_id,
                            name: b.ad_title,
                            publisher: eventDefaults && eventDefaults.object ? eventDefaults.object.publisher : undefined,
                            location: {
                                "@type": "PostalAddress",
                                addressRegion: b.region_level_3 ? b.region_level_3 : b.region_level_2,
                                postalCode: b.post_code,
                            },
                        },
                        category: b.category_level_2 ? b.category_level_1 + " > " + b.category_level_2 : b.category_level_1,
                        telephone: b.ad_contact_phone + "",
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
