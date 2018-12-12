import linesOf from './common/lines';
import extractToken from './common/extractToken';
import reduceGemDeps from './common/reduceGemDeps';
import { gemDependencyToken } from './common/constants';

const odds = (_, i) => i % 2 !== 0;
const isEven = i => i % 2 === 0;

const findOtherGroupRanges = (lines = []) => lines.map((line, index) => ({ line: line.trim(), index }))
  .filter(({ line }) => line.startsWith('group') || line === 'end')
  .reduce((acc, { line, index }, i) => ([
    ...acc,
    (isEven(i)
      ? { name: extractToken(line, { start: 'group', end: 'do' }), start: index }
      : { ...acc[i - 1], end: index }
    ),
  ]), []).filter(odds);

export default (gemfile = '') => {
  const appGemfileFilter = l => l.trim().startsWith(gemDependencyToken) || l.startsWith('group') || l.startsWith('end');

  const endOfHeader = gemfile.indexOf(gemDependencyToken);
  const header = gemfile.slice(0, endOfHeader);

  const lines = linesOf(gemfile).filter(appGemfileFilter);

  const otherGroupRanges = findOtherGroupRanges(lines);

  const endOfDefaultGroup = otherGroupRanges.length > 0 ? otherGroupRanges[0].start : lines.length;
  const defaultGroup = reduceGemDeps(lines.slice(0, endOfDefaultGroup));

  const otherGroups = otherGroupRanges.reduce((acc, { name, start, end }) => ({
    ...acc,
    [name]: reduceGemDeps(lines.slice(start + 1, end)),
  }), {});

  return {
    header,
    defaultGroup,
    otherGroups,
  };
};
