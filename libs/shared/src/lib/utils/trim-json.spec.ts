import { trimJSON } from './trim-json';

describe('trimJSON', () => {
    it('should return null if passed null', () => {
        expect(trimJSON(null)).toBeNull();
    });

    it('should return undefined if passed undefined', () => {
        expect(trimJSON(null)).toBeNull();
    });

    it('should return the function if passed a function', () => {
        function test() {}

        const anotherTest = () => {};

        expect(trimJSON(test)).toBe(test);
        expect(trimJSON(anotherTest)).toBe(anotherTest);
    });

    it('should trim all the properties with a string value of the object', () => {
        const date = new Date();
        function test() {}

        const value = {
            number: 10,
            prop: null,
            bool: true,
            string: '  value   ',
            anotherString: 'another   ',
            test,
            date,
        };

        const expected = {
            prop: null,
            number: 10,
            bool: true,
            string: 'value',
            anotherString: 'another',
            test,
            date,
        };
        expect(trimJSON(value)).toEqual(expected);
    });

    it('should trim all the items which are strings of an array', () => {
        const date = new Date();
        function test() {}

        const value = [
            1,
            '   test',
            true,
            false,
            date,
            '     another   ',
            test,
            undefined,
        ];
        const expected = [
            1,
            'test',
            true,
            false,
            date,
            'another',
            test,
            undefined,
        ];

        expect(trimJSON(value)).toEqual(expected);
    });

    it('should trim all the string properties of an object/array recursively', () => {
        const date = new Date();
        function test() {}

        const value = {
            number: 10,
            prop: null,
            bool: true,
            string: '  value   ',
            anotherString: 'another   ',
            object: {
                test,
                date,
                anotherString: 'another   ',
                anotherObject: {
                    array: [
                        {
                            object: {
                                string: '       string   ',
                            },
                        },
                        '  an a   ',
                        100,
                        undefined,
                    ],
                },
                array: [
                    null,
                    '  an a   ',
                    100,
                    undefined,
                    {
                        string: '       string   ',
                    },
                ],
            },
        };

        const expected = {
            number: 10,
            prop: null,
            bool: true,
            string: 'value',
            anotherString: 'another',
            object: {
                test,
                date,
                anotherString: 'another',
                anotherObject: {
                    array: [
                        {
                            object: {
                                string: 'string',
                            },
                        },
                        'an a',
                        100,
                        undefined,
                    ],
                },
                array: [
                    null,
                    'an a',
                    100,
                    undefined,
                    {
                        string: 'string',
                    },
                ],
            },
        };
        expect(trimJSON(value)).toEqual(expected);
    });
});
