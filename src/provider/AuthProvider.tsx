import { supabase } from '@/lib/supabase'
import { type User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
	user: null,
	loading: true
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null)
			setLoading(false)
		})

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null)
			setLoading(false)
		})

		return () => subscription.unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
