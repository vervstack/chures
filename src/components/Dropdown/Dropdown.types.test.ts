import { describe, expect, it } from 'vitest';

import { flattenItems, getOptionId, getOptionLabel, isGroupOption } from './Dropdown.types';
import type { DropdownItem } from './Dropdown.types';

describe('isGroupOption', () => {
    it('returns false for a string leaf', () => {
        expect(isGroupOption('Apple')).toBe(false);
    });

    it('returns false for an { id, name } leaf', () => {
        expect(isGroupOption({ id: 'apple', name: 'Apple' })).toBe(false);
    });

    it('returns true for a { group, options } item', () => {
        expect(isGroupOption({ group: 'Fruits', options: ['Apple'] })).toBe(true);
    });
});

describe('flattenItems', () => {
    it('returns leaves as-is when there are no groups', () => {
        const items: DropdownItem[] = ['Apple', { id: 'b', name: 'Banana' }];

        expect(flattenItems(items)).toEqual(items);
    });

    it('expands a group into its leaves', () => {
        const items: DropdownItem[] = [
            { group: 'Citrus', options: ['Orange', 'Lemon'] },
        ];

        expect(flattenItems(items)).toEqual(['Orange', 'Lemon']);
    });

    it('preserves order across a mix of flat leaves and groups', () => {
        const items: DropdownItem[] = [
            'Kiwi',
            { group: 'Citrus', options: ['Orange', 'Lemon'] },
            'Mango',
            { group: 'Berries', options: ['Strawberry'] },
        ];

        expect(flattenItems(items)).toEqual(['Kiwi', 'Orange', 'Lemon', 'Mango', 'Strawberry']);
    });

    it('drops a group with an empty options array', () => {
        const items: DropdownItem[] = [
            { group: 'Empty', options: [] },
            'Kiwi',
        ];

        expect(flattenItems(items)).toEqual(['Kiwi']);
    });

    it('produces ids/labels usable by getOptionId/getOptionLabel', () => {
        const items: DropdownItem[] = [
            { group: 'Models', options: [{ id: 'haiku', name: 'Haiku' }, { id: 'sonnet', name: 'Sonnet' }] },
        ];

        const flat = flattenItems(items);

        expect(flat.map(getOptionId)).toEqual(['haiku', 'sonnet']);
        expect(flat.map(getOptionLabel)).toEqual(['Haiku', 'Sonnet']);
    });
});
