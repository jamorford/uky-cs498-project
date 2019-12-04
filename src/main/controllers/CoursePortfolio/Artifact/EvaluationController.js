const Evaluation = require('../../../models/CoursePortfolio/Artifact/Evaluation.js');

class EvaluationController {
  // Used for insert statements
  generatePayload(artifact_id, evaluation_index, student_index, evaluation) {
    return {
      'artifact_id': parseInt(artifact_id),
      'evaluation_index': parseInt(evaluation_index),
      'student_index': parseInt(student_index),
      'evaluation': evaluation, // TODO: validate JSON object
    };
  }

  async insert(artifact_id, evaluation_index, student_index, evaluation) {
    return await Evaluation
        .query()
        .insert(this.generatePayload(artifact_id, evaluation_index, student_index, evaluation));
  }

  async getByAttributes(artifact_id, evaluation_index, student_index) {
    return await Evaluation
        .query()
        .where('artifact_id', parseInt(artifact_id))
        .where('evaluation_index', parseInt(evaluation_index))
        .where('student_index', parseInt(student_index));
  }

  async getById(id) {
    return await Evaluation
        .query()
        .findById(id);
  }

  async updateById(id, artifact_id, evaluation_index, student_index, evaluation) {
    return await Evaluation
        .query()
        .patchAndFetchById(id, this.generatePayload(artifact_id, evaluation_index, student_index, evaluation));
  }

  async deleteById(id) {
    const numDeleted = await Evaluation
        .query()
        .deleteById(id);

    // Return true if a course is successfully deleted
    return numDeleted > 0;
  }
}

module.exports = EvaluationController;
