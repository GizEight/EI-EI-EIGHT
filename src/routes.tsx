import { ArticleDetail } from './components/pages/ArticleDetail'
import { ArticleList } from './components/pages/ArticleList'
import { EditArticle } from './components/pages/EditArticle'
import { EditUser } from './components/pages/EditUser'
import { UserDetail } from './components/pages/UserDetail'

export const HOME_ROUTES = [
  {
    path: '/',
    element: <ArticleList />,
  },
  {
    path: '/article/:id',
    element: <ArticleDetail />,
  },
  {
    path: '/article/:id/edit',
    element: <EditArticle />,
  },
  {
    path: '/user/:id',
    element: <UserDetail />,
  },
  {
    path: '/user/:id/edit',
    element: <EditUser />,
  },
]
