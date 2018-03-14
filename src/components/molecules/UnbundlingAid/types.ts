export interface DropDownOption {
    name: string;
    key: string;
    value: string;
    active: boolean;
}
export interface Selections {
    to: DropDownOption[];
    from: DropDownOption[];
    sectors: DropDownOption[];
    channels: DropDownOption[];
    forms: DropDownOption[];
    years: DropDownOption[];
}

export interface KeyValue  {
    key: string;
    value: string;
}
