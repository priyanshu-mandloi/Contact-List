 
 // reaquire the library
 const mongoose = require("mongoose");

 // connect to the database
 mongoose.connect('mongodb://localhost/contacts_list_db');

 // acquire the connection to check if it is succesfull.
 const db = mongoose.connection;
 
 //  in  case of any error the below message gets printed
db.on('error',console.error.bind(console,'error connecting to db'));

// if the connection is succesfull then print the message
db.once('open',function(){
    console.log("Successfuly connected to database");
});
 