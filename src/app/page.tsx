"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  BookOpen, 
  Bot, 
  ShieldCheck, 
  Users, 
  Zap,
  Globe,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* Floating Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <nav className="flex items-center justify-between px-6 py-4 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-sky-900/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-600/30">
              <BookOpen className="text-white h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-sky-950 uppercase italic">CMS Portal</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-sky-900/60 uppercase tracking-widest">
            <a href="#features" className="hover:text-sky-600 transition-colors">Vision</a>
            <a href="#ai" className="hover:text-sky-600 transition-colors">AI Suite</a>
            <a href="#security" className="hover:text-sky-600 transition-colors">Security</a>
          </div>
          <Link href="/login">
            <Button className="rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold h-11 px-8 shadow-lg shadow-sky-600/20 active:scale-95 transition-all">
              Launch Portal
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 pt-32">
        {/* HERO SECTION */}
        <section className="relative px-6 py-20 lg:py-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] mb-4">
              <Zap className="h-3 w-3 fill-sky-600" />
              The Next Evolution of Institutional Management
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-sky-950 leading-[0.9] italic">
              Empowering <span className="text-sky-600">Brains,</span><br />
              Simplifying <span className="underline decoration-sky-300 decoration-8 underline-offset-8">Systems.</span>
            </h1>
            <p className="mt-8 text-xl text-sky-700/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Experience the world's most intuitive College Management System. Built with military-grade security and integrated Gemini AI for a truly smart campus.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="rounded-2xl bg-sky-950 hover:bg-black text-white h-16 px-10 text-lg font-black group transition-all shadow-2xl shadow-sky-950/20">
                  Login to Institution
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-2xl border-sky-200 text-sky-950 h-16 px-10 text-lg font-black hover:bg-sky-50 active:scale-95 transition-all outline-none">
                Request Demo
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="mt-20 flex flex-wrap justify-center items-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="flex items-center gap-2 text-2xl font-black italic"><Globe className="h-6 w-6" /> GLOBAL UNIV</div>
               <div className="flex items-center gap-2 text-2xl font-black italic"><Plus className="h-6 w-6" /> TECH-EDU</div>
               <div className="flex items-center gap-2 text-2xl font-black italic"><Bot className="h-6 w-6" /> AI-ACADEMY</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-24 w-full max-w-6xl rounded-[3rem] border border-white bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative"
          >
            <div className="w-full aspect-video bg-gradient-to-br from-sky-400 to-blue-800 p-1 flex items-center justify-center">
               <div className="w-full h-full bg-slate-50 rounded-[2.8rem] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-sky-900/5 group-hover:bg-transparent transition-all"></div>
                  <div className="text-sky-900 font-black text-4xl italic uppercase opacity-20">Software Interface Preview</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all group/play">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                           <ArrowRight className="text-sky-600 h-8 w-8" />
                        </motion.div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="px-6 py-32 bg-slate-50/50">
           <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-left">
              {[
                { 
                  icon: ShieldCheck, 
                  title: "Institutional Guard", 
                  desc: "Enterprise-grade authorization loops and Supabase RLS protection for sensitive student & financial data." 
                },
                { 
                  icon: Bot, 
                  title: "AI Study Engine", 
                  desc: "Google Gemini powered document analysis and smart grading flows to reduce teacher workload by 60%." 
                },
                { 
                  icon: Users, 
                  title: "Unified Portal", 
                  desc: "One single glass-pane view for Students, Teachers, and Admins to manage the entire campus lifecycle." 
                }
              ].map((f, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-sky-100 shadow-xl shadow-sky-900/5 hover:-translate-y-4 transition-all duration-500 group">
                   <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-sky-600 transition-colors">
                      <f.icon className="text-sky-600 h-7 w-7 group-hover:text-white transition-colors" />
                   </div>
                   <h3 className="text-2xl font-black text-sky-950 mb-4 italic italic">{f.title}</h3>
                   <p className="text-sky-700/60 font-medium leading-relaxed italic">{f.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* CTA FOOTER */}
        <section className="px-6 py-40 flex flex-col items-center">
           <div className="w-full max-w-4xl rounded-[4rem] bg-sky-950 p-16 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(12,74,110,0.4)]">
              <div className="relative z-10 space-y-8">
                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1] italic">The Future of Education<br />is <span className="text-sky-400">Collaborative.</span></h2>
                 <p className="text-sky-200/60 text-lg font-medium italic">Join 100+ institutions using our CMS platform to drive excellence performance.</p>
                 <Link href="/login">
                   <Button size="lg" className="rounded-2xl bg-white text-sky-950 hover:bg-sky-50 h-16 px-12 text-xl font-black shadow-2xl shadow-white/10 active:scale-95 transition-all italic">
                      Get Started Free
                   </Button>
                 </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px]"></div>
           </div>
           
           <footer className="mt-40 w-full pt-10 border-t border-sky-50 text-center">
              <p className="text-xs font-black text-sky-300 uppercase tracking-[0.4em] mb-4">Official Institutional Software v1.0.0</p>
              <div className="flex justify-center gap-10 text-xs font-bold text-sky-950/40 uppercase tracking-widest pb-20">
                 <a href="#">Privacy</a>
                 <a href="#">Terms</a>
                 <a href="#">Compliance</a>
              </div>
           </footer>
        </section>
      </main>
    </div>
  )
}
