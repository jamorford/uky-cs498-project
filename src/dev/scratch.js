// load objection
require("../main/common/objection");

// this file is intended to allow the developer to test different functional manually
const CoursePortfolioArtifact = require('../main/models/CoursePortfolio/Artifact');

(async () => {
	console.log(await CoursePortfolioArtifact.query())
	console.log(await CoursePortfolioArtifact.query().findById(1))
})()