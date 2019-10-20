const Term = require('../../../main/models/Term')
const { expect } = require('../../chai')

describe('Model - Term', () => {

	describe('lookup', () => {

		it('with term id', async () => {
			const term = await Term.query()
				.findById(1)

			expect(term).to.deep.equal({
				id: 1,
				type: 1,
				value: 'fall'
			})
		})

		it('with type id', async () => {
			const terms = await Term.query()
				.where('type', 1)

			expect(terms).to.deep.equal([
				{
					id: 1,
					type: 1,
					value: 'fall'
				},
				{
					id: 2,
					type: 1,
					value: 'spring'
				},
				{
					id: 3,
					type: 1,
					value: 'summer 1'
				},
				{
					id: 4,
					type: 1,
					value: 'summer 2'
				},
				{
					id: 5,
					type: 1,
					value: 'winter'
				}
			])
		})

	})

	describe('relations', () => {

		it('has owner term type set', async () => {
			const term = await Term.query()
				.findById(1)
			const term_type = await term.$relatedQuery('owner')

			expect(term_type).to.deep.equal({
				id: 1,
				type: 'semester'
			})
		})

	})

})