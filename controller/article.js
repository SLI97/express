const express = require("express")
const router = express.Router()
const article = require("../service/article")
const tag = require("../service/tag")
const moment = require('moment');

router.get("/list", async (req, res, next) => {
	//每页显示的记录数
	const pageSizes = 10;
	//当前页
	const pageNow = req.query.page ? req.query.page : 1;
	//获取分页文章
	const articleList = await article.articleList(pageSizes, pageNow).catch(err => next(new Error("获取文章列表失败")))
	//获取文章总数
	const count = await article.articleCount().catch(err => next(new Error("获取文章数量失败")))

	const totalPage = Math.ceil(count / pageSizes)

	res.render('admin/backend/article/index', {
		articleList: articleList,
		totalCount: count,
		totalPage: totalPage,
		currentPage: pageNow,
		path: '/article/list',
		open: 'article'
	});
})

//渲染文章页面，顺便获取tag列表
router.get("/add", async (req, res, next) => {
	const result = await tag.getTagsList().catch(err => next(new Error("获取标签失败")));

	res.render('admin/backend/article/add', { tagList: result, path: '/article/add', open: 'article' });
})

//增加文章接口
router.post("/add/done", async (req, res, next) => {

	const { title, tagid, brief, content } = req.body
	const result = await article.add({ title, tagid, brief, content }).catch(err => {
		res.json({ status: 0, msg: '添加失败' });
	})
	res.json({ status: 1, msg: '添加成功' });
	// res.redirect('/article/list');
})

router.get("/update/:id", async (req, res, next) => {
	const id = req.params.id
	const haha = await article.getById(id).catch(err => next(new Error("获取文章失败")))

	const tagList = await tag.getTagsList().catch(err => next(new Error("获取标签失败")));

	res.render('admin/backend/article/update', { article: haha, tagList, path: '/article/list', open: 'article' });
})

//更新文章
router.post("/update/done", async (req, res, next) => {

	const { id, content, title, brief, tagid } = req.body
	const result = await article.update({ id, content, title, brief, tagid }).catch(err => {
		res.json({ status: 0, msg: '修改失败' });
	})
	res.json({ status: 1, msg: '修改成功' });
	// res.redirect('/article/list')
})

//删除分类
router.post("/delete", async (req, res, next) => {

	const id = req.body.id
	const result = await article.deleteById(id).catch(err => {
		res.json({ status: 0, msg: '删除失败' });
	})
	res.json({ status: 1, msg: '删除成功' });
})

module.exports = router
