if (!b.client || b.client.toLowerCase() !== "jobs") {
    return false;
}

if (a === "view" && b.application === "employer") {
    if (b.application_view === "purchasePaymentSuccess") {
        // send event only on payment success
        return true;
    } else {
        // do not send events
        return false;
    }
}