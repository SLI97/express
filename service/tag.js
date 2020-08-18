const Tag = require("../model/tag")
const moment = require('moment');

exports.getTagsList = () => {
	return new Promise((resolve, reject) => {
		Tag.find().all((err, result) => {
			if (err) reject("没找到")
			resolve(result)
		});
	})
}

exports.addTag = ({tagname}) => {
	const tag = {
		tagname,
		created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	}
	return new Promise((resolve, reject) => {
		;
		Tag.create(tag, (err, result) => {
			if (err) reject("没找到")
			resolve(result)
		});
	})
}

exports.deleteById = (id) => {
	return new Promise((resolve, reject) => {
		Tag.find({id}).remove((err) => {
			if (err) reject("没找到")
			resolve("删除成功!")
		});
	})
}

exports.updateTag = ({id, tagname}) => {
	return new Promise((resolve, reject) => {
		Tag.find({id}).each((item)=> {
			item.tagname = tagname;
		}).save( (err) =>{
			if (err) reject("修改失败!")
			resolve("修改成功!")
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
