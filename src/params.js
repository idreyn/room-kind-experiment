import { getUrlParam, number, numberOrString } from './util';

export const NUMBER_OF_BLOCKS = 4;
export const ROOM_TYPE_REPEATS_PER_BLOCK = 4;

export const VERSION = 'v1-echo-room-stimuli';

const paramsCompensation = getUrlParam('compensation');

export const isTiny = getUrlParam('tiny');
export const slowdown = number(getUrlParam('slowdown'));
export const compensationDescriptor = paramsCompensation && numberOrString(paramsCompensation);

// eslint-disable-next-line no-console
console.log(VERSION);
