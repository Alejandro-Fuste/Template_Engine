const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');
const render = require('./lib/htmlRenderer');
const data = [];

console.log('Please build your team');

const questions = {
	manager: [
		{
			type: 'input',
			name: 'manName',
			message: "What is your manager's name?"
		},
		{
			type: 'input',
			name: 'manID',
			message: "What is your manager's id?"
		},
		{
			type: 'input',
			name: 'manEmail',
			message: "What is your manager's email?"
		},
		{
			type: 'input',
			name: 'officeNumber',
			message: "What is your manager's office number?"
		}
	],
	choice: [
		{
			type: 'list',
			name: 'memberChoice',
			message: 'Which type of team member would you like to add?',
			choices: [ 'Engineer', 'Intern', "I don't want to add anyone else" ],
			default: 'Use arrow keys'
		}
	],
	engineer: [
		{
			type: 'input',
			name: 'engName',
			message: "What is your engineer's name?"
		},
		{
			type: 'input',
			name: 'engID',
			message: "What is your engineer's id?"
		},
		{
			type: 'input',
			name: 'engEmail',
			message: "What is your engineer's email?"
		},
		{
			type: 'input',
			name: 'engGitHub',
			message: "What is your engineer's GitHub username?"
		}
	],
	intern: [
		{
			type: 'input',
			name: 'intName',
			message: "What is your intern's name?"
		},
		{
			type: 'input',
			name: 'intID',
			message: "What is your intern's id?"
		},
		{
			type: 'input',
			name: 'intEmail',
			message: "What is your intern's email?"
		},
		{
			type: 'input',
			name: 'school',
			message: "What is your intern's school?"
		}
	]
};

function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) => {
		if (err) throw err;
	});
}

function repeat() {
	inquirer.prompt(questions.choice).then((res) => {
		switch (res.memberChoice) {
			case 'Engineer':
				inquirer.prompt(questions.engineer).then((res) => {
					const { engName, engID, engEmail, engGitHub } = res;
					const eng = new Engineer(engName, engID, engEmail, engGitHub);
					data.push(eng);
					writeToFile(outputPath, render(data));
				});
				break;
			case 'Intern':
				inquirer.prompt(questions.intern).then((res) => {
					const { intName, intID, intEmail, school } = res;
					const int = new Intern(intName, intID, intEmail, school);
					data.push(int);
					writeToFile(outputPath, render(data));
					repeat(res);
				});
				break;
		}
	});
}

function init() {
	inquirer.prompt(questions.manager).then((resp) => {
		const { manName, manID, manEmail, officeNumber } = resp;
		const man = new Manager(manName, manID, manEmail, officeNumber);
		data.push(man);
		writeToFile(outputPath, render(data));

		inquirer
			.prompt(questions.choice)
			.then((res) => {
				switch (res.memberChoice) {
					case 'Engineer':
						inquirer.prompt(questions.engineer).then((res) => {
							const { engName, engID, engEmail, engGitHub } = res;
							const eng = new Engineer(engName, engID, engEmail, engGitHub);
							data.push(eng);
							writeToFile(outputPath, render(data));
							// repeat();
						});
						break;
					case 'Intern':
						inquirer.prompt(questions.intern).then((res) => {
							const { intName, intID, intEmail, school } = res;
							const int = new Intern(intName, intID, intEmail, school);
							data.push(int);
							writeToFile(outputPath, render(data));
							// repeat();
						});
						break;
				}
			})
			.then(() => console.log('Successfully wrote file!'))
			.catch((err) => console.log(err));
	});
}

init();
