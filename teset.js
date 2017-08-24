var obj = {};

obj.timeout = function(fn,time) {
    window.setTimeout(fn.bind(this),time)
}

obj.timeout(() => {
    console.log("666");
},100)