//server
const http = require('http');
const cp = require('child_process');
const server = http.createServer();


server.on('request',(req,res)=>{
	if(req.url ==='/compute'){
		const compute = cp.fork('client.js');
		compute.send('start');
		compute.on('message',(sum)=>{
			res.end(`sum is ${sum}`);
		})
	}else{
		res.end(`ok`);
	}
})
server.listen(3000,(err)=>{
	console.log('server start on 3000');
})

//client
const longComputation = () =>{
	let sum =0;
	for (let i=0 ;i < 1e9; i++){
		sum =+i;
	}
	return sum;
};

process.on('message',(msg)=>{
	const sum = longComputation();
	process.send(sum);
})
