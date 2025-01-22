"use strict";
exports.removeTags = function (str) {
    if ((str === null) || (str === ''))
        return '';
    return str.replace('&lt;p>', '').replace('&lt;', '').replace(/(<([^>]+)>)/ig, '');
};
exports.getKeywords = function (keywords, sentence) {
    if (keywords === void 0) { keywords = []; }
    if (sentence === void 0) { sentence = ''; }
    return keywords.filter(function (keyword) { return sentence.toLowerCase().includes(keyword.toLowerCase()); });
};
exports.adjustDate = function (date) {
    var newDate = new Date(date);
    newDate.setHours(newDate.getHours() - 12);
    return newDate;
};
