import { gemspecStartToken, addDepToken, addDevDepToken } from './common/constants';

const specEntry = `${gemspecStartToken} |s|`;

const attributesToStr = (attributes = {}) => {
  const attrs = Object.keys(attributes);
  const pad = attrs.map(a => a.length).sort((a, b) => b - a)[0];
  return attrs.reduce((acc, a) => `${acc}\n  s.${a.padEnd(pad, ' ')} = ${attributes[a]}`, '');
};

const dependenciesToStr = token => dependencies => Object.values(dependencies)
  .reduce((acc, d) => (
    `${acc}\n  s.${token} ${d}`
  ), '');

export default ({
  header, attributes, dependencies, devDependencies,
}) => `${header}${specEntry}${attributesToStr(attributes)}
${dependenciesToStr(addDepToken)(dependencies)}
${dependenciesToStr(addDevDepToken)(devDependencies)}
end
`;
