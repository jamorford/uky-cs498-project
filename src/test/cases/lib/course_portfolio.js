const course_portfolio = require('../../../main/lib/course_portfolio')
const { expect } = require('../../chai')

describe('Lib - CoursePortfolio', () => {

	describe('get', () => {

		it('with id', async () => {
			const portfolio = await course_portfolio.get(1)

			// TODO
		})

	})

})