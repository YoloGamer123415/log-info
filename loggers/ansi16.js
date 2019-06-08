const util = require('util')
const cluster = require('cluster')

var funcs = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: (console.debug || console.log).bind(console)
}

const colorCodings = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    gray: "\x1b[37m",
    reset: "\x1b[0m"
}

module.exports = function(options, colors) {
    Object.keys(funcs).forEach(function(k) {
        console[k] = function() {
            var logText = ''

            // add logtime
            switch (options.time) {
                case 'iso':
                    logText += `${options.char[0].toString() || '['}${colors.date} ${new Date().toISOString()} ${colors.reset}${options.char[1].toString() || ']'}`
                    break;
                case 'none':
                    break;
                default:
                    logText += `${options.char[0].toString() || '['}${colors.date} ${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}.${new Date().getMilliseconds().toString().padStart(3, '0')} ${colors.reset}${options.char[1].toString() || ']'}`
                    break;
            }

            // add pid
            if (options.pid !== false)
                logText += ` ${options.char[0].toString() || '['}${cluster.isMaster ? colors.pidM : colors.pid} ${process.pid} ${colors.reset}${options.char[1].toString() || ']'}`

            // add logging type 
            if (options.info !== false && (k === 'log' || k === 'info')) {
                logText += ` ${options.char[0].toString() || '['}${colors.info} INFO ${colors.reset}${options.char[1].toString() || ']'} `
            } else
            if (options.info !== false && k === 'warn') {
                logText += ` ${options.char[0].toString() || '['}${colors.warn} WARN ${colors.reset}${options.char[1].toString() || ']'} `
            } else
            if (options.info !== false && k === 'error') {
                logText += ` ${options.char[0].toString() || '['}${colors.error} ERROR ${colors.reset}${options.char[1].toString() || ']'}`
            } else
            if (options.info !== false && k === 'debug') {
                logText += ` ${options.char[0].toString() || '['}${colors.debug} DEBUG ${colors.reset}${options.char[1].toString() || ']'}`
            }

            // add the newline and the user given log
            if (options.newline === false) {
                logText += ' %s'
            } else {
                logText += '\n%s\n'
            }

            // add the colors to the text
            for (var i = 0; i < arguments.length; i++) {
                var temp = arguments[i].split(']')
                for (var j = 0; j < temp.length; j++) {
                    var matches = /\[(#?[A-Za-z0-9]+) +((.|\n)+)/g.exec(temp[j])

                    if (matches) {
                        if (matches[1].startsWith('#')) {
                            temp[j] = temp[j].replace(
                                new RegExp(`\\[${matches[1]} `),
                                ''
                            )

                            funcs['error'](`[\x1b[31m log-info \x1b[0m] Your console does not support more than 256 colors, so please use the standard colors.`)
                        } else {
                            if (colorCodings[matches[1].toLowerCase()]) {
                                temp[j] = temp[j].replace(
                                    new RegExp(`\\[${matches[1]} `),
                                    colorCodings[matches[1].toLowerCase()]
                                )
                                temp[j] += colorCodings.reset
                            } else {
                                temp[j] = temp[j].replace(
                                    new RegExp(`\\[${matches[1]} `),
                                    ''
                                )
                            }
                        }
                    }
                }

                arguments[i] = temp.join('')
            }

            arguments[0] = util.format(logText.trimLeft(), arguments[0])
            funcs[k].apply(console, arguments)
        }
    })
}
