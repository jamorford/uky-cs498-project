const TermType = require('../../../main/models/TermType')
const { expect } = require('../../chai')

describe('Model - TermType', () => {

	describe('lookup', () => {

		it('with id', async () => {
			const term_type = await TermType.query()
				.findOne('id', 1)

			expect(term_type).to.deep.equal({
				id: 1,
				type: 'semester'
			})
		})

		it('with name', async () => {
			const term_type = await TermType.query()
				.findById('semester')

			expect(term_type).to.deep.equal({
				id: 1,
				type: 'semester'
			})
		})

	})

	describe('relations', () => {

		it('can query related terms', async () => {
			const term_type = await TermType.query()
				.findById('semester')
			const terms = await term_type.$relatedQuery('terms')

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

})