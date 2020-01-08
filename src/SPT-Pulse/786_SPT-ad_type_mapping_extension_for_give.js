if (b["ad_type_id"] === "67" && b["price"] && parseFloat(b["price"]) === 0) {
    b["spt_price"] = 0;
    b["ad_type_schibsted"] = "give";
}

if (b["price"] === undefined) {
    b["spt_price"] = 0;
}

if (b["price"] && isNaN(parseFloat(b["price"]))) {
    b["spt_price"] = 0;
}