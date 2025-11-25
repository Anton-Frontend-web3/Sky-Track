import { useAuth } from '@/provider/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  // 1. Пока Supabase проверяет сессию, показываем спиннер или ничего
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Checking auth...</div>
  }

  // 2. Если загрузка прошла, а пользователя нет — редирект на логин
  // replace: true заменяет историю, чтобы кнопка "Назад" не возвращала на защищенную страницу
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 3. Если пользователь есть — рендерим дочерние роуты (Profile, Favorites и т.д.)
  return <Outlet />
}