import glamorous from 'glamorous';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import * as React from 'react';
import Link from 'next/link';
import { lightGrey, black } from '../../theme/semantic';

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

const menuItem = (props: Props) => {
  let childrenContainer;
  if ('children' in props.menu) {
    const children = props.menu.children.map(item =>
      (<li key={item.name}>
        <Link href={item.link || '/'} prefetch>
          <a role="link">
            <Icon name={item.icon} />
            {item.name}
          </a>
        </Link>
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
