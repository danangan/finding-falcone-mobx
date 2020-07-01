import {times} from './helper';

test('times should return array with x number of given item', () => {
    const result = times<{ anyProp: string}>(2, {anyProp: 'anyValue'});
    expect(result).toEqual([
        {anyProp: 'anyValue'},
        {anyProp: 'anyValue'}
    ])
});
