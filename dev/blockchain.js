const sha256 = require('sha256');

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];  // pending transactions
  // transactions that are not yet included in a block. They are stored in this array until they are included in a block.
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) { 
// 새로운 블락을 생성하는걸 mine a block 이라고도 표현한다
  const newBlock = {
    index: this.chain.length + 1, // block number(first, second, third...)
    timestamp: Date.now(), // time of creation
    transactions: this.pendingTransactions, // transactions in this block
    nonce: nonce, // random number, proof of work thiat we've created this block in legitimate way by using the proof of work algorithm
    hash: hash, // hash of the block, hash is the data from 'the block'. It's a hash of the block data(processed by hash function).
    previousBlockHash: previousBlockHash, // similar to hash, but it's the hash of the 'previous block'
  }

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) { // sender's address, recipient's address
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
  };

  this.pendingTransactions.push(newTransaction);

  return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData); 
  const hash = sha256(dataAsString);
  return hash;
}




module.exports = Blockchain;