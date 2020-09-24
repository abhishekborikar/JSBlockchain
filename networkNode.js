const express = require('express')
const bodyParser = require('body-parser')
const Blockchian = require('./blockchain')
const uuid = require('uuid')
const fetch = require('node-fetch')


const app = express();
const newNodeAddress = uuid.v1().split('-').join('');
const bitcoin = new Blockchian();
const port = process.argv[4]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false	}));


//---- return blockchian
app.get('/blockchain', function (req, res) {
	res.send(bitcoin)
});


app.post('/transaction', function(req, res){
	const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
	res.json({ note: `Transaction is added in block ${blockIndex}`})
	
});


app.get('/mine', function(req, res){

	const lastBlock = bitcoin.getLastBlock();
	const lastBlockHash = lastBlock['hash'];
	//---- in real time more parameters need to include 
	//---- for refrence check blockchian createNewBlock method
	const currentBlock = {
		transactions: bitcoin.pendingTransaction,
		index: lastBlock['index'] + 1
	}

	const nounce = bitcoin.proofOfWork(lastBlockHash, lastBlock);
	const newHash = bitcoin.hashBlock(lastBlockHash, lastBlock, nounce);
	const nodeAddress = newNodeAddress;
	bitcoin.createNewTransaction(24, '0', nodeAddress);
	//--- Mine / Create New Block
	const newBlock = bitcoin.createNewBlock(nounce, lastBlockHash, newHash);
	
	

	res.json({
		note: 'Sucessfully Mined new Block',
		block: newBlock,
		awardedAmount: 24,
		awardedAddress: nodeAddress
	});

});


//=======================================================================================
//---- https://tcsglobal.udemy.com/course/build-a-blockchain-in-javascript/learn/lecture/10399640#overview -----
//---- check images/Decentralization of Network ----	
//---- for proper understanding ---------
//----  apis to decentralized the complete blockchian transaction apis ---

//-----register to one single node .And broadcast/host/introduce the new node to network -----
app.post('/register-and-broadcast-node', function(req, res){
	const newNodeUrl = req.body.newNodeUrl;
	if(bitcoin.netwrokNodes.indexOf(newNodeUrl) == -1)
			bitcoin.netwrokNodes.push(newNodeUrl);

	const regNodePromises = [];
	bitcoin.netwrokNodes.forEach(networkNodeUrl => {
		const requestOption = {
	        method: 'POST',
	        body:    JSON.stringify({ newNodeUrl: newNodeUrl}),
	        headers: { 'Content-Type': "application/json" }
	    };

	    regNodePromises.push(fetch( networkNodeUrl + '/register-node', requestOption));

	});
	console.log('heading to promise');
	Promise.all(regNodePromises)
	.then(data => {
		
		const bulkRegisterOption = {
	        method: 'POST',
	        body: JSON.stringify({ allNetworkNode: [ ...bitcoin.netwrokNodes, bitcoin.currentNodeUrl]}),
	        headers: { 'Content-Type': 'application/json' }
	    };

		return fetch(newNodeUrl + '/register-node-bulk', bulkRegisterOption);
	})
	.then(data => {
		console.log(`Promise at ${bitcoin.currentNodeUrl} completed promise at ${data}`);
	});

	res.end('Registration completed Sucessfully !!!');
});

//----- register the new node to all the instances / nodes ----------
app.post('/register-node',function(req, res){
	const newNodeUrl = req.body.newNodeUrl;
	let nodeNote;
	if(newNodeUrl !== null){
		if(bitcoin.netwrokNodes.indexOf(newNodeUrl) == -1 && bitcoin.currentNodeUrl !== newNodeUrl){
			bitcoin.netwrokNodes.push(newNodeUrl);
			nodeNote = `New Node ${newNodeUrl} added to ${bitcoin.currentNodeUrl} Sucessfully !!!`;
		}
		else{
			nodeNote = `${newNodeUrl} already Present in  ${bitcoin.currentNodeUrl}`;
		}
	}
	else{
		nodeNote = 	`Failed to add node ${newNodeUrl} to ${bitcoin.currentNodeUrl}`;
	}
	console.log(`register-node ${nodeNote}`);
	res.json({ note: nodeNote});
});

app.post('/register-node-bulk', function(req, res){
	const allNetworkNode = req.body.allNetworkNode;
	let nodeNote = null;
	if(allNetworkNode !== null){
		allNetworkNode.forEach(networkNodeUrl => {
			if(bitcoin.netwrokNodes.indexOf(networkNodeUrl) == -1 && networkNodeUrl !== bitcoin.currentNodeUrl)
				bitcoin.netwrokNodes.push(networkNodeUrl);
		});

		nodeNote = `Bulk Registration Sucessful to node ${bitcoin.currentNodeUrl}. Registration with network size ${bitcoin.netwrokNodes.length}`;
	}
	else{
		nodeNote = `Bulk Registration Failed to node ${bitcoin.currentNodeUrl}`;	
	}
	console.log(`${bitcoin.netwrokNodes} bulk register on ${bitcoin.currentNodeUrl}`)
	res.json({ note: nodeNote});
})

//=======================================================================================


//--- Start Server ----
app.listen(port, function(){
	console.log(`Listening at port ${port}`);
});


//---- Kill process on port 3000
//fuser -k -n tcp 3000

//----------- Questions ---------------
//parameters required to calculate current block hash 