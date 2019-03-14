const { MongoClient, ObjectId } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log(`Connection Not Established: ${err} `);
  }

  console.log(`Connection Established Successfully`);
  const db = client.db("TodoApp");

  // findOneAndUpdate
  db.collection("Todos")
    .findOneAndUpdate(
      { _id: ObjectId("5c8a12a489e69f3dbae15d3a") },
      {
        $set: {
          completed: true
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => {
      console.log(
        `Updated Successfully: ${JSON.stringify(result, undefined, 2)}`
      );
    })
    .catch(err => {
      if (err) {
        console.log(`Something Went Wrong: ${err}`);
      }
    });

  // client.close();
});
