import Posts from '../components/posts'
import PostsByCategory from '../components/posts/PostsByCategory'
import NotFound from '../components/NotFound'

const routes = [
  {
    exact: true,
    path: '/',
    component: Posts
  },
  /*
  {
    path: '/posts',
    component: Posts,
    routes: [
      {
        path: '/categories',
        component: PostsByCategory,
        routes: [
          {
            path: '/category/:category',
            component: PostsByCategory
          }
        ]
      }
    ]
  },
  */
  {
    path: '/categories/:category',
    component: PostsByCategory
  },
  {
    component: NotFound
  }
]

export default routes
