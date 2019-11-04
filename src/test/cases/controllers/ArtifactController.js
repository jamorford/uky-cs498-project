const { expect } = require('../../chai')
const sinon = require('sinon')

const sandbox = sinon.createSandbox()

describe ('Controller - Artifact', () => {
    const ArtifactController = require('../../../main/controllers/ArtifactController')

    // this is ran after each unit test
    afterEach(() => {
        sandbox.restore()
    })

    it('generates a payload', async () => {
        // Arrange
        const TestArtifactController = new ArtifactController()
        let portfolio_slo_id = 1
        let index = 1
        let name = 'exam1'
        expected_payload = {
            portfolio_slo_id: parseInt(portfolio_slo_id),
            index: parseInt(index),
            name: name
        }

        // Act
        let payload = await TestArtifactController.generateUserPayload(portfolio_slo_id, index, name)

        // Assert
        expect(payload).to.deep.equal(expected_payload)  
    })

    it('gets by attributes', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let portfolio_slo_id = 1
        let index = 1
        let name = 'exam1'
        let artifact_expected = {
            id: 1,
            portfolio_slo_id: parseInt(portfolio_slo_id),
            index: parseInt(index),
            name: name
        }

        sandbox.stub(Artifacts, "query").returns({
            where: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    id: 1,
                    portfolio_slo_id: parseInt(portfolio_slo_id),
                    index: parseInt(index),
                    name: name
                })
            })
        })
        
        // Act
        let artifact_retrieved = await TestArtifactController.getByAttributes(portfolio_slo_id, index, name)

        // Assert
        expect(artifact_retrieved).to.deep.equal(artifact_expected)
    })

    it('insert', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let portfolio_slo_id = 1
        let index = 1
        let name = 'exam1'
        artifact_expected = {
            id: 1,
            portfolio_slo_id: parseInt(portfolio_slo_id),
            index: parseInt(index),
            name: name
        }        

        sandbox.stub(Artifacts, "query").returns({
            insert: sandbox.stub().returns({
                id: 1,
                portfolio_slo_id: parseInt(portfolio_slo_id),
                index: parseInt(index),
                name: name
            })
        })
        
        // Act
        let artifact_inserted = await TestArtifactController.insert(portfolio_slo_id, index, name)

        // Assert
        expect(artifact_inserted).to.deep.equal(artifact_expected)
    })

    it('gets by id', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let id = 1
        let portfolio_slo_id = 1
        let index = 1
        let name = 'exam1'
        let artifact_expected = {
            id: id,
            portfolio_slo_id: parseInt(portfolio_slo_id),
            index: parseInt(index),
            name: name
        }

        sandbox.stub(Artifacts, "query").returns({
            findById: sandbox.stub().returns({
                id: id,
                portfolio_slo_id: parseInt(portfolio_slo_id),
                index: parseInt(index),
                name: name
            })
        })
        
        // Act
        let artifact_retrieved = await TestArtifactController.getById(id)

        // Assert
        expect(artifact_retrieved).to.deep.equal(artifact_expected) 
    })

    it('updates by id', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let id = 1
        let portfolio_slo_id = '2'
        let index = '2'
        let name = 'exam2'
        let artifact_expected = {
            id: id,
            portfolio_slo_id: parseInt(portfolio_slo_id),
            index: parseInt(index),
            name: name
        }

        sandbox.stub(Artifacts, "query").returns({
            patchAndFetchById: sandbox.stub().returns({
                id: id,
                portfolio_slo_id: parseInt(portfolio_slo_id),
                index: parseInt(index),
                name: name
            })
        })
        
        // Act
        let artifact_retrieved = await TestArtifactController.updateById(id)

        // Assert
        expect(artifact_retrieved).to.deep.equal(artifact_expected)
    })

    it('delete by attributes', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let portfolio_slo_id = 1
        let index = 1
        let name = 'exam1'
        sandbox.stub(Artifacts, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(1)
                })
            })
        })
        
        // Act
        let artifactDeleted = await TestArtifactController.deleteByAttributes(portfolio_slo_id, index, name)

        // Assert
        expect(artifactDeleted).to.equal(true)
    })

    it('delete returns false if invalid attributes', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let portfolio_slo_id = -5
        let index = -6
        let name = -3
        sandbox.stub(Artifacts, "query").returns({
            delete: sandbox.stub().returns({
                where: sandbox.stub().returns({
                    where: sandbox.stub().returns(0)
                })
            })
        })

        // Act
        let artifactDeleted = await TestArtifactController.deleteByAttributes(portfolio_slo_id, index, name)

        // Assert
        expect(artifactDeleted).to.equal(false)
    })

    it('delete by id', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let id = 1
        sandbox.stub(Artifacts, "query").returns({
            deleteById: sandbox.stub().returns(1)
        })

        // Act
        let artifactDeleted = await TestArtifactController.deleteById(id)

        // Assert
        expect(artifactDeleted).to.equal(true)
    })

    it('delete returns false if invalid id', async () => {
        // Arrange
        let TestArtifactController = new ArtifactController()
        let id = 404
        sandbox.stub(Artifacts, "query").returns({
            deleteById: sandbox.stub().returns(0)
        })

        // Act
        let artifactDeleted = await TestArtifactController.deleteById(id)

        // Assert
        expect(artifactDeleted).to.equal(false)

    })
})