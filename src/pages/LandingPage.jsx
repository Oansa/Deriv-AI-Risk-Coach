import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import {
    Shield,
    TrendingUp,
    Activity,
    Bot,
    Zap,
    Brain,
    BarChart2,
    CheckCircle,
    AlertTriangle,
    ArrowRight,
    Menu,
    X,
    Star
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">
            {/* 1. NAVBAR */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg' : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform">
                            <Zap className="w-5 h-5 text-white fill-current" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Risk Coach AI
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</button>
                        <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</button>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <SignedOut>
                            <button
                                onClick={() => navigate('/sign-in')}
                                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/sign-up')}
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                Get Started <ArrowRight className="w-4 h-4" />
                            </button>
                        </SignedOut>

                        <SignedIn>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Dashboard
                            </button>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
                        <button onClick={() => scrollToSection('features')} className="text-left text-slate-300 hover:text-white py-2">Features</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-left text-slate-300 hover:text-white py-2">Pricing</button>
                        <button onClick={() => scrollToSection('about')} className="text-left text-slate-300 hover:text-white py-2">About</button>

                        <SignedOut>
                            <button
                                onClick={() => navigate('/sign-in')}
                                className="w-full py-3 border border-slate-700 text-slate-300 rounded-lg"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/sign-up')}
                                className="w-full py-3 bg-blue-600 text-white text-center rounded-lg font-semibold"
                            >
                                Get Started
                            </button>
                        </SignedOut>

                        <SignedIn>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full py-3 bg-blue-600 text-white text-center rounded-lg font-semibold"
                            >
                                Dashboard
                            </button>
                        </SignedIn>
                    </div>
                )}
            </nav>

            {/* 2. HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 z-0"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Now Live for Deriv Traders
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            Stop Losing Money. <br />
                            <span className="text-blue-500">Start Trading Smarter.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            The first AI-powered risk coach that watches your trades 24/7, detects dangerous patterns like Martingale, and stops you before you blow your account.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <button
                                onClick={() => {
                                    console.log('Get Started clicked!');
                                    navigate('/sign-up');
                                }}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                            >
                                Start Free <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group">
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
                                </div>
                                Watch Demo
                            </button>
                        </div>

                        <div className="flex items-center gap-4 justify-center md:justify-start pt-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                                ))}
                            </div>
                            <p>Trusted by 10,000+ traders</p>
                        </div>
                    </div>

                    <div className="relative hidden md:block">
                        {/* Animated Cards */}
                        <div className="relative w-full h-[600px]">
                            {/* Card 1: Loss Warning */}
                            <div className="absolute top-10 right-10 bg-slate-800 p-4 rounded-xl border border-red-500/30 shadow-2xl w-72 animate-float-slow z-20">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-red-500/20 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">High Risk Detected</h3>
                                        <p className="text-xs text-red-400">Martingale Pattern</p>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-red-500 w-[85%]"></div>
                                </div>
                                <p className="text-xs text-slate-400">Risk Score: 85/100</p>
                            </div>

                            {/* Card 2: AI Coach */}
                            <div className="absolute top-40 left-0 bg-slate-800 p-4 rounded-xl border border-blue-500/30 shadow-2xl w-80 animate-float-delayed z-30">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                                        <Bot className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">AI Coach</h3>
                                        <p className="text-sm text-slate-300 leading-snug">
                                            "You've doubled your stake 3 times after losses. Stop now or you risk wiping 40% of your balance."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Success Stat */}
                            <div className="absolute bottom-20 right-20 bg-slate-800 p-4 rounded-xl border border-green-500/30 shadow-2xl w-64 animate-float z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl text-white">+24%</h3>
                                        <p className="text-xs text-green-400">Profit Protected</p>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500">Compared to average trader</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. HOW IT WORKS SECTION */}
            <section id="how-it-works" className="py-24 bg-slate-900 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                            Your AI Coach Never Sleeps
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Set it up in 60 seconds. Let the AI handle the risk management while you focus on the strategy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 z-0"></div>

                        {[
                            {
                                icon: <Zap className="w-6 h-6 text-white" />,
                                title: "Connect Deriv",
                                desc: "Securely connect your account with a read-only API token. We can't touch your funds."
                            },
                            {
                                icon: <Activity className="w-6 h-6 text-white" />,
                                title: "AI Monitors",
                                desc: "Our algorithms analyze every trade in real-time, looking for 20+ dangerous patterns."
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-white" />,
                                title: "Get Protected",
                                desc: "Receive instant alerts and clear advice before you make an emotional trading mistake."
                            }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center shadow-xl mb-6 group hover:border-blue-500/50 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FEATURES SECTION */}
            <section id="features" className="py-24 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase">Features</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
                            Everything You Need to Trade Safely
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Professional-grade risk management tools, now available for every retail trader.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
                                title: "Martingale Detection",
                                desc: "Instantly spots progressive staking patterns that wipe accounts and alerts you immediately.",
                                color: "red"
                            },
                            {
                                icon: <Brain className="w-6 h-6 text-purple-400" />,
                                title: "Psychology Alerts",
                                desc: "Detects emotional trading behaviors like revenge trading and tilt before they spiral.",
                                color: "purple"
                            },
                            {
                                icon: <Bot className="w-6 h-6 text-orange-400" />,
                                title: "DBot Analysis",
                                desc: "Monitors your automated trading bots for logic errors and runaway loss streaks.",
                                color: "orange"
                            },
                            {
                                icon: <Activity className="w-6 h-6 text-blue-400" />,
                                title: "Real-time Risk Score",
                                desc: "Live 0-100 safety score for your account based on exposure, drawdown, and win rate.",
                                color: "blue"
                            },
                            {
                                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                                title: "AI Explanations",
                                desc: "Get plain English coaching advice explaining exactly *why* a trade is risky.",
                                color: "yellow"
                            },
                            {
                                icon: <BarChart2 className="w-6 h-6 text-green-400" />,
                                title: "Deep Pattern Analytics",
                                desc: "Historical analysis of your trading behavior to identify your biggest weaknesses.",
                                color: "green"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-600 hover:bg-slate-750 transition-all hover:-translate-y-1 shadow-lg">
                                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {React.cloneElement(feature.icon, { className: `w-6 h-6 text-${feature.color}-400` })}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SOCIAL PROOF SECTION */}
            <section id="proof" className="py-24 bg-slate-900 border-y border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Trusted by Synthetic Index Traders
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "Saved me from a Martingale spiral that would have wiped $500. The alert popped up just in time.",
                                author: "Alex K.",
                                role: "Volatility 75 Trader"
                            },
                            {
                                quote: "The AI caught my overtrading habit in 10 minutes. It's like having a pro sitting next to me.",
                                author: "Sarah M.",
                                role: "Crash 500 Scalper"
                            },
                            {
                                quote: "Finally understand why I was losing money. The simple explanations are a game changer.",
                                author: "David R.",
                                role: "Boom 1000 Trader"
                            }
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-slate-800 p-8 rounded-2xl relative">
                                <div className="flex text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-400">
                                        {testimonial.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.author}</div>
                                        <div className="text-xs text-slate-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. PRICING SECTION */}
            <section id="pricing" className="py-24 bg-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-slate-400">Start free, upgrade when you're ready.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Bronze */}
                        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col">
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">Bronze</h3>
                            <div className="text-4xl font-bold text-white mb-6">Free</div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> Basic Risk Scoring
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> 1 Account Connected
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> Daily Stats
                                </li>
                            </ul>
                            <button onClick={() => navigate('/sign-up')} className="w-full py-3 border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">Start Free</button>
                        </div>

                        {/* Silver */}
                        <div className="bg-slate-800 rounded-2xl p-8 border-2 border-blue-500 relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-blue-500/10">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                Most Popular
                            </div>
                            <h3 className="text-xl font-semibold text-blue-400 mb-2">Silver</h3>
                            <div className="text-4xl font-bold text-white mb-6">$19<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-5 h-5 text-blue-500" /> Real-time AI Alerts
                                </li>
                                <li className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-5 h-5 text-blue-500" /> Martingale Detection
                                </li>
                                <li className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-5 h-5 text-blue-500" /> 3 Accounts
                                </li>
                                <li className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-5 h-5 text-blue-500" /> Advanced Analytics
                                </li>
                            </ul>
                            <button onClick={() => navigate('/sign-up')} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Get Started</button>
                        </div>

                        {/* Gold */}
                        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col">
                            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Gold</h3>
                            <div className="text-4xl font-bold text-white mb-6">$49<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-yellow-500" /> Everything in Silver
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-yellow-500" /> Unlimited Accounts
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-yellow-500" /> Priority Support
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-yellow-500" /> Custom Risk Rules
                                </li>
                            </ul>
                            <button onClick={() => navigate('/sign-up')} className="w-full py-3 border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOOTER */}
            <footer className="py-12 bg-slate-950 border-t border-slate-900 text-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white fill-current" />
                            </div>
                            <span className="text-lg font-bold text-white">Risk Coach AI</span>
                        </div>

                        <div className="flex gap-8 text-slate-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>

                        <div className="text-slate-500">
                            Built for <span className="text-slate-300 font-semibold">Deriv Hackathon 2025</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
