require("dotenv").config();
const {addCustomer,findCustomer}=require("./app");
let inquirer=require("inquirer");
// read the doc
const program=require("commander");

let quetions=[
    {
        type:"input",
        name:"firstName",
        message:"Customer First Name"
    },
    {
        type:"input",
        name:"lastName",
        message:"Customer Last Name"
    },
    {
        type:"input",
        name:"phone",
        message:"Customer Phone Name"
    },
    {
        type:"input",
        name:"email",
        message:"Customer Email"
    }
]

program
.version('1.0.0')
.description("CLI to manage CRUD operation");

program
.command('add <firstName> <lastName> <phone> <email>')
.alias('a')
.description("to add customer details")
.action(()=>{
    inquirer.prompt(quetions).then(answer=>addCustomer(answer))
    .catch(e=>{console.log(e,"gdfgdf")});
})
program
.command('find <name>')
.alias('f')
.description("to find the name in the database")
.action((name)=>{
    findCustomer(name);
})
// The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched
program.parse(process.argv);

