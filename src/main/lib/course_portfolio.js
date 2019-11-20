// Import models
const Portfolio = require('../models/CoursePortfolio/index')

// Import controllers
const PortfolioController = require('../controllers/CoursePortfolio/PortfolioController')
const CourseController = require('../controllers/CourseController')
const ArtifactController = require('../controllers/ArtifactController')
const PortfolioSLOController = require('../controllers/PortfolioSLOController')
const EvaluationController = require('../controllers/CoursePortfolio/Artifact/EvaluationController')

// Import libraries
const random_students_subset = require('./random_students_subset');

module.exports.new = async ({
	department_id,
	course_number,
	instructor,
	semester,
	year,
	num_students,
	student_learning_outcomes,
	section
}) => {
	// Allocate controller classes
	let portfolioController = new PortfolioController();
	let courseController = new CourseController();
	let artifactController = new ArtifactController();
	let portfolioSLOController = new PortfolioSLOController();
	let evaluationController = new EvaluationController();

	// Query info for the inputted course
	let course_exist = await courseController.getByAttributes(department_id, course_number)
	
	// Declare variables needed in main scope
	let course_id = -1
	let portfolio_id = -1

	// If course doesn't exist, make a new course
	if (course_exist.length == 0){		
		let course_result = await courseController.insert(department_id, course_number)
		course_id = course_result.id
	} else {
		course_id = course_exist[0].id
	}
	
	// Check if portfolio already exists
	let portfolio_exist = await portfolioController.getByAttributes(course_id, instructor, semester, num_students, section, year)

	// If portfolio doesn't exist, make another one
	if (portfolio_exist.length == 0) {
		let portfolio_result = await portfolioController.insert(course_id, instructor, semester, num_students, section, year)

		let portfolio_slo_result = await portfolioSLOController.insert(portfolio_result.id, student_learning_outcomes[0])
		
		// Make an array for artifacts
		let artifacts = []

		// Make queries for creating default artifacts
		for(let i=1; i<4; i++){
			artifact_result = await artifactController.insert(portfolio_slo_result.id, i, '_unset_')			
			artifacts.push(artifact_result)
		}

		// Make an array for artifact ids for easy 'loopability' (idk if that's a word)
		let artifact_ids = []
		artifact_ids.push(artifacts[0].id)
		artifact_ids.push(artifacts[1].id)
		artifact_ids.push(artifacts[2].id)

		for(let i=0; i<artifact_ids.length; i++){
			let student_indexes = random_students_subset.generateRandomStudentIndexes(num_students)
			for(let j=0; j<student_indexes.length; j++){
				let evaluation = {
					index: j + 1,
					evaluation_metrics: [
						{
							metric: 1,
							value: 10 
						},
						{
							metric: 2,
							value: 10
						}, 
						{
							metric: 3,
							value: 10	
						}, 
						{
							metric: 4,
							value: 10
						},
						{
							metric: 5,
							value: 10
						}
					]
				}
				await evaluationController.insert(artifact_ids[i], j, i, evaluation)
			}
		}
		portfolio_id = portfolio_result.id
	} else {
		portfolio_id = portfolio_exist[0].id
	}

	let raw_portfolio = await Portfolio.query()
		.eager({
			course: {
				department: true
			},
			instructor: true,
			semester: true,
			outcomes: {
				slo: {
					metrics: true
				},
				artifacts: {
					evaluations: true
				}
			}
		})
		.findById(portfolio_id)

	let portfolio = {
		portfolio_id: raw_portfolio.id,
		course_id: raw_portfolio.course_id,
		instructor: raw_portfolio.instructor,
		num_students: raw_portfolio.num_students,
		outcomes: [],
		course: {
			department: raw_portfolio.course.department.identifier,
			number: raw_portfolio.course.number,
			section: raw_portfolio.section,
			semester: raw_portfolio.semester.value,
			year: raw_portfolio.year
		},
	}

	for (let i in raw_portfolio.outcomes) {
		portfolio.outcomes.push(Object.assign({
			artifacts: raw_portfolio.outcomes[i].artifacts
		}, raw_portfolio.outcomes[i].slo))
	}

	return portfolio
}

module.exports.get = async (portfolio_id) => {
	let raw_portfolio = await Portfolio.query()
		.eager({
			course: {
				department: true
			},
			instructor: true,
			semester: true,
			outcomes: {
				slo: {
					metrics: true
				},
				artifacts: {
					evaluations: true
				}
			}
		})
		.findById(portfolio_id)

	let portfolio = {
		portfolio_id: raw_portfolio.id,
		course_id: raw_portfolio.course_id,
		instructor: raw_portfolio.instructor,
		num_students: raw_portfolio.num_students,
		outcomes: [],
		course: {
			department: raw_portfolio.course.department.identifier,
			number: raw_portfolio.course.number,
			section: raw_portfolio.section,
			semester: raw_portfolio.semester.value,
			year: raw_portfolio.year
		},
	}

	for (let i in raw_portfolio.outcomes) {
		portfolio.outcomes.push(Object.assign({
			artifacts: raw_portfolio.outcomes[i].artifacts
		}, raw_portfolio.outcomes[i].slo))
	}

	return portfolio
}