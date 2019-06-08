const supportsColor = require('supports-color').stdout

const colors = {
    ansi16: {
        error: "\x1b[31m",  // red
        info: "\x1b[32m",   // green
        warn: "\x1b[33m",   // orange/ yellow
        debug: "\x1b[34m",  // blue
        pidM: "\x1b[35m",   // purple
        date: "\x1b[36m",   // cyan
        pid: "\x1b[37m",    // white
        reset: "\x1b[0m"
    },
    ansi256: {
        error: "\x1b[31m",  // red
        info: "\x1b[32m",   // green
        warn: "\x1b[33m",   // orange/ yellow
        debug: "\x1b[34m",  // blue
        pidM: "\x1b[35m",   // purple
        date: "\x1b[36m",   // cyan
        pid: "\x1b[37m",    // white
        reset: "\x1b[0m"
    },
    ansi16m: {
        error: "\u001B[38;2;255;37;37m",  // red
        info: "\u001B[38;2;48;158;33m",   // green
        warn: "\u001B[38;2;225;137;11m",  // orange
        debug: "\u001B[38;2;52;73;255m",  // blue
        pidM: "\u001B[38;2;183;36;255m",  // purple
        date: "\u001B[38;2;33;150;255m",  // cyan/ light blue
        pid: "\u001B[38;2;170;170;170m",  // gray
        reset: "\x1b[0m"
    }
}

const colorFuncs = {
    nocolors: require('./loggers/nocolor'),
    ansi16: require('./loggers/ansi16'),
    ansi256: require('./loggers/ansi256'),
    ansi16m: require('./loggers/ansi16m')
}

module.exports = log

log()

function log(options = {
    time: 'normal',
    pid:  true,
    info: true,
    newline: true,
    char: [ '[', ']' ]
}) {
    if (supportsColor.has16m) {
        colorFuncs['ansi16m'](options, colors.ansi16m)
    } else
    if (supportsColor.has256) {
        colorFuncs['ansi256'](options, colors.ansi256)
    } else
    if (supportsColor.hasBasic) {
        colorFuncs['ansi16'](options, colors.ansi16)
    } else { // no color support or disabled
        colorFuncs['nocolors'](options)
    }
}
