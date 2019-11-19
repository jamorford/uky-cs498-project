const Portfolio = require('../models/CoursePortfolio')
const Course = require('../models/Course')
const Artifact = require('../models/CoursePortfolio/Artifact')
const CoursePortfolioStudentLearningOutcome = require('../models/CoursePortfolio/StudentLearningOutcome')
const Evaluation = require('../models/CoursePortfolio/Artifact/Evaluation')

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
	// Query info for the inputted course
	course_query = {
		department_id: parseInt(department_id),
		number: parseInt(course_number)
	}

	// Check if course already exists
	course_exist = await Course
		.query()
		.where('department_id', department_id)
		.where('number', course_number)
	
	// Declare variables needed in main scope
	let course_id = -1
	let portfolio_id = -1

	// If course doesn't exist, make a new course
	if (course_exist.length == 0){		
		let course_result = await Course.query().insert(course_query)
		course_id = course_result.id
	} else {
		course_id = course_exist[0].id
	}

	// Get student learning outcomes from department
	// student_learning_outcomes = await (await Department.query().findById(department_id))
	// 	.$relatedQuery('student_learning_outcomes')

	// Query info for a new portfolio
	portfolio_query = {
		course_id: parseInt(course_id),
		instructor_id: parseInt(instructor),
		semester_term_id: parseInt(semester),
		year: parseInt(year),
		num_students: parseInt(num_students),
		section: parseInt(section)
	}


	// Check if portfolio already exists
	let portfolio_exist = await Portfolio
		.query()
		.where('course_id', course_id)
		.where('semester_term_id', semester)
		.where('section', section)
		.where('year', year)

	// If portfolio doesn't exist, make another one
	if (portfolio_exist.length == 0) {
		let portfolio_result = await Portfolio.query().insert(portfolio_query)

		// Make a query to connect the portfolio to the chosen SLO
		let portfolio_slo_query = {
			portfolio_id: parseInt(portfolio_result.id),
			slo_id: parseInt(student_learning_outcomes[0])
		}

		let portfolio_slo_result = await CoursePortfolioStudentLearningOutcome.query().insert(portfolio_slo_query)
		
		// Make an array for artifacts
		let artifacts = []

		// Make queries for creating default artifacts
		for(let i=1; i<4; i++){

			artifact_query = {
				portfolio_slo_id: portfolio_slo_result.id,
				index: i,
				name: '_unset_'
			}

			artifact_result = await Artifact.query().insert(artifact_query)
			
			artifacts.push(artifact_result)
		}

		// Make an array for artifact ids for easy 'loopability' (idk if that's a word)
		let artifact_ids = []
		artifact_ids.push(artifacts[0].id)
		artifact_ids.push(artifacts[1].id)
		artifact_ids.push(artifacts[2].id)

		for(let i=0; i<artifact_ids.length; i++){
			let student_indexes = generateRandomStudentIndexes(num_students)
			for(let j=0; j<student_indexes.length; j++){
				let artifact_evaluation_query = {
					artifact_id: artifact_ids[i],
					evaluation_index: j + 1,
					student_index: student_indexes[j],
					evaluation: {
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
				}				
				await Evaluation.query().insert(artifact_evaluation_query)
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
		id: raw_portfolio.id,
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

function generateRandomStudentIndexes(num_students){
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
		id: raw_portfolio.id,
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