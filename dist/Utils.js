"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUID = exports.lastElement = void 0;
const lastElement = (array) => {
    return array[array.length - 1];
};
exports.lastElement = lastElement;
const getUID = (tag) => {
    return tag.substring(2, tag.length - 1);
};
exports.getUID = getUID;
