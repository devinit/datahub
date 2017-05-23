import Nav from '../NavItem';
import glamorous from 'glamorous';


const StyledHeader = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#ddd',
  padding: 16,
});

const NavMenu = ({links, current }) => {
  return (
    <StyledHeader>
      { links
        .map(({path, pathName, id}) =>
          (<Nav path = {path} pathName = {pathName} key = {id} isActive = {path === current} />)
        )}
    </StyledHeader>
  );
}

export default NavMenu;
