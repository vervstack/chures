import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Dropdown } from './Dropdown';
import { DropdownCheckmark } from './DropdownCheckmark';
import styles from './Dropdown.module.css';

describe('DropdownCheckmark', () => {
    it('adds the Checked class to the slot when isChecked', () => {
        const html = renderToStaticMarkup(createElement(DropdownCheckmark, { isChecked: true }));

        expect(html).toContain(styles.CheckSlot);
        expect(html).toContain(styles.Checked);
    });

    it('keeps the slot rendered without the Checked class when not checked', () => {
        const html = renderToStaticMarkup(createElement(DropdownCheckmark, { isChecked: false }));

        expect(html).toContain(styles.CheckSlot);
        expect(html).not.toContain(styles.Checked);
    });
});

describe('Dropdown icon prop', () => {
    function renderDropdown(icon?: React.ReactNode) {
        return renderToStaticMarkup(
            createElement(Dropdown, { options: ['Apple'], value: [], onChange: () => {}, label: 'Fruit', icon }),
        );
    }

    it('renders the icon and marks trigger and label when given', () => {
        const html = renderDropdown(createElement('i', { 'data-testid': 'my-icon' }));

        expect(html).toContain('data-testid="my-icon"');
        expect(html).toContain(styles.LeadingIcon);
        expect(html).toContain(styles.WithIcon);
    });

    it('renders no icon slot when not given', () => {
        const html = renderDropdown();

        expect(html).not.toContain(styles.LeadingIcon);
        expect(html).not.toContain(styles.WithIcon);
    });
});
