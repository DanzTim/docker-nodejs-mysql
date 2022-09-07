let app = require('./app');
const { pool } = require('./connection');
const PORT = 3030;

app.listen(PORT, '0.0.0.0', async () => {
	await pool.getConnection();
	await pool.query(`CREATE TABLE IF NOT EXISTS \`activities\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`email\` varchar(100) DEFAULT NULL,
        \`title\` varchar(100) DEFAULT NULL,
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`);

	await pool.query(`CREATE TABLE IF NOT EXISTS \`todos\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`title\` varchar(100) DEFAULT NULL,
        \`is_active\` tinyint(1) DEFAULT '1',
        \`priority\` varchar(10) DEFAULT 'very-high',
        \`activity_group_id\` int DEFAULT NULL,
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`);
	console.log('Devcode app running on port', PORT);
});
