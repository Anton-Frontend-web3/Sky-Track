import { Heart } from '@/components/animate-ui/icons/heart'
import { UserRound } from '@/components/animate-ui/icons/user-round'
import { CompanyLogoIcon } from '@/components/icons/CompanyLogoIcon'
import type { ComponentType } from 'react'

interface IconProps {
	className?: string
	size?: number
}

export interface IHeaderMenu {
	label: string
	icon: ComponentType<IconProps>
	to: string
}

export const menu: IHeaderMenu[] = [
	{
		label: 'Home',
		icon: CompanyLogoIcon,
		to: '/'
	},
	{
		label: 'Profile',
		icon: UserRound,
		to: '/profile'
	},

	{
		label: 'Favorites',
		icon: Heart,
		to: '/favorites'
	}
]
