if (!b.client || b.client.toLowerCase() !== "jobs") {
    return false;
}

if (a === "view" && b.application === "employer") {
    if (b.application_view === "purchasePaymentSuccess") {
         b.order_id = "";
        b.currency = "EUR";
        b.price = b.product_price;
        b.conversion_id = "806155102";
        b.conversion_label = "ZaBECPyS7aoBEN7ms4AD";
    } else {
        return false;
    }
}
