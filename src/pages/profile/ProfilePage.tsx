import { UpdateEmailForm } from '@/components/profile/UpdateEmailForm'
import { UpdatePasswordForm } from '@/components/profile/UpdatePasswordForm'
import { UpdateProfileForm } from '@/components/profile/UpdateProfileForm'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/provider/AuthProvider'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const handleSignOut = async () => {
		await supabase.auth.signOut()
		navigate('/login')
	}

	if (!user) {
		return (
			<div className='bg-background/95 flex h-[200px] w-full items-center justify-center rounded-xl border shadow-lg'>
				<span className='text-muted-foreground'>Loading profile...</span>
			</div>
		)
	}

	return (
		<div className='scrollbar-hide bg-background/95 supports-[backdrop-filter]:bg-background/60 max-h-[85vh] w-full min-w-[320px] space-y-6 overflow-y-auto rounded-xl border p-6 shadow-xl backdrop-blur md:w-[480px]'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
					<p className='text-muted-foreground text-sm'>
						Manage your account settings.
					</p>
				</div>

				<Button
					variant='ghost'
					size='icon'
					onClick={handleSignOut}
					title='Sign Out'
				>
					<LogOut className='h-5 w-5 text-foreground' />
				</Button>
			</div>

			<Card className='bg-muted/50'>
				<CardHeader className='pb-3'>
					<CardTitle className='text-base'>Account Information</CardTitle>
					<CardDescription>Basic details about your account.</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='grid gap-2'>
						<Label className='text-muted-foreground text-xs'>User ID</Label>
						<Input
							value={user.id}
							disabled
							className='bg-background h-8 font-mono text-xs'
						/>
					</div>
					<div className='grid gap-2'>
						<Label className='text-muted-foreground text-xs'>
							Current Email
						</Label>
						<Input
							value={user.email}
							disabled
							className='bg-background h-8'
						/>
					</div>
				</CardContent>
			</Card>

			<div className='space-y-6'>
				<UpdateProfileForm />

				<UpdateEmailForm />
				<UpdatePasswordForm />
			</div>
		</div>
	)
}
