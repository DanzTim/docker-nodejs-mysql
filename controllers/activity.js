const { pool } = require('../connection');

class ActivityController {
    // app.get('/activity-groups/:id', validateParam, async (req, res) {
    async getActivityById (req, res) {
        let query = 'SELECT * FROM activities WHERE id = ?';
        try {
            let [test, ...rest] = await pool.query(query, req.params.id)
            if(!test.length){
                return res.status(404).json(
                    {
                        "status": "Not Found",
                        "message": `Activity with ID ${req.params.id} Not Found`,
                        "data": {}
                    }
                )
            }
            
            res.json({
                "status": "Success",
                "message": "Success",
                "data": test[0]
            })
        } catch (error) {
            console.error(error);
        }
    }

    // app.get('/activity-groups', async (req, res) {
    async listActivities (req, res) {
        let query = 'SELECT id, title, created_at FROM activities';
        try {
            let [test, ...rest] = await pool.query(query)

            res.json({
                "status": "Success",
                "message": "Success",
                "data": test[0]
            })
        } catch (error) {
            console.error(error);
        }
    }

    // app.post('/activity-groups', validatePostActivity, async (req, res) {
    async createActivity (req, res) {
        let { title, email } = req.body
        try {
            let query = 'INSERT INTO activities (title, email) VALUES (?, ?)';
            await pool.query(query, [title, email])
            let [insert, ...rest] = await pool.query(`SELECT LAST_INSERT_ID() as lastId;`)
            let [data, ...rest2] = await pool.query(`SELECT * FROM activities WHERE id = ?`, [insert[0].lastId])
            res.status(201).json({
                "status": "Success",
                "message": "Success",
                "data": {
                    "created_at": data[0].created_at,
                    "updated_at": data[0].updated_at,
                    "id": insert[0].lastId,
                    "title": data[0].title,
                    "email": data[0].email
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // app.delete('/activity-groups/:id', validateDeleteActivity, async (req, res) {
    async deleteActivity (req, res) {
        try {
            let checkPath = 'SELECT * FROM activities WHERE id = ?';
            let check = await pool.query(checkPath, [req.params.id])
            if(check[0].length == 0){
                return res.status(404).json({
                    "status": "Not Found",
                    "message": `Activity with ID ${req.params.id} Not Found`,
                    "data": {}
                })
            }
            let queryPath = 'DELETE FROM activities WHERE id = ?';
            await pool.query(queryPath, [req.params.id])

            res.status(200).json({
                "status": "Success",
                "message": "Success",
                "data": {}
            })
        } catch (error) {
            console.error(error);
        }
    }

    // app.patch('/activity-groups/:id', validateUpdate, async (req, res) {
    async updateActivity (req, res) {
        let { id } = req.params
        let { title } = req.body
        try {
            let query = `UPDATE activities SET title = ? WHERE id = ?`
            await pool.query(query, [title, id])
            let getQuery = 'SELECT * FROM activities WHERE id = ?'
            let data = await pool.query(getQuery, [id])
            if(!data[0].length){
                return res.status(404).json(
                    {
                        "status": "Not Found",
                        "message": `Activity with ID ${id} Not Found`,
                        "data": {}
                    }
                )
            }
            res.json({
                "status": "Success",
                "message": "Success",
                "data": data[0][0]

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