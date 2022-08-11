const { pool } = require('../connection');

class ActivityController {
    // app.get('/activity-groups/:id', validateParam, async (req, res) {
    async getActivityById (req, res) {
        let query = 'SELECT id, title, created_at FROM activity WHERE id = ?';
        let todoQuery = 'SELECT * FROM todo WHERE activity_group_id = ?';
        try {
            let [test, ...rest] = await pool.query(query, req.params.id)
            if(!test.length){
                return res.status(404).json(
                    {
                        "name": "NotFound",
                        "message": `No record found for id ${req.params.id}`,
                        "code": 404,
                        "className": "not-found",
                        "errors": {}
                    }
                )
            }
            let [todos, ...rest2] = await pool.query(todoQuery, req.params.id)
            let { id, title, created_at } = test[0]

            res.json({
                id, title, created_at, "todo_items": todos
            })
        } catch (error) {
            console.error(error);
        }
    }

    // app.get('/activity-groups', async (req, res) {
    async listActivities (req, res) {
        let total, limit, data;
        let query = 'SELECT id, title, created_at FROM activity';
        try {
            let [test, ...rest] = await pool.query(query)
            data = test
            total = test.length
            limit = 1000

            res.json({
                total, 
                limit,
                "skip": 0,
                data
            })
        } catch (error) {
            console.error(error);
        }
    }

    // app.post('/activity-groups', validatePostActivity, async (req, res) {
    async createActivity (req, res) {
        let { title, email } = req.body
        try {
            let query = 'INSERT INTO activity (title, email) VALUES (?, ?)';
            await pool.query(query, [title, email])
            let [insert, ...rest] = await pool.query(`SELECT LAST_INSERT_ID() as lastId;`)
            let [data, ...rest2] = await pool.query(`SELECT * FROM activity WHERE id = ?`, [insert[0].lastId])
            res.status(201).json({
                "created_at": data[0].created_at,
                "updated_at": data[0].updated_at,
                "id": insert[0].lastId,
                "title": data[0].title,
                "email": data[0].email
            })
        } catch (error) {
            console.error(error);
        }
    }

    // app.delete('/activity-groups/:id', validateDeleteActivity, async (req, res) {
    async deleteActivity (req, res) {
        try {
            if(req.query.id){
                let numbers = req.query.id.split(',').map(Number)
                let query = 'DELETE FROM activity WHERE id IN (?)';
                await pool.query(query, [numbers])
                let obj = [];
                for (let i = 0; i < numbers.length; i++) {
                    obj.push({})
                }
                return res.status(200).json(obj)
            }
            if(req.params.id){
                let queryPath = 'DELETE FROM activity WHERE id = ?';
                await pool.query(queryPath, [req.params.id])
            }
            res.status(200).json([{}])
        } catch (error) {
            console.error(error);
        }
    }

    // app.patch('/activity-groups/:id', validateUpdate, async (req, res) {
    async updateActivity (req, res) {
        let { id } = req.params
        let { title } = req.body
        try {
            let query = `UPDATE activity SET title = ? WHERE id = ?`
            await pool.query(query, [title, id])
            let getQuery = 'SELECT * FROM activity WHERE id = ?'
            let data = await pool.query(getQuery, [id])
            if(!data[0].length){
                return res.status(404).json(
                    {
                        "name": "NotFound",
                        "message": `No record found for id ${req.params.id}`,
                        "code": 404,
                        "className": "not-found",
                        "errors": {}
                    }
                )
            }
            res.json({
                ...data[0][0]
            })
        } catch (error) {
            res.status(500).json(
                {
                    "name": "GeneralError",
                    "message": error.message || error,
                    "code": 500,
                    "className": "general-error",
                    "data": {},
                    "errors": {}
                }
            )
        }
    }
}

module.exports = { ActivityController }