const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

require('../log');

if (cluster.isMaster) {

    console.log('Log from master!');
    console.info('Info from master!');
    console.warn('Warn from master!');
    console.error('Error from master!');
    console.debug('Debug from master!');

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

} else {

    console.log('Log from cluster!');

}
