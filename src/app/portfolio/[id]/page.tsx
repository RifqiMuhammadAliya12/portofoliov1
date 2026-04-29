// ====== PORTFOLIO DETAIL PAGE ======
// src/app/portfolio/[id]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Sparkles,
  Code2,
  Layers,
  X,
} from 'lucide-react'

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [project, setProject] = useState<any>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    setProject(data)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  const tech = (project.technologies || '')
    .split(',')
    .filter((t: string) => t.trim() !== '')

  const features = (project.key_features || '')
    .split(',')
    .filter((f: string) => f.trim() !== '')

  const galleryImages =
    project.image_urls && Array.isArray(project.image_urls)
      ? project.image_urls
      : project.image_url
      ? [project.image_url]
      : []

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1)
    }
  }

  const handleBack = () => {
    sessionStorage.setItem('skipIntroOnce', 'true')
    router.push('/#portfolio')
  }

  return (
    <>
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <motion.img
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[currentImage]}
              className="max-w-[85vw] max-h-[80vh] rounded-3xl object-contain"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#0a0a0a] text-white px-6 md:px-10 lg:px-16 py-8"
      >
        {/* BACK */}
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition mb-8"
        >
          <ArrowLeft size={14} />
          Back
        </motion.button>

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[620px]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-[28px] md:text-[38px] font-bold leading-tight tracking-tight mb-3"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 65 }}
              transition={{ duration: 0.8 }}
              className="h-[2px] rounded-full bg-white/20 mb-5"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-[12px] leading-6 text-white/60 text-justify mb-7"
            >
              {project.description}
            </motion.p>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-3 mb-7 max-w-[420px]"
            >
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-[#101010] border border-white/10 rounded-2xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Code2 size={16} />
                </div>

                <div>
                  <p className="text-base font-semibold">{tech.length}</p>
                  <p className="text-[10px] text-white/40">
                    Technologies Used
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="bg-[#101010] border border-white/10 rounded-2xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Layers size={16} />
                </div>

                <div>
                  <p className="text-base font-semibold">{features.length}</p>
                  <p className="text-[10px] text-white/40">Key Features</p>
                </div>
              </motion.div>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-7"
            >
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101010] border border-white/10 hover:bg-white/5 transition text-sm"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101010] border border-white/10 text-white/40 text-sm">
                  <ExternalLink size={14} />
                  No Link
                </div>
              )}

              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101010] border border-white/10 hover:bg-white/5 transition text-sm"
                >
                  <GitBranch size={14} />
                  Github
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101010] border border-white/10 text-white/40 text-sm">
                  <GitBranch size={14} />
                  No Link
                </div>
              )}
            </motion.div>

            {/* TECH */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={14} className="text-white/70" />
                <p className="text-[13px] font-semibold">
                  Technologies Used
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {tech.map((t: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -1 }}
                    className="px-3 py-1.5 rounded-xl bg-[#101010] border border-white/10 text-[11px] text-white/75"
                  >
                    {t.trim()}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="w-full"
          >
            {/* IMAGE */}
            {galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-5"
              >
                <div className="relative rounded-[26px] overflow-hidden border border-white/10 bg-[#101010] max-w-[560px] mx-auto">
                  <motion.img
                    key={currentImage}
                    initial={{ opacity: 0.4, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={galleryImages[currentImage]}
                    onClick={() => setPreviewOpen(true)}
                    className="w-full h-[220px] md:h-[250px] object-cover cursor-pointer"
                  />

                  {currentImage > 0 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  {currentImage < galleryImages.length - 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>

                {galleryImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {galleryImages.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`rounded-full transition-all ${
                          currentImage === i
                            ? 'w-6 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* FEATURES */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -2 }}
              className="bg-[#101010] border border-white/10 rounded-3xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-white/70" />
                <p className="text-sm font-semibold">Key Features</p>
              </div>

              <ul className="space-y-2.5 text-[12px] text-white/65 leading-6">
                {features.map((f: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <span className="text-white/35">•</span>
                    <span>{f.trim()}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}