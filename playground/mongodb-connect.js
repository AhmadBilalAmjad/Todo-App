// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

// const objId = new ObjectID();
// console.log(objId);

const url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log("Unable To Connect To MongoDB Server");
  }
  console.log("Connected To MongoDB Server");
  const db = client.db("TodoApp");

  db.collection("Users").insertOne(
    {
      name: "Usman",
      gender: "male",
      age: 20,
      location: "Lahore, Pakistan"
    },
    (err, result) => {
      if (err) {
        console.log(`Unable To Insert Data:   ${err}`);
      }

      console.log("Data Inserted Successfully:  \n", result.ops);
    }
  );

  client.close();
});
