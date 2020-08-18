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

exports.articleCount = () => {
	return new Promise((resolve, reject) => {
		Article.count((err, result) => {
			if (err) reject("没找到")
			resolve(result)
		})
	})
}

exports.addarticle = ({title, tagid, brief, content}) => {
	return new Promise((resolve, reject) => {
		const article = {
			title,
			brief,
			content,
			tag_id:tagid,
			pubtime: moment().format('YYYY-MM-DD HH:mm:ss'),
			date: moment().format('YYYY年MM月'),
		}
		Article.create(article, (err, result) => {
			if (err) reject("没找到")
			resolve(result)
		})
	})
}


exports.deletearticle = ({title, tagid, brief, content}) => {
	return new Promise((resolve, reject) => {
		const article = {
			title,
			brief,
			content,
			tag_id:tagid,
			pubtime: moment().format('YYYY-MM-DD HH:mm:ss'),
			date: moment().format('YYYY年MM月'),
		}
		Article.create(article, (err, result) => {
			if (err) reject("没找到")
			resolve(result)
		})
	})
}
