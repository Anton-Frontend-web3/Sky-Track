import { ThemeToggle } from '@/provider/ThemeToggle'
import { menu } from './menu.data'
import { MenuItem } from './MenuItem'


export function Header() {
	return (
		<header className='bg-background z-50 absolute top-7 left-1/2 gap-1 flex translate-x-[calc(-50%_+_2rem)] xs:-translate-x-1/2  items-center justify-center rounded-3xl '>
			<nav className='flex gap-3 p-3 sm:gap-1.5'>
				{menu.map(item => (
					<MenuItem
						key={item.label}
						item={item}
					></MenuItem>
				))}
			</nav>
			<div className='pr-1 left-1/2 flex items-center justify-center -translate-x-1/2'>
				<ThemeToggle></ThemeToggle>
			</div>
		</header>
	)
}
