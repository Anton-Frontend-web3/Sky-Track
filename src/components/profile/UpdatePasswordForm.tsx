import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { updatePassword, updatePasswordSchema } from '@/services/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '' },
  })

  async function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    const result = await updatePassword(values.password)

    if (result.error) {
      toast.error('Error', { description: result.error })
    } else {
      toast.success('Password updated', {
        description: 'Your password has been changed successfully. You can use it for the next login.',
      })
      reset() 
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password associated with this account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input 
              id="new-password" 
              type="password" 
              placeholder="********" 
              {...register('password')} 
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}