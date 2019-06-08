const util = require('util')
const cluster = require('cluster')

var funcs = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: (console.debug || console.log).bind(console)
}

module.exports = function(options) {
    Object.keys(funcs).forEach(function(k) {
        console[k] = function() {
            var logText = ''

            // add logtime
            switch (options.time) {
                case 'iso':
                    logText += `${options.char[0].toString() || '['} ${new Date().toISOString()} ${options.char[1].toString() || ']'}`
                    break;
                case 'none':
                    break;
                default:
                    logText += `${options.char[0].toString() || '['} ${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}.${new Date().getMilliseconds().toString().padStart(3, '0')} ${options.char[1].toString() || ']'}`
                    break;
            }

            // add pid
            if (options.pid !== false)
                logText += ` ${options.char[0].toString() || '['} ${process.pid} ${options.char[1].toString() || ']'}`

            // add logging type 
            if (options.info !== false && (k === 'log' || k === 'info')) {
                logText += ` ${options.char[0].toString() || '['} INFO ${options.char[1].toString() || ']'} `
            } else
            if (options.info !== false && k === 'warn') {
                logText += ` ${options.char[0].toString() || '['} WARN ${options.char[1].toString() || ']'} `
            } else
            if (options.info !== false && k === 'error') {
                logText += ` ${options.char[0].toString() || '['} ERROR ${options.char[1].toString() || ']'}`
            } else
            if (options.info !== false && k === 'debug') {
                logText += ` ${options.char[0].toString() || '['} DEBUG ${options.char[1].toString() || ']'}`
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
                        temp[j] = temp[j].replace(
                            new RegExp(`\\[${matches[1]} `),
                            ''
                        )
                    }
                }

                arguments[i] = temp.join('')
            }

            arguments[0] = util.format(logText.trimLeft(), arguments[0])
            funcs[k].apply(console, arguments)
        }
    })
}
