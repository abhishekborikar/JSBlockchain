const sha256 = require('sha256');
const currentNodeUrl = process.argv[5];
const uuid = require('uuid')

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
		transactions: this.pendingTransaction,
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
		recipient: recipient,
		transactionId: uuid.v1().split('-').join('')
	};

	return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransaction = function(transactionObject){
	this.pendingTransaction.push(transactionObject);
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

Blockchain.prototype.chainIsValid = function(blockchain){
	let validChain = true;

	if(blockchain && blockchain.length > 0){
		for(let i = 1; i < blockchain.length; i++){
			const prevBlock = blockchain[i-1];
			const currentBlock = blockchain[i];
			// --- used currentBlock['index'] instead of index: i
			//const blockHash = this.hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index']}, currentBlock['nounce']);
			const blockHash = this.hashBlock(prevBlock['hash'], this.getHashingData(currentBlock), currentBlock['nounce']);
			console.log(this.getHashingData(currentBlock));
			if(blockHash.substring(0,4) !== '0000' || currentBlock['hash'] !== blockHash || currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;

			
			// console.log("previous block =>", currentBlock['previousBlockHash']);
			// console.log("current block  =>", currentBlock['hash']);
			// console.log("calculated hash >", blockHash);	
			// console.log("is valid ", validChain);
			
		}

		//---- Check genesis Block 
		const genesisBlock = blockchain[0];

		//if(genesisBlock['nounce'] !== '100' || genesisBlock['hash'] !== '0' || genesisBlock['previousBlockHash'] !== '0') validChain = false;
	}
	else{
		validChain = false;
	}

	return validChain;
}


Blockchain.prototype.getHashingData = function(block){
	let note = null;
	let hashingblock = null;
	if(block.hasOwnProperty('transactions') && block.hasOwnProperty('index')){
		hashingblock = 
		{
			transactions: block['transactions'],
			index: block['index']
		};

		note = 'sucess';
	}
	else{
		note = 'Either transactions or index is not present';
	}

	// const blockObject = JSON.parse({
	// 	note: note,
	// 	block: hashingblock
	// });
	
	return hashingblock;
	
}

module.exports = Blockchain;