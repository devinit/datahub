import App from '../components/templates/App'
import Submit from '../components/organisms/Submit'
import PostList from '../components/organisms/PostList'
import { rehydrate } from 'glamor'
import GenericTemplate from '../components/templates/Generic'
import withData from '../lib/withData'

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids)
}

export default withData((props) => {
  return (
    <GenericTemplate pathName={props.url.pathname}>
      <Submit />
      <PostList />
    </GenericTemplate>
  )
})
