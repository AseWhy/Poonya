module.exports = function(source, map) {
    this.callback(
        null,
        source.replace(/(\/\/ *~ *)(.*)$/gm, '$2'),
        map
    );
};