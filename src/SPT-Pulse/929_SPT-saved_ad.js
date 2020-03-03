// Duplicates 816_SPT_map_search_result_item.js
var map_ad_type = function(adTypeId) {
    switch (adTypeId) {
        case "2":
        case "6":
        case "9":
            return "rent";
        default:
            return "sell";
    }
};

var resolve_categories = function(ad) {
    if (ad.categories) {
        for (var i = 0; i < ad.categories.length; i++) {
            ad.categories[i]["@type"] = ad.categories[i].type;
        }
        return ad.categories;
    } else {
        return [];
    }
};

var resolve_publisher = function(ad) {
    if (ad.publisher) {
        ad.publisher["@id"] = ad.publisher.id;
        ad.publisher["@type"] = "Account";

        delete ad.publisher.id;
        delete ad.publisher.type;
        return ad.publisher;
    } else {
        return [];
    }
};

var map_category = function(ad) {
    var cat = "";

    if (ad.categories) {
        for (var i = ad.categories.length - 1; i >= 0; i--) {
            var category = ad.categories[i];
            if (cat.length <= 0) {
                cat += category.name;
            } else {
                cat += " > " + category.name;
            }
        }
    } else {
        var adTypeId = ad.adTypeId;
        switch (adTypeId) {
            case "20":
            case "21":
            case "25":
            case "26":
                cat = "Motor";
                break;
            case "66":
            case "67":
            case "68":
            case "69":
                cat = "Generalist";
                break;
            case "40":
            case "49":
                cat = "Jobs";
                break;
            default:
                cat = "Realestate";
        }

        if (ad.category_level_1) {
            cat += " > " + ad.category_level_1;
        }
        if (b["category_level_2"]) {
            cat += " > " + ad.category_level_2;
        }
        if (ad.category_level_3) {
            cat += " > " + ad.category_level_3;
        }
        if (ad.category_level_4) {
            cat += " > " + ad.category_level_4;
        }
        if (b["category_level_5"]) {
            cat += " > " + ad.category_level_5;
        }
    }

    return cat;
};

var make_location = function(ad) {
    var location = ad.location;
    if (location) {
        location["@type"] = "PostalAddress";
    }
    return location;
};

var add_price_if_numerical = function(result, price) {
    if (!price || isNaN(parseFloat(price))) {
        return;
    }

    result["price"] = parseFloat(price);
};

var make_classified_ad_iad = function(ad) {
    var id = ad.adId;
    var name = ad.title;
    var sdrn = "sdrn:willhabenat:classified:iad:" + id.toString();
    var adId = id;
    var ad_location = make_location(ad);
    var result = {
        adId: parseInt(adId),
        adType: map_ad_type(ad.adTypeId),
        category: map_category(ad),
        categories: resolve_categories(ad),
        contentId: adId,
        name: name,
        publisher: resolve_publisher(ad),
        publisherType: ad.publisherType ? ad.publisherType.toLowerCase() : ad.publisherType,
        location: ad_location,
    };
    result["@id"] = sdrn;
    result["@type"] = "ClassifiedAd";
    result["currency"] = "EUR";

    add_price_if_numerical(result, ad.price);

    return result;
};
// end of duplicate

var map_classified_ads = function(items) {
    var classifiedAds = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var classifiedAd = make_classified_ad_iad(item);
        classifiedAds.push(classifiedAd);
    }
    return classifiedAds;
};

var client = (b.client || "").toLowerCase();
if (client === "bbx") {
    if (
        a === "link" &&
        (b.event_name === "addetail_favorite_ad_saved" ||
            b.event_name === "addetail_favorite_ad_unsaved" ||
            b.event_name === "search_result_list_ad_saved" ||
            b.event_name === "search_result_list_ad_unsaved" ||
            b.event_name === "savedads_favorite_ad_unsaved")
    ) {
        pulse(function(tracker) {
            tracker.evaluateEventInputs().then(function(eventDefaults) {
                var isSaved = b.event_name === "addetail_favorite_ad_saved" || b.event_name === "search_result_list_ad_saved";
                var clickEvent = {
                    name: isSaved ? "Ad saved" : "Ad unsaved",
                    type: isSaved ? "Save" : "Unsave",
                    object: eventDefaults.object,
                };

                var isList = b.event_name === "search_result_list_ad_saved" || b.event_name === "search_result_list_ad_unsaved" || b.event_name === "savedads_favorite_ad_unsaved";
                if (isList) {
                    //if this was a search page find the ad in the listing items
                    var items;

                    if (eventDefaults.object.items) {
                        items = eventDefaults.object.items;
                    } else if (b.search_results || b.items) {
                        var adItemsString = b.search_results || b.items;
                        var rawAdItems = JSON.parse(adItemsString);
                        items = map_classified_ads(rawAdItems);
                    }

                    // this block performs the mapping when we save an ad from a list
                    if (items) {
                        var ads = items;
                        for (var i = 0; i < ads.length; i++) {
                            // client needs to provide the favorite_ad parameter
                            if (ads[i].adId == b.favorite_ad) {
                                clickEvent.object = ads[i];
                                if (clickEvent.object.price === 0 && clickEvent.object.adType === "sell") {
                                    clickEvent.object.adType = "give";
                                }
                                break;
                            }
                        }
                    }
                }

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
                } else if (b.search_results || b.items) {
                    var adItemsString = b.search_results || b.items;
                    var rawAdItems = JSON.parse(adItemsString);
                    items = map_classified_ads(rawAdItems);
                }

                // this block performs the mapping when we save an ad from a list. search result pages have a distinct event_name of 'favorite_ad_search_result' on mweb
                if (items && !(client === "mweb" && b.page_type !== "Favorits" && b.event_name === "favorite_ad")) {
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
                tempTracker.track('trackerEvent', clickEvent);

            });
        });
    }
}
