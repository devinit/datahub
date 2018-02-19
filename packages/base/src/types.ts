export interface IProcess {
  version: string;
  browser: boolean;
  env: any & { // add by webpack
    PORT: number,
    NODE_ENV: string;
    api: string;
    old_datahub: string;
  };
}

export interface PageUnit {
  id: string;
  title: string;
  narrative?: string;
  donor_title?: string;
}

export interface PagesData {
    spotlightDistrict: PageUnit[];
    countryProfile: PageUnit[];
}

export interface ReplaceFieldsArgs {
  pageData: PageUnit[];
  toReplace: string;
  replacement: string;
}

export interface District {
  id: string;
  name: string;
  slug?: string;
}

export type Country = District & {
  has_domestic_data?: string,
  countryType: string,
  slug: string;
  hasPDF?: boolean
};

export interface NavIndicator {
    id: string;
    name: string;
    heading?: string;
    tooltip?: string;
    source?: string;
}

export interface NavBarItem {
  id: string;
  name: string;
  indicators: NavIndicator[];
  default_indicator?: string;
}

export interface SelectOption {
  id: string;
  name: string;
  text: string;
}

export interface MenueItem {
    name: string;
    link: string;
    icon?: string;
    children?: MenueItem[];
}
export interface Menue {
    mainMenu: MenueItem[];
}
