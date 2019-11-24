const course_portfolio = require('../../../main/lib/course_portfolio')
const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox();

describe('Lib - CoursePortfolio', () => {

	describe('new', () => {

		// this is ran after each unit test
		afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
		})

		it('generates new portfolio', async () => {
			// Arrange

			// Import controllers
			const PortfolioController = require('../../../main/controllers/CoursePortfolio/PortfolioController')
			const CourseController = require('../../../main/controllers/CourseController')
			const ArtifactController = require('../../../main/controllers/ArtifactController')
			const PortfolioSLOController = require('../../../main/controllers/PortfolioSLOController')
			const EvaluationController = require('../../../main/controllers/CoursePortfolio/Artifact/EvaluationController')
			
			// Declare default expiration date (change manually when semesters change)
			let exp_date = Date.parse("January 1, 2020")

			// Stub course controller 'getByAttributes'
			sandbox.stub(CourseController.prototype, "getByAttributes").returns([])

			// Stub course controller 'insert'
			sandbox.stub(CourseController.prototype, "insert").returns({
				id: 1,
				department_id: 1,
				course_number: 101
			})

			// Stub artifact controller 'insert'
			sandbox.stub(ArtifactController.prototype, "insert").returns({
				id: 1,
				portfolio_slo_id: 1,
				index: 1,
				name: '_unset_'
			})

			// Stub portfolio slo controller 'insert'
			sandbox.stub(PortfolioSLOController.prototype, "insert").returns({
				id: 1,
				portfolio_id: 1,
				slo_id: 1
			})	

			// Stub portfolio slo controller 'insert'
			sandbox.stub(EvaluationController.prototype, "insert").returns({
				artifact_id: 1,
				evaluation_index: 1,
				student_index: 1,
				evaluation: { 
					index: 1,
					evaluation_metrics: [ 
						{ metric: 1, value: 10 },
						{ metric: 2, value: 10 },
						{ metric: 3, value: 10 },
						{ metric: 4, value: 10 },
						{ metric: 5, value: 10 } 
					] 
				}
			})	

			// Stub portfolio controller 'insert'
			sandbox.stub(PortfolioController.prototype, "insert").returns({
				id: 1,
				course_id: 1,
				instructor_id: 1,
				semester_term_id: 1,
				num_students: 10,
				section: 1,
				year: 2000,
				expireDate: exp_date
			})


			// Stub portfolio controller 'getById'
			sandbox.stub(PortfolioController.prototype, "getById").returns({
				id: 1,
				course_id: 1,
				instructor_id: 1,
				semester_term_id: 1,
				num_students: 10,
				section: 1,
				year: 2000,
				expireDate: exp_date
			})	

			// Stub portfolio controller 'getByAttributes'
			sandbox.stub(PortfolioController.prototype, "getByAttributes").returns([])	


			// Act
			let portfolio = await course_portfolio.generatePortfolio('1','101','instructor','fall','2019','10',['slo_1'],'1')

			// Assert
			expect(portfolio).to.deep.equal({
				id: 1,
				course_id: 1,
				instructor_id: 1,
				semester_term_id: 1,
				num_students: 10,
				section: 1,
				year: 2000,
				expireDate: exp_date
			})
		})

		it('prevents generation of duplicate course portfolio', async () => {
			// Arrange

			// Import controllers
			const PortfolioController = require('../../../main/controllers/CoursePortfolio/PortfolioController')
			const CourseController = require('../../../main/controllers/CourseController')

			// Declare default expiration date (change manually when semesters change)
			let exp_date = Date.parse("January 1, 2020")

			// Stub course controller 'getByAttributes'
			sandbox.stub(CourseController.prototype, "getByAttributes").returns([{
				id: 1,
				department_id: 1,
				course_number: 101
			}])

			sandbox.stub(PortfolioController.prototype, "getByAttributes").returns([{				
				id: 1,
				course_id: 1,
				instructor_id: 1,
				semester_term_id: 1,
				num_students: 10,
				section: 1,
				year: 2000,
				expireDate: exp_date
			}])	

			// Act
			let portfolio = await course_portfolio.generatePortfolio('1','101','instructor','fall','2019','10',['slo_1'],'1')

			// Assert
			expect(portfolio).to.deep.equal({
				id: 1,
				course_id: 1,
				instructor_id: 1,
				semester_term_id: 1,
				num_students: 10,
				section: 1,
				year: 2000,
				expireDate: exp_date
			})
		})

		it('generates new portfolio and creates appropriate mustache compatible json object', async () => {
			// Arrange

			// Goal is to stub functions completely with dummy data since these functions are already tested
			// Result is testing that these two functions are called when 'new' is called
			sandbox.stub(course_portfolio, 'generatePortfolio').returns({				
				test: 'test'
			})			

			sandbox.stub(course_portfolio, 'generateMustachePorfolio').returns({
				test: 'test'
			})

			// Assert
			let portfolio = await course_portfolio.new({
				department_id: '1',
				course_number: '1',
				instructor: '1',
				semester: 'fall',
				year: '2000',
				num_students: '10',
				student_learning_outcomes: ['slo_1'],
				section: '1'
			})

			// Assert
			expect(portfolio).to.deep.equal({
				test: 'test'
			})
		})

	})


	describe('get', () => {

		// this is ran after each unit test
		afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
		})

		it('with id', async () => {
			// Arrange
			const CoursePortfolio = require('../../../main/models/CoursePortfolio')

			// stub the CoursePortfolio.query() method
			sandbox.stub(CoursePortfolio, "query").returns({
				// stub the CoursePortfolio.query().eager() method
				eager: sandbox.stub().returns({
					// stub the CoursePortfolio.query().eager().findById() method
					findById: sinon.stub().returns({
						"id": 1,
						"course_id": 1,
						"instructor_id": 1,
						"semester_term_id": 1,
						"num_students": 5,
						"section": 1,
						"year": 2019,
						"course": {
							"id": 1,
							"department_id": 1,
							"number": 498,
							"department": {
								"id": 1,
								"identifier": "cs",
								"name": "Computer Science"
							}
						},
						"instructor": {
							"id": 1,
							"linkblue_username": "user"
						},
						"semester": {
							"id": 1,
							"type": 1,
							"value": "fall"
						},
						"outcomes": [
							{
								"id": 1,
								"portfolio_id": 1,
								"slo_id": 1,
								"slo": {
									"id": 1,
									"department_id": 1,
									"index": 2,
									"description": "Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.",
									"metrics": [
										{
											"id": 1,
											"slo_id": 1,
											"index": 1,
											"name": "Identify and interpret client needs and design constraints",
											"exceeds": "n/a",
											"meets": "n/a",
											"partially": "n/a",
											"not": "n/a"
										}
									]
								},
								"artifacts": [
									{
										"id": 1,
										"portfolio_slo_id": 1,
										"index": 1,
										"name": "_unset_",
										"evaluations": [
											{
												"id": 1,
												"artifact_id": 1,
												"evaluation_index": 1,
												"student_index": 1,
												"evaluation": [],
												"file": null
											}
										]
									},
									{
										"id": 2,
										"portfolio_slo_id": 1,
										"index": 2,
										"name": "_unset_",
										"evaluations": [
											{
												"id": 6,
												"artifact_id": 2,
												"evaluation_index": 1,
												"student_index": 1,
												"evaluation": [],
												"file": null
											}
										]
									},
									{
										"id": 3,
										"portfolio_slo_id": 1,
										"index": 3,
										"name": "_unset_",
										"evaluations": [
											{
												"id": 11,
												"artifact_id": 3,
												"evaluation_index": 1,
												"student_index": 1,
												"evaluation": [],
												"file": null
											}
										]
									}
								]
							}
						]
					})
				})
			})

			// Act
			const portfolio = await course_portfolio.get(1)

			// Assert
			expect(portfolio).to.deep.equal({
				"id": 1,
				"course_id": 1,
				"instructor": {
					"id": 1,
					"linkblue_username": "user"
				},
				"num_students": 5,
				"outcomes": [
					{
						"artifacts": [
							{
								"id": 1,
								"portfolio_slo_id": 1,
								"index": 1,
								"name": "_unset_",
								"evaluations": [
									{
										"id": 1,
										"artifact_id": 1,
										"evaluation_index": 1,
										"student_index": 1,
										"evaluation": [],
										"file": null
									}
								]
							},
							{
								"id": 2,
								"portfolio_slo_id": 1,
								"index": 2,
								"name": "_unset_",
								"evaluations": [
									{
										"id": 6,
										"artifact_id": 2,
										"evaluation_index": 1,
										"student_index": 1,
										"evaluation": [],
										"file": null
									}
								]
							},
							{
								"id": 3,
								"portfolio_slo_id": 1,
								"index": 3,
								"name": "_unset_",
								"evaluations": [
									{
										"id": 11,
										"artifact_id": 3,
										"evaluation_index": 1,
										"student_index": 1,
										"evaluation": [],
										"file": null
									}
								]
							}
						],
						"id": 1,
						"department_id": 1,
						"index": 2,
						"description": "Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.",
						"metrics": [
							{
								"id": 1,
								"slo_id": 1,
								"index": 1,
								"name": "Identify and interpret client needs and design constraints",
								"exceeds": "n/a",
								"meets": "n/a",
								"partially": "n/a",
								"not": "n/a"
							}
						]
					}
				],
				"course": {
					"department": "cs",
					"number": 498,
					"section": 1,
					"semester": "fall",
					"year": 2019
				}
			})
		})

	})

})