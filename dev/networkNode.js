const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const {v1: uuid} = require('uuid');
const port = process.argv[2];
const requestPromise = require('request-promise');

const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
})

app.post('/transaction', function (req, res) {
  const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
})

app.get('/mine', function (req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  bitcoin.createNewTransaction(12.5, "00", nodeAddress); // reward for mining

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
  res.json({
    note: 'New block mined successfully.',
    block: newBlock
  })
})

// register a node and "broadcast" it to the entire network
app.post('/register-and-broadcast-node', function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) bitcoin.networkNodes.push(newNodeUrl);
  
  const regNodesPromises = [];
  
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    // hitting '/register-node' endpoint
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: {newNodeUrl},
      json: true,
    };
    regNodesPromises.push(requestPromise(requestOptions));
  });
  
  Promise.all(regNodesPromises)
  .then(data => {
    const bulkRegisterOptions = {
      uri: newNodeUrl + '/register-nodes-bulk',
      method: 'POST',
      body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
      json: true,
    };
    return requestPromise(bulkRegisterOptions);
  })
  .then(data => {
    res.json({note: 'New node registered with network successfully'})
  })
  
});

// ??? ???????????? ????????????, broadcast??? ????????? ???????????? ?????? ?????????, ????????????????????? ????????? ????????? ?????? ????????? ????????? ????????? ????????? ???????????? ????????????.
// register a node with the network
app.post('/register-node', function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  
  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl);
  }
  
  res.json({ note: 'New node registered successfully with node. '})
});

// register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) {
      bitcoin.networkNodes.push(networkNodeUrl);
    }
  })
  res.json({ note: 'Bulk registration successful.' })
});

app.listen(port, function() {
  console.log(`Listening on port ${port}...`);
})
