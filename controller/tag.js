const express = require("express")
const router = express.Router()
const tag = require("../service/tag")
const moment = require('moment');

router.get("/list", async (req, res, next) => {
	//每页显示的记录数
	const pageSizes = 10;
	//当前页
	const pageNow = req.query.page ? req.query.page : 1;

	const tagList = await tag.getTagsList(pageSizes, pageNow).catch(err => {
		err = new Error("获取文章列表失败")
		next(err)
	})

	tagList.forEach(item => {
		item.created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss');
	})

	res.render('admin/backend/tags/index', {
		tagList: tagList,
		path: '/tag/list',
		open: 'tag'
	});
})

//渲染文章页面，顺便获取tag列表
router.get("/add", async (req, res, next) => {
	res.render('admin/backend/tags/addtag', {path: '/tag/add', open: 'tag'});
})

//增加分类接口
router.post("/add/done", async (req, res, next) => {

	const tagname = req.body.tagname
	const result = await tag.addTag({tagname}).catch(err => {
		err = new Error("添加文章列表失败")
		// next(err)
		res.json({status: 0, msg: '添加失败'});
	})
	res.redirect('/tag/list');
})

//更新分类
router.post("/update", async (req, res, next) => {

	const {id, tagname} = req.body
	const result = await tag.updateTag({id, tagname}).catch(err => {
		res.json({status: 0, msg: '修改失败'});
	})
	res.json({status: 1, msg: '修改成功'});
})

//删除分类
router.post("/delete", async (req, res, next) => {

	const id = req.body.id
	const result = await tag.deleteById(id).catch(err => {
		res.json({status: 0, msg: '删除失败'});
	})
	res.json({status: 1, msg: '删除成功'});
})

module.exports = router
