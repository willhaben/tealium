function urlGetParameters() {
    var queryAndFragment = window.location.search + (window.location.hash + "").replace("#", "&");
    var parameters = {};
    if (utag.cfg.lowerqp) {
        queryAndFragment = queryAndFragment.toLowerCase();
    }
    if (queryAndFragment.length > 1) {
        var keyValueArray = queryAndFragment.substring(1).split("&");
        for (var i = 0; i < keyValueArray.length; i++) {
            var keyAndValue = keyValueArray[i].split("=");
            if (keyAndValue.length > 1) {
                parameters[keyAndValue[0]] = utag.ut.decode(keyAndValue[1]);
            }
        }
    }
    return parameters;
}

if (
    b.event_name.toLowerCase() === "list" ||
    b.event_name.toLowerCase() === "list_tile" ||
    b.event_name.toLowerCase() === "list_map" ||
    b.event_name.toLowerCase() === "search_result_list" ||
    b.event_name.toLowerCase() === "search_result_img" ||
    b.event_name.toLowerCase() === "llp_list" ||
    b.event_name.toLowerCase() === "llp_img" ||
    b.event_name.toLowerCase().indexOf("more_ads_from_user_search_result_list") > -1
) {
    b.spt_is_listing = "true";
    try {
        var getParams = urlGetParameters();
        var sorting = b.map_sort_param(getParams.sort, b.vertical_id);
        var rows = getParams.rows || "25";
        var publisherType = b.map_is_private(getParams.ISPRIVATE);

        var listingViewed = {
            name: "Listing viewed",
            object: {
                location: {
                    addressCountry: b.region_level_1,
                },
                filters: {
                    query: b["dom.query_string"],
                    sorting: sorting,
                    numResults: rows,
                    adType:
                      b.category_level_id_1 === "131" || b.category_level_id_1 === "132" || b.category_level_id_1 === "16" || b.category_level_id_1 === "32" ? "rent" : "sell",
                    postalCode: b.map_post_code(),
                    region: b.map_region(b.region_level_1, b.region_level_2, b.region_level_3),
                },
            },
        };

        if (publisherType != null && publisherType !== "") {
            listingViewed.object.filters.publisherType = publisherType;
        }

        b.spt_custom = JSON.stringify(listingViewed);
    } catch (e) {
        // ignore
    }
}
