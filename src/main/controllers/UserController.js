const User = require('../models/User')
const Janitor = require('../util/Janitor')

const STRING_LENGTH_MAX = 255

class UserController {

    // Generate query payload
    generateUserPayload(linkblue_id){
        return {
            linkblue_id: linkblue_id
        }
    }
    
    // get a user
    async getByAttributes(linkblue_id) {
        linkblue_id = Janitor.sanitizeString(linkblue_id)

        if (linkblue_id == null || linkblue_id == "") {
            return null
        }

        if (linkblue_id.length > STRING_LENGTH_MAX) {
            return null
        }

        return User
            .query()
            .where('linkblue_id', linkblue_id)
    }

    async getById(id) {
        var cleanDbId = Janitor.sanitizeIntPostgres(id)

        // Ensure all variables were valid
        if (cleanDbId == null) {
            return null
        }

        // Ensure IDs are positive
        if (cleanDbId < 0) {
            return null
        }

        return User
        .query()
        .findById(cleanDbId)
    }

    // insert a user
    async insert(linkblue_id) {
        linkblue_id = Janitor.sanitizeString(linkblue_id)

        if (linkblue_id == null || linkblue_id == "") {
            return null
        }

        if (linkblue_id.length > STRING_LENGTH_MAX) {
            return null
        }

        return User
            .query()
            .insert(this.generateUserPayload(linkblue_id))
    }

    // update a user
    async updateById(id, linkblue_id) {
        id = Janitor.sanitizeIntPostgres(id)
        linkblue_id = Janitor.sanitizeString(linkblue_id)

        // Ensure all variables were valid
        if (id == null) {
            return null
        }

        // Ensure IDs are positive
        if (id < 0) {
            return null
        }

        if (linkblue_id == null || linkblue_id == "") {
            return null
        }

        if (linkblue_id.length > STRING_LENGTH_MAX) {
            return null
        }

        return User
            .query()
            .patchAndFetchById(id, {linkblue_id})
    }

    // delete a user
    async deleteById(id) {
        var cleanDbId = Janitor.sanitizeIntPostgres(id)

        // Ensure all variables were valid
        if (cleanDbId == null) {
            return false
        }

        // Ensure IDs are positive
        if (cleanDbId < 0) {
            return false
        }

        const numDeleted = await User
            .query()
            .deleteById(cleanDbId)

        // Return true if a course is successfully deleted
        return numDeleted > 0
    }

    async deleteByAttributes(linkblue_id) {
        linkblue_id = Janitor.sanitizeString(linkblue_id)

        if (linkblue_id == null || linkblue_id == "") {
            return false
        }

        if (linkblue_id.length > STRING_LENGTH_MAX) {
            return false
        }

        const numDeleted = await User
            .query()
            .delete()
            .where('linkblue_id', linkblue_id)
        
        // Return true if a course is successfully deleted
        return numDeleted > 0
    }
}

module.exports = UserController