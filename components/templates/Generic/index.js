import React from 'react'
import Header from '../organisms/Header'
import glamorous from 'glamorous'



export default ({children, pathName}) => {
  const mainStyles = {
    backgroundColor: 'white',
    color: 'cornflowerblue',
    border: '1px solid lightgreen',
    borderRight: 'none',
    borderBottom: 'none',
    boxShadow: '5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow',
    transition: 'all 0.1s linear',
    margin: `3rem 0`,
    padding: `1rem 0.5rem`
  }

  const Main = glamorous.div(basicStyles)

  return (
    <div>
      <Header path = {pathName} />
      <main>
        {children}
      </main>
    </div>
  )
}
