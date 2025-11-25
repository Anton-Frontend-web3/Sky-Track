import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateProfile, updateProfileSchema, getProfile } from '@/services/auth'
import { useAuth } from '@/provider/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function UpdateProfileForm() {
  const { user } = useAuth()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
  })

  
  useEffect(() => {
    if (user) {
      getProfile(user.id).then(({ data }) => {
        if (data?.full_name) {
          setValue('fullName', data.full_name)
        }
      })
    }
  }, [user, setValue])

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    if (!user) return

    const result = await updateProfile(user.id, values.fullName)

    if (result.error) {
      toast.error('Error', { description: result.error })
    } else {
      toast.success('Profile updated')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Update your public profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="John Doe" 
              {...register('fullName')} 
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}