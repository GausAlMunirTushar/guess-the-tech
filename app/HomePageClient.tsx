'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePageClient() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B0F19] to-[#1A202C] font-sans p-4">
      <main className="flex flex-col items-center justify-center w-full max-w-3xl gap-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#E5E7EB] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">
            Guess the Tech
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-md mx-auto">
            Test your knowledge of programming languages, frameworks, and tools
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md space-y-6"
        >
          <Link href="/game?mode=classic" className="block">
            <Button className="w-full py-7 text-lg bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] rounded-2xl h-16 text-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="mr-2">🎮</span> Classic Mode
            </Button>
          </Link>
          
          <Link href="/game?mode=time-attack" className="block">
            <Button className="w-full py-7 text-lg bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] rounded-2xl h-16 text-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="mr-2">⏱️</span> Time Attack Mode
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md"
        >
          <Link href="/leaderboard" className="flex-1">
            <Button variant="outline" className="w-full text-[#E5E7EB] border-[#3B82F6] hover:bg-[#111827] hover:text-[#22D3EE] transition-colors">
              <span className="mr-2">🏆</span> Leaderboard
            </Button>
          </Link>
          <Link href="/settings" className="flex-1">
            <Button variant="outline" className="w-full text-[#E5E7EB] border-[#3B82F6] hover:bg-[#111827] hover:text-[#22D3EE] transition-colors">
              <span className="mr-2">⚙️</span> Settings
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center text-sm text-[#9CA3AF]"
        >
          <p>How well do you know your tech stack?</p>
        </motion.div>
      </main>
    </div>
  );
}