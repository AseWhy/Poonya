const { toBytes, fromBytes } = require("../utils");

module.exports = class ChunkData {
    constructor(name, raw, from) {
        this.name = name;
        this.raw = toBytes(raw);
        this.from = from;
        this.to = from + this.raw.length * 2;
    }

    /**
     * Проверяет поизию токена, на принадлежность к текйщему чанку
     * 
     * @param {Number} position позиция токена
     * @returns true если приндалежит false если не приндалежит
     */
    isOwnChunckPosition(position) {
        return position > this.from && position <= this.to;
    }

    toString(){
        return fromBytes(this.raw);
    }
}