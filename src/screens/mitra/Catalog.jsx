export default function MitraCatalog() {
  const catalogs = [
    { id: 'BATCH-001', name: 'Melon Kirin Susu', date: '20 Nov 2026', total: '500 Kg', sisa: '150 Kg', price: 'Rp 75.000', progress: 70 },
    { id: 'BATCH-002', name: 'Melon Golden Princess', date: '25 Nov 2026', total: '300 Kg', sisa: '150 Kg', price: 'Rp 60.000', progress: 50 },
    { id: 'BATCH-003', name: 'Melon Kimono', date: '10 Des 2026', total: '500 Kg', sisa: '450 Kg', price: 'Rp 82.000', progress: 10 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white p-5 border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800 text-center">Katalog Kuota Panen</h1>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {catalogs.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex-shrink-0 flex items-center justify-center text-orange-400 text-xs">
                Img
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img src="/assets/products/melon-kirin-susu.png" alt="Melon Kirin Susu" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 bg-green-50 text-brand-green text-[10px] font-bold rounded mb-1">{item.id}</span>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h3>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Estimasi Panen</span>
                  <span className="font-bold text-gray-700">{item.date}</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div className="bg-brand-green h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>Total: {item.total}</span>
              <span>Tersedia: {item.sisa}</span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-brand-green font-bold text-lg">{item.price}<span className="text-sm font-normal text-gray-600"> / Kg</span></p>
              <button className="bg-brand-green text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-green-700">
                Pesan Kuota
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}