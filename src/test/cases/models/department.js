const Department = require('../../../main/models/Department')
const { expect } = require('../../chai')

describe('Model - Department', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const slo = await Department.query()
				.findById(1)

			expect(slo).to.deep.equal({
				id: 1,
				identifier: 'cs',
				name: 'Computer Science',
			})
		})

	})

	describe('relations', () => {

		it('has courses set', async () => {
			const department = await Department.query()
				.findById(1)
			const courses = await department.$relatedQuery('courses')

			expect(courses).to.have.length(1)
		})

	})

})