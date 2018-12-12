import { EOL } from './common/constants';

const gemfileDepsToStr = (dependencies = {}, options = {}) => {
  const { inGroupBlock = false } = options;
  const leadingPad = inGroupBlock ? '  ' : '';
  return Object.values(dependencies).map(d => `${leadingPad}gem ${d}`).join(EOL);
};

const groupBlockEntryToStr = group => `group ${group} do`;

export default ({ header, defaultGroup, otherGroups }) => {
  const defaultGroupDependencies = gemfileDepsToStr(defaultGroup);
  const otherGroupHeaders = Object.keys(otherGroups).map(groupBlockEntryToStr);
  const otherGroupDependencies = Object.keys(otherGroups).reduce((acc, group) => ([
    ...acc, gemfileDepsToStr(otherGroups[group], { inGroupBlock: true }),
  ]), []);

  const otherGroupSections = otherGroupHeaders.map((h, i) => `${h}\n${otherGroupDependencies[i]}\nend\n`).join(EOL);

  return `${header}${defaultGroupDependencies}\n\n${otherGroupSections}\n`;
};
