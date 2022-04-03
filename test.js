require('dotenv').config()
const mongoose = require('mongoose') 
const axios = require('axios');

beforeAll((done) => {
  const {
      PORT = 7000,
      MONGO_DNS_SRV,
      MONGO_AUTH,
      MONGO_CLUSTER,
      MONGO_DB_NAME,
      MONGO_OPTIONS
  } = process.env
    
      
  mongoose.connect(`${MONGO_DNS_SRV}${MONGO_AUTH}${MONGO_CLUSTER}${MONGO_DB_NAME}${MONGO_OPTIONS}`, {
    useNewUrlParser: true
  })
  done()   
});

  const funcs = require('./fnPassword');

  test('POST should create a new password', async() => {
      const password = await funcs.createpassword();
      username = password.data.data.username;
      expect(username).toBe('rawda');
      //done();
  })

  describe('Get Api', () => {
    it(`status code should be 200`, async () => {
      const res = await funcs.get();
      expect(res.status).toEqual(200)
    })
  })

  test(`password's FQDN should include face`, async () => {
    let password = await funcs.searchpassword()
    passwords = password.data.data;
    expect(passwords.some(password => password.FQDN.includes('face'))).toBe(true)
    //done()
});

  test('GET specific password', async () => {
      const password = await funcs.getpassword();
      username = password.data.data.username;
      expect(username).toBe('rawda');
      //done()
  });

  test('UPDATE specific password', async () => {
      const password = await funcs.updatepassword();
      username = password.data.data.username;
      expect(username).toBe('rawdaGastan');
      //done()
  });
  
  test('DELETE specific password', async () => {
      let password = await funcs.deletepassword()
      passwordss = password.data.data;
      expect(passwordss.some(password => password.username === 'rawdaGastan')).toBe(false)
      //done()
  });