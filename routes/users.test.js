process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

let testUser;

beforeEach(async () => {
    const resp = await db.query(`INSERT INTO users (name, type) VALUES ($1, $2) RETURNING id, name, type`, ['Joe','admin'])
    testUser = resp.rows[0];
})

afterEach(async () => {
    await db.query(`DELETE FROM users`)
})

afterAll(async () => {
    await db.end();
})

describe("GET /users", () => {
    test("Get a list with one user",async () => {
        const resp = await request(app).get('/users')
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual([testUser])

    })
});

describe("GET /users/:id", () => {
    test("Get single user", async () => {
        const resp = await request(app).get(`/users/${testUser.id}`)
        expect(resp.statusCode).toEqual(200)
    })

    test("404 response with invalid id", async () => {
        const resp = await request(app).get(`/users/0`)
        expect(resp.statusCode).toEqual(404)
    })
})

describe("POST /users", () => {
    test("creates single user", async () => {
        const resp = await request(app).post('/users').send({name: "Kamala", type: "vp"})
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({id: expect.any(Number), name: "Kamala", type: "vp" })
    })

})