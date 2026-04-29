"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import {
  Trash2,
  Pin,
  Heart,
  MessageSquare,
  RefreshCcw,
  Send,
} from "lucide-react";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel("comments-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        () => {
          fetchComments();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    setComments(data || []);
    setLoading(false);
  };

  const deleteComment = async (id: number) => {
    const ok = confirm("Delete comment?");
    if (!ok) return;

    await supabase.from("comments").delete().eq("id", id);

    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePin = async (id: number, current: boolean) => {
    const newValue = !current;

    await supabase
      .from("comments")
      .update({
        is_pinned: newValue,
      })
      .eq("id", id);

    setComments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_pinned: newValue,
            }
          : item,
      ),
    );
  };

  const addLike = async (id: number, likes: number, liked: boolean) => {
    const newLiked = !liked;

    const newLikes = newLiked
      ? (likes || 0) + 1
      : Math.max((likes || 1) - 1, 0);

    await supabase
      .from("comments")
      .update({
        likes: newLikes,
        liked_by_admin: newLiked,
      })
      .eq("id", id);

    setComments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: newLikes,
              liked_by_admin: newLiked,
            }
          : item,
      ),
    );
  };

  const sendReply = async (commentId: number) => {
    const text = replyText[commentId];

    if (!text?.trim()) return;

    const target = comments.find((x) => x.id === commentId);

    const oldReplies = target?.replies || [];

    const newReply = {
      username: "Admin",
      message: text,
      created_at: new Date().toISOString(),
    };

    const updatedReplies = [...oldReplies, newReply];

    await supabase
      .from("comments")
      .update({
        replies: updatedReplies,
      })
      .eq("id", commentId);

    setComments((prev) =>
      prev.map((item) =>
        item.id === commentId
          ? {
              ...item,
              replies: updatedReplies,
            }
          : item,
      ),
    );

    setReplyText((prev) => ({
      ...prev,
      [commentId]: "",
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />

      <main className="lg:ml-[250px] min-h-screen px-4 sm:px-6 lg:px-8 pt-[90px] lg:pt-6 pb-6">
        <div className="max-w-[1200px] mx-auto">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Comments</h1>

              <p className="text-sm text-white/40 mt-1">
                Manage portfolio comments
              </p>
            </div>

            <button
              onClick={fetchComments}
              className="w-full sm:w-auto h-11 px-5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCcw size={14} />
              Refresh
            </button>
          </div>

          {/* CONTENT */}
          <div className="space-y-4 pb-8">
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-20 text-center text-white/40">
                Loading comments...
              </div>
            ) : comments.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-20 flex flex-col items-center gap-3 text-white/40">
                <MessageSquare size={28} />
                No comments yet
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 transition"
                >
                  <div className="flex flex-col gap-4">
                    {/* TOP */}
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* LEFT CONTENT */}
                      <div className="flex-1 min-w-0">
                        {/* USER */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <p className="font-medium text-[14px]">
                            {comment.name || comment.username}
                          </p>

                          {comment.is_pinned && (
                            <span className="text-[9px] px-2 py-[3px] rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/20">
                              PINNED
                            </span>
                          )}

                          {comment.liked_by_admin && (
                            <span className="text-[9px] px-2 py-[3px] rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/20">
                              LIKED
                            </span>
                          )}
                        </div>

                        {/* COMMENT */}
                        <p className="text-[13px] text-white/60 leading-6 mb-3">
                          {comment.comment}
                        </p>

                        {/* IMAGE */}
                        {comment.image_url && (
                          <img
                            src={comment.image_url}
                            className="rounded-2xl border border-white/10 w-full max-w-[220px] mb-3"
                          />
                        )}

                        {/* INFO */}
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/35">
                          <span>{comment.likes || 0} likes</span>

                          <span>
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* ACTION */}
                      {/* ACTION */}
                      <div className="flex flex-row items-start gap-2 shrink-0">
                        <button
                          onClick={() =>
                            addLike(
                              comment.id,
                              comment.likes,
                              comment.liked_by_admin,
                            )
                          }
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${
                            comment.liked_by_admin
                              ? "bg-pink-500/20 border-pink-500/30 text-pink-300"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <Heart
                            size={14}
                            fill={
                              comment.liked_by_admin ? "currentColor" : "none"
                            }
                          />
                        </button>

                        <button
                          onClick={() =>
                            togglePin(comment.id, comment.is_pinned)
                          }
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${
                            comment.is_pinned
                              ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <Pin size={14} />
                        </button>

                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition flex items-center justify-center text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* REPLIES */}
                    {comment.replies?.length > 0 && (
                      <div className="border-t border-white/5 pt-3 space-y-2">
                        {comment.replies.map((reply: any, i: number) => (
                          <div
                            key={i}
                            className="rounded-2xl bg-black/20 border border-white/5 p-3"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-[11px] font-medium">
                                {reply.username}
                              </p>

                              <span className="text-[10px] text-white/25">
                                {new Date(
                                  reply.created_at,
                                ).toLocaleDateString()}
                              </span>
                            </div>

                            <p className="text-[12px] text-white/55 leading-5">
                              {reply.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* REPLY */}
                    <div className="border-t border-white/5 pt-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          value={replyText[comment.id] || ""}
                          onChange={(e) =>
                            setReplyText((prev) => ({
                              ...prev,
                              [comment.id]: e.target.value,
                            }))
                          }
                          placeholder="Reply..."
                          className="flex-1 h-11 px-4 rounded-2xl bg-black/20 border border-white/10 outline-none text-sm"
                        />

                        <button
                          onClick={() => sendReply(comment.id)}
                          className="h-11 px-5 rounded-2xl bg-white text-black hover:opacity-90 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
