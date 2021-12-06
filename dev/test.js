const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

/* 
bitcoin.createNewBlock(2389, 'OINA90SDNF90N', 'QWERTYUIOPASDFGHJKLZXCVBNM');

bitcoin.createNewTransaction(100, 'ALEXLFKJHBDYF', 'JUANLSKDJFLKJHSDF');
bitcoin.createNewBlock(111, 'LKNDKFHLKJBKFD', 'DKJNFLKJBDNFLIU');

bitcoin.createNewTransaction(50, 'ALEXLFKJHBDYF', 'JUANLSKDJFLKJHSDF');
bitcoin.createNewTransaction(300, 'ALEXLFKJHBDYF', 'JUANLSKDJFLKJHSDF');
bitcoin.createNewTransaction(23547, 'ALEXLFKJHBDYF', 'JUANLSKDJFLKJHSDF');

bitcoin.createNewBlock(2899, 'BIJDHFLJNDLOFUH', 'UNVBLKJUBLFIUHL>S');

console.log(bitcoin);
console.log(bitcoin.chain[1].transactions); // 1 transaction
console.log(bitcoin.chain[2].transactions); // 3 transactions

**/

const previousBlockHash = 'LKNDKFHLKJBKLKJHBFDLKJUHSDFFD';
const currentBlockData = [
  {
    amout: 10,
    sender: 'DSLKFBA<KJDBF',
    recipient: 'VLKSUDBVKJBDV',
  },
  {
    amout: 23,
    sender: 'VSLKJBNVKJDF',
    recipient: 'BOIUHSDN>FKJBFD',
  },
  {
    amout: 4,
    sender: 'VLIUHSDLKJFHSD',
    recipient: 'BOIHJDS:LFKJ',
  },
];

const nonce = 100;

const hashedBlock = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

console.log(hashedBlock);

