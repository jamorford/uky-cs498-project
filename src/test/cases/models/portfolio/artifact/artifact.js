const CoursePortfolioArtifact = require('../../../../../main/models/CoursePortfolio/Artifact')
const { expect } = require('../../../../chai')

describe('Model - CoursePortfolioArtifact', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const slo = await CoursePortfolioArtifact.query()
				.findById(1)

			expect(slo).to.deep.equal({
				id: 1,
				portfolio_slo_id: 1,
				index: 1,
				name: '_unset_'
			})
		})

	})

	describe('relations', () => {

		it('belongs to course portfolio student learning outcome', async () => {
			const artifact = await CoursePortfolioArtifact.query()
				.findById(1)
			const cpslo = await artifact.$relatedQuery('owner')

			expect(cpslo).to.have.property('portfolio_id', 1)
		})

		it('has evaluations', async () => {
			const artifact = await CoursePortfolioArtifact.query()
				.findById(1)
			const evaluations = await artifact.$relatedQuery('evaluations')

			expect(evaluations).to.have.length(5)
		})

	})

})