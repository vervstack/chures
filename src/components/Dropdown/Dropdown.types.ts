export type DropdownOption = string | { id: string; name: string };

export function getOptionId(opt: DropdownOption): string {
    return typeof opt === 'string' ? opt : opt.id;
}

export function getOptionLabel(opt: DropdownOption): string {
    return typeof opt === 'string' ? opt : opt.name;
}

export function resolveSelectedOptions(value: string[], options: DropdownOption[]): DropdownOption[] {
    return value.map((id) => options.find((o) => getOptionId(o) === id) ?? id);
}
