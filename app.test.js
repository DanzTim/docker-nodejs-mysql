let request = require('supertest');
let app = require('./app');

describe('Insert activity', () => {
	// describe('title and email is given', () => {
	// 	test('should response with created 201', async () => {
	// 		const response = await request(app).post('/activity-groups').send({
	// 			title: 'Testing with jest and supertest',
	// 			email: 'jester@tester.com',
	// 		});
	// 		expect(response.statusCode).toBe(201);
	// 	});
	// });

	describe('title is missing', () => {
		test('response should be 400 bad request', async () => {
			const response = await request(app).post('/activity-groups').send({
				email: 'jester@tester.com',
			});
			expect(response.statusCode).toBe(400);
		});
	});
});

describe('Get all activity', () => {
	test('should return all activities stored in db', async () => {
		const response = await request(app).get('/activity-groups');
		expect(response.body.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 15,
				}),
			])
		);
	});
});

describe('Get activity by id', () => {
	test('should get one activity', async () => {
		const response = await request(app).get('/activity-groups/15');
		expect(response.statusCode).toEqual(200);
		expect(response.body.message).toEqual('Success');
		expect(response.body.data).toEqual(
			expect.objectContaining({
				id: 15,
				title: 'Testing with jest and supertest',
			})
		);
	});
	test('should return error if id not found', async () => {
		const response = await request(app).get('/activity-groups/150');
		expect(response.statusCode).toEqual(404);
	});
});

describe('Get List Todo', () => {
	test('get list todo', async () => {
		const response = await request(app).get('/todo-items/');
		expect(response.statusCode).toEqual(200);
		expect(response.body.message).toEqual('Success');
		expect(response.body.data).toEqual(
			expect.objectContaining({
				id: 15,
				title: 'test 5.1-2',
			})
		);
	});
	test('get list todo with query param success', async () => {
		const response = await request(app).get('/todo-items/activity_group_id=5');
		expect(response.statusCode).toEqual(200);
		expect(response.body.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 15,
				}),
			])
		);
	});
	test('get list todo with query param fail', async () => {
		const response = await request(app).get('/todo-items/activity_group_id=99');
		expect(response.statusCode).toEqual(200);
		expect(response.body.data).toEqual([]);
	});
});
