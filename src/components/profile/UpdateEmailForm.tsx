import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateEmail, updateEmailSchema } from '@/services/auth'
import { useAuth } from '@/provider/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function UpdateEmailForm() {
  const { user } = useAuth()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updateEmailSchema>>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(values: z.infer<typeof updateEmailSchema>) {
    if (values.email === user?.email) {
      toast.error("This is already your current email")
      return
    }

    const result = await updateEmail(values.email)

    if (result.error) {
      toast.error('Error', { description: result.error })
    } else {
      toast.message('Action required!', {
        description: 'Confirmation links have been sent to BOTH your old and new email addresses. Please click both to complete the change.',
        duration: 8000, 
        action: {
          label: 'Got it',
          onClick: () => console.log('User acknowledged')
        }
      })
      reset()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
        <CardDescription>
          Update your email address. You will need to confirm the change via email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email Address</Label>
            <Input 
              id="new-email" 
              placeholder="new@example.com" 
              {...register('email')} 
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending Link...' : 'Update Email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}