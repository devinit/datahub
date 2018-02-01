interface Process {
    browser: boolean;
    env: {
      PORT: number,
      MapboxAccessToken: string;
      NODE_ENV: {
        PORT: number
      };
    };
}

// declare var process: Process;

export interface District {
  id: string;
  name: string;
  slug?: string;
}

export type Country = District & {
  has_domestic_data?: string,
  countryType: string,
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
