const db = require('./mysql')

const Tags = db.define('tags', {

	id: {type: 'serial', key: true}, //主键
	tagname: {type: 'text', size: 30},
	logo: String,
	created_at: {type: 'date', time: true}
});

module.exports = Tags;
