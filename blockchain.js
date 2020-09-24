const sha256 = require('sha256');
const currentNodeUrl = process.argv[5];


function Blockchain(){
	this.chain = [];
	this.pendingTransaction = [];
	this.netwrokNodes = [];
	
	this.currentNodeUrl = currentNodeUrl;
	

	this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function(nounce, previousBlockHash, hash){
	const newBlock = {
		index: this.chain.length + 1,
		timeStamp: Date.now(), //--- for test hashBlock function comments this to 
		transaction: this.pendingTransaction,
		hash: hash,
		nounce: nounce,
		previousBlockHash: previousBlockHash


		//--- real time block contains some more parameters --- 
		//--- For Parameter details visit: 
		//--- https://en.bitcoin.it/wiki/Block_hashing_algorithm
		/*serviceString/blockheader:{
			version: ,				//--- software version i.e. software keeps updating 
			previousBlockHash: ,
			merkleHash: ,			//--- hash of root node
			timestamp: ,
			bits: ,	 				//--- difficult level or simply number of zeros before hash
			nounce: 

		}*/
	};

	this.pendingTransaction = [];
	this.chain.push(newBlock);

	return newBlock;
}


Blockchain.prototype.getLastBlock = function(){
	return this.chain[this.chain.length - 1];
}


Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient
	};

	this.pendingTransaction.push(newTransaction);
	return this.getLastBlock()['index'] + 1;
}


Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlock, nounce){
	return sha256(previousBlockHash + JSON.stringify(currentBlock)+ nounce.toString());
}

//---- check if currentblock or previous block
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlock){
	let nounce = 0;
	let hash = this.hashBlock(previousBlockHash, currentBlock, nounce);
	while(hash.substring(0, 4) != '0000'){
		nounce++;
		hash = this.hashBlock(previousBlockHash, currentBlock, nounce);
		//console.log(nounce);
	}

	return nounce;

}
module.exports = Blockchain;