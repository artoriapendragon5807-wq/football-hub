"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก Supabase เมื่อเปิดหน้านี้
  useEffect(() => {
    async function fetchFavorites() {
      const { data, error } = await supabase.from('favorites').select('*');
      if (error) {
        console.error("Error fetching favorites:", error);
      } else {
        setFavorites(data);
      }
      setLoading(false);
    }
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-2xl font-bold text-emerald-400">⚽ Football Stat Hub</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-slate-400 hover:text-white">ตารางคะแนน</Link>
            <Link href="/players" className="text-slate-400 hover:text-white">ค้นหานักเตะ</Link>
            <Link href="/favorites" className="text-amber-400 font-bold">⭐ นักเตะโปรดของฉัน</Link>
          </nav>
        </header>

        <h2 className="text-xl font-bold mb-4">⭐ รายชื่อนักเตะโปรดที่บันทึกไว้</h2>

        {loading ? (
          <p className="text-slate-400">กำลังโหลดข้อมูลจาก Database...</p>
        ) : favorites.length === 0 ? (
          <p className="text-slate-400">ยังไม่มีนักเตะโปรดในระบบ ลองไปกดดาวที่หน้านักเตะดูสิ!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-amber-400">{fav.player_name}</h3>
                  <p className="text-xs text-slate-500 mt-1">ID ในฐานข้อมูล: {fav.id}</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                  Saved ✓
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}