import Link from "next/link";

export default function Home() {
  const standings = [
    { rank: 1, team: "Man City", played: 28, pts: 64 },
    { rank: 2, team: "Liverpool", played: 28, pts: 63 },
    { rank: 3, team: "Arsenal", played: 28, pts: 61 },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-2xl font-bold text-emerald-400">⚽ Football Stat Hub</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-emerald-400 font-bold">ตารางคะแนน</Link>
            <Link href="/players" className="text-slate-400 hover:text-white">ค้นหานักเตะ</Link>
            <Link href="/favorites" className="text-amber-400 font-bold">⭐ นักเตะโปรดของฉัน</Link>
          </nav>
        </header>

        <h2 className="text-xl font-bold mb-4">Premier League Table</h2>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-sm">
                <th className="py-2">#</th>
                <th className="py-2">ทีม</th>
                <th className="py-2">แข่ง</th>
                <th className="py-2">แต้ม</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s) => (
                <tr key={s.rank} className="border-b border-slate-700/50">
                  <td className="py-3 font-bold text-emerald-400">{s.rank}</td>
                  <td className="py-3">{s.team}</td>
                  <td className="py-3 text-slate-400">{s.played}</td>
                  <td className="py-3 font-bold">{s.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}