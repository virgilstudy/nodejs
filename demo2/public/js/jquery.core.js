$.each([1, 2, 3], function(key, value) {
    console.log(this + ',' + key + ',' + value);
}, [4, 5]);
var Each = function(obj, callback, args) {
    var value;
    //var length=obj.length;
    var length = obj.length;
    console.log(args);
    for (var i in obj) {
        value = args ? callback.apply(obj[i], args) : callback.call(obj[i], i, obj[i]);
        if (value === false) {
            break;
        }
    }
    return obj;
}
var e = new Each([1, 2, 3], function(key, value) {
    console.log(this + ',' + key + ',' + value);
}, [4, 5]);
var localStorage = window.localStorage;
//localStorage.setItem("a","cool");
//localStorage.setItem("a",{"name":"sxx","id":"admin"});
function showStorage() {
    console.log(localStorage);
    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i) + ":" + localStorage.getItem(localStorage.key(i)));
    }
}
showStorage();
