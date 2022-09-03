let app = require('./app');
const PORT = 3030;

app.listen(PORT, '0.0.0.0', () => {
	console.log('Devcode app running on port', PORT);
});
