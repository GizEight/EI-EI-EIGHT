import { ArticleDetail } from './components/pages/ArticleDetail'
import { ArticleList } from './components/pages/ArticleList'
import { CreateArticle } from './components/pages/CreateArticle'
import { EditArticle } from './components/pages/EditArticle'
import { EditUser } from './components/pages/EditUser'
import { NotFound } from './components/pages/NotFound'
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
    path: '/article/create',
    element: <CreateArticle />,
  },
  {
    path: '/user/:id',
    element: <UserDetail />,
  },
  {
    path: '/user/:id/edit',
    element: <EditUser />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
