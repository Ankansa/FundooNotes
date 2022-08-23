import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

let loginToken;
let noteid;
import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  // describe('GET /users', () => {
  //   it('should return empty array', (done) => {
  //     const userdetails = {
  //       First_name: 'Ankan',
  //       Second_name: 'Sarkar',
  //       mailid: 'as@gmail.com',
  //       password: 'as@123'
  //     };
  //     request(app)
  //       .get('/api/v1/users')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body.data).to.be.an('array');

  //         done();
  //       });
  //   });
  // });



// User registration ##############
// Positive senario ##############

describe('User', () => {
  it('Successfull registrationshould return status 201', (done) => {
    const userdetails = {
      First_name: 'Ankan',
      Second_name: 'Sarkar',
      mailid: 'ankan.sark@gmail.com',
      password: 'as@123'
    };
    request(app)
      .post('/api/v1/users')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();
      });

  });

});

// User registration ##############
// Negetive senario ##############

  it('Unsuccessfull registration should return status 400', (done) => {
    const userdetails = {
      First_name: "11111111111",
      Second_name: "222222222",
      mailid: "33333333333",
      password: "44444444444"
  };
    request(app)
      .post('/api/v1/users')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
  });


// User login ##############
// Positive senario ##############

describe('User', () => {
  it('given user login should return status 200', (done) => {
    const userdetails = {
      mailid: 'ankan.sark@gmail.com',
      password: 'as@123'
    };
    request(app)
      .post('/api/v1/users/login')
      .send(userdetails)
      .end((err, res) => {
        loginToken=res.body.data;
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

// User login ##############
// Negetive senario ##############

  it('given user unsuccessfull login should return status 400', (done) => {
    const userdetails = {
      mailid: 'as@gmail.c',
      password: 'as@123'
    };
    request(app)
      .post('/api/v1/users/login')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });

  });
  
});


// Forget password ##############
// Positive senario ##############

describe('User', () => {
  it('Forget password should return status 200', (done) => {
    const userdetails = {
      mailid: 'ankan.sark@gmail.com'
    };
    request(app)
      .post('/api/v1/users/forgetPass')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        
      });
      done();
  });

// Forget password ##############
// Negetive senario ##############

  it('Forget password unsuccessfull login should return status 400', (done) => {
    const userdetails = {
      mailid: 'as@gmail.c'
    };
    request(app)
      .post('/api/v1/users/forgetPass')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      });
      done();
  });
  
});


// Create New Note ##############
// Positive senario ##############

describe('Note', () => {
  it('Create note should return status 200', (done) => {
    const userdetails = {
      Title: 'This is A Test Title',
      Descreption:'This is a test description'
    };
    request(app)
      .post('/api/v1/note/')
      .set('Authorization', `Bearer ${loginToken}`) 
      .send(userdetails)
      .end((err, res) => {
        noteid = res.body.data._id;
        expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();
      });

  });

//  Create New Note ##############
// Negetive senario ##############

  it('Create New Note authentication failed  should return status 400', (done) => {
    const userdetails = {
      Title: 'This is A Test Title',
      Descreption:'This is a test description'
    };
    request(app)
      .post('/api/v1/note/')
      // .set('Authorization',`Bearer ${loginToken}` )
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });

  });
  
});

// get all note ######################
// Positive senario ##############

describe('Note', () => {
  it('get all note should return status 200', (done) => {
    const userdetails = {  };
    request(app)
      .get('/api/v1/note/')
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

// get all note ######################
// Negetive senario ##############

it('get all note authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .get('/api/v1/note/')
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });

  });
  
});

//get one note ######################
// Positive senario ##############


describe('Note', () => {
  it('get single note by note id should return status 200 ', (done) => {
    const userdetails = {  };
    request(app)
      .get(`/api/v1/note/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

// get one note ######################
// Negetive senario ##############

it('get single note authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .get(`/api/v1/note/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });

  });
  
});

//update note ######################
// Positive senario ##############

describe('Note', () => {
  it('update note by note id should return status 200 ', (done) => {
    const userdetails = { 
      Title : 'This is the test title',
      Descreption : 'This is the test description'
  };
    request(app)
      .put(`/api/v1/note/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

// update note ######################
// Negetive senario ##############

it('update note authentication failed should return status 400', (done) => {
  const userdetails = { 
    Title : 'This is the test title',
    Descreption : 'This is the test description'
  };
  request(app)
    .put(`/api/v1/note/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });

  });
  
});

// Delete Note ###############
// Positive senario ##############

describe('Note', () => {
  it('Delete note by note id should return status 200 ', (done) => {
    const userdetails = { };
    request(app)
      .delete(`/api/v1/note/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });

// Delete note ######################
// Negetive senario ##############

it('Delete note authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .delete(`/api/v1/note/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });
  });
});


// Archive Note ##############
// Positive senario ##############

describe('Note', () => {
  it('Archive Note by note id should return status 200 ', (done) => {
    const userdetails = { };
    request(app)
      .put(`/api/v1/note/archive/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });

// Archive Note ######################
// Negetive senario ##############

it('Archive Note authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .put(`/api/v1/note/archive/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });
  });
});

// Unarchive Note ##############
// Positive senario ##############

describe('Note', () => {
  it('Unarchive Note by note id should return status 200 ', (done) => {
    const userdetails = { };
    request(app)
      .put(`/api/v1/note/unarchive/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });

// Unarchive Note ######################
// Negetive senario ##############

it('Unarchive Note authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .put(`/api/v1/note/unarchive/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });
  });
});


// Move to trash Note ##############
// Positive senario ##############

describe('Note', () => {
  it('Move to trash by note id should return status 200 ', (done) => {
    const userdetails = { };
    request(app)
      .put(`/api/v1/note/movetrash/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });

// Move to trash Note ##############
// Negetive senario ##############

it('Move to trash by note id authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .put(`/api/v1/note/movetrash/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });
  });
});

// Remove from trash Note ##############
// Positive senario ##############

describe('Note', () => {
  it('Remove from trash by note id should return status 200 ', (done) => {
    const userdetails = { };
    request(app)
      .put(`/api/v1/note/removetrash/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });

// Move to trash Note ##############
// Negetive senario ##############

it('Remove from trash by note id authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .put(`/api/v1/note/removetrash/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
    });
  });
});






});