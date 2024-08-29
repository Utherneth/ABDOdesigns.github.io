

const express = require('express');

const app = express();

app.use(express.json());

let userList = [];

// POST request to add a new user

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const existingUser = userList.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User with the same email already exists' });
  }

  const newUser = { id: userList.length + 1, name, email };

  userList.push(newUser);

  res.status(201).json(newUser);
});

// GET request to retrieve all users

app.get('/users', (req, res) => {
  res.json(userList);
  console.log('GET request received');
  // Example: User list: [ { id: 1, name: 'John Doe', email: 'john@example.com' }, { id: 2, name: 'Jane Smith', email: 'jane@example.com' } ]
  // Output: [ { id: 1, name: 'John Doe', email: 'john@example.com' }, { id: 2, name: 'Jane Smith', email: 'jane@example.com' } ]
  // Logs: GET request received
});

// PUT request to update a user's information

app.put('/users/:email', (req, res) => {
  const { email } = req.params;
  const updatedUser = req.body;

  if (!email || !updatedUser.name) {
    return res.status(400).json({ message: 'Email and name are required' });
  }

  const index = userList.findIndex((user) => user.email === email);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  userList[index] = {...userList[index],...updatedUser };

  res.json(userList[index]);
});

// DELETE request to remove a user

app.delete('/users/:email', (req, res) => {
  const { email } = req.params;

  const index = userList.findIndex((user) => user.email === email);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  userList.splice(index, 1);

  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Example usage:
// GET http://localhost:3000/users
// POST http://localhost:3000/users with JSON body: { name: 'John Doe',
// email: 'john.doe@example.com' }
// PUT http://localhost:3000/users/john.doe@example.com with JSON body: {
    // name: 'John Doe Updated', email: 'john.doe@example.com' }
// DELETE http://localhost:3000/users/john.doe@example.com



// GET request to retrieve a single user by email
// app.get('/users/:email', (req, res) => {
