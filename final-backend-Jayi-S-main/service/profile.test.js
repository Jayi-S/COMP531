import app from '../index.js'
import supertest from 'supertest'
import should from 'should'

// var request = supertest(app);


describe('GET /api/headline', function () {
  it('respond with json', function (done) {

    var agent = supertest.agent(app);

    agent
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        "username": "testUser",
        "password": "123"
      })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.body.result.should.be.eql('success');

        agent
          .get('/headline')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            done();
          })
      });
  })



});


describe('put /headline', function () {
  it('respond with json', function (done) {

    var agent = supertest.agent(app);

    agent
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        "username": "testUser",
        "password": "123"
      })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.body.result.should.be.eql('success');

        agent
          .put('/headline')
          .set('Accept', 'application/json')
          .send({
            "headline": "happy",
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            console.log(res.body)
            res.body.code.should.be.eql(0);
            done();
          })
      });
  })
});