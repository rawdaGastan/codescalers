const axios = require('axios');

const functions = {
    get: async () => {
        const passwords = await axios.get('http://localhost:3000/api/passwords/')
        return passwords
    },

    createpassword: async () => {
        const password = await axios.post('http://localhost:3000/api/passwords/', {
                FQDN: "facebook.com",
                username: "rawda",
                password: "test"
        });
        return password;
    },

    searchpassword: async () => {
        const password = await axios.get('http://localhost:3000/api/passwords/?FQDN=face');
        return password;
    },

    getpassword: async () => {
        const password = await axios.get('http://localhost:3000/api/passwords/saleh');
        return password;
    },

    deletepassword: async () => {
        const password = await axios.delete('http://localhost:3000/api/passwords/saleh');
        return password;
    },

    updatepassword: async () => {
        const password = await axios.put('http://localhost:3000/api/passwords/saleh', {
            username: "rawdaGastan",
        });
        return password;
    },

};
module.exports = functions;