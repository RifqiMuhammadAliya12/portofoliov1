'use client'

import { useState } from 'react'
import {
  motion,
  AnimatePresence,
} from 'framer-motion'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Upload,
  Heart,
} from 'lucide-react'
import useComments from '@/hooks/useComments'

export default function ContactSection() {
  const {
    comments,
    loading,
    addComment,
    likeComment,
  } = useComments()

  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!name.trim()) return
    if (!comment.trim()) return

    await addComment({
      name,
      comment,
      image,
    })

    setName('')
    setComment('')
    setImage(null)
    setPreview(null)
  }

  return (
    <section
      id="contact"
      className="w-full max-w-[1500px] mx-auto px-8 md:px-12 lg:px-20 pt-28 pb-36 text-white"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Contact Me
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="text-white/55 max-w-2xl mx-auto"
          >
            Have something in mind? Send a message and
            let's connect.
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="grid lg:grid-cols-[430px_1fr] gap-8">
        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -2,
          }}
          className="rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.7,
            }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">
              Hubungi Saya
            </h2>

            <p className="text-sm text-white/50 leading-relaxed mb-8">
              Feel free to reach out if you want to
              collaborate, discuss ideas, or simply say
              hello.
            </p>
          </motion.div>

          <div className="space-y-4 mb-8">
            {[
              {
                icon: User,
                placeholder: 'Your Name',
                delay: 0.12,
                type: 'input',
              },
              {
                icon: Mail,
                placeholder: 'Your Email',
                delay: 0.18,
                type: 'input',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: item.delay,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -2,
                }}
                viewport={{ once: true }}
                className="relative"
              >
                <item.icon
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />

                <input
                  placeholder={item.placeholder}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 py-4 outline-none transition-all duration-500 focus:border-white/20 focus:bg-white/[0.03]"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{
                opacity: 0,
                y: 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.24,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -2,
              }}
              viewport={{ once: true }}
              className="relative"
            >
              <MessageSquare
                size={16}
                className="absolute left-4 top-5 text-white/35"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 py-4 outline-none resize-none transition-all duration-500 focus:border-white/20 focus:bg-white/[0.03]"
              />
            </motion.div>

            <motion.button
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              whileHover={{
                y: -2,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.99,
              }}
              viewport={{ once: true }}
              className="w-full rounded-2xl py-4 bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </div>

          <div className="border-t border-white/10 pt-6 mt-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.35,
                duration: 0.7,
              }}
              viewport={{ once: true }}
              className="text-sm text-white/55 mb-4"
            >
              Connect With Me
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.7,
              }}
              whileHover={{
                y: -2,
              }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 mb-3"
            >
              <p className="text-sm font-medium">
                LinkedIn
              </p>

              <p className="text-xs text-white/35">
                @linkedin
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  title: 'Instagram',
                  user: '@instagram',
                },
                {
                  title: 'Youtube',
                  user: '@youtube',
                },
                {
                  title: 'Github',
                  user: '@github',
                },
                {
                  title: 'TikTok',
                  user: '@tiktok',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.45 + i * 0.05,
                    duration: 0.7,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-black/20 p-3"
                >
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="text-[11px] text-white/35 mt-1">
                    {item.user}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* COMMENTS */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -2,
          }}
          className="rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.7,
            }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="text-2xl font-semibold mb-1">
              Comments
            </h3>

            <p className="text-sm text-white/40">
              Leave your thoughts here
            </p>
          </motion.div>

          {/* FORM */}
          <div className="space-y-4 mb-6">
            <motion.input
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.7,
              }}
              whileHover={{
                y: -2,
              }}
              viewport={{ once: true }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none transition-all duration-500 focus:border-white/20 focus:bg-white/[0.03]"
            />

            <motion.textarea
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.18,
                duration: 0.7,
              }}
              whileHover={{
                y: -2,
              }}
              viewport={{ once: true }}
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your Comment"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none resize-none transition-all duration-500 focus:border-white/20 focus:bg-white/[0.03]"
            />

            <motion.label
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.24,
                duration: 0.7,
              }}
              whileHover={{
                y: -2,
              }}
              viewport={{ once: true }}
              className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4 flex items-center gap-3 cursor-pointer"
            >
              <Upload size={18} />

              <span className="text-sm text-white/65">
                Upload Image
              </span>

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </motion.label>

            <AnimatePresence>
              {preview && (
                <motion.img
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  src={preview}
                  alt="preview"
                  className="rounded-2xl h-44 w-full object-cover border border-white/10"
                />
              )}
            </AnimatePresence>

            <motion.button
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              whileHover={{
                y: -2,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.99,
              }}
              viewport={{ once: true }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl py-4 bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </motion.button>
          </div>

          {/* COMMENTS BOX */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 0.35,
              duration: 0.7,
            }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-white/10 bg-black/20 p-3 h-[420px] overflow-y-auto custom-scroll"
          >
            <div className="space-y-3">
              <AnimatePresence>
                {comments.map((item, i) => {
                  const liked =
                    typeof window !== 'undefined' &&
                    localStorage.getItem(
                      `liked-${item.id}`
                    )

                  return (
                    <motion.div
                      key={item.id || i}
                      layout
                      initial={{
                        opacity: 0,
                        y: 30,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -18,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      className={`rounded-[24px] border p-4 ${
                        item.is_pinned
                          ? 'border-purple-500/30 bg-purple-500/5'
                          : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex gap-3">
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold shrink-0"
                        >
                          {item.name?.charAt(0)}
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium">
                                  {item.name}
                                </p>

                                {item.is_pinned && (
                                  <div className="text-[9px] px-2 py-[2px] rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20">
                                    PINNED
                                  </div>
                                )}
                              </div>

                              <p className="text-[13px] text-white/55 leading-relaxed">
                                {item.comment}
                              </p>

                              {item.image_url && (
                                <motion.img
                                  initial={{
                                    opacity: 0,
                                    scale: 0.97,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                  }}
                                  transition={{
                                    duration: 0.45,
                                  }}
                                  src={item.image_url}
                                  alt="comment"
                                  className="mt-3 rounded-xl w-full max-h-56 object-cover border border-white/10"
                                />
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <span className="text-[10px] text-white/30">
                                {new Date(
                                  item.created_at
                                ).toLocaleDateString()}
                              </span>

                              <motion.button
                                whileHover={{
                                  scale: 1.08,
                                }}
                                whileTap={{
                                  scale: 0.95,
                                }}
                                onClick={() =>
                                  likeComment(
                                    item.id,
                                    item.likes
                                  )
                                }
                                disabled={!!liked}
                                className={`flex items-center gap-1 text-[11px] ${
                                  liked
                                    ? 'text-pink-400'
                                    : 'text-white/40 hover:text-white'
                                }`}
                              >
                                <Heart
                                  size={13}
                                  fill={
                                    liked
                                      ? 'currentColor'
                                      : 'none'
                                  }
                                />

                                {item.likes || 0}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}