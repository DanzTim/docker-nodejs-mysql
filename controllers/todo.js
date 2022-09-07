const { pool } = require('../connection');

class TodoController {
	constructor() {
		this.todoList = [];
		this.todoId = 1;
	}

	// app.post('/todo-items', makeTodo, async = async (req, res) => {
	makeTodo = async (req, res) => {
		let { title, activity_group_id, priority } = req.body;
		try {
			const newTodo = {
				id: this.todoId,
				activity_group_id: activity_group_id,
				title: title,
				is_active: true,
				priority: priority,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				deleted_at: null,
			};

			res.status(201).json({
				status: 'Success',
				message: 'Success',
				data: newTodo,
			});
			this.todoList.push(newTodo);
			let query =
				'INSERT INTO todos (title, activity_group_id, priority) VALUES (?, ?, ?)';
			await pool.query(query, [title, activity_group_id, priority]);
		} catch (error) {
			res.status(500).json({
				name: 'GeneralError',
				message: error.message || error,
				code: 500,
				className: 'general-error',
				data: {},
				errors: {},
			});
		}
	};

	// app.get('/todo-items', async = async (req, res) => {
	listTodos = async (req, res) => {
		let result = this.todoList;
		try {
			if (!req.query.activity_group_id && result.length) {
				return res.json({
					status: 'Success',
					message: 'Success',
					data: result,
				});
			}
			if (req.query.activity_group_id && result.length) {
				result = this.todoList.filter(
					(item) => item.activity_group_id == req.query.activity_group_id
				);
				return res.json({
					status: 'Success',
					message: 'Success',
					data: result,
				});
			}
			if (result.length == 0) {
				let [test, ...rest] = await pool.query(
					'SELECT id, title, activity_group_id, is_active, priority FROM todos'
				);
				if (req.query.activity_group_id) {
					result = test.filter(
						(item) => item.activity_group_id == req.query.activity_group_id
					);
					if (!result) {
						return res.json({
							status: 'Success',
							message: 'Success',
							data: [],
						});
					}
					return res.json({
						status: 'Success',
						message: 'Success',
						data: result,
					});
				} else {
					return res.json({
						status: 'Success',
						message: 'Success',
						data: test,
					});
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	// app.get('/todo-items/:id', validateParam, async = async (req, res) => {
	getTodoById = async (req, res) => {
		try {
			let result = this.todoList.find((item) => item.id == req.params.id);
			if (!result) {
				let todoQuery =
					'SELECT id, title, is_active, priority FROM todos WHERE id = ?';
				let [test, ...rest] = await pool.query(todoQuery, req.params.id);
				if (!test.length) {
					return res.status(404).json({
						status: 'Not Found',
						message: `Todo with ID ${req.params.id} Not Found`,
						data: {},
					});
				}
				result = test[0];
			}
			res.json({
				status: 'Success',
				message: 'Success',
				data: result,
			});
		} catch (error) {
			console.error(error);
		}
	};

	// app.patch('/todo-items/:id', validateUpdateTodo, async = async (req, res) => {
	updateTodo = async (req, res) => {
		let { id } = req.params;
		let { title, is_active } = req.body;
		let newTodo;
		try {
			var index = this.todoList.findIndex((item) => item.id == id);
			if (index > -1) {
				// only splice array when item is found
				let oldTodo = this.todoList[index];
				if (title) {
					oldTodo.title = title;
				}
				if (is_active) {
					oldTodo.is_active = is_active;
				}
				newTodo = oldTodo;
			} else {
				let getQuery = 'SELECT * FROM todos WHERE id = ?';
				let [data, ...rest] = await pool.query(getQuery, [id]);
				if (!data.length) {
					return res.status(404).json({
						status: 'Not Found',
						message: `Todo with ID ${req.params.id} Not Found`,
						data: {},
					});
				}
				newTodo = data[0];
				if (title) {
					newTodo.title = title;
				}
				if (is_active) {
					newTodo.is_active = is_active;
				}
			}
			res.json({
				status: 'Success',
				message: 'Success',
				data: newTodo,
			});
			let query = `UPDATE todos SET title = ? WHERE id = ?`;
			if (title && !is_active) {
				await pool.query(query, [title, id]);
			}
			if (!title && is_active) {
				let query = `UPDATE todos SET is_active = ? WHERE id = ?`;
				await pool.query(query, [is_active, id]);
			}
		} catch (error) {
			res.status(500).json({
				name: 'GeneralError',
				message: error.message || error,
				code: 500,
				className: 'general-error',
				data: {},
				errors: {},
			});
		}
	};

	// app.delete('/todo-items/:id', validateDeleteActivity, async = async (req, res) => {
	deleteTodo = async (req, res) => {
		try {
			let index = this.todoList.findIndex((item) => item.id == req.params.id);
			if (index > -1) {
				// only splice array when item is found
				this.todoList.splice(index, 1);
			} else {
				let getQuery = 'SELECT * FROM todos WHERE id = ?';
				let data = await pool.query(getQuery, [req.params.id]);
				if (!data[0].length) {
					return res.status(404).json({
						status: 'Not Found',
						message: `Todo with ID ${req.params.id} Not Found`,
						data: {},
					});
				}
			}
			res.status(200).json({
				status: 'Success',
				message: 'Success',
				data: {},
			});
			let queryPath = 'DELETE FROM todos WHERE id = ?';
			await pool.query(queryPath, [req.params.id]);
		} catch (error) {
			console.error(error);
		}
	};
}

module.exports = { TodoController };
