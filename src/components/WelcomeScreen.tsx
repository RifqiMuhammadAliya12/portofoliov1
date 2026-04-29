'use client'

import { motion } from 'framer-motion'
import { Code2, User, Globe } from 'lucide-react'

export default function WelcomeScreen() {
  const icons = [Code2, User, Globe]

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          textAlign: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        {/* ICONS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.35,
              },
            },
          }}
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.3,
                  rotate: -140,
                  y: 60,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: 0,
                },
              }}
              transition={{
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              animate={{
                y: [0, -6, 0],
                rotate: [0, 2, -2, 0],
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Icon size={18} color="white" />
            </motion.div>
          ))}
        </motion.div>

        {/* TEXT */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            {/* Welcome */}
            <motion.span
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.2,
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontSize: 'clamp(18px, 3vw, 30px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
              }}
            >
              Welcome
            </motion.span>

            {/* to my */}
            <motion.span
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.5,
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontSize: 'clamp(18px, 3vw, 30px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
              }}
            >
              to my
            </motion.span>
          </div>

          {/* Portfolio */}
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.8,
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: 'clamp(18px, 3vw, 30px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.15,
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Portfolio Website
          </motion.h1>
        </div>

        {/* DOMAIN CAPSULE */}
        <motion.div
  initial={{ opacity: 0, y: -40 }} // ⬅️ dari atas
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 2.1,
    duration: 1.6,
    ease: [0.22, 1, 0.36, 1],
  }}
  style={{
    padding: '6px 14px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(10px)',
    fontSize: '12px',
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.7)',
  }}
>
  www.rifqi.vercel.app
</motion.div>
      </motion.div>
    </div>
  )
}