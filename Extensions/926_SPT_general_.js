var willhabenSPT = {} | willhabenSPT;

willhabenSPT = {
    classifiedAd: {
        includePublisher: function() {
            if (b && b['event_name'] === 'adview') {
                var publisher = {
                   "@id": "sdrn:willhaben:user:",
                   "@type": "Account",
                };
                b.append_spt_custom_object('publisher', publisher);
            }
        }
    },
    build: function() {
        willhabenSPT.classifiedAd.includePublisher();
    }
};

willhabenSPT.build();
