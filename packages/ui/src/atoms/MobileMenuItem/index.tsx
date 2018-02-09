import glamorous from 'glamorous';
import { Icon } from 'semantic-ui-react';
import Pane from '../MobileMenuPane';
import * as React from 'react';
import Link from 'next/link';
import { lightGrey, black } from '../../theme/semantic';

interface Props {
  menu: {children: Array<{name: string; link: string; icon: string}>};
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
        <Link href={item.link} prefetch>
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
    <Pane >
      {childrenContainer}
    </Pane>
  );
};

export default menuItem;
