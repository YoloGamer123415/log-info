# log-info

> Handy for info logging!

## Install

Npm:
```cmd
npm install log-info
```
Yarn:
```cmd
yarn add log-info
```

## Usage

Add this to your script:
```javascript
require('log-info');
```

And if you now run this:
```javascript
require('log-info');

console.log('I\'m using log-info!')
```
You should see something like this:

![Output of example above.](https://imgur.com/4gANgo8.png)

It also works with clusters:

```javascript
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

require('log-info');

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
```

Should look something like this:

![Output of example above.](https://imgur.com/AEGsE6r.png)

## Colors

You can add colors to your `console.log`'s now, the syntax is as follows:
```
[<color | hex color> <text>]
```

Example:
```javascript
require('log-info');

console.log('[blue This text should be blue.]')

console.log('[#00ff00 This text should be a bright %s.]', 'green')

console.log('[cyan There should be] [#ff0000 multiple colors] in this text.')
```

You should see something like this:

![Output of example above.](https://imgur.com/TxdSlVe.png)

> If your console does not support more than 256 colors, you can not use hex colors, just the colors below:

![All available colors](https://imgur.com/iEQo7a1.png)

## Options

You can configure some options to customize the output to your likings.

### Options.time

Can be set to one of the following:
- `normal` - Gives the standard time output, e.g. `26-03-2019 15:42:23.463`. (default value)
- `iso` - Gives the time in ISO format, e.g. `2019-03-26T14:42:23.463Z`
- `none` - Gives no time output.

Example:
```javascript
require('log-info')({
    time: 'none'
});

console.log('A log whitout time!');
```
Will result in:

![Output of the example above.](https://imgur.com/xMO7d1k.png)

### Options.pid

Can be set to the following:
- `true` - Adds the pid of the process after the time. If it is the master process, it will be colored purple. (default value)
- `false` - Rremoves the pid of the output.

Example:
```javascript
require('log-info')({
    pid: false
});

console.log('A log whitout pid!');
```
Will result in:

![Output of the example above.](https://imgur.com/BmTz3vf.png)

### Options.info

Can be set to the following:
- `true` - Will add the type of log (info (green), warn (yellow), error (red) or debug (blue)) after the pid. (default value)
- `false` - Will remove the info from the output.

Example:
```javascript
require('log-info')({
    info: false
});

console.log('A log whitout info!');
```
Will result in:

![Output of the example above.](https://imgur.com/Fwd1E46.png)

### Options.newline

Can be set to the following:
- `true` - Adds a return (newline) after all the info. (default value)
- `false` - Does not add a return (newline) after all the info

```javascript
require('log-info')({
    newline: false
});

console.log('A log without a newline!');
```

Will result in:

![Output of the example above.](https://imgur.com/fgAtYFc.png)

### Options.char

You can set it to whatever you want as long as it is a string!

- `options.char[0]` - The character to put on the left of the information. (`[` is the default)
- `options.char[1]` - The character to put on the right of the information. (`]` is the default)

Example:
```javascript
require('log-info')({
    char: [ '=>', '<=' ]
});

console.log('A log with a custom character!');
```
Will result in:

![Output of the example above.](https://imgur.com/I37Yb6R.png)

## Credits

I used some of the code from [Bahamas10's log-prefix](https://www.npmjs.com/package/log-prefix) and modified it a bit to make log-info.
