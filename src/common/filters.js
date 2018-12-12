import { addDepToken, addDevDepToken } from './constants';

export const startFilter = start => l => l.startsWith(start);
export const filterGemspecDeps = l => startFilter(addDepToken)(l);
export const filterGemspecDevDeps = l => startFilter(addDevDepToken)(l);
export const filterGemspecAtrributes = l => !(startFilter('add_de')(l));
