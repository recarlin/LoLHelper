function (doc){
	if (doc.type.substr(0, 7) === "counter") {
		emit(doc._id, {
			"itemID": doc._id,
			"name": doc.name,
			"champs": doc.champs,
			"stats": doc.stats,
			"type": doc.type
		});
	}
};