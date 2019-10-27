const Portfolio = require('../models/CoursePortfolio')
const Course = require('../models/Course')
const CoursePortfolioStudentLearningOutcome = require('../Models/CoursePortfolio/StudentLearningOutcome')

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
	// TODO

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
	
	
	// If course doesn't exist, make a new course
	if (course_exist.length == 0){		
		course_result = await Course.query().insert(course_query)
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
	portfolio_exist = await Portfolio
		.query()
		.where('course_id', course_id)
		.where('semester_term_id', semester)
		.where('section', section)
		.where('year', year)

	// If portfolio doesn't exist, make another one
	if (portfolio_exist.length == 0) {
		portfolio_result = await Portfolio.query().insert(portfolio_query)

		console.log(student_learning_outcomes)

		// Make a query to connect the portfolio to the chosen SLO
		portfolio_slo_query = {
			portfolio_id: parseInt(portfolio_result.id),
			slo_id: parseInt(student_learning_outcomes[0])
		}

		console.log('portfolio slo query')
		console.log(portfolio_slo_query)

		await CoursePortfolioStudentLearningOutcome.query().insert(portfolio_slo_query)

		portfolio_id = portfolio_result.id
	} else {
		portfolio_id = portfolio_exist[0].id
	}

	console.log('portfolio id')
	console.log(portfolio_id)
	
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
	.findById(portfolio_result.id)

	console.log(raw_portfolio)

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

	console.log(portfolio)

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

	console.log(portfolio)

	return portfolio
}