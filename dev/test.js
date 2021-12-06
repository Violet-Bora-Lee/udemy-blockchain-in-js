const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, 'OINA90SDNF90N', 'QWERTYUIOPASDFGHJKLZXCVBNM');
bitcoin.createNewBlock(111, 'LKNDKFHLKJBKFD', 'DKJNFLKJBDNFLIU');
bitcoin.createNewBlock(2899, 'BIJDHFLJNDLOFUH', 'UNVBLKJUBLFIUHL>S');

console.log(bitcoin);