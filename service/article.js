const Article = require("../model/article")
const db = require("../model/mysql")
const moment = require('moment');

//获取文章列表
exports.articleList = (pageSize, pageNow) => {
	return new Promise((resolve, reject) => {
		//计算偏移量
		const offset = pageSize * (pageNow - 1);
		Article.find().offset(offset).limit(pageSize).order('-pubtime').all((err, result) => {
			if (err) reject(err)

			result.forEach(item => {
				item.pubtime = moment(item.pubtime).format('YYYY-MM-DD HH:mm:ss');
			})
			resolve(result)
		});
	})
}

//根据id获取文章
exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		Article.find({ id }).limit(1).all((err, result) => {
			if (err) reject(err)
			resolve(result[0])
		});
	})
}

//获取文章总数
exports.articleCount = () => {
	return new Promise((resolve, reject) => {
		Article.count((err, result) => {
			if (err) reject(err)
			resolve(result)
		})
	})
}

//新增文章
exports.add = ({ title, tagid, brief, content }) => {
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
			if (err) reject(err)
			resolve(result)
		})
	})
}

//根据id更新文章
exports.update = ({ id, content, title, brief, tagid }) => {
	return new Promise((resolve, reject) => {
		Article.find({ id }).each((item) => {
			item.content = content;
			item.title = title;
			item.brief = brief;
			item.tag_id = tagid;
		}).save((err) => {
			if (err) reject("修改失败!")
			resolve("修改成功!")
		});
	})
}

//根据id删除文章
exports.deleteById = (id) => {
	return new Promise((resolve, reject) => {
		Article.find({ id }).remove((err) => {
			if (err) reject(err)
			resolve("删除成功!")
		});
	})
}

//查询最新的5篇文章
exports.articleNews = () => {
	return new Promise((resolve, reject) => {
		Article.find().limit(5).order('-pubtime').all((err, result) => {
			if (err) reject(err)
			result.forEach(item => {
				item.pubtime = moment(item.pubtime).format('YYYY-MM-DD');
			})
			resolve(result)
		});
	})
}

//根据date进行分组
exports.dateCounts = () => {
	return new Promise((resolve, reject) => {
		Article.aggregate(['date'], {}).count().groupBy("date").get((err, result) => {
			if (err) reject(err)
			resolve(result)
		});
	})
}

//根据分类进行分组
exports.tagCounts = () => {
	return new Promise((resolve, reject) => {
		db.driver.execQuery("SELECT t.id,t.tagname,COUNT(*) as nums FROM article a LEFT JOIN tags t on t.id = a.tag_id GROUP BY a.tag_id",
			(err, result) => {
				if (err) reject(err)
				resolve(result)
			});
	})
}
