"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");

  const [players] = useState([
    { id: 1, name: "Erling Haaland", team: "Man City", pos: "ST", goals: 22, img: "/images/haaland.jpg" },
    { id: 2, name: "Mohamed Salah", team: "Liverpool", pos: "RW", goals: 18, img: "/images/salah.jpg" },
    { id: 3, name: "Bukayo Saka", team: "Arsenal", pos: "RW", goals: 14, img: "/images/saka.jpg" },
    { id: 4, name: "Kevin De Bruyne", team: "Man City", pos: "CAM", goals: 8, img: "/images/debruyne.jpg" },
  ]);
  const saveFavorite = async (playerName) => {
    const { error } = await supabase.from('favorites').insert([{ player_name: playerName }]);
    if (!error) {
      alert(`บันทึก ${playerName} ลง Database แล้ว!`);
    } else {
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  const filteredPlayers = players.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesPos = positionFilter === "All" || p.pos === positionFilter;
    return matchesSearch && matchesPos;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-2xl font-bold text-emerald-400">⚽ Football Stat Hub</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-slate-400 hover:text-white">ตารางคะแนน</Link>
            <Link href="/players" className="text-emerald-400 font-bold">ค้นหานักเตะ</Link>
            <Link href="/favorites" className="text-amber-400 font-bold">⭐ นักเตะโปรดของฉัน</Link>
          </nav>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="พิมพ์ชื่อนักเตะ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg flex-1 text-white focus:outline-none focus:border-emerald-400"
          />
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white"
          >
            <option value="All">ทุกตำแหน่ง</option>
            <option value="ST">กองหน้า (ST)</option>
            <option value="RW">ปีกขวา (RW)</option>
            <option value="CAM">กองกลาง (CAM)</option>
          </select>
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex gap-4 items-center">
              <div className="w-20 h-20 bg-slate-700 rounded-full overflow-hidden flex-shrink-0">
                <img src={player.img} alt={player.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-emerald-400">{player.name}</h3>
                <p className="text-sm text-slate-400">ทีม: {player.team} | ตำแหน่ง: {player.pos}</p>
                <p className="text-sm font-semibold mt-1">ยิงไป: {player.goals} ประตู</p>
                <button
                  onClick={() => saveFavorite(player.name)}
                  className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3 py-1 rounded text-xs font-bold transition"
                >
                  ⭐ เซฟเป็นนักเตะโปรด
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}