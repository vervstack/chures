export type PanelSide = 'below' | 'above';

export interface PanelPlacement {
    side: PanelSide;
    availableHeight: number;
}

interface PlacementInput {
    anchorRect: Pick<DOMRect, 'top' | 'bottom'>;
    panelHeight: number;
    viewportHeight: number;
    gap: number;
}

export function computePanelPlacement(
    { anchorRect, panelHeight, viewportHeight, gap }: PlacementInput,
): PanelPlacement {
    const spaceBelow = Math.max(0, viewportHeight - anchorRect.bottom - gap);
    const spaceAbove = Math.max(0, anchorRect.top - gap);

    const fitsBelow = panelHeight <= spaceBelow;
    const shouldFlip = !fitsBelow && spaceAbove > spaceBelow;

    return shouldFlip
        ? { side: 'above', availableHeight: spaceAbove }
        : { side: 'below', availableHeight: spaceBelow };
}
