import {
  Outlet,
  useNavigation,
} from 'react-router'

import Header from '../components/layout/Header'
import PageLoading from '../components/ui/PageLoading'

export default function RootLayout() {
  const navigation =
    useNavigation()

  const isLoading =
    navigation.state ===
    'loading'

  return (
    <div className="portal-shell">
      <Header />

      {isLoading ? (
        <PageLoading />
      ) : (
        <Outlet />
      )}
    </div>
  )
}