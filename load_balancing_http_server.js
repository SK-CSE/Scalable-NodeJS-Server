// server.js

const http = require('http');
const pid = process.pid;

http.createServer((req,res)=>{
	for (let i=0 ;i < 1e7; i++); // simulate CPU work
		res.end(`handled by process ${pid}`);
}).listen(3000,(err)=>{
	console.log('server start on 3000');
	console.log(`started process ${pid}`);

})

// cluster.js

const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
	const cpus = os.cpus().length;
	console.log(`Forking for ${cpus} CPU`);
	for(let i =0; i<cpus;i++){
		cluster.fork();
	} 
}else{
	require(`./server`);
}
