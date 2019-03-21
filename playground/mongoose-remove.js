const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");

// remove => Remove all
// Todo.remove({}).then(result => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// });

// findOneAndRemove
// Todo.findOneAndRemove({
//   text: "Cook Dinner"
// })
//   .then(todo => {
//     console.log(todo);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// findByIdAndRemove
Todo.findByIdAndRemove("5c8a23e46140b95b581e6404")
  .then(todo => {
    console.log(todo);
  })
  .catch(err => {
    console.log(err);
  });
