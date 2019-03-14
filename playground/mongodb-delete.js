const { MongoClient, ObjectId, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log(`Unable To Connect To MongoDB Server: ${err} `);
  }

  console.log("Connection Established Successfully");
  const db = client.db("TodoApp");

  // deleteMany

  //   db.collection("Todos")
  //   .deleteMany({ name: "Usman" })
  //   .then(result => {
  //     if (result) {
  //       console.log(`Todo Was Deleted: ${result}`);
  //     }
  //   })
  //   .catch(err => {
  //     if (err) {
  //       console.log(`Something Went Wrong !!! ${err}`);
  //     }
  //   });

  // deleteOne

  //   db.collection("Todos")
  //   .deleteOne({ completed: false })
  //   .then(result => {
  //     if (result) {
  //       console.log(`Deleted Successfully ${result}`); //     }
  //   })
  //   .catch(err => {
  //     if (err) {
  //       console.log(`Something Went Wrong !!! ${err}`);
  //     }
  //   });

  // findOneAndDelete

  db.collection("Todos")
    .findOneAndDelete({ _id: ObjectId("5c8a12f189e69f3dbae15d5c") })
    // Can be deleted by id using this technique
    // .findOneAndDelete({ _id: new ObjectID("5c8a143d89e69f3dbae15daf") })
    .then(result => {
      if (result) {
        console.log(
          `Deleted Successfully ${JSON.stringify(result, undefined, 2)}`
        );
      }
    })
    .catch(err => {
      if (err) {
        console.log(`Something Went Wrong !!! ${err}`);
      }
    });

  // client.close();
});
