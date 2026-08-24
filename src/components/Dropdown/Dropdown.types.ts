export type DropdownOption = string | { id: string; name: string };

// A named family of leaf options, rendered as a non-interactive header followed by
// its indented options. Leaves only — no nesting deeper than 2 levels, that's out
// of scope for this component.
export interface DropdownOptionGroup {
    group: string;
    options: DropdownOption[];
}

// What a Dropdown's `options` array is made of: either a plain leaf, or a group of
// leaves. A flat consumer (no groups) is just DropdownItem[] with every item a leaf.
export type DropdownItem = DropdownOption | DropdownOptionGroup;

export function isGroupOption(item: DropdownItem): item is DropdownOptionGroup {
    return typeof item === 'object' && item !== null && 'group' in item;
}

// Order-preserving: walks the array, expanding each group's `options` into the
// result and leaving plain leaves as-is.
export function flattenItems(items: DropdownItem[]): DropdownOption[] {
    return items.flatMap((item) => (isGroupOption(item) ? item.options : [item]));
}

export function getOptionId(opt: DropdownOption): string {
    return typeof opt === 'string' ? opt : opt.id;
}

export function getOptionLabel(opt: DropdownOption): string {
    return typeof opt === 'string' ? opt : opt.name;
}

export function resolveSelectedOptions(value: string[], options: DropdownOption[]): DropdownOption[] {
    return value.map((id) => options.find((o) => getOptionId(o) === id) ?? id);
}
