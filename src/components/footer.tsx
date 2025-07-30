'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, PinIcon as Pinterest, WebcamIcon as Skype } from 'lucide-react'
import Link from "next/link"
import { motion } from 'framer-motion'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = footerRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer
      ref={footerRef}
      className="bg-[#2A254B] text-white px-6 py-16 md:px-12"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Menu Column */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-base font-normal">Menu</h3>
            <nav className="flex flex-col space-y-4">
              <Link href="#">New arrivals</Link>
              <Link href="#">Best sellers</Link>
              <Link href="#">Recently viewed</Link>
              <Link href="#">Popular this week</Link>
              <Link href="#">All products</Link>
            </nav>
          </motion.div>

          {/* Categories Column */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-base font-normal">Categories</h3>
            <nav className="flex flex-col space-y-4">
              <Link href="#">Crockery</Link>
              <Link href="#">Furniture</Link>
              <Link href="#">Homeware</Link>
              <Link href="#">Plant pots</Link>
              <Link href="#">Chairs</Link>
              <Link href="#">Crockery</Link>
            </nav>
          </motion.div>

          {/* Our Company Column */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-base font-normal">Our company</h3>
            <nav className="flex flex-col space-y-4">
              <Link href="/about">About us</Link>
              <Link href="/products">Vacancies</Link>
              <Link href="/cart">Contact us</Link>
              <Link href="/product-listing">Privacy</Link>
              <Link href="/">Returns policy</Link>
            </nav>
          </motion.div>

          {/* Join Mailing List */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-base font-normal">Join our mailing list</h3>
            <div className="flex gap-2 w-full">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-[#393653] border-none text-white placeholder:text-gray-400 h-12 w-full"
              />
              <Button 
                className="bg-white text-black hover:bg-gray-100 h-12 px-6 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Sign up
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-[#4E4D93]"
          variants={itemVariants}
        >
          <p className="text-sm mb-6 md:mb-0">Copyright 2022 Avion LTD</p>
          <div className="flex items-center space-x-6">
            <Link href="https://www.linkedin.com/in/alishba-musharraf-9241012b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#"><Facebook className="w-5 h-5" /></Link>
            <Link href="#"><Instagram className="w-5 h-5" /></Link>
            <Link href="#"><Skype className="w-5 h-5" /></Link>
            <Link href="#"><Twitter className="w-5 h-5" /></Link>
            <Link href="#"><Pinterest className="w-5 h-5" /></Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
