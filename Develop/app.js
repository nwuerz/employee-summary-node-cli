const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
const teamMembers = [];
const idArray = [];
​
// Write code to use inquirer to gather information about the development team members,
function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?"
        }
    ]).then(data => {
        const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.officeNumber);
        teamMembers.push(manager);
        idArray.push(data.managerId);
        createTeam();
    });
}

function createTeam() {
    
    inquirer.prompt([
        {
            type: "list",
            name: "teamMember",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I dont want to add any more team members"
            ]
        }
    ]).then(userSelection => {
        switch(userSelection.teamMember) {
        case "Engineer":
            addEngineer();
            break;
        case "Intern":
            addIntern();
            break;
        default:
            buildTeam();
        }
    });
}

function addEngineer() {
    inquirer.prompt([
        {
          type: "list",
          name: "engineerName",
          message: "What is your engineer's name?"  
        },
        {
            type: "input",
            name: "engineerId",
            message: "what is your engineer's id?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "what is your engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "what is your engineers GitHub username?"
        }
    ]).then(data => {
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.github);
        teamMembers.push(engineer);
        idArray.push(data.engineerId);
        createTeam();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "what is your intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "what is your intern's id?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "what is your intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "where did your intern go to school?"
        }
    ]).then(data => {
        const intern = new Intern (data.internName, data.internId, data.internEmail, data.internSchool);
        teamMembers.push(intern);
        idArray.push(data.internId);
    })
}
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
