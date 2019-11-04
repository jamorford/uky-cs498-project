const { expect } = require('../../../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox()

describe('Controller - Evaluation', () => {
    const EvaluationController = require('../../../../../main/controllers/CoursePortfolio/Artifact/EvaluationController')
    const Evaluation = require('../../../../../main/models/CoursePortfolio/Artifact/Evaluation')

    // reset after each unit test
    afterEach(() => {
        sandbox.restore()
    })

    it('generates a payload', async () => {
        // Arrange
        // artifact_id, evaluation_index, student_index, evaluation
        const TestEvaluationController = new EvaluationController()
        let artifact_id = '1'
        let evaluation_index = '1'
        let student_index = '1'
        let evaluation = '[]'

        expected_payload = {
            artifact_id: 1,
            evaluation_index: 1,
            student_index: 1,
            evaluation: '[]'
        }
        // Act
        let payload = await TestEvaluationController.generatePayload(artifact_id, evaluation_index, student_index, evaluation)

        // Assert
        expect(payload).to.deep.equal(expected_payload)  
    })

    it('gets by attributes', async () => {
        // Arrange
        // artifact_id, evaluation_index, student_index, evaluation
        const TestEvaluationController = new EvaluationController()
        let artifact_id = '1'
        let evaluation_index = '1'
        let student_index = '1'
        let evaluation = '[]'

        output_expected = {
            id: 1,
            artifact_id: 1,
            evaluation_index: 1,
            student_index: 1,
            evaluation: '[]'
        }

        sandbox.stub(Evaluation, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns({
                        id: 1,
                        artifact_id: 1,
                        evaluation_index: 1,
                        student_index: 1,
                        evaluation: '[]'
                    })
                })
            })
        })
        
        // Act
        let output_test = await TestEvaluationController.getByAttributes(artifact_id, evaluation_index, student_index, evaluation)

        // Assert
        expect(output_test).to.deep.equal(output_expected)  
    })

    it('gets by id', async () => {
        // Arrange
        // artifact_id, evaluation_index, student_index, evaluation
        const TestEvaluationController = new EvaluationController()
        let id = '1'

        expected_output = {
            id: 1,
            artifact_id: 1,
            evaluation_index: 1,
            student_index: 1,
            evaluation: '[]'
        }

        sandbox.stub(Evaluation, "query").returns({
            findById: sandbox.stub().returns({
                id: 1,
                artifact_id: 1,
                evaluation_index: 1,
                student_index: 1,
                evaluation: '[]'
            })
        })
        
        // Act
        let output_test = await TestEvaluationController.getById(id)

        // Assert
        expect(output_test).to.deep.equal(output_expected)
    })

    it('inserts', async () => {
        // Arrange
        // artifact_id, evaluation_index, student_index, evaluation
        const TestEvaluationController = new EvaluationController()
        let artifact_id = '1'
        let evaluation_index = '1'
        let student_index = '1'
        let evaluation = '[]'

        expected_output = {
            id: 1,
            artifact_id: 1,
            evaluation_index: 1,
            student_index: 1,
            evaluation: '[]'
        }        

        sandbox.stub(Evaluation, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                artifact_id: 1,
                evaluation_index: 1,
                student_index: 1,
                evaluation: '[]'
            })
        })
        
        // Act
        let inserted = await TestEvaluationController.insert(artifact_id, evaluation_index, student_index, evaluation)

        // Assert
        expect(inserted).to.deep.equal(expected_output) 
    })

    it('updates by id', async () => {
        // Arrange
        // artifact_id, evaluation_index, student_index, evaluation
        const TestEvaluationController = new EvaluationController()
        let id = '1'
        let artifact_id = '1'
        let evaluation_index = '1'
        let student_index = '1'
        let evaluation = '[]'

        expected_output = {
            id: 1,
            artifact_id: 1,
            evaluation_index: 1,
            student_index: 1,
            evaluation: '[]'
        }

        sandbox.stub(Evaluation, "query").returns({
            patchAndFetchById: sandbox.stub().returns({
                id: 1,
                artifact_id: 1,
                evaluation_index: 1,
                student_index: 1,
                evaluation: '[]'
            })
        })
        
        // Act
        let updated = await TestEvaluationController.updateById(id, artifact_id, evaluation_index, student_index, evaluation)

        // Assert
        expect(updated).to.deep.equal(expected_output)  
    })

    it('delete by id', async () => {
        // Arrange
        let TestEvaluationController = new EvaluationController()
        let id = 1
        sandbox.stub(Evaluation, "query").returns({
            deleteById: sandbox.stub().returns(1)
        })

        // Act
        let deleted = await TestEvaluationController.deleteById(id)

        // Assert
        expect(deleted).to.equal(true)
    })

    it('delete returns false if invalid id', async () => {
        // Arrange
        let TestEvaluationController = new EvaluationController()
        let id = 404
        sandbox.stub(Evaluation, "query").returns({
            deleteById: sandbox.stub().returns(0)
        })

        // Act
        let deleted = await TestEvaluationController.deleteById(id)

        // Assert
        expect(deleted).to.equal(false)

    })
})