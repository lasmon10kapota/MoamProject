import { Head, Link } from '@inertiajs/react';
import AppLogo from '../components/app-logo';

export default function Welcome() {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC]">
                {/* Hero Section */}
                <section className="w-full bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-[#1a2e05] dark:via-[#161615] dark:to-[#1a2e05] px-6 py-16 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
                        {/* Left: Text & CTA */}
                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

                            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                                Empowering <span className="text-green-700 dark:text-green-400">Malawi's Minibus Owners</span>
                            </h1>
                            <p className="text-lg sm:text-xl mb-8 max-w-xl text-gray-700 dark:text-gray-200">
                                Join MOAMS to drive safe, efficient, and modern public transport across Malawi.
                            </p>
                            <div className="flex gap-4 justify-center md:justify-start">
                                <Link href={route('register')} className="px-8 py-3 rounded-lg bg-green-700 text-white font-bold shadow-lg hover:bg-green-800 transition text-lg">Sign Up Now</Link>
                                <Link href="#about" className="px-8 py-3 rounded-lg border-2 border-green-700 text-green-700 font-bold bg-white hover:bg-green-50 dark:bg-[#161615] dark:border-green-400 dark:text-green-400 transition text-lg">Learn More</Link>
                            </div>
                        </div>
                        {/* Right: Hero Image */}
                        <div className="flex-1 flex flex-col items-center justify-center md:justify-end mt-10 md:mt-0">
                            <img src="assets/logos/MoamLogo.png" alt="MOAM Hero" className="w-56 h-56 object-contain drop-shadow-xl rounded-xl bg-white/80 dark:bg-[#232323]/80 p-4" />
                            <Link href={route('login')} className="mt-4 px-8 py-3 min-w-[200px] rounded-lg bg-blue-700 text-white font-bold shadow-lg hover:bg-blue-800 transition text-lg text-center">Log In</Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="flex flex-col items-center py-12 px-4 w-full bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-[#1a2e05] dark:via-[#161615] dark:to-[#1a2e05]">
                    <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
                        <div className="bg-white/80 dark:bg-[#232323]/80 rounded-lg shadow p-6 flex flex-col items-center">
                            <img src="assets/logos/twocars.png" alt="Two Minibuses" className="rounded-lg shadow mb-4 w-32 h-24 object-cover border border-green-700" />
                            <h2 className="text-xl font-semibold mb-2">What is MOAM?</h2>
                            <p className="text-center text-gray-700 dark:text-gray-200">Minibus Owners Association of Malawi, formed by minibus owners to promote efficient and safe public transport in Malawi.</p>
                        </div>
                        <div className="bg-white/80 dark:bg-[#232323]/80 rounded-lg shadow p-6 flex flex-col items-center">
                            <img src="assets/logos/manOnphone.jpg" alt="Man on Phone" className="rounded-lg shadow mb-4 w-32 h-24 object-cover" />
                            <h2 className="text-xl font-semibold mb-2">What is MOAMS?</h2>
                            <p className="text-center text-gray-700 dark:text-gray-200">The Minibus Owners Association Management System is an easy and convenient way to register and manage your membership online.</p>
                        </div>
                        <div className="bg-white/80 dark:bg-[#232323]/80 rounded-lg shadow p-6 flex flex-col items-center">
                            <img src="assets/logos/safetylogo.jpg" alt="Safety Logo" className="rounded-lg shadow mb-4 w-32 h-32 object-contain bg-white dark:bg-[#161615] p-4" />
                            <h2 className="text-xl font-semibold mb-2">What is the role of MOAM?</h2>
                            <p className="text-center text-gray-700 dark:text-gray-200">MOAM serves as a quality check and represents the minibus transport sector to other stakeholders, including the government.</p>
                            <p className="text-center text-green-700 font-semibold mt-2">Want to join? It's simple and affordable. Register now!</p>
                        </div>
                    </div>
                </section>

                {/* Registration Steps */}
                <section className="py-10 px-4 w-full bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-[#1a2e05] dark:via-[#161615] dark:to-[#1a2e05] flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">How to Register</h2>
                    <ol className="flex flex-wrap justify-center gap-4 text-base font-medium">
                        <li className="flex items-center">1. Create account <span className="mx-2">→</span></li>
                        <li className="flex items-center">2. Log in <span className="mx-2">→</span></li>
                        <li className="flex items-center">3. Provide details <span className="mx-2">→</span></li>
                        <li className="flex items-center">4. Submit <span className="mx-2">→</span></li>
                        <li className="flex items-center">5. Make payment <span className="mx-2">→</span></li>
                        <li>6. Done!</li>
                    </ol>
                </section>

                {/* Contact/Info Section */}
                <section className="py-8 px-4 flex flex-col items-center w-full bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-[#1a2e05] dark:via-[#161615] dark:to-[#1a2e05]">
                    <h2 className="text-xl font-semibold mb-2">Want more information?</h2>
                    <div className="bg-white/80 dark:bg-[#232323]/80 rounded-lg shadow p-4 max-w-xl w-full text-center">
                        <p className="mb-1"><b>Association name:</b> Minibus Owners Association</p>
                        <p className="mb-1"><b>Address:</b> P.O. Box 51160, Limbe, Blantyre, Malawi</p>
                        <p id="about" className="mb-1"><b>Phone:</b> 0998 62 26 60 / 0888 841 195</p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="w-full py-4 bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-[#1a2e05] dark:via-[#161615] dark:to-[#1a2e05] text-center text-sm text-gray-700 dark:text-gray-300 mt-auto">
                    © {new Date().getFullYear()} Minibus Owners Association of Malawi. All rights reserved.
                </footer>
            </div>
        </>
    );
}