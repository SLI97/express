const express = require("express")
const router = express.Router()
const tag = require("../service/tag")
const moment = require('moment');

router.get("/tags", async (req, res, next) => {
	//每页显示的记录数
	const pageSizes = 10;
	//当前页
	const pageNow = req.query.page ? req.query.page : 1;

	const tagList = await tag.getTagsList(pageSizes, pageNow).catch(err => {
		err = new Error("获取文章列表失败")
		next(err)
	})

	const count = await tag.tagCount().catch(err => {
		err = new Error("获取文章数量失败")
		next(err)
	})

	console.log(count)

	const totalPage = Math.ceil(count / pageSizes)

	res.render('admin/backend/tags/index', {
		tagList: tagList,
		path: '/article/articles',
		open: 'article'
	});
})

//渲染文章页面，顺便获取tag列表
router.get("/add", async (req, res, next) => {
	// const result = await tag.getTagsList().catch(err => {
	// 	err = new Error("获取标签失败")
	// 	next(err)
	// });

	res.render('admin/backend/tags/addtag', {path: '/article/add', open: 'article'});
})

module.exports = router
