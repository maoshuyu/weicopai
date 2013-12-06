var class2type = {}, 
toString = class2type.toString;

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();        
});

exports.type = function(obj) {
    if ( obj == null ) {                                                                                                                
        return obj + '';                                                                                                                
    }                                                                                                                                   
    return typeof obj === 'object' || typeof obj === 'function' ?                                                                       
    class2type[ toString.call(obj) ] || 'object' :                                                                                  
    typeof obj;   
};
