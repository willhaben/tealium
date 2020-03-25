if (!b.client || b.client.toLowerCase() !== "jobs") {
    return false;
}

if (a === "view" && b.application === "employer") {
    if (b.application_view === "purchasePaymentInitiated") {
        b.order_id = "";
        b.currency = "EUR";
        b.price = b.product_price;
    } else {
        // unused - do not send events to Google
        return false;
    }
} else {
    // unused - do not send events to Google
    return false;
}
