'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import usePortfolio from '@/hooks/usePortfolio'
import PortfolioCard from './PortfolioCard'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

export default function PortfolioShowcase() {
  const {
    projects,
    certificates,
    techStacks,
    loading,
  } = usePortfolio()

  const [activeTab, setActiveTab] =
    useState('projects')

  const [previewOpen, setPreviewOpen] =
    useState(false)

  const [previewImage, setPreviewImage] =
    useState('')

  const [showAllProjects, setShowAllProjects] =
    useState(false)

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, 3)

  return (
    <>
      {/* PREVIEW */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center px-6"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>

            <motion.img
              initial={{
                scale: 0.92,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.92,
                opacity: 0,
              }}
              transition={{ duration: 0.35 }}
              src={previewImage}
              className="max-w-[88vw] max-h-[88vh] rounded-3xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="portfolio"
        className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 pt-24 pb-24 text-white"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Portfolio Showcase
          </h1>

          <p className="text-white/55 max-w-xl mx-auto text-sm md:text-base">
            Explore my journey through projects,
            certifications, and technical expertise.
          </p>
        </motion.div>

        {/* TAB */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-3xl rounded-full border border-white/10 bg-white/5 p-2 flex gap-2 backdrop-blur-xl">
            {[
              'projects',
              'certificates',
              'techstack',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)

                  if (tab !== 'projects') {
                    setShowAllProjects(false)
                  }
                }}
                className={`flex-1 rounded-full py-3 text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab === 'projects'
                  ? 'Projects'
                  : tab === 'certificates'
                  ? 'Certificates'
                  : 'Tech Stack'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
          >
            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <motion.div
                  layout
                  transition={{
                    layout: {
                      duration: 0.75,
                      ease: smoothEase,
                    },
                  }}
                  className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 px-1"
                >
                  <AnimatePresence mode="popLayout">
                    {!loading &&
                      displayedProjects.map(
                        (item, i) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{
                              opacity: 0,
                              y: 40,
                              scale: 0.96,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              y: -30,
                              scale: 0.95,
                            }}
                            transition={{
                              duration: 0.55,
                              delay: i * 0.04,
                              ease: smoothEase,
                            }}
                          >
                            <PortfolioCard
                              index={i}
                              title={item.title}
                              description={
                                item.description
                              }
                              image={item.image_url}
                              live_url={item.live_url}
                              id={item.id}
                            />
                          </motion.div>
                        )
                      )}
                  </AnimatePresence>
                </motion.div>

                {/* SEE MORE / LESS */}
                {!loading &&
                  projects.length > 3 && (
                    <motion.div
                      layout
                      transition={{
                        duration: 0.6,
                        ease: smoothEase,
                      }}
                      className="flex justify-center"
                    >
                      <motion.button
                        layout
                        whileHover={{
                          scale: 1.04,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={() =>
                          setShowAllProjects(
                            !showAllProjects
                          )
                        }
                        className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl text-sm text-white/75 hover:text-white transition flex items-center gap-2"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={
                              showAllProjects
                                ? 'less'
                                : 'more'
                            }
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -8,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className="flex items-center gap-2"
                          >
                            {showAllProjects ? (
                              <>
                                <ChevronUp
                                  size={16}
                                />
                                See Less
                              </>
                            ) : (
                              <>
                                <ChevronDown
                                  size={16}
                                />
                                See More
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  )}
              </div>
            )}

            {/* CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 px-1">
                {!loading &&
                  certificates.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: 25,
                        scale: 0.96,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.04,
                      }}
                      whileHover={{ y: -4 }}
                      onClick={() => {
                        setPreviewImage(
                          item.image_url
                        )
                        setPreviewOpen(true)
                      }}
                      className="group cursor-pointer rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                    >
                      <div className="rounded-2xl overflow-hidden border border-white/10 h-56">
                        <img
                          src={item.image_url}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      <h3 className="mt-4 text-[15px] font-semibold text-center text-white/90">
                        {item.title}
                      </h3>
                    </motion.div>
                  ))}
              </div>
            )}

            {/* TECH STACK */}
            {/* TECH STACK */}
{activeTab === 'techstack' && (
  <div className="min-h-[360px] flex justify-center">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl w-full">
      {!loading &&
        techStacks?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.04,
            }}
            whileHover={{
              y: -5,
              scale: 1.04,
            }}
            className="group rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center gap-3 h-[125px] w-[125px] mx-auto"
          >
            <div className="relative flex items-center justify-center">
              {/* GLOW */}
              <div className="absolute w-[70px] h-[70px] rounded-full bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {item.logo_url ? (
                <img
                  src={item.logo_url}
                  alt={item.name}
                  className="relative z-10 w-[56px] h-[56px] object-contain"
                />
              ) : (
                <div className="relative z-10 w-[56px] h-[56px] rounded-2xl bg-white/10" />
              )}
            </div>

            <p className="text-[11px] text-white/80 text-center leading-tight px-2 line-clamp-1">
              {item.name}
            </p>
          </motion.div>
        ))}
    </div>
  </div>
)}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}