import { Layout } from '@/components/Layout.tsx'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { CenterLayout } from './components/CenterLayout.tsx'
import { Favorites } from './pages/favorites/Favorites.tsx'
import { HomePage } from './pages/HomePage/HomePage.tsx'
import { ThemeProvider } from './provider/ThemeProvider.tsx'
import { store } from './store/store.ts'

import { ProtectedRoute } from '@/components/custom-ui/ProtectedRoute'
import ProfilePage from '@/pages/profile/ProfilePage.tsx'
import { AuthProvider } from '@/provider/AuthProvider.tsx'
import { LoginPage } from './pages/auth/LoginPage.tsx'
import { RegisterPage } from './pages/auth/RegisterPage.tsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<BrowserRouter basename='/Sky-Track/'>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider>
					<LazyMotion features={domAnimation}>
						<Provider store={store}>
							<Routes>
								<Route element={<Layout />}>
									<Route
										path='/'
										element={<HomePage />}
									/>
									<Route element={<CenterLayout />}>
										<Route element={<ProtectedRoute />}>
											<Route
												path='/favorites'
												element={<Favorites />}
											/>
											<Route
												path='/profile'
												element={<ProfilePage />}
											/>
										</Route>

										<Route
											path='/login'
											element={<LoginPage />}
										/>
										<Route
											path='/register'
											element={<RegisterPage />}
										/>
									</Route>
								</Route>
							</Routes>
						</Provider>
					</LazyMotion>
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	</BrowserRouter>
)
