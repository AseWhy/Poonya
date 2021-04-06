module.exports = class LinkerData {
    constructor(contents, chuncks) {
        this.contents = contents;
        this.chuncks = chuncks;
    }

    /**
     * исходя из позиции токена возвращает тот чанк которому он принадлежит.
     * 
     * @param {Number} position позиция токена для которой нужно получить чанк
     * @returns 
     */
    getOwnChunck(position) {
        for(const chunck of this.chuncks) {
            if(chunck.isOwnChunckPosition(position)) {
                return chunck;
            }
        }

        return null;
    }
}