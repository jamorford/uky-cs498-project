var mustache = require('mustache')
var fs = require('fs')

module.exports.render = (template, view, partials, tags) => {
	return mustache.render(
		fs.readFileSync('src/main/views/' + template + '.html', { encoding: 'utf8' }),
		view,
		partials,
		tags
	)
}