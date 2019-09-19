if (!b.client || b.client.toLowerCase() !== "jobs") {
    return false;
}

if (a === "link" && b.application === "employerPublic") {

    if (b.application_view === "employerSelfservice") {
        if (b.event_name === "purchaseBuy") {
            b.fb_event = "Purchase";
            b.currency = "EUR";
            b.price = b.product_price;
            b.product_quantity = b.product_quantity;
        } else {
            // unused - do not send facebook events
            return false;
        }
    } else {
        // unused - do not send facebook events
        return false;
    }
}

if (a === "link" && b.application === "employer") {

    if (b.application_view === "purchase") {
        if (b.event_name === "purchaseBuy") {
            b.fb_event = "Purchase";
            b.currency = "EUR";
            b.price = b.product_price;
            b.product_quantity = b.product_quantity;
        } else {
            // unused - do not send facebook events
            return false;
        }
    } else if (b.application_view === "checkout") {
        if (b.event_name === "checkoutPay") {
            b.fb_event = "Purchase";
            b.currency = "EUR";
            b.price = b.product_price;
            b.product_quantity = b.product_quantity;
        } else {
            // unused - do not send facebook events
            return false;
        }
    } else {
        // unused - do not send facebook events
        return false;
    }

}
