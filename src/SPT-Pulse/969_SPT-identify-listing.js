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
        b.spt_custom = JSON.stringify({
            name: "Listing viewed",
            object: {
                location: {
                    addressCountry: b.region_level_1,
                },
                filters: {
                    query: b["dom.query_string"],
                    sorting: b.map_sort_param(b["qp.sort"], b.vertical_id),
                    numResults: b["qp.rows"] ? b["qp.rows"] : "25",
                    publisherType: b.map_is_private(b["qp.ISPRIVATE"]),
                    adType:
                        b.category_level_id_1 === "131" || b.category_level_id_1 === "132" || b.category_level_id_1 === "16" || b.category_level_id_1 === "32" ? "rent" : "sell",
                    postalCode: b.map_post_code(),
                    region: b.map_region(b.region_level_1, b.region_level_2, b.region_level_3),
                },
            },
        });
    } catch (e) {
        // ignore
    }
}
