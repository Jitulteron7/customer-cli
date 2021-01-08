const Customer=require("./Model/model");
const mongoose =require('mongoose');
const chalk=require("chalk");
mongoose.Promise = global.Promise;
const db =mongoose.connect("mongodb://localhost:27017/customercli",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
});

// Add cusotmer
const addCustomer= (customer)=>{
     Customer.create(customer).then(data=>{
         console.info(chalk.bold.black.bgGreen("New Customer added in the DataBase"));
        //  after command executed sucessfully close the db and node app
        mongoose.connection.close();
        process.exit();
     })
}
// Find cusotmer
const findCustomer= (name)=>{
    let search=RegExp(name,"i");
    Customer.find({$or:[{firstName:search},{lastName:search}]}).then(data=>{
        if(data.length>0){
            console.info(chalk.green.underline.bold("Results"));
            for(var i =0;i<data.length;i++){
                console.info(chalk.yellow("----------","Customer No",1+i,"----------"));
                console.info(chalk.magenta.bold("First Name:"),chalk.blue(data[i]._id));
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

// Update Cutomer

const UpdateCustomer=(_id,customer)=>{
    Customer.updateOne({_id},customer)
    .then(updates=>{
        console.info(chalk.bgGreen.bold.white(`${customer.firstName} ${customer.lastName} Updated`));
        mongoose.connection.close();
        process.exit();
    })
    
    
}

// delete Cutomer
const DeleteCustomer=(_id)=>{

    Customer.findByIdAndDelete({_id})
    .then(customer=>{
        console.info(chalk.bgGreen.bold.white(`$Cutomer ${customer._id} deleted`));
        mongoose.connection.close();
        process.exit();
    })
    
    
}

// list of all the customer
const CustomerList=()=>{

    Customer.find()
    .then(customer=>{
        console.info(chalk.bold.green("--------List of Customer--------"));
        for(var i=0;i<customer.length;i++){
                console.info(chalk.yellow("----------",1+i,"----------"));
                console.info(chalk.magenta.bold("First Name:"),chalk.blue(customer[i]._id));
                console.info(chalk.magenta.bold("First Name:"),chalk.blue(customer[i].firstName));
                console.info(chalk.magenta.bold("Last Name:"),chalk.blue(customer[i].lastName));
                console.info(chalk.magenta.bold("Phone Number:"),chalk.blue(customer[i].phone));
                console.info(chalk.magenta.bold("Email"),chalk.blue(customer[i].email));
                
        }

        console.info(chalk.green.underline.bold("----------total ",customer.length,"----------"));
        mongoose.connection.close();
        process.exit();
    })
    
    
}
module.exports={addCustomer,findCustomer,UpdateCustomer,DeleteCustomer,CustomerList};