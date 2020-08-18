const Tag = require("../model/tag")


exports.getTagsList = () => {
	return new Promise((resolve, reject) => {;
		Tag.find().all((err,result)=>{
			if (err) reject("没找到")
			resolve(result)
		});
	})
}

exports.tagCount = () => {
	return new Promise((resolve, reject) => {
		Tag.count((err, result) => {
			if (err) reject("没找到")
			resolve(result)
		})
	})
}
