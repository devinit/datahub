import Link from 'next/link'
import NavTag from '../../atoms/NavTag'


const NavItem = ({path, pathName, isActive}) => (
   <Link href={path}>
      <NavTag isActive = {isActive} size = "small"> {pathName} </NavTag>
  </Link>
)

export default NavItem;
