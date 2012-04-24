function (doc){
	if (doc.type.substr(0, 6) === "roster") {
		emit(doc._id, {
			"itemID": doc._id,
			"name": doc.Champion,
			"lane": doc.Lane,
			"build": doc.Build,
			"runes": doc.Runes,
			"masteries": doc.Masteries
		});
	}
};