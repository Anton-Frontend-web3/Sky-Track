import { supabase } from '@/lib/supabase'
import { z } from 'zod'



export const authSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
})

export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }),
})

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Name is too short").max(50),
  
})

export async function signIn(data: z.infer<typeof authSchema>) {
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) return { error: 'Invalid login credentials.' }
  return { success: true }
}

export async function signUp(data: z.infer<typeof authSchema>) {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`, 
    },
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function resetPassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function signOut() {
  await supabase.auth.signOut()
}
export const updateEmailSchema = z.object({
    email: z.email({ message: 'Please enter a valid email.' }),
  })
  
  export const updatePasswordSchema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  })
  
  
  export async function updateEmail(email: string) {
    const { error } = await supabase.auth.updateUser({ email })
  
    if (error) return { error: error.message }
    return { success: true }
  }
  
  export async function updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password })
  
    if (error) return { error: error.message }
    return { success: true }
  }

  export async function getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  }
  

  export async function updateProfile(userId: string, fullName: string) {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        full_name: fullName, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', userId)
  
    if (error) return { error: error.message }
    return { success: true }
  }