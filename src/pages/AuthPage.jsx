import { SignIn, SignUp, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function AuthPage({ mode }) {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">

            {/* Logo */}
            <div
                className="mb-8 cursor-pointer flex items-center gap-2"
                onClick={() => navigate('/')}
            >
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-white">⚡</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Risk Coach AI
                </span>
            </div>

            {/* Clerk Components */}
            <ClerkLoading>
                <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <p>Loading authentication...</p>
                </div>
            </ClerkLoading>

            <ClerkLoaded>
                {mode === 'sign-in' ? (
                    <SignIn
                        routing="path"
                        path="/sign-in"
                        signUpUrl="/sign-up"
                        forceRedirectUrl="/dashboard"
                        appearance={{
                            elements: {
                                rootBox: 'w-full max-w-md',
                                card: 'bg-slate-800 border border-slate-700 shadow-xl',
                                headerTitle: 'text-white',
                                headerSubtitle: 'text-slate-400',
                                socialButtonsBlockButton: 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600',
                                formFieldLabel: 'text-slate-300',
                                formFieldInput: 'bg-slate-700 border-slate-600 text-white',
                                footerActionLink: 'text-blue-400 hover:text-blue-300',
                                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                            }
                        }}
                    />
                ) : (
                    <SignUp
                        routing="path"
                        path="/sign-up"
                        signInUrl="/sign-in"
                        forceRedirectUrl="/dashboard"
                        appearance={{
                            elements: {
                                rootBox: 'w-full max-w-md',
                                card: 'bg-slate-800 border border-slate-700 shadow-xl',
                                headerTitle: 'text-white',
                                headerSubtitle: 'text-slate-400',
                                socialButtonsBlockButton: 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600',
                                formFieldLabel: 'text-slate-300',
                                formFieldInput: 'bg-slate-700 border-slate-600 text-white',
                                footerActionLink: 'text-blue-400 hover:text-blue-300',
                                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                            }
                        }}
                    />
                )}
            </ClerkLoaded>

            <button
                onClick={() => navigate('/')}
                className="mt-6 text-slate-400 hover:text-slate-300 text-sm transition-colors"
            >
                ← Back to Home
            </button>
        </div>
    )
}
