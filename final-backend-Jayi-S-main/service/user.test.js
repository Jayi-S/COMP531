import app from '../index.js'
import supertest from 'supertest'
import should from 'should'

// var request = supertest(app);

describe('GET /register', function () {
  it('respond with json', function (done) {
    supertest(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send({
        "username": "testUser",
        "password": "123",
        "email": "lcwspr@163.com",
        "dob": "15222362032",
        "zip": "4444"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        done();
      })
  });
});


describe('GET /login', function () {
  it('respond with json', function (done) {
    supertest(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        "username": "testUser",
        "password": "123"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        done();
      })
  });
});


describe('GET /logout', function () {
  it('respond with json', function (done) {
    supertest(app)
      .put('/logout')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        done();
      })
  });
});