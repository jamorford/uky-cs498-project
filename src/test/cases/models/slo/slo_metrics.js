const StudentLearningOutcomeMetric = require('../../../../main/models/StudentLearningOutcome/Metric')
const { expect } = require('../../../chai')

describe('Model - StudentLearningOutcomeMetrics', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const slo = await StudentLearningOutcomeMetric.query()
				.findById(1)

			expect(slo).to.deep.equal({
				id: 1,
				slo_id: 1,
				index: 1,
				name: `Identify and interpret client needs and design constraints`,
				exceeds: `n/a`,
				meets: `n/a`,
				partially: `n/a`,
				not: `n/a`
			})
		})

	})

	describe('relations', () => {

		it('has metrics set', async () => {
			const slo_metric = await StudentLearningOutcomeMetric.query()
				.findById(1)
			const slo = await slo_metric.$relatedQuery('owner')

			expect(slo).to.deep.equal({
				id: 1,
				department_id: 1,
				index: 2,
				description: `Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.`
			})
		})

	})

})