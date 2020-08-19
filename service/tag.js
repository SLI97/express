const Tag = require("../model/tag")
const moment = require('moment');

//获取分类列表
exports.getTagsList = () => {
	return new Promise((resolve, reject) => {
		Tag.find().all((err, result) => {
			if (err) reject("没找到")
			resolve(result)
		});
	})
}

//添加分类
exports.addTag = ({ tagname }) => {
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

//删除分类
exports.deleteById = (id) => {
	return new Promise((resolve, reject) => {
		Tag.find({ id }).remove((err) => {
			if (err) reject("没找到")
			resolve("删除成功!")
		});
	})
}

//更新分类
exports.updateTag = ({ id, tagname }) => {
	return new Promise((resolve, reject) => {
		Tag.find({ id }).each((item) => {
			item.tagname = tagname;
		}).save((err) => {
			if (err) reject("修改失败!")
			resolve("修改成功!")
		});
	})
}

//分类总数
exports.tagCount = () => {
	return new Promise((resolve, reject) => {
		Tag.count((err, result) => {
			if (err) reject("没找到")
			resolve(result)
		})
	})
}
