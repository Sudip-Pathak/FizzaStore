// // This loads the dommy data when the project is run for the first time. So that it will be easy to display in the frontend.
// // Here data from users and products of data is going in the database with the help of User and Product of model.
// // Now we are using the localhost process so this below process is not need but incase we are using the hosting database this data is very crucial.
// // This below code is also used for setting/adding the admin user which should be must while developing website.

import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import connectDB from "./config/db.js"
import colors from "colors";

import dotenv from "dotenv";  // // Env file ko variable lie load garna kam garxa.
dotenv.config();

connectDB();

async function importData() {// // Import certain dommy data and add in the database.
   try{
    await User.deleteMany();    // // Naya user add garnu bhanda aagaid purna lai delete garna.
    await Product.deleteMany();

    let newusers = await User.insertMany(users);
    await Product.insertMany(
        products.map((product) => {   // // Map takes original array and then perform manipulation or calculation and transform to new array.
            return{
                ...product,
                user: newusers[0]._id,  // // This admin user.
            };
        })
    );
    console.log("Data Loaded!".green.inverse);
    process.exit();
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    };
};

async function destroyData() {
    try{
        await User.deleteMany();
        await Product.deleteMany();
        console.log("Data Cleared!".red.inverse);
        process.exit();
    }
    catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}


// // ... Kee taw destroy ke import function should be run.
if (process.argv[2] == "-d"){    // // run from terminal: node .\backend\seeder.js -d
    destroyData();
}
else{
    importData();  // // run  from terminal: node .\backend\seeder.js
};




// console.log(process.argv)  // //.. Similar to argument variable.

// // Run seeder file: node .\backend\seeder.js
