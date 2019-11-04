const User = require('../models/User')

class UserController {
    
    // get a user
    async getByAttributes(linkblue_id) {
        return User
        .query()
        .where('linkblue_id', {linkblue_id})
    }

    async getById(id) {
        return User
        .query()
        .findById(id)
    }

    // insert a user
    async insert(linkblue_id) {
        return User
        .query()
        .insert({linkblue_id})
    }

    // update a user
    async updateById(id, linkblue_id) {
        return User
        .query()
        .patchAndFetchById(id, {linkblue_id})
    }

    async deleteById(id) {
        const numDeleted = await User
            .query()
            .deleteById(id)

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

    async deleteByAttributes(linkblue_id) {
        const numDeleted = await User
            .query()
            .delete()
            .where('linkblue_id', parseInt(linkblue_id))

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }
}

module.exports = UserController