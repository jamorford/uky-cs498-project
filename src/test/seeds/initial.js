
exports.seed = knex => Promise.resolve((async () => {
	await knex('artifact_evaluation').del()
	await knex('artifact').del()
	await knex('portfolio_slo').del()
	await knex('portfolio').del()
	await knex('users').del()
	await knex('slo_metric').del()
	await knex('slo').del()
	await knex('course').del()
	await knex('department').del()
	await knex('term').del()
	await knex('term_type').del()


	/* USER SECTION */
	user_id = await knex('users')
	.returning('id')
	.insert([
		{
			linkblue_username: `user`
		}
	])
	user_id = user_id[0]

	/* DEPARTMENT SECTION */
	department_id = await knex('department')
	.returning('id')
	.insert([
		{
			identifier: `cs`,
			name: `Computer Science`
		}
	])
	department_id = department_id[0]

	/* TERM SECTION */
	term_type_ids = await knex('term_type')
	.returning('id')
	.insert([
		{
			type: `semester`
		},
		{
			type: `evaluation_option`
		}
	])
	term_type_id_1 = term_type_ids[0]
	term_type_id_2 = term_type_ids[1]


	term_id = await knex('term')
	.returning('id')
	.insert([
		{
			type: term_type_id_1,
			value: `fall`
		},
		{
			type: term_type_id_1,
			value: `spring`
		},
		{
			type: term_type_id_1,
			value: `summer 1`
		},
		{
			type: term_type_id_1,
			value: `summer 2`
		},
		{
			type: term_type_id_1,
			value: `winter`
		},
		{
			type: term_type_id_2,
			value: `does not apply`
		},
		{
			type: term_type_id_2,
			value: `exceeds`
		},
		{
			type: term_type_id_2,
			value: `meets`
		},
		{
			type: term_type_id_2,
			value: `partially`
		},
		{
			type: term_type_id_2,
			value: `not`
		}
	])
	term_id_1 = term_id[0]

	/* SLO SECTION */
	slo_id = await knex('slo')
	.returning('id')
	.insert([
		{
			department_id: department_id,
			index: 2,
			description: `Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.`
		}
	])
	slo_id = slo_id[0]

	await knex('slo_metric')
	.returning('id')
	.insert([
		{
			slo_id: slo_id,
			index: 1,
			name: `Identify and interpret client needs and design constraints`
		},
		{
			slo_id: slo_id,
			index: 2,
			name: `Establish design evaluation metrics and procedures`
		},
		{
			slo_id: slo_id,
			index: 3,
			name: `Develop a design whose product could reasonably meet design needs`
		},
		{
			slo_id: slo_id,
			index: 4,
			name: `Articulate a proposed design and rationally support design decisions`
		},
		{
			slo_id: slo_id,
			index: 5,
			name: `Identify and interpret client needs and design constraints`
		}
	])

	/* COURSE SECTION */
	course_id = await knex('course')
	.returning('id')
	.insert([
		{
			department_id: department_id,
			number: 498
		}
	])
	course_id = course_id[0]

	/* COURSE PORTFOLIO SECTION */
	portfolio_id = await knex('portfolio')
	.returning('id')
	.insert([
		{
			course_id: course_id,
			instructor_id: user_id,
			semester_term_id: term_id_1,
			num_students: 5,
			section: 1,
			year: 2019
		}
	])
	portfolio_id = portfolio_id[0]

	portfolio_slo_id = await knex('portfolio_slo')
	.returning('id')
	.insert([
		{
			portfolio_id: portfolio_id,
			slo_id: slo_id
		}
	])
	portfolio_slo_id = portfolio_slo_id[0]

	artifact_ids = await knex('artifact')
	.returning('id')
	.insert([
		{
			portfolio_slo_id: portfolio_slo_id,
			index: 1
		},
		{
			portfolio_slo_id: portfolio_slo_id,
			index: 2
		},
		{
			portfolio_slo_id: portfolio_slo_id,
			index: 3
		},
	])

	artifact_id_1 = artifact_ids[0]
	artifact_id_2 = artifact_ids[1]
	artifact_id_3 = artifact_ids[2]

	await knex('artifact_evaluation').insert([
		/* ARTIFACT 1 */
		{
			artifact_id: artifact_id_1,
			evaluation_index: 1,
			student_index: 1
		},
		{
			artifact_id: artifact_id_1,
			evaluation_index: 2,
			student_index: 2
		},
		{
			artifact_id: artifact_id_1,
			evaluation_index: 3,
			student_index: 3
		},
		{
			artifact_id: artifact_id_1,
			evaluation_index: 4,
			student_index: 4
		},
		{
			artifact_id: artifact_id_1,
			evaluation_index: 5,
			student_index: 5
		},
		/* ARTIFACT 2 */
		{
			artifact_id: artifact_id_2,
			evaluation_index: 1,
			student_index: 1
		},
		{
			artifact_id: artifact_id_2,
			evaluation_index: 2,
			student_index: 2
		},
		{
			artifact_id: artifact_id_2,
			evaluation_index: 3,
			student_index: 3
		},
		{
			artifact_id: artifact_id_2,
			evaluation_index: 4,
			student_index: 4
		},
		{
			artifact_id: artifact_id_2,
			evaluation_index: 5,
			student_index: 5
		},
		/* ARTIFACT 3 */
		{
			artifact_id: artifact_id_3,
			evaluation_index: 1,
			student_index: 1
		},
		{
			artifact_id: artifact_id_3,
			evaluation_index: 2,
			student_index: 2
		},
		{
			artifact_id: artifact_id_3,
			evaluation_index: 3,
			student_index: 3
		},
		{
			artifact_id: artifact_id_3,
			evaluation_index: 4,
			student_index: 4
		},
		{
			artifact_id: artifact_id_3,
			evaluation_index: 5,
			student_index: 5
		}
	])
})())