if (b["vertical"]) {
    var originalVertical = b["vertical"];
    if (originalVertical === "Auto & Motor" || originalVertical === "AutoMotor") {
        b["vertical"] = "Motor";
    } else if (originalVertical === "Immobilien") {
        b["vertical"] = "RealEstate";
    } else if (originalVertical === "Jobs & Karriere" || originalVertical === "JobsCareer") {
        b["vertical"] = "Jobs";
    } else if (originalVertical === "Marktplatz") {
        b["vertical"] = "Generalist";
    }
}
