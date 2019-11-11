if (b && b.ad_type_id) {
    var adTypeId = b.ad_type_id;
    var sellAdTypes = [1, 3, 5, 8, 15, 20, 21, 25, 26, 67, 68, 69];
    var rentAdTypes = [2, 4, 6, 9];
    var jobOfferAdTypes = [40];
    if (sellAdTypes.indexOf(adTypeId) !== -1) {
        b.ad_type_schibsted = "sell";
    } else if (rentAdTypes.indexOf(adTypeId) !== -1) {
        b.ad_type_schibsted = "rent";
    } else if (jobOfferAdTypes.indexOf(adTypeId) !== -1) {
        b.ad_type_schibsted = "jobOffer";
    }
}
