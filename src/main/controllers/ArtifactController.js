const Artifact = require('../models/CoursePortfolio/Artifact');
const Janitor = require('../util/Janitor');

const STRING_LENGTH_MAX = 255;

class ArtifactController {
  // Generate query payload
  generateArtifactPayload(portfolio_slo_id, index, name) {
    return {
      portfolio_slo_id: portfolio_slo_id,
      index: index,
      name: name,
    };
  }

  // get new artifact
  async getByAttributes(portfolio_slo_id, index, name) {
    const cleanId = Janitor.sanitizeIntPostgres(portfolio_slo_id);
    const cleanIndex = Janitor.sanitizeIntPostgres(index);
    const cleanName = Janitor.sanitizeString(name);

    // Ensure all variables were valid
    if (cleanId == null || cleanIndex == null || cleanName == null) {
      return null;
    }

    // Ensure IDs are positive
    if (cleanId < 0 || cleanIndex < 0) {
      return null;
    }

    // Ensure name will not exceed Artifact schema length limit
    if (cleanName.length > STRING_LENGTH_MAX) {
      return null;
    }

    return Artifact
        .query()
        .where('porfolio_slo_id', cleanId)
        .where('index', cleanIndex)
        .where('name', cleanName);
  }

  async getById(id) {
    const cleanDbId = Janitor.sanitizeIntPostgres(id);

    // Ensure all variables were valid
    if (cleanDbId == null) {
      return null;
    }

    // Ensure IDs are positive
    if (cleanDbId < 0) {
      return null;
    }

    return Artifact
        .query()
        .findById(cleanDbId);
  }

  // insert an artifact
  async insert(portfolio_slo_id, index, name) {
    const cleanId = Janitor.sanitizeIntPostgres(portfolio_slo_id);
    const cleanIndex = Janitor.sanitizeIntPostgres(index);
    const cleanName = Janitor.sanitizeString(name);

    // Ensure all variables were valid
    if (cleanId == null || cleanIndex == null || cleanName == null) {
      return null;
    }

    // Ensure IDs are positive
    if (cleanId < 0 || cleanIndex < 0) {
      return null;
    }

    // Ensure name will not exceed Artifact schema length limit
    if (cleanName.length > STRING_LENGTH_MAX) {
      return null;
    }

    return Artifact
        .query()
        .insert(this.generateArtifactPayload(cleanId, cleanIndex, cleanName));
  }

  // update an artifact
  async updateById(id, portfolio_slo_id, index, name) {
    const cleanDbId = Janitor.sanitizeIntPostgres(id);
    const cleanId = Janitor.sanitizeIntPostgres(portfolio_slo_id);
    const cleanIndex = Janitor.sanitizeIntPostgres(index);
    const cleanName = Janitor.sanitizeString(name);

    // Ensure all variables were valid
    if (cleanDbId == null || cleanId == null || cleanIndex == null || cleanName == null) {
      return null;
    }

    // Ensure IDs are positive
    if (cleanDbId < 0 || cleanId < 0 || cleanIndex < 0) {
      return null;
    }

    // Ensure name will not exceed Artifact schema length limit
    if (cleanName.length > STRING_LENGTH_MAX) {
      return null;
    }

    return Artifact
        .query()
        .patchAndFetchById(cleanDbId, cleanId, cleanIndex, cleanName);
  }

  // delete an artifact
  async deleteById(id) {
    const cleanDbId = Janitor.sanitizeIntPostgres(id);

    // Ensure all variables were valid
    if (cleanDbId == null) {
      return false;
    }

    // Ensure IDs are positive
    if (cleanDbId < 0) {
      return false;
    }

    const numDeleted = await Artifact
        .query()
        .deleteById(cleanDbId);

    // Return true if a course is successfully deleted
    return numDeleted > 0;
  }

  // Delete a course
  async deleteByAttributes(portfolio_slo_id, index, name) {
    const cleanId = Janitor.sanitizeIntPostgres(portfolio_slo_id);
    const cleanIndex = Janitor.sanitizeIntPostgres(index);
    const cleanName = Janitor.sanitizeString(name);

    // Ensure all variables were valid
    if (cleanId == null || cleanIndex == null || cleanName == null) {
      return false;
    }

    // Ensure IDs are positive
    if (cleanId < 0 || cleanIndex < 0) {
      return false;
    }

    // Ensure name will not exceed Artifact schema length limit
    if (cleanName.length > STRING_LENGTH_MAX) {
      return false;
    }

    const numDeleted = await Artifact
        .query()
        .delete()
        .where('portfolio_slo_id', cleanId)
        .where('index', cleanIndex)
        .where('name', cleanName);

    // Return true if a course is successfully deleted
    return numDeleted > 0;
  }
}

module.exports = ArtifactController;
