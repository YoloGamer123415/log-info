const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

require('../log');

if (cluster.isMaster) {

    console.log('Log from %s!', 'master');
    console.info('Info from %s!', 'master');
    console.warn('Warn from %s!', 'master');
    console.error('Error from %s!', 'master');
    console.debug('Debug from %s!', 'master');

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

} else {

    console.log('Log from %s!', 'cluster');

}
