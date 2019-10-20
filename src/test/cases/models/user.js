const User = require('../../../main/models/User')
const { expect } = require('../../chai')

describe('Model - User', () => {

	describe('lookup', () => {

		it('with user id', async () => {
			const user = await User.query()
				.findOne({ id: 1 })

			expect(user).to.deep.equal({
				id: 1,
				linkblue_username: 'user'
			})
		})

		it('with linkblue_username', async () => {
			const user = await User.query()
				.findById('user')

			expect(user).to.deep.equal({
				id: 1,
				linkblue_username: 'user'
			})
		})

	})

	describe('creation', () => {

		it('checks for duplicates', async () => {
			const user_promise = User.query().insert({
				linkblue_username: 'user'
			})

			expect(user_promise).to.eventually.be.rejected
		})

	})

})