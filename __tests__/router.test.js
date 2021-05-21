/**
 * @jest-environment jsdom
 */


import { pushToHistory } from '../scripts/router.js';

describe('Testing...', () => {

    test('settings', () => {
        let his = pushToHistory('settings');
        expect(his['state']).toMatchObject({ page: 'settings' });
        expect(his['length']).toBe(2);
    });

    test('entry', () => {
        let his = pushToHistory('entry', 7);
        expect(his['state']).toMatchObject({ page: 'entry7' });
        expect(his['length']).toBe(3);
    });

    test('default', () => {
        let his = pushToHistory('');
        expect(his['state']).toMatchObject({});
        expect(his['length']).toBe(4);
    });

    test('length', () => {
        let his = pushToHistory('');

        // Returns an Integer representing the number of elements in the session history, 
        // including the currently loaded page. For example, for a page loaded in a new tab 
        // this property returns 1.
        expect(his['length']).toBe(5);     
    });
});
