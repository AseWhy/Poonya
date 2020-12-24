module.exports = function(source, map) {
    this.callback(
        null,
        source
            .replace(/(?:\/\/ *~ *)(.*)$/gm, '/*LIQUID*/$1/*LIQUID-END*/')
            .replace(/\/\*~([^\0]*?)(?:\*\/)/g, '/*LIQUID*/$1/*LIQUID-END*/'),
        map
    );
};