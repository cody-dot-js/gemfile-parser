import { EOL } from './constants';

const trimIt = l => l.trim();
const lines = s => s.split(EOL);

export const filteredAndTrimmedLines = s => lines(s).filter(Boolean).map(trimIt);

export default lines;
