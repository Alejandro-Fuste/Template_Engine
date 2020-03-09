// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('../lib/Employee');

class Engineer extends Employee {
	constructor(name, id, email, GitHUb) {
		super(name, id, email);
		this.github = GitHUb;
	}

	getRole() {
		return `Engineer`;
	}

	getGithub() {
		return this.github;
	}
}

const e = new Engineer('Foo', 1, 'test@test.com', 'GitHubUser');

e.getRole();
e.getGithub();

module.exports = Engineer;
