"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import {
  Eye,
  Users,
  MessageSquare,
  Layers,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    comments: 0,
    pinned: 0,
  });

  const [recentComments, setRecentComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/admin/login");
      return;
    }

    setAuthorized(true);
    fetchDashboard();
  };

  const fetchDashboard = async () => {
    try {
      const [
        projectsRes,
        certificatesRes,
        commentsRes,
        pinnedRes,
        recentCommentsRes,
      ] = await Promise.all([
        supabase
          .from("projects")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("certificates")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("comments")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("comments")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("is_pinned", true),

        supabase
          .from("comments")
          .select("*")
          .order("created_at", {
            ascending: false,
          })
          .limit(30),
      ]);

      setStats({
        projects: projectsRes.count || 0,
        certificates: certificatesRes.count || 0,
        comments: commentsRes.count || 0,
        pinned: pinnedRes.count || 0,
      });

      setRecentComments(recentCommentsRes.data || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }

    setLoading(false);
  };

  const cards = [
    {
      icon: Eye,
      title: "Total Projects",
      value: stats.projects,
    },
    {
      icon: Users,
      title: "Certificates",
      value: stats.certificates,
    },
    {
      icon: MessageSquare,
      title: "Comments",
      value: stats.comments,
    },
    {
      icon: Layers,
      title: "Pinned",
      value: stats.pinned,
    },
  ];

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Sidebar />

      <main className="lg:ml-[250px] pt-[95px] lg:pt-6 min-h-screen px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[1400px] mx-auto">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Dashboard
              </h1>

              <p className="text-sm text-white/40 mt-1">
                Welcome back, Admin
              </p>
            </div>

            <button
              onClick={fetchDashboard}
              className="h-11 px-5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm group"
            >
              <RefreshCcw
                size={14}
                className="group-hover:rotate-180 transition duration-500"
              />
              Refresh
            </button>
          </div>

          {/* TOP CARDS */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {cards.map((card, i) => {
              const Icon = card.icon;

              return (
                <div
                  key={i}
                  className="group rounded-2xl border border-white/10 px-5 py-4 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-white/45 mb-2">
                        {card.title}
                      </p>

                      <h2 className="text-[24px] sm:text-[26px] font-bold leading-none">
                        {loading ? "..." : card.value}
                      </h2>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition">
                      <Icon size={15} />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] text-white/25">
                      Database synced
                    </p>

                    <TrendingUp
                      size={12}
                      className="text-white/25"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* RECENT COMMENTS */}
            <div className="xl:col-span-2 rounded-2xl border border-white/10 p-5 sm:p-6 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-white/15 transition">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-medium">
                    Recent Comments
                  </h2>

                  <p className="text-xs text-white/35 mt-1">
                    Latest user activity
                  </p>
                </div>

                <span className="text-xs text-white/35">
                  Live DB
                </span>
              </div>

              <div className="max-h-[580px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {loading ? (
                  <div className="text-sm text-white/30">
                    Loading comments...
                  </div>
                ) : recentComments.length === 0 ? (
                  <div className="text-sm text-white/30">
                    No comments available
                  </div>
                ) : (
                  recentComments.map((comment, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-medium shrink-0">
                            {comment.name?.charAt(0) || "U"}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[13px] font-medium truncate">
                                {comment.name}
                              </p>

                              <span className="text-[10px] text-white/25">
                                {new Date(
                                  comment.created_at
                                ).toLocaleDateString()}
                              </span>
                            </div>

                            <p className="text-[12px] text-white/45 mt-2 line-clamp-2 leading-relaxed break-words">
                              {comment.comment}
                            </p>
                          </div>
                        </div>

                        <div className="text-[11px] text-white/35 shrink-0">
                          ❤️ {comment.likes || 0}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SIDE PANEL */}
            <div className="space-y-4">
              {[
                {
                  title: "Projects",
                  desc: `${stats.projects} total projects`,
                },
                {
                  title: "Certificates",
                  desc: `${stats.certificates} certificates`,
                },
                {
                  title: "Comments",
                  desc: `${stats.comments} comments`,
                },
                {
                  title: "Pinned",
                  desc: `${stats.pinned} highlighted`,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 p-5 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
                >
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="text-xs text-white/40 mt-2">
                    {loading ? "Loading..." : item.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-white/30">
                      Synced
                    </span>

                    <span className="text-[11px] text-green-300">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}