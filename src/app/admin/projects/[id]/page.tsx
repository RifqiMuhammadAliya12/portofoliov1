"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

import {
  Code2,
  Layers,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>({});
  const [currentImage, setCurrentImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    setProject(data);
    setForm(data);
  };

  const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Hapus project?",
    text: "Project yang dihapus tidak bisa dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    background: "#101010",
    color: "#fff",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#27272a",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (!error) {
    await Swal.fire({
      title: "Berhasil!",
      text: "Project berhasil dihapus.",
      icon: "success",
      timer: 1800,
      showConfirmButton: false,
      background: "#101010",
      color: "#fff",
    });

    router.push("/admin/projects");
  } else {
    Swal.fire({
      title: "Gagal",
      text: "Project gagal dihapus.",
      icon: "error",
      background: "#101010",
      color: "#fff",
    });
  }
};

  const handleUpdate = async () => {
  const { error } = await supabase
    .from("projects")
    .update(form)
    .eq("id", id);

  if (!error) {
    setProject(form);
    setEditMode(false);

    Swal.fire({
      title: "Berhasil",
      text: "Project berhasil diperbarui.",
      icon: "success",
      timer: 1800,
      showConfirmButton: false,
      background: "#101010",
      color: "#fff",
    });
  } else {
    Swal.fire({
      title: "Gagal",
      text: "Update project gagal.",
      icon: "error",
      background: "#101010",
      color: "#fff",
    });
  }
};
  if (!project)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        Loading...
      </div>
    );

  const tech = (form.technologies || "")
    .split(",")
    .filter((t: string) => t.trim() !== "");

  const features = (form.key_features || "")
    .split(",")
    .filter((f: string) => f.trim() !== "");

  const galleryImages =
    project.image_urls && Array.isArray(project.image_urls)
      ? project.image_urls
      : project.image_url
        ? [project.image_url]
        : [];

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-6 md:px-8 lg:px-12 py-5 md:py-8">
      {/* LIGHTBOX */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={galleryImages[currentImage]}
              className="max-w-[92vw] max-h-[78vh] rounded-2xl object-contain"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACK */}
      <motion.button
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition mb-6"
      >
        <ArrowLeft size={14} />
        Back
      </motion.button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.92fr] gap-8 xl:gap-10 items-start">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {editMode ? (
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="text-2xl md:text-4xl font-bold bg-transparent border-b border-white/15 w-full outline-none mb-3"
            />
          ) : (
            <h1 className="text-[28px] sm:text-[34px] md:text-[42px] font-bold leading-tight tracking-tight mb-3">
              {project.title}
            </h1>
          )}

          <div className="w-16 h-[2px] rounded-full bg-white/20 mb-5" />

          {editMode ? (
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full min-h-[120px] bg-[#111] border border-white/10 rounded-2xl p-4 text-sm outline-none mb-6"
            />
          ) : (
            <p className="text-sm md:text-[13px] leading-7 text-white/60 text-justify mb-6">
              {project.description}
            </p>
          )}

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#101010] border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Code2 size={16} />
              </div>

              <div>
                <p className="text-lg font-semibold">{tech.length}</p>

                <p className="text-[11px] text-white/40">Total Technology</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#101010] border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Layers size={16} />
              </div>

              <div>
                <p className="text-lg font-semibold">{features.length}</p>

                <p className="text-[11px] text-white/40">Main Features</p>
              </div>
            </motion.div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
            {editMode ? (
              <input
                value={form.live_url || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    live_url: e.target.value,
                  })
                }
                placeholder="Live Demo URL"
                className="bg-[#111] border border-white/10 rounded-xl px-4 py-3 w-full sm:w-[260px] outline-none text-sm"
              />
            ) : project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl bg-[#101010] border border-white/10 hover:bg-white/5 transition"
              >
                <ExternalLink size={15} />
                <span className="text-sm">Live Demo</span>
              </a>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl bg-[#101010] border border-white/10 text-white/45">
                <ExternalLink size={15} />
                <span className="text-sm">No Link</span>
              </div>
            )}

            {editMode ? (
              <input
                value={form.github_url || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    github_url: e.target.value,
                  })
                }
                placeholder="Github URL"
                className="bg-[#111] border border-white/10 rounded-xl px-4 py-3 w-full sm:w-[260px] outline-none text-sm"
              />
            ) : project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl bg-[#101010] border border-white/10 hover:bg-white/5 transition"
              >
                <GitBranch size={15} />
                <span className="text-sm">Github</span>
              </a>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl bg-[#101010] border border-white/10 text-white/45">
                <GitBranch size={15} />
                <span className="text-sm">No Link</span>
              </div>
            )}
          </div>

          {/* TECH STACK */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={15} className="text-white/70" />
              <p className="text-sm font-semibold">Technologies Used</p>
            </div>

            {editMode ? (
              <input
                value={form.technologies}
                onChange={(e) =>
                  setForm({
                    ...form,
                    technologies: e.target.value,
                  })
                }
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 outline-none"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {tech.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-2 rounded-xl bg-[#101010] border border-white/10 text-[11px] text-white/75"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          {/* GALLERY */}
          {galleryImages.length > 0 && (
            <div className="mb-6 xl:max-w-[520px] xl:ml-auto">
              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-[#101010] shadow-[0_0_40px_rgba(255,255,255,0.03)]">
                <motion.img
                  key={currentImage}
                  initial={{
                    opacity: 0.5,
                    scale: 1.02,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  src={galleryImages[currentImage]}
                  onClick={() => setPreviewOpen(true)}
                  className="w-full h-[200px] sm:h-[240px] md:h-[270px] xl:h-[280px] 2xl:h-[300px] object-cover cursor-pointer"
                />

                {currentImage > 0 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center"
                  >
                    <ChevronLeft size={17} />
                  </button>
                )}

                {currentImage < galleryImages.length - 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center"
                  >
                    <ChevronRight size={17} />
                  </button>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {galleryImages.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`transition-all rounded-full ${
                        currentImage === i
                          ? "w-7 h-2 bg-white"
                          : "w-2 h-2 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FEATURES */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#101010] border border-white/10 rounded-3xl p-5 md:p-6 xl:max-w-[520px] xl:ml-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={15} className="text-white/70" />
              <p className="text-sm font-semibold">Key Features</p>
            </div>

            {editMode ? (
              <textarea
                value={form.key_features}
                onChange={(e) =>
                  setForm({
                    ...form,
                    key_features: e.target.value,
                  })
                }
                className="w-full min-h-[160px] bg-[#0f0f0f] border border-white/10 rounded-xl p-4 outline-none"
              />
            ) : (
              <ul className="space-y-3 text-sm text-white/65 leading-6">
                {features.map((f: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-white/35 mt-[2px]">•</span>

                    <span>{f.trim()}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-10">
        {editMode ? (
          <>
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition"
            >
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
