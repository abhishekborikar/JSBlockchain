const express = require('express')
const bodyParser = require('body-parser')
const Blockchian = require('./blockchain')
const uuid = require('uuid')


const app = express();
const newNodeAddress = uuid.v1().split('-').join('');
const bitcoin = new Blockchian();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


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

	const nounce = bitcoin.proofOfWork(lastBlockHash, currentBlock);
	const newHash = bitcoin.hashBlock(lastBlockHash, currentBlock, nounce);
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


//--- Start Server ----
app.listen(3000, function(){
	console.log('Listening at port 3000');
});


//---- Kill process on port 3000
//fuser -k -n tcp 3000

//----------- Questions ---------------
//parameters required to calculate current block hash 