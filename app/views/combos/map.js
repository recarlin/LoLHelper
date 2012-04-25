function (doc){
	if (doc.type.substr(0) === "combo") {
		emit(doc._id, {
			"itemID": doc._id,
			"style": doc.style,
			"ad_carry": doc.ad_carry,
			"support": doc.support,
			"strat": doc.strat
		});
	}
};