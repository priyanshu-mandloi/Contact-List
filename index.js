// To take data from view to controller.

const express = require("express"); // To access the module
const { name } = require("ejs");
const port = 8000;
const path = require("path");
const { title } = require("process");
const db = require("./connfig/moongose");        // this is fetchimg the schema.
const Contact = require("./models/contact");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Added a folder inside the contact_list.

// here two middilware function are used.
app.use(express.urlencoded());
app.use(express.static("assets"));


// Creating a middileware

// // Middileware 1
// app.use(function(req,res,next){                // next is used to pass the request to the new or next  middileware.
// //   console.log("Middileware 1 is created");
//    req.myName="Priyanshu";
//   next();
// });

// // Middileware 2
// app.use(function(req,res,next){                    // next is used to pass the request to the new middileware.
//   console.log("My Name from middileware 2 :",req.myName);
//   next();
// });

// var contatList = [
//   {
//     name: "Priyanshu ",
//     phoneno: "93422323232",
//   },
//   {
//     name: "Arpan Sharma",
//     phoneno: "89223548953",
//   },
//   {
//     name: "Ram Shukla",
//     phoneno: "9098933304",
//   },
// ];

app.get("/", function (req, res) {
  // console.log(req.myName);

  Contact.find({},function(err,contacts){
       if(err){
        console.log("Error in fetching from db");
        return;
       }
       return res.render("home", {
         title: "My contact list!",
         contact_list: contacts,
       });
  });
});

app.get("/Practice", function (req, res) {
  return res.render("Practice", {
    title: "Playing with Ejs!",
  });
});

app.post("/create-contact", function (req, res) {
  //   contatList.push({
  //      name:req.body.name,
  //      phoneno:req.body.phoneno
  //   });

  // contatList.push(req.body);
  Contact.create({
    name:req.body.name,
    phoneno:req.body.phoneno
  },function(err,newContact){
    if(err){
      console.log("Error in creating a contact!");
      return;
    }
    console.log("********",newContact);
    return res.redirect("back");
  });
  
});

// For deleting a contact.

app.get("/delete-contact/", function (req, res) {
  // console.log("Query:",req.query);
  let id = req.query.id;
  
  // we will find  the id in the database and delete it.
  Contact.findByIdAndDelete(id,function(err){
    if(err){
      console.log("Error in deleting the object frm database!");
      return;
    }
    return res.redirect("back");
  });

  // // we will iterate in the list and find with phone no
  // let contatIndex = contatList.findIndex(
  //   (contact) => contact.phoneno == phoneno
  // );

  // agar index nhi mila toh -1 ayega varna index aayega.

  // if (contatIndex != -1) {
  //   contatList.splice(contatIndex, 1);
  // }

});

app.listen(port, function (err) {
  if (err) {
    console.log("Error is running in the port", err);
  }
  console.log("Yup my express server is running on the Port: ", port);
});
