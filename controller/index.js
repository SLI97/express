const express = require("express")
const router = express.Router()
const article = require("../service/article")
const tag = require("../service/tag")

//渲染文章页面，顺便获取tag列表
router.get("/", async (req, res, next) => {
	//每页显示的记录数
	const pageSizes = 10;
	//当前页
	const pageNow = req.query.page ? req.query.page : 1;
	//获取分页文章
	const articleList = await article.articleList(pageSizes, pageNow).catch(err => next(new Error("获取文章列表失败")))
	//获取文章总数
	const totalCount = await article.articleCount().catch(err => next(new Error("获取文章数量失败")))
	//查询最新的5篇文章
	const articleNews = await article.articleNews().catch(err => next(new Error("获取最新文章失败")))
	//根据date分类的数量
	const archives = await article.dateCounts().catch(err => next(new Error("获取date分类数量失败")))
	//根据分类进行分组文章的数量
	const tagCounts = await article.tagCounts().catch(err => next(new Error("获取分类文章数量失败")))
	//获取分类列表
	const tagList = await tag.getTagsList().catch(err => next(new Error("获取标签失败")));

	const totalPage = Math.ceil(totalCount / pageSizes)

	res.render('index', {
		articleList,
		articleNews,
		tagList,
		archives,
		tagCounts,
		totalCount,
		totalPage,
		currentPage: pageNow,
		path: 'index'
	});
})

router.get("/list", async (req, res, next) => {
	//每页显示的记录数
	const pageSizes = 10;
	//当前页
	const pageNow = req.query.page ? req.query.page : 1;
	//获取分页文章
	const articleList = await article.articleList(pageSizes, pageNow).catch(err => next(new Error("获取文章列表失败")))
	//获取文章总数
	const totalCount = await article.articleCount().catch(err => next(new Error("获取文章数量失败")))
	//查询最新的5篇文章
	const articleNews = await article.articleNews().catch(err => next(new Error("获取最新文章失败")))
	//根据date分类的数量
	const archives = await article.dateCounts().catch(err => next(new Error("获取date分类数量失败")))
	//根据分类进行分组文章的数量
	const tagCounts = await article.tagCounts().catch(err => next(new Error("获取分类文章数量失败")))
	//获取分类列表
	const tagList = await tag.getTagsList().catch(err => next(new Error("获取标签失败")));

	const totalPage = Math.ceil(totalCount / pageSizes)

	res.render('articleList', {
		articleList: articleList,
		articleNews: articleNews,
		tagList,
		archives,
		tagCounts,
		totalCount,
		totalPage: totalPage,
		currentPage: pageNow,
		path: 'list'
	});
})

// router.get("/about", async (req, res, next) => {
// 	//查询最新的5篇文章
// 	const articleNews = await article.articleNews().catch(err => next(new Error("获取最新文章失败")))
// 	//根据date分类的数量
// 	const archives = await article.dateCounts().catch(err => next(new Error("获取date分类数量失败")))
// 	//根据分类进行分组文章的数量
// 	const tagCounts = await article.tagCounts().catch(err => next(new Error("获取分类文章数量失败")))
// 	//获取分类列表
// 	const tagList = await tag.getTagsList().catch(err => next(new Error("获取标签失败")));

// 	res.render('about', {
// 		articleNews,
// 		tagList,
// 		archives,
// 		tagCounts,
// 		path: 'about'
// 	});
// })


module.exports = router
