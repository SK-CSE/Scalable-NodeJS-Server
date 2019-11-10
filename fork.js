//parent 

const cp = require('child_process');
const forked = cp.fork(`child.js`);

forked.on('message',(msg)=>{
	console.log(`message from child ${msg}`);
})

forked.send({hello :'world'});

// child

process.on('message',(msg)=>{
	console.log(`message from parent : ${msg}`);
});

let counter = 0;

setInterval(()=>{
	process.send({counters : counter++});
},2000);
