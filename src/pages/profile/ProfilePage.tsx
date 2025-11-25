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
    <div className='
      w-full sm:max-w-[480px] 
      bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
      rounded-xl border shadow-xl 
      max-h-[85vh] overflow-y-auto scrollbar-hide
      p-4 sm:p-6 space-y-6
    '>
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
        <CardHeader className='pb-3 p-4 sm:p-6'>
          <CardTitle className='text-base'>Account Information</CardTitle>
          <CardDescription>Basic details about your account.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4 p-4 sm:p-6 pt-0 sm:pt-0'>
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