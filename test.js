function currying(fn) {
    let cache = []
    return function a(...args) {
        if (args.length >= 2) {
           return fn.apply(this,args)
        } else if(cache.length>=1){
            cache = cache.concat(args)
            return fn.apply(this, cache)
        } else {
            cache = cache.concat(args)
            return a;
        }
    }
}


function add(...numbers) {
    let result = 0;
    numbers.forEach((i) => {
        console.log(i);
        result += i
    })
    return result
}

let currAdd = currying(add);

// console.log(currAdd(3, 3));

console.log(currAdd(3)(3));