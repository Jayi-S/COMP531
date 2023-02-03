import app from '../index.js'
import supertest from 'supertest'
import should from 'should'

// var request = supertest(app);


describe('get /articles', function () {
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
          .get('/articles')
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
            done();
          })
      });
  })
});


describe('post /article', function () {
  it('respond with json', function (done) {

    this.timeout(60000);

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
          .post('/article')
          .set('Accept', 'application/json')
          .send({
            "userName": "testUser",
            "Content": "cc"
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            console.log(res.body)
            done();
          })
      });
  })
});

describe('get /article/:id', function () {
  it('respond with json', function (done) {

    this.timeout(60000);

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
          .post('/article')
          .set('Accept', 'application/json')
          .send({
            "userName": "testUser",
            "Content": "cc"
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            const newId = res.body.articles[0]['_id']
            agent
              .get('/articles/' + newId)
              .set('Accept', 'application/json')
              .expect(200)
              .end(function (err, res) {
                if (err) {
                  done(err);
                }
                console.log(res.body)
                done(err);
              })
          })

      });
  })
});