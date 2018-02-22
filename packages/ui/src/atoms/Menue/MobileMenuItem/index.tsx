import glamorous from 'glamorous';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import * as React from 'react';
import { lightGrey, black } from '../../../theme/semantic';
import {IProcess} from '@devinit/dh-base/lib/types';

declare var process: IProcess;

const Link = process.env && process.env.config && process.env.config.NEXT ? require('next/link') : null;

export interface Props {
  menu: {children: Array<{name: string; link: string; icon: SemanticICONS}>};
}
const SubMenuContainer = glamorous.ul({
  'listStyleType': 'none',
  'color': black,
  'margin': 0,
  'padding': 0,
  '& li': {
    padding: '1rem 1.6rem',
    borderBottom: ` 1px solid ${lightGrey}`,
  },
});

const LinkContent = (item: {name: string; icon: SemanticICONS}) =>
  <a role="link">
    <Icon name={item.icon} />
    {item.name}
  </a>;

const menuItem = (props: Props) => {
  let childrenContainer;

  if ('children' in props.menu) {
    const children = props.menu.children.map(item =>
      (<li key={item.name}>
        {Link ?
          <Link href={item.link || '/'} prefetch>
           {LinkContent}
         </Link> :
          <a href={item.link || '/'}>  {LinkContent} </a>
        }
      </li>)
    );
    childrenContainer = (
      <SubMenuContainer>
        {children}
      </SubMenuContainer>
    );
  }
  return (
    <div className="nav-children">
      {childrenContainer}
    </div>
  );
};

export default menuItem;
