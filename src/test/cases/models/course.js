const Course = require('../../../main/models/Course')
const { expect } = require('../../chai')

describe('Model - Course', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const slo = await Course.query()
				.findById(1)

			expect(slo).to.deep.equal({
				id: 1,
				department_id: 1,
				number: 498,
			})
		})

	})

	describe('relations', () => {

		it('has owner set', async () => {
			const course = await Course.query()
				.findById(1)
			const department = await course.$relatedQuery('department')

			expect(department).to.deep.equal({
				id: 1,
				identifier: 'cs',
				name: 'Computer Science',
			})
		})

	})

})