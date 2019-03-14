const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log(`Unable To Connect To MongoDB Server: ${err}`);
  }

  console.log("Connection Established Successfully");
  const db = client.db("TodoApp");

  db.collection("Todos")
    .find({ name: "Usman" })
    .toArray()
    .then(docs => {
      console.log("Todos");
      console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch(err => {
      if (err) {
        console.log(`Unable To Find Todos`);
      }
    });

  // db.collection("Todos")
  // .find()
  // .count()
  // .then(count => {
  //   console.log(`Total Count: ${count}`);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // client.close();
});
