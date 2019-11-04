const User = require('../models/User')

class UserController {
    constructor(linkblue_id) {
        // Attributes
        this.linkblue_id = linkblue_id

        // Query for attributes
        this.user_query = {
            linkblue_id: linkblue_id
        }
    }

    // get a user
    async get() {
        return User
        .query()
        .where('linkblue_id', this.linkblue_id)
    }

    // insert a user
    async insert() {
        return User
        .query()
        .insert(this.user_query)
    }

    // update a user
    async update() {
        return User
        .query()
        .patch(this.user_query)
    }

    // delete a user
    async delete() {
        user_exist = await this.get()
        if (user_exist != []) {
            User.query()
            .deleteById(user_exist[0].id)
        }

    }
}

module.exports = UserController