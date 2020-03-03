if (!b.client || b.client.toLowerCase() !== "jobs") {
    return false;
}

if (a === "link" && b.application === "employer") {

    if (b.application_view === "purchasePaymentSuccess") {
        b.fb_event = "Purchase";
    } else {
        // unused - do not send facebook events
        return false;
    }

}

