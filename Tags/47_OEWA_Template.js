//~~tv:20010.20140827
//~~tc: Tealium Custom Container

/*
 * Tealium does not support OEWA out of the box, so this is a custom container for integrating OEWA in tealium.
 * We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Tags/47_OEWA_Template.js
 * Keep it up to date in the git repo, and do not just make random changes directly in the Tealium template.
 * Official OEWA documentation: http://www.oewa.at/Implementierung
 */

//tealium universal tag - utag.sender.custom_container ut4.0.##UTVERSION##, Copyright ##UTYEAR## Tealium.com Inc. All Rights Reserved.
try {
    (function(id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;

        // Start Tealium loader 4.32
        // Please do not modify
        if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
        // End Tealium loader

        u.ev = { view: 1 };

        u.initialized = false;

        ##UTGEN##

        u.send = function(a, b) {
            if (a !== "view") {
                utag.DB("ignoring send event in ##UTID## of type " + a);
                return;
            }

            if (u.ev[a] || u.ev.all !== undefined) {
                // eslint-disable-next-line no-unused-vars
                var c, d, e, f, i;

                u.data = {
                    /* Initialize default tag parameter values here */
                };

                /* Start Tag-Scoped Extensions Code */
                /* Please Do Not Edit This Section */
                ##UTEXTEND##
                /* End Tag-Scoped Extensions Code */

                /* Start Mapping Code */
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }

                utag.DB("environment of ##UTID##: " + b["ut.env"]);

                if (!(u.data && u.data["st"] && u.data["cp_sktg"])) {
                    utag.DB("skipping tag as not all necessary parameters were provided: ##UTID##");
                    utag.DB(u.data);
                    return;
                }

                var oewaParams = {
                    cn: "at", // country = austria
                    ps: "lin", // privacy setting, there is only "lin"
                    st: u.data["st"], // site
                };

                var cp = u.data["cp_sktg"];

                var width = b["dom.viewport_width"];
                var breakpointWidth = u.data["moewa_breakpoint"];
                var isMobile = false;
                if (typeof width === "number" && breakpointWidth && width <= breakpointWidth) {
                    isMobile = true;
                }

                if (isMobile) {
                    // TODO we need to follow the format [SKTG]/[moewa]/[PAGEID]
                    cp = cp + "/moewa";
                }

                if (u.data["cp_pageid"]) {
                    cp = cp + "/" + u.data["cp_pageid"];
                }

                // oewa survey unfortunately is not responsive, but has 2 formats: in (desktop version) and mo (mobile optimized)
                // since the mobile optimized version looks awful on bigger browser widths, select the better one based on browser width
                if (isMobile) {
                    oewaParams["sv"] = "mo";
                } else {
                    oewaParams["sv"] = "in";
                }

                var isProd = b["ut.env"] == "prod";
                if (isProd) {
                    oewaParams["cp"] = cp;
                } else {
                    // the "xp" parameter can be sent to oewa instead of cp for testing purposes, the requests will not be counted
                    oewaParams["xp"] = cp;
                }
                /* End Mapping Code */

                // we cannot directly send the request to oewa, but we need to load the oewa js library first
                // loader_cb is called when the oewa js lib was loaded successfully, only then we can send the request
                u.loader_cb = function() {
                    u.initialized = true;

                    utag.DB("send loader_cb: ##UTID##");
                    utag.DB(oewaParams);

                    if (!(typeof window.iom === "object" && typeof window.iom.c === "function")) {
                        utag.DB("window.iom.c not available: ##UTID##");
                        return;
                    }

                    // see OEWA documentation, 1 = AppendChild() method
                    var submission_mode = 1;
                    window.iom.c(oewaParams, submission_mode);
                };

                if (!u.initialized) {
                    // We load the OEWA library from the official location and don't host the code on our own. This is important.
                    var oewa_script_url = "//script-at.iocnt.net/iam.js";
                    u.loader({ type: "script", src: oewa_script_url, cb: u.loader_cb, loc: "script", id: "utag_##UTID##" });
                } else {
                    u.loader_cb();
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    })("##UTID##", "##UTLOADERID##");
} catch (error) {
    utag.DB(error);
}
//end tealium universal tag
