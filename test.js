require('dotenv').config()
const mongoose = require('mongoose') 

beforeAll(async (done) => {
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

  test('POST should create a new password', async (done) => {
      const password = await funcs.createpassword();
      passwords = password.data.data;
      expect(passwords.userName).toBe('rawda');
      done()
  })

  test(`password's username should be rawda`, async (done) => {
      let password = await funcs.get()
      passwords = password.data.data;
      //console.log(passwordss.some(password => password.userName === 'rawda'))
      expect(passwords.some(password => password.userName === 'rawda')).toBe(true)
      done()
  });

  test(`password's FQDN should include face`, async (done) => {
    let password = await funcs.searchpassword()
    passwords = password.data.data;
    expect(passwords.some(password => password.FQDN.includes('face'))).toBe(true)
    done()
});

  test('GET specific password', async (done) => {
      const password = await funcs.getpassword();
      passwords = password.data.data;
      expect(passwords.userName).toBe('rawda');
      done()
  });

  test('UPDATE specific password', async (done) => {
      const password = await funcs.updatepassword();
      passwords = password.data.data;
      expect(passwords.name).toBe('rawdaGastan');
      done()
  });
  
  test('DELETE specific password', async (done) => {
      let password = await funcs.deletepassword()
      passwordss = password.data.data;
      //console.log(passwordss.some(password => password.userName === 'saleh'))
      expect(passwordss.some(password => password.userName === 'rawdaGastan')).toBe(false)
      done()
  });