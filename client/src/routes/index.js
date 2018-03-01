import Posts from '../components/posts'
import PostsByCategory from '../components/posts/PostsByCategory'
import PostDetails  from '../components/posts/PostDetails'
import NotFound from '../components/NotFound'

const routes = [
  {
    exact: true,
    path: '/',
    component: Posts,
  },
  {
    exact: true,
    path: '/categories/:category',
    component: PostsByCategory
  },
  {
    exact: true,
    path: '/posts/:postId',
    component: PostDetails
  },
  {
    component: NotFound
  }
]

export default routes
