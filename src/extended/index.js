function hello() {
    console.log('Hello World')
}

// list of installable functions to share to outside world, used as enum
const installables = {
    hello,
}

function extended(...args) {
    // installs the specified function
}
extended.hello = hello

export { extended }
