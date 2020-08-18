const express = require("express")
const router = express.Router()

//渲染文章页面，顺便获取tag列表
router.get("/", async (req, res, next) => {

	res.render('index',{
		articleList : [],
		articleNews : [],
		tagList : [],
		archives : [],
		tagCounts : 10,
		totalCount: 10,
		totalPage : 10,
		currentPage : 10,
		path : 'index'
	});

	// res.render('index',{
	// 	articleList : articleList,
	// 	articleNews : articleNews,
	// 	tagList : tags,
	// 	archives : archives,
	// 	tagCounts : tagCounts,
	// 	totalCount: count,
	// 	totalPage : totalPage,
	// 	currentPage : pageNow,
	// 	path : 'index'
	// });
})

module.exports = router
