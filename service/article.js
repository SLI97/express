const Article = require("../model/article")
const moment = require('moment');

exports.articleList = (pageSize, pageNow) => {
	return new Promise((resolve, reject) => {
		//计算偏移量
		const offset = pageSize * (pageNow - 1);
		Article.find().offset(offset).limit(pageSize).order('-pubtime').all((err, result) => {
			if (err) reject("没找到")
			resolve(result)
		});
	})
}

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		Article.find({id}).limit(1).all((err, result) => {
			if (err) reject("没找到")
			resolve(result[0])
		});
	})
}

exports.articleCount = () => {
	return new Promise((resolve, reject) => {
		Article.count((err, result) => {
			if (err) reject("没找到")
			resolve(result)
		})
	})
}

exports.add = ({title, tagid, brief, content}) => {
	return new Promise((resolve, reject) => {
		const article = {
			title,
			brief,
			content,
			tag_id: tagid,
			pubtime: moment().format('YYYY-MM-DD HH:mm:ss'),
			date: moment().format('YYYY年MM月'),
		}
		Article.create(article, (err, result) => {
			if (err) reject("没找到")
			resolve(result)
		})
	})
}

exports.update = ({id, content, title, brief, tagid}) => {
	return new Promise((resolve, reject) => {
		Article.find({id}).each((item)=> {
			item.content = content;
			item.title = title;
			item.brief = brief;
			item.tag_id = tagid;
		}).save( (err) =>{
			if (err) reject("修改失败!")
			resolve("修改成功!")
		});
	})
}

exports.deleteById = (id) => {
	return new Promise((resolve, reject) => {
		Article.find({id}).remove((err) => {
			if (err) reject("没找到")
			resolve("删除成功!")
		});
	})
}
