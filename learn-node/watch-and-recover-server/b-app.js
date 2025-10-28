console.log('❤️ hello world', process.pid);

setTimeout(() => {
    throw "❌Oops... Something bad happened for something good!";
}, 10_000);
