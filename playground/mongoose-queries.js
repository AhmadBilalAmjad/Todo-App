const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// const id = "5c8a22e1f3373880b848861f22";

// if (!ObjectID.isValid(id)) {
//   console.log("ID Not Valid");
// }

// Todo.find({
//   _id: id
// })
//   .then(todo => {
//     console.log(`find Todo: ${todo}`);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Todo.findOne({
//   _id: id
// })
//   .then(todo => {
//     console.log(`findOne Todo: ${todo}`);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log(`Id not found`);
//     }
//     console.log(`findById Todo: ${todo}`);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const Userid = "5c8a361f9967722fdc7970e7";

User.findById(Userid)
  .then(user => {
    if (!user) {
      return console.log("User Not Found");
    }

    console.log(user);
  })
  .catch(err => {
    console.log(err);
  });
