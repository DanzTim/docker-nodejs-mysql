let app = require('./app');
const { pool } = require('./connection');
const PORT = 3030;

app.listen(PORT, '0.0.0.0', async () => {
	await pool.getConnection();
	console.log('Devcode app running on port', PORT);
});
