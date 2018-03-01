import { SemanticICONS } from 'semantic-ui-react';

export interface BasicMenuItem {
    name: string;
    link?: string;
    icon?: SemanticICONS;
}

export type MenuItem = BasicMenuItem & {children?: BasicMenuItem[]};

export interface Menu {
    menu: MenuItem[];
}
