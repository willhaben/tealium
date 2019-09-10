var results = (b.page_type === 'Favorits' && !!b.items && JSON.parse(b.items));

if(results && results.length > 0) {
    results = results.map(function(element) {
        return b.make_classified_ad_iad(element);
    });
    b.spt_items = results;
}
