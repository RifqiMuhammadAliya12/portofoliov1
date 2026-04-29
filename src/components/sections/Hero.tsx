'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import App from '@/components/band/App'

const skills = ['Typescript', 'React.js', 'Tailwind']

export default function Hero() {
  const [showApp, setShowApp] = useState(false)
  const [startAnim, setStartAnim] = useState(false)

  useEffect(() => {
  const heroPlayed = sessionStorage.getItem('heroPlayed')

  if (heroPlayed === 'true') {
    setStartAnim(true)
    setShowApp(true)
    return
  }

  const delay = 3600

  const textTimer = setTimeout(() => {
    setStartAnim(true)
  }, delay)

  const appTimer = setTimeout(() => {
    setShowApp(true)

    // 🔥 simpan setelah animasi selesai
    sessionStorage.setItem('heroPlayed', 'true')
  }, delay + 1500)

  return () => {
    clearTimeout(textTimer)
    clearTimeout(appTimer)
  }
}, [])

  return (
    <section
      id="home"
      className="px-6 md:pl-[120px] md:pr-[60px]"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* APP LAYER */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 40,
          pointerEvents: showApp ? 'auto' : 'none',
        }}
      >
        {showApp && <App />}
      </div>

      {/* TEXT */}
      <div
        className="md:max-w-[600px]"
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* LABEL */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 30, filter: 'blur(12px)' }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 20 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            ✦ Available for work
          </span>
        </motion.div>

        {/* HEADING */}
        <div>
          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.85, y: 50 }
            }
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: 'clamp(32px, 6vw, 62px)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: 0,
            }}
          >
            Frontend
          </motion.h1>

          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, x: 0, rotate: 0 }
                : { opacity: 0, x: -80, rotate: -4 }
            }
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: 'clamp(32px, 6vw, 62px)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--text-secondary)',
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}
          >
            Developer
          </motion.h1>
        </div>

        {/* STATUS */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 40 }
          }
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginBottom: 12 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: 'var(--text-secondary)',
              letterSpacing: '0.1em',
            }}
          >
            — Fresh Graduate
          </span>
        </motion.div>

        {/* DESC */}
        {/* DESC */}
<motion.div
  initial={false}
  animate={
    startAnim
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 50, scale: 0.96 }
  }
  transition={{ duration: 1, delay: 0.5 }}
  style={{
    marginBottom: 28,
    width: '100%',
    maxWidth: 420, // batas lebar biar jadi 3 baris
  }}
>
  <p
    style={{
      fontSize: 14,
      color: 'var(--text-secondary)',
      lineHeight: 1.9,
      letterSpacing: '0.01em',
      textWrap: 'pretty',
    }}
  >
    Menciptakan website modern dengan tampilan clean,
    responsif, dan elegan. Mengubah ide dan desain menjadi
    pengalaman digital yang menarik dan mudah digunakan.
  </p>
</motion.div>

        {/* SKILLS */}
        <motion.div
          initial="hidden"
          animate={startAnim ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.7,
              },
            },
          }}
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.85 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                padding: '5px 12px',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 25 }
          }
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: 'var(--text-muted)',
            }}
          >
            ↓ explore my work below
          </span>

          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: 'var(--text-muted)',
            }}
          >
            ↗ open to full-time & freelance opportunities
          </span>
        </motion.div>
      </div>
    </section>
  )
}