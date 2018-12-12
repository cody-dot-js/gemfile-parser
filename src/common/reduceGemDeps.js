const quoteMapper = (l) => {
  const quoteIndex = l.indexOf("'");
  const start = quoteIndex >= 0 ? quoteIndex : l.indexOf('"') || 0;
  return l.slice(start);
};

export default (dependencies = []) => dependencies.map(quoteMapper).reduce((acc, l) => {
  const [name] = l.split(',').map(s => s.trim().replace(/'/g, ''));
  return { ...acc, [name]: l };
}, {});
