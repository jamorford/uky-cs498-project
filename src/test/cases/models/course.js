const Course = require('../../../main/models/Course')
const Department = require('../../../main/models/Department')
const { expect } = require('../../chai')

describe('Model - Course', () => {

	describe('lookup', () => {

		it('with id', async () => {
			let department_result = await Department
			.query()
			.where("name", "Computer Science")

			const slo = await Course
			.query()
			.where("department_id", department_result[0].id)
			.where("number", 498)

			expect(slo[0].department_id).to.equal(department_result[0].id)
			expect(slo[0].number).to.equal(498)
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