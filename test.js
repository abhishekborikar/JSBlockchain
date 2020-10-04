const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

	

//--- creat new Blockchain
//bitcoin.createNewBlock(54554, 'JSKDFJSLKJFSKFJ', 'SFKSJFLKSJDF');


//bitcoin.createNewTransaction(100, 'ABHIKSJFKJSDF', 'LEENALKSJFJSKLFDJ');

//console.log(bitcoin.proofOfWork('LKSJFLKJSLSFSF', bitcoin.getLastBlock()));
//console.log(bitcoin.hashBlock('LKSJFLKJSLSFSF', bitcoin.getLastBlock(), 124089));

// const t = { transaction: [], index: 2 };
// const currentBlock = {
// 		transactions: bitcoin.pendingTransaction,
// 		index: 2
// 	}
// const nounce = 192133;
// const preHash = "0";

// console.log(bitcoin.hashBlock(preHash, currentBlock, nounce));

const bc1 = 
{"chain":[{"index":1,"timeStamp":1601198535474,"transactions":[],"hash":"0","nounce":100,"previousBlockHash":"0"},{"index":2,"timeStamp":1601198574202,"transactions":[],"hash":"000073e7d35d35be0861f043cae54db47715fe0d145fd49bd5964140949f2a31","nounce":192133,"previousBlockHash":"0"},{"index":3,"timeStamp":1601198634443,"transactions":[{"amount":24,"sender":"0","recipient":"eeb8ea1000a211eb931d615648f47b0e","transactionId":"05d9531000a311eb931d615648f47b0e"},{"amount":10,"sender":"SJDLKFJSDFLSDFSKJFLSLFKJSLJFDLKDSJF","recipient":"ABHIKSJDFKJSLKFJLAKJFLAKJSFAAA","transactionId":"181e72d000a311eb931d615648f47b0e"},{"amount":20,"sender":"SJDLKFJSDFLSDFSKJFLSLFKJSLJFDLKDSJF","recipient":"ABHIKSJDFKJSLKFJLAKJFLAKJSFAAA","transactionId":"1ae8413000a311eb931d615648f47b0e"},{"amount":30,"sender":"SJDLKFJSDFLSDFSKJFLSLFKJSLJFDLKDSJF","recipient":"ABHIKSJDFKJSLKFJLAKJFLAKJSFAAA","transactionId":"1e3633b000a311eb931d615648f47b0e"},{"amount":40,"sender":"SJDLKFJSDFLSDFSKJFLSLFKJSLJFDLKDSJF","recipient":"ABHIKSJDFKJSLKFJLAKJFLAKJSFAAA","transactionId":"222c9b3000a311eb931d615648f47b0e"},{"amount":50,"sender":"SJDLKFJSDFLSDFSKJFLSLFKJSLJFDLKDSJF","recipient":"ABHIKSJDFKJSLKFJLAKJFLAKJSFAAA","transactionId":"268483a000a311eb931d615648f47b0e"}],"hash":"0000be15a5f0f7139548f4137a33587899c68a7c81a94b0294809ba91ce64e5e","nounce":42279,"previousBlockHash":"000073e7d35d35be0861f043cae54db47715fe0d145fd49bd5964140949f2a31"},{"index":4,"timeStamp":1601198657110,"transactions":[{"amount":24,"sender":"0","recipient":"eeb8ea1000a211eb931d615648f47b0e","transactionId":"29b74d0000a311eb931d615648f47b0e"},{"amount":60,"sender":"SJDLKFJSDFLSDFSKJFLSLFKJSLJFDLKDSJF","recipient":"ABHIKSJDFKJSLKFJLAKJFLAKJSFAAA","transactionId":"2d6a42e000a311eb931d615648f47b0e"},{"amount":70,"sender":"SJDLKFJSDFLSDFSKJFLSLFKJSLJFDLKDSJF","recipient":"ABHIKSJDFKJSLKFJLAKJFLAKJSFAAA","transactionId":"321e06f000a311eb931d615648f47b0e"}],"hash":"00006aeadc1391fa114f91d80da930b18713db4285f421e3a3c83f5d9c758ef0","nounce":174874,"previousBlockHash":"0000be15a5f0f7139548f4137a33587899c68a7c81a94b0294809ba91ce64e5e"},{"index":5,"timeStamp":1601198661103,"transactions":[{"amount":24,"sender":"0","recipient":"eeb8ea1000a211eb931d615648f47b0e","transactionId":"37398d8000a311eb931d615648f47b0e"}],"hash":"0000b06195320d274b9c2af7751ad27b63ec21b68812ec17840489c3c503fac2","nounce":83532,"previousBlockHash":"00006aeadc1391fa114f91d80da930b18713db4285f421e3a3c83f5d9c758ef0"},{"index":6,"timeStamp":1601198662852,"transactions":[{"amount":24,"sender":"0","recipient":"eeb8ea1000a211eb931d615648f47b0e","transactionId":"399be78000a311eb931d615648f47b0e"}],"hash":"0000c6953b79ebc4acc013e13e2d7b12e7555165c30819737466b374363488a1","nounce":8905,"previousBlockHash":"0000b06195320d274b9c2af7751ad27b63ec21b68812ec17840489c3c503fac2"}],"pendingTransaction":[{"amount":24,"sender":"0","recipient":"eeb8ea1000a211eb931d615648f47b0e","transactionId":"3aa5dd7000a311eb931d615648f47b0e"}],"netwrokNodes":[],"currentNodeUrl":"http://localhost:3002"};
console.log("IsValid Blockchain: ",	 bitcoin.chainIsValid(bc1.chain));


//console.log(bitcoin);