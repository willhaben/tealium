var willhabenSPT = {} | willhabenSPT;

willhabenSPT = {
    classifiedAd: {
        includePublisher: function() {
            if (b && b['event_name'] === 'adview') {
                b['spt_custom'] = JSON.stringify({
                    "object": {
                        "publisher": "sdrn:willhabenat:message:123"
                    }
                });
            }
        }
    },
    build: function() {
        willhabenSPT.classifiedAd.includePublisher();
    }
};

willhabenSPT.build();
