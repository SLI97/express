const express = require("express")
const router = express.Router()
const article = require("../service/article")
const tag = require("../service/tag")
const moment = require('moment');

router.get("/articles", async (req, res, next) => {
	//每页显示的记录数
	const pageSizes = 10;
	//当前页
	const pageNow = req.query.page ? req.query.page : 1;

	const articleList = await article.articleList(pageSizes, pageNow).catch(err => {
		err = new Error("获取文章列表失败")
		next(err)
	})

	const count = await article.articleCount().catch(err => {
		err = new Error("获取文章数量失败")
		next(err)
	})

	articleList.forEach(item => {
		item.pubtime = moment(item.pubtime).format('YYYY-MM-DD HH:mm:ss');
	})

	const totalPage = Math.ceil(count / pageSizes)

	res.render('admin/backend/article/index', {
		articleList: articleList,
		totalCount: count,
		totalPage: totalPage,
		currentPage: pageNow,
		path: '/article/articles',
		open: 'article'
	});
})

//渲染文章页面，顺便获取tag列表
router.get("/add", async (req, res, next) => {
	const result = await tag.getTagsList().catch(err => {
		err = new Error("获取标签失败")
		next(err)
	});

	res.render('admin/backend/article/addarticle', {tagList: result, path: '/article/add', open: 'article'});
})

//增加文章接口
router.post("/addarticle", async (req, res, next) => {

	const {title, tagid, brief, content} = req.body
	const result = await article.addarticle({title, tagid, brief, content}).catch(err => {
		err = new Error("添加文章列表失败")
		// next(err)
		res.json({status: 0, msg: '添加失败'});
	})
	console.log(result)
	res.json({status: 1, msg: '添加成功'});
})

router.post("/update", (req, res, next) => {
	console.log("更新")
	res.json("更新")
})

router.post("/delete", (req, res, next) => {
	console.log("删除")
	res.json("删除")
})

module.exports = router
