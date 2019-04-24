var counter = function (init){
    return function(){
        return ++init;
    }
}

var incrementar = counter(1);
console.log("Primeira chamada " + incrementar());
console.log("Segunda chamada " + incrementar());
console.log("Terceira chamada " + incrementar());