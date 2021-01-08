#!/usr/bin/env node
require("dotenv").config();
const {addCustomer,findCustomer,UpdateCustomer,DeleteCustomer,CustomerList}=require("./app");
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
        message:"Customer Phone Number"
    },
    {
        type:"input",
        name:"email",
        message:"Customer Email"
    }
]

let updateQuery=[
    {
        type:"input",
        name:"_id",
        message:"Customer ID"
    },
    {
        type:"input",
        name:"",
        message:"Customer ID"
    }
];
program
.version('1.0.0')
.description("CLI to manage CRUD operation");
// note dont need inquier then add the .command like (add <firstName> <lastName> <phone> <email>)
// if not then do like this 
program
.command('add')
.alias('a')
.description("to add customer details")
.action(()=>{
    inquirer.prompt(quetions).then(answer=>addCustomer(answer))
})

program
.command('find <name>')
.alias('f')
.description("to find the name in the database")
.action((name)=>{
    findCustomer(name);
})

program
.command('delete <_id>')
.alias('d')
.description("to find the name in the database")
.action((_id)=>{
   DeleteCustomer(_id)
})

program
.command('update <_id>')
.alias('up')
.description("to update current user data")
.action((_id)=>{
    inquirer.prompt(quetions).then(answer=>UpdateCustomer(_id,answer));
})

program
.command('list')
.alias('l')
.description("List of the customer")
.action(()=>{
    CustomerList();
})
// The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched
program.parse(process.argv);

