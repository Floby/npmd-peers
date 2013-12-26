# npmd-peers

given an [npmd](https://github.com/dominictarr/npmd) daemon, find other npmd
nodes on the network

this module only handle connectivity between npmd nodes. At most, it can 
provide a data-stream between two nodes

## Strategies

These different strategies for discovering peers are the following:

* local peer discovery
* peer exchange
* TODO...

## example

``` js
var npmdPeers = require('npmd-peers');
var peers = npmdPeers(db.sublevel('peers'), {strategies: ['local', 'tracker']});
peers.on('peer', function (peer) {
  peer.host // the host or ip address as a string
  peer.port // the port to connect to as a number
  peer.on('down', function () {
    // peer is no longer reachable
  });
});
```

Even though npmd-peers emits a 'down' event for unreachable nodes, node may
not be reachable before that event is sent and your code should handle this
type of error.


## UNIX

*to be defined*


## node IDs

each node, if it hasn't one already, generates a unique ID which is a string
following this format :

`npmd:{npmd-peers version}:{uuid-v4}`


## license

MIT
