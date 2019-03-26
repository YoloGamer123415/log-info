const util = require('util')
const cluster = require('cluster')

const colors = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    reset: "\x1b[0m"
}

var funcs = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: (console.debug || console.log).bind(console)
}

module.exports = patch

patch()

function patch(options = {
    time: 'normal',
    pid:  true,
    info: true,
    char: [ '[', ']' ]
}) {
    Object.keys(funcs).forEach(function(k) {
        console[k] = function() {
            var temp = ''
            switch (options.time) {
                case 'iso':
                    temp += `${options.char[0].toString() || '['}${colors.cyan} ${new Date().toISOString()} ${colors.reset}${options.char[1].toString() || ']'}`
                    break;
                case 'none':
                    break;
                default:
                    temp += `${options.char[0].toString() || '['}${colors.cyan} ${new Date().getDate().toString().padStart(2, '0')}-${new Date().getMonth().toString().padStart(2, '0')}-${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}.${new Date().getMilliseconds().toString().padStart(3, '0')} ${colors.reset}${options.char[1].toString() || ']'}`
                    break;
            }

            if (options.pid !== false)
                temp += ` ${options.char[0].toString() || '['}${cluster.isMaster ? colors.magenta : colors.white} ${process.pid} ${colors.reset}${options.char[1].toString() || ']'}`

            if (options.info !== false && (k === 'log' || k === 'info')) {
                temp += ` ${options.char[0].toString() || '['}${colors.green} INFO ${colors.reset}${options.char[1].toString() || ']'} `
            } else if (options.info !== false && k === 'warn') {
                temp += ` ${options.char[0].toString() || '['}${colors.yellow} WARN ${colors.reset}${options.char[1].toString() || ']'} `
            } else if (options.info !== false && k === 'error') {
                temp += ` ${options.char[0].toString() || '['}${colors.red} ERROR ${colors.reset}${options.char[1].toString() || ']'}`
            } else if (options.info !== false && k === 'debug') {
                temp += ` ${options.char[0].toString() || '['}${colors.blue} DEBUG ${colors.reset}${options.char[1].toString() || ']'}`
            }

            temp += ' %s'

            arguments[0] = util.format(temp.trimLeft(), arguments[0])
            funcs[k].apply(console, arguments)
        }
    })
}
