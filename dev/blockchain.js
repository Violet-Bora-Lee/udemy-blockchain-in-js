function Blockchain() {
  this.chain = [];
  this.newTransactions = [];
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1, // block number(first, second, third...)
    timestamp: Date.now(), // time of creation
    transactions: this.newTransactions, // transactions in this block
    nonce: nonce, // random number, proof of work thiat we've created this block in legitimate way by using the proof of work algorithm
    hash: hash, // hash of the block, hash is the data from 'the block'. It's a hash of the block data(processed by hash function).
    previousBlockHash: previousBlockHash, // similar to hash, but it's the hash of the 'previous block'
  }

  this.newTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
}

module.exports = Blockchain;