// Including External Modules
const _ = require("lodash");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

// Including Internal Modules
const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");

// Telling express to use bodyParser.json()
app.use(bodyParser.json());

// POST request to create todo
app.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// GET Request to get all todos
app.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// GET request to get a todo by its id
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send("Invalid ID");
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

// Delete Request To delete todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        res.status(400).send();
      }

      res.status(200).send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

// Patch request to update todo
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.status(200).send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

// POST Request To create user
app.post("/users", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);
  const user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(err => {
      res.status(400).send();
    });
});

// GET Request to add private route
app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

// Setting Connection to the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
