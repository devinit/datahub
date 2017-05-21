import NavLink from '../../Molecules/NavLink'
import glamorous from 'glamorous';


const ComponentHeader = glamorous.header({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#ddd',
  padding: 16,
});

export default HeaderInterface = (links, current) => {
  return (
    <ComponentHeader>
      { links
        .map(link =>
          (<NavLink
            path = {link}
            isActive = {link.path === current}
          </NavLink>)
        )}
    </ComponentHeader>
  );
}
