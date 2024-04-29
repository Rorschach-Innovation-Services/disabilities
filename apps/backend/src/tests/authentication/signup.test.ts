/**
 * Unit & Integration Tests for Sign-Up Controller/End-Point
 */
import { use, request, should } from "chai";
import chaiHttp from "chai-http";
import { app } from "../../server";
import { connect } from "mongoose";
// import database from '../../models/index';
import testingConfig from "../../configuration/testing.config";

/** Configure Chai for testing */
should();
use(chaiHttp);

/**Database test url */
const dbURL = testingConfig.database as string;

/**
 * Integration Test for signing up
 */
describe("Sign-Up Integration Tests", () => {
  /**Connect to database */
  connect(dbURL, (err) =>
    !err
      ? console.log("Connected to the database!")
      : console.log("Cannot Connect to the database")
  );

  /**Before the tests clear the database */
  before((done) => {
    // database.User.remove({}, (err:any) => {
    done();
    // })
  });

  /**Sign-Up User Tests*/
  describe("Sign-Up User", () => {
    /** User Signed-Up Successfully Case */
    it("User Registered Successfully", (done) => {
      /**Test register data */
      const body = { email: "sabelo@xero.com", password: "sabeloxxs" };

      /**Test a post request */
      request(app)
        .post("/api/users/signup")
        .send(body)
        .then((res) => {
          res.status.should.equal(201);
          res.body.message.should.equal(" Successful");
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    /**Duplicate Found */
    it("User already exists", (done) => {
      /**Test register data - already in use */
      const body = { email: "sabelo@xero.com", password: "sabeloxxs" };

      /**Test a post request */
      request(app)
        .post(`/api/users/signup`)
        .send(body)
        .then((res) => {
          res.body.message.should.equal("Account Exists. Sign In Instead.");
          res.status.should.equal(409);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    /**Bad Format - Short Password */
    it("Short Password", (done) => {
      const body = { email: "xero@sabelo.com", password: "sabs" };

      /**Test a post request */
      request(app)
        .post(`/api/users/signup`)
        .send(body)
        .then((res) => {
          res.status.should.equal(400);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    /** Short/BAD Email - BAD FORMAT */
    it("Short/BAD Email", (done) => {
      const body = { email: "xero", password: "sabswwwww" };

      /**Test a post request */
      request(app)
        .post(`/api/users/signup`)
        .send(body)
        .then((res) => {
          res.status.should.equal(400);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});

