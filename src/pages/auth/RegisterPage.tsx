import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { signUp, authSchema } from '@/services/auth' 
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function RegisterPage() {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: z.infer<typeof authSchema>) {
    const result = await signUp(values)
    
    if (result.error) {
      toast.error('Error', { description: result.error })
    } else {
      toast.success('Account created!', { 
        description: 'Please check your email to confirm your registration.',
        duration: 5000 
      })
      navigate('/login') 
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')} 
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center text-sm w-full">
            Already have an account?{' '}
            <Link to="/login" className="underline hover:text-primary">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}