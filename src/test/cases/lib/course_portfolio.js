const { expect } = require('../../chai')
const sinon = require('sinon')

// Mock this function, sinon won't allow for private function testing otherwise
var mocked_course_portfolio = {
	generateRandomStudentIndexes: function(num_students){
		let student_indexes = []
		let max_students = 0
	
		if (num_students <= 10){
			max_students = num_students
		} else if (num_students <= 50){
			max_students = 10
		} else {
			max_students = Math.ceil(num_students * 0.20)
		}
	
		for(let i=0; i<max_students; i++){
			random_index = Math.floor(Math.random() * num_students + 1)
			if (student_indexes.includes(random_index)){
				i--
			}
			else {
				student_indexes.push(random_index)
			}
		}
		student_indexes = student_indexes.sort(function(a,b) { return a - b; }) // numerical sort
	
		return student_indexes
	}
}

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox();

// use a spy to test the mocked course portfolio
const spy = sinon.spy(mocked_course_portfolio, 'generateRandomStudentIndexes')


describe('Lib - CoursePortfolio', () => {

	describe('get', () => {

		// this is ran after each unit test
		afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
			spy.restore()
		})

		it('editable portfolio', async () => {
			// Arrange
			const CoursePortfolio = require('../../../main/models/CoursePortfolio')
			const course_portfolio = require('../../../main/lib/course_portfolio')

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
			const portfolio = await course_portfolio.get(1, 'edit')

			// Assert
			expect(portfolio).to.deep.equal({
				"portfolio_id": 1,
				"portfolio_type": 'edit',
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

		it('viewable portfolio', async () => {
			// Arrange
			const CoursePortfolio = require('../../../main/models/CoursePortfolio')
			const course_portfolio = require('../../../main/lib/course_portfolio')

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
			const portfolio = await course_portfolio.get(1, 'view')

			// Assert
			expect(portfolio).to.deep.equal({
				"portfolio_id": 1,
				"portfolio_type": 'view',
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

	describe('new', () => {
		// this is ran after each unit test
		afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
			spy.restore()
		})

		describe('generates random student indexes', function () {

			it ('with 5 students given 5 students', function() {				
				// Arrange
				let student_indexes = []

				// Act
				student_indexes = mocked_course_portfolio.generateRandomStudentIndexes(5)
				
				// Assert
				expect(student_indexes.length).to.equal(5)
			})

			
			it ('with 10 students given 10 students', function() {
				// Arrange
				let student_indexes = []

				// Act
				student_indexes = mocked_course_portfolio.generateRandomStudentIndexes(50)
				
				// Assert
				expect(student_indexes.length).to.equal(10)
			})
			
			it ('with 20 students given 100 students', function() {				
				// Arrange
				let student_indexes = []

				// Act
				student_indexes = mocked_course_portfolio.generateRandomStudentIndexes(100)
				
				// Assert
				expect(student_indexes.length).to.equal(20)
			})

			// Make sure all student indexes are unique
			it ('with unique student indexes', function() {
				// Arrange
				let scanned_student_indexes = []
				let allUnique = true

				// Act
				let student_indexes = mocked_course_portfolio.generateRandomStudentIndexes(50)

				// Assert
				for(let i=0; i<student_indexes.length; i++){
					if (scanned_student_indexes.includes(student_indexes[i])){
						allUnique = false
						i = student_indexes.length
					} else {
						scanned_student_indexes.push(student_indexes[i])
					}
				}
				expect(allUnique).to.equal(true)
			})
		}) 
	})

})