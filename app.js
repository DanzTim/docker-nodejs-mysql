require('dotenv').config;
const express = require('express');
const { validatePostActivity, validateParam, validateDeleteActivity, validateUpdate, validateUpdateTodo, makeTodo } = require('./validation');

const app = express();
const PORT = 3030;

app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    message: "Hello There!"
  })
})

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

app.listen(PORT, async () => {
    await pool.getConnection();
    console.log('Server running on port %s', PORT);
})