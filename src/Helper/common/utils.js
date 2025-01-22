exports.removeTags = (str) => {
  if ((str === null) || (str === '')) return '';
  return str.replace('&lt;p>', '').replace('&lt;', '').replace(/(<([^>]+)>)/ig, '');
};

exports.getKeywords = (keywords = [], sentence = '') => keywords.filter((keyword) => sentence.toLowerCase().includes(keyword.toLowerCase()));

exports.adjustDate = (date) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - 12);
  return newDate;
};
