const db = require("./mysql")
const Tag = require("./tag")

const Article = db.define("article", {
    id: { type: 'serial', key: true }, //主键
    title: String,
    content: { type: 'text' },
    pubtime: { type: 'date', time: true },
    date: String,
    brief: { type: 'text' },
    tag_id: { type: 'integer' },
    hits: { type: 'integer', defaultValue: 0 },
    bad: { type: 'integer', defaultValue: 0 },
    good: { type: 'integer', defaultValue: 0 },
    image: String
})

Article.hasOne('tag', Tag, { autoFetch: true });

module.exports = Article
