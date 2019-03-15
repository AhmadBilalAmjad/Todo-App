const { ObjectID } = require("mongoose");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");

const id = "5c8a22e1f3373880b848861f22";

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

Todo.findById(id)
  .then(todo => {
    if (!todo) {
      return console.log(`Id not found`);
    }
    console.log(`findById Todo: ${todo}`);
  })
  .catch(err => {
    console.log(err);
  });
