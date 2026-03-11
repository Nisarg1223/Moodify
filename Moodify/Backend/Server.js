require('dotenv').config();
const dns = require('dns');
dns.setServers(["8.8.8.8","8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");
const connectedtoDB = require('./src/config/database.js')
const app = require('./src/app');
connectedtoDB();
app.listen('3000',function(){
    console.log('server is running on port 3000');
})