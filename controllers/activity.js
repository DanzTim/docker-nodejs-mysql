const { pool } = require('../connection');

class ActivityController {
	constructor() {
		this.activitiesList = [];
		this.activityId = 1;
	}

	// app.get('/activity-groups/:id', validateParam, async = async (req, res) => {
	getActivityById = async (req, res) => {
		try {
			let result = this.activitiesList.filter(
				(item) => item.id == req.params.id
			);
			if (!result) {
				let query = 'SELECT * FROM activities WHERE id = ?';
				let [test, ...rest] = await pool.query(query, req.params.id);
				result = test;
			}
			if (!result.length) {
				return res.status(404).json({
					status: 'Not Found',
					message: `Activity with ID ${req.params.id} Not Found`,
					data: {},
				});
			}
			res.json({
				status: 'Success',
				message: 'Success',
				data: result[0],
			});
		} catch (error) {
			console.error(error);
		}
	};

	// app.get('/activity-groups', async = async (req, res) => {
	listActivities = async (req, res) => {
		let query = 'SELECT id, title, created_at FROM activities';
		try {
			let result = this.activitiesList;

			if (!result.length) {
				let [test, ...rest] = await pool.query(query);
				result = test;
				this.activitiesList = test;
				const maxId = Math.max(...test.map((user) => user.id));
				if (!maxId) {
					maxId = 0;
				}
				this.activityId = maxId + 1;
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

	// app.post('/activity-groups', validatePostActivity, async = async (req, res) => {
	createActivity = async (req, res) => {
		let { title, email } = req.body;
		try {
			if (this.activityId == 1) {
				let [test, ...rest] = await pool.query(
					'SELECT id, title, created_at FROM activities'
				);
				const maxId = Math.max(...test.map((user) => user.id));
				if (!maxId) {
					maxId = 0;
				}
				this.activityId = maxId + 1;
			}
			let newAct = {
				id: this.activityId,
				title: title,
				email: email,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			};
			this.activitiesList.push(newAct);
			let query = 'INSERT INTO activities (title, email) VALUES (?, ?)';
			res.status(201).json({
				status: 'Success',
				message: 'Success',
				data: newAct,
			});
			await pool.query(query, [title, email]);
			this.activityId++;
		} catch (error) {
			console.error(error);
		}
	};

	// app.delete('/activity-groups/:id', validateDeleteActivity, async = async (req, res) => {
	deleteActivity = async (req, res) => {
		try {
			var index = this.activitiesList.findIndex(
				(item) => item.id == req.params.id
			);
			if (index != -1) {
				// only splice array when item is found
				this.activitiesList.splice(index, 1);
			} else {
				return res.status(404).json({
					status: 'Not Found',
					message: `Activity with ID ${req.params.id} Not Found`,
					data: {},
				});
			}
			res.status(200).json({
				status: 'Success',
				message: 'Success',
				data: {},
			});
			let queryPath = 'DELETE FROM activities WHERE id = ?';
			await pool.query(queryPath, [req.params.id]);
		} catch (error) {
			console.error(error);
		}
	};

	// app.patch('/activity-groups/:id', validateUpdate, async = async (req, res) => {
	updateActivity = async (req, res) => {
		let { id } = req.params;
		let { title } = req.body;
		try {
			var index = this.activitiesList.findIndex((item) => item.id == id);
			if (index > -1) {
				let oldAct = this.activitiesList[index];
				oldAct.title = title;
				res.json({
					status: 'Success',
					message: 'Success',
					data: oldAct,
				});
				this.activitiesList[index].title = title;
			} else {
				let getQuery = 'SELECT * FROM activities';
				let [data, ...rest] = await pool.query(getQuery);
				this.activitiesList = data;
				let result = this.activitiesList.find((item) => item.id == id);

				if (!result) {
				    res.status(404).json({
						status: 'Not Found',
						message: `Activity with ID ${id} Not Found`,
						data: {},
					});
				} else {
					result.title = title;
					res.json({
						status: 'Success',
						message: 'Success',
						data: result,
					});
				}
			}
			let query = `UPDATE activities SET title = '${title}' WHERE id = ${id}`
			await pool.query(query);
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
}

module.exports = { ActivityController };
