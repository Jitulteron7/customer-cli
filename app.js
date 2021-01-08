const Customer=require("./Model/model");
const mongoose =require('mongoose');
const chalk=require("chalk");
mongoose.Promise = global.Promise;
const db =mongoose.connect("mongodb://localhost:27017/customercli",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
});

const addCustomer= (customer)=>{
     Customer.create(customer).then(data=>{
         console.info(chalk.bold.black.bgGreen("New Customer added in the DataBase"));
        //  after command executed sucessfully close the db and node app
        mongoose.connection.close();
        process.exit();
     })
}

const findCustomer= (name)=>{
    let search=RegExp(name,"i");
    Customer.find({$or:[{firstName:search},{lastName:search}]}).then(data=>{
        if(data.length>0){
            for(var i =0;i<data.length;i++){
                console.info(chalk.green.underline.bold("Results"));
                console.info(chalk.yellow("----------","Customer No",1+i,"----------"));
                console.info(chalk.magenta.bold("First Name:"),chalk.blue(data[i].firstName));
                console.info(chalk.magenta.bold("Last Name:"),chalk.blue(data[i].lastName));
                console.info(chalk.magenta.bold("Phone Number:"),chalk.blue(data[i].phone));
                console.info(chalk.magenta.bold("Email"),chalk.blue(data[i].email));
            }
            
            console.info(chalk.green.underline.bold("----------",data.length , "matched","----------"));
            
        }else{
            console.info(chalk.bold.red("User not found. Please add the user if required"))
        }
        //  after command executed sucessfully close the db 
        mongoose.connection.close();
        process.exit();
    })

}

module.exports={addCustomer,findCustomer};