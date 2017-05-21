import Link from 'next/link'
import NavTag from '../../atoms/NavTag'

export default NavLink = ({path, pathName}, isActive) => (
    <Link href={path}>
      <NavTag isActive = {isActive} size = "small"> pathName </NavTag>
    </Link>
  )
