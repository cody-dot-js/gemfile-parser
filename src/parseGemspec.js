import { addDepToken, addDevDepToken, gemspecStartToken } from './common/constants';
import { filteredAndTrimmedLines } from './common/lines';
import {
  filterGemspecAtrributes, filterGemspecDeps, filterGemspecDevDeps, startFilter,
} from './common/filters';
import extractToken from './common/extractToken';
import reduceGemDeps from './common/reduceGemDeps';

export default (gemspec = '') => {
  const endOfHeader = gemspec.indexOf(gemspecStartToken);
  const header = gemspec.slice(0, endOfHeader);

  const [gemspecStart, ...lines] = filteredAndTrimmedLines(gemspec.slice(endOfHeader));
  const specName = extractToken(gemspecStart, { start: '|', replacer: [/\|/g, ''] });
  const specLines = lines.filter(startFilter(specName)).map(l => l.slice(l.indexOf(specName) + `${specName}.`.length));

  const attributes = specLines.filter(filterGemspecAtrributes).reduce((acc, l) => {
    const k = extractToken(l, { end: '=' });
    const v = extractToken(l, { start: '=' });
    return { ...acc, [k]: v };
  }, {});

  const dependencies = reduceGemDeps(specLines
    .filter(filterGemspecDeps)
    .map(l => extractToken(l, { start: addDepToken })));
  const devDependencies = reduceGemDeps(specLines
    .filter(filterGemspecDevDeps)
    .map(l => extractToken(l, { start: addDevDepToken })));

  return {
    header,
    attributes,
    dependencies,
    devDependencies,
  };
};
