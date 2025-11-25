import { Outlet, useLocation } from 'react-router-dom'

export function CenterLayout() {
    const location = useLocation();
    
    // Если мы на странице профиля или логина, делаем узко.
    // Если на Favorites - широко.
    const isWidePage = location.pathname.includes('/favorites');

	return (
		<div className='fixed inset-0 z-40 overflow-y-auto'>
			<div className={`flex min-h-full w-full items-start justify-center px-4 pt-28 pb-10`}>
				{/* Динамический класс ширины */}
				<div className={`w-full ${isWidePage ? 'max-w-5xl' : 'max-w-md'}`}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}