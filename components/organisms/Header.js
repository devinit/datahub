import Link from 'next/link'
import React from 'react'
import { rehydrate, css } from 'glamor'
import Header from '../../organisms/Header'
import glamorous from 'glamorous'

const links = [ {path: '/', pathName : 'home'}
              , {path: '/about', pathName : 'about'}
              ]

export default ({ pathName }) => (
  <header links = {links} current = {pathName}></header>
)
