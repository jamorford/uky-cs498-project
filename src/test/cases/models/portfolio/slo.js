const CoursePortfolioStudentLearningOutcome = require('../../../../main/models/CoursePortfolio/StudentLearningOutcome')
const { expect } = require('../../../chai')

describe('Model - CoursePortfolioStudentLearningOutcomes', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const slo = await CoursePortfolioStudentLearningOutcome.query()
				.findById(1)

			expect(slo).to.deep.equal({
				id: 1,
				portfolio_id: 1,
				slo_id: 1
			})
		})

	})

	describe('relations', () => {

		it('belongs to course portfolio', async () => {
			const cpslo = await CoursePortfolioStudentLearningOutcome.query()
				.findById(1)
			const portfolio = await cpslo.$relatedQuery('owner')

			expect(portfolio).to.have.property('course_id', 1)
		})

		it('is connected to a student leaning outcome', async () => {
			const cpslo = await CoursePortfolioStudentLearningOutcome.query()
				.findById(1)
			const slo = await cpslo.$relatedQuery('slo')

			expect(slo).to.have.property('description', `Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.`)
		})

	})

})