import { describe, expect, it } from 'vitest';

import { computePanelPlacement } from './Dropdown.placement';

const viewportHeight = 800;
const gap = 8;

describe('computePanelPlacement', () => {
    it('opens below when the panel fits below', () => {
        const result = computePanelPlacement({
            anchorRect: { top: 100, bottom: 140 }, panelHeight: 200, viewportHeight, gap,
        });

        expect(result).toEqual({ side: 'below', availableHeight: 800 - 140 - 8 });
    });

    it('opens above when it does not fit below but there is more room above', () => {
        const result = computePanelPlacement({
            anchorRect: { top: 700, bottom: 740 }, panelHeight: 300, viewportHeight, gap,
        });

        expect(result).toEqual({ side: 'above', availableHeight: 700 - 8 });
    });

    it('stays below when it fits below even though there is more room above', () => {
        const result = computePanelPlacement({
            anchorRect: { top: 500, bottom: 540 }, panelHeight: 100, viewportHeight, gap,
        });

        expect(result.side).toBe('below');
    });

    it('picks the larger side when the panel fits on neither and below is larger', () => {
        const result = computePanelPlacement({
            anchorRect: { top: 200, bottom: 240 }, panelHeight: 900, viewportHeight, gap,
        });

        expect(result).toEqual({ side: 'below', availableHeight: 800 - 240 - 8 });
    });

    it('picks the larger side when the panel fits on neither and above is larger', () => {
        const result = computePanelPlacement({
            anchorRect: { top: 600, bottom: 640 }, panelHeight: 900, viewportHeight, gap,
        });

        expect(result).toEqual({ side: 'above', availableHeight: 600 - 8 });
    });

    it('never returns a negative available height', () => {
        const result = computePanelPlacement({
            anchorRect: { top: 2, bottom: 799 }, panelHeight: 100, viewportHeight, gap,
        });

        expect(result.availableHeight).toBeGreaterThanOrEqual(0);
    });
});
