// This extension maps tealium event names iad/mweb to xiti page/click names.
// For a list of the tealium `event_name`s of page events, consult the tagging plan.
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/818_IAD_XITI_car_quicklink_mapping.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (b.event_name.indexOf("quicklink_") === -1) {
    return;
}

var conditionMap = {
    demonstrationcar: "Vorfuehrwagen",
    new: "Neuwagen",
    oldtimer: "Oldtimer",
    tageszulassung: "Tageszulassung",
    empleyeecar: "Jahreswagen",
};
var warrantyMap = {
    yes: "AutosMitGarantie",
};
var carTypeMap = {
    limousine: "Limousine",
    stationwaggon: "KombiFamilyVan",
    suvoffroad: "SUVGelaendewagen",
    compactcar: "KleinKompaktwagen",
    sportscarcoupe: "SportwagenCoupe",
    cabrioroadster: "CabrioRoadster",
    kleinbus: "Kleinbus",
    drivinglicencefree: "Mopedauto",
};

var map = {
    car_type: {
        chapter1: "Category",
        valueMapping: carTypeMap,
    },
    warranty: {
        chapter1: "QuickEntry",
        valueMapping: warrantyMap,
    },
    motor_condition: {
        chapter1: "QuickEntry",
        valueMapping: conditionMap,
    },
};

var eventName = b.event_name;
var firstUnderscoreIndex = eventName.indexOf("_");
var lastUnderscoreIndex = eventName.lastIndexOf("_");
if (firstUnderscoreIndex === -1 || lastUnderscoreIndex === -1) {
    // event name is not well formatted (should be e.g. quicklink_cart_type_limousine)
    return;
}

var attribute = eventName.substring(firstUnderscoreIndex + 1, lastUnderscoreIndex);
var valueXmlName = eventName.substring(lastUnderscoreIndex + 1);

var attributeMapping = map[attribute];

if (!attributeMapping) {
    // no attribute mapping found
    return;
}

var chapter1 = attributeMapping.chapter1;
var valueMapping = attributeMapping.valueMapping[valueXmlName];

if (!valueMapping) {
    // no valuemapping found
    return;
}

var clickNameChapterName = chapter1 + "::" + valueMapping;

b.xiti_click_chapter_name = clickNameChapterName;
