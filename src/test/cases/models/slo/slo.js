const StudentLearningOutcome = require('../../../../main/models/StudentLearningOutcome')
const { expect } = require('../../../chai')

describe('Model - StudentLearningOutcome', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const slo = await StudentLearningOutcome.query()
				.findById(1)

			expect(slo).to.deep.equal({
				id: 1,
				department_id: 1,
				index: 2,
				description: `Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.`
			})
		})

	})

	describe('relations', () => {

		it('has metrics set', async () => {
			const slo = await StudentLearningOutcome.query()
				.findById(1)
			const slo_metrics = await slo.$relatedQuery('metrics')

			expect(slo_metrics).to.have.length(5)
		})

	})

})