import Link from 'next/link'
import Header from '../../molecules/NavMenu'


const links = [ {path: '/', pathName : 'home', id : 1}
              , {path: '/about', pathName : 'about', id : 2}
              ]

const HeaderContainer = ({ pathName }) => (
  <Header links = {links} current = {pathName} />
)

export default HeaderContainer;
