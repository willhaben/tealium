if (b["event_name"].toString().toLowerCase() == "adview".toLowerCase()) {
    b["spt_is_adview"] = "true";
    b["spt_custom"] = JSON.stringify({
        name: "Ad detail viewed",
        object: {
            location: {
                addressCountry: b["region_level_1"],
            },
            name: b["ad_title"],
        },
    });
}
