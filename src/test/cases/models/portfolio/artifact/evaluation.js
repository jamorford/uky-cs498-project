const CoursePortfolioArtifactEvaluation = require('../../../../../main/models/CoursePortfolio/Artifact/Evaluation')
const { expect } = require('../../../../chai')

describe('Model - CoursePortfolioArtifactEvaluation', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const slo = await CoursePortfolioArtifactEvaluation.query()
				.findById(1)

			expect(slo).to.deep.equal({
				id: 1,
				artifact_id: 1,
				evaluation_index: 1,
				student_index: 1,
				evaluation: [],
				file: null
			})
		})

	})

	describe('relations', () => {

		it('belongs to an artifact', async () => {
			const evaluation = await CoursePortfolioArtifactEvaluation.query()
				.findById(1)
			const artifact = await evaluation.$relatedQuery('owner')

			expect(artifact).to.have.property('name', '_unset_')
		})

	})

})