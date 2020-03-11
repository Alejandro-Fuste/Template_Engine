const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');
const render = require('./lib/htmlRenderer');

console.log('Please build your team');

const questions = {
	manager: [
		{
			type: 'input',
			name: 'name',
			message: "What is your manager's name?"
		},
		{
			type: 'input',
			name: 'id',
			message: "What is your manager's id?"
		},
		{
			type: 'input',
			name: 'email',
			message: "What is your manager's email?"
		},
		{
			type: 'input',
			name: 'officeNumber',
			message: "What is your manager's office number?"
		}
	]
};

function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) => {
		if (err) throw err;
	});
}

function init() {
	inquirer
		.prompt(questions.manager)
		.then((res) => {
			const { name, id, email, officeNumber } = res;
			const man = new Manager(name, id, email, officeNumber);
			const data = [ man ];

			return writeToFile(outputPath, render(data));
		})
		.then(() => console.log('Successfully wrote file!'))
		.catch((err) => console.log(err));
}

init();
