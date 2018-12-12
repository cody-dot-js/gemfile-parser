export default (s, options = {}) => {
  const { start = '', end, replacer = [] } = options;
  const endIndex = end ? s.indexOf(end) : undefined;
  const startIndex = start ? s.indexOf(start) + start.length : 0;
  return s.slice(startIndex, endIndex).replace(...replacer).trim();
};
