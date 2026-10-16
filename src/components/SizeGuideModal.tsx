import React from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  selectedSize = 'M',
}) => {
  if (!isOpen) return null;

  const rows = [
    { size: 'XS', bust: '32"', waist: '24-25"', hips: '35"', length: '39"' },
    { size: 'S', bust: '34"', waist: '26-27"', hips: '37"', length: '39.5"' },
    { size: 'M', bust: '36"', waist: '28-29"', hips: '39"', length: '40"' },
    { size: 'L', bust: '38"', waist: '30-31"', hips: '41"', length: '40.5"' },
    { size: 'XL', bust: '40"', waist: '32-34"', hips: '43"', length: '41"' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div 
        className="bg-[#fbf9f6] rounded-2xl max-w-xl w-full p-4 sm:p-6 lg:p-8 shadow-2xl relative space-y-4 sm:space-y-6 border border-[#eae8e5] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#eae8e5]">
          <div>
            <span className="font-label-xs text-xs uppercase tracking-widest text-secondary font-bold">
              Slayvana Atelier Fit Guide
            </span>
            <h3 className="font-headline-md text-xl text-primary mt-1 font-serif">
              Chaahvi Set Body Measurements
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#eae8e5] flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-xs text-[#444748]">
          All measurements are in inches. Take exact measurements around the fullest part of your bust and natural waist.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-sm">
            <thead>
              <tr className="bg-[#eae8e5] text-on-surface font-label-md text-xs uppercase font-bold">
                <th className="p-3 rounded-l-lg">Size</th>
                <th className="p-3">Bust (in)</th>
                <th className="p-3">Waist (in)</th>
                <th className="p-3">Hips (in)</th>
                <th className="p-3 rounded-r-lg">Pant Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#efeeeb]">
              {rows.map((r) => {
                const isCurrent = r.size === selectedSize;
                return (
                  <tr
                    key={r.size}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-[#eae8e5]/70 font-semibold text-primary'
                        : 'hover:bg-[#f5f3f0] text-[#444748]'
                    }`}
                  >
                    <td className="p-3 font-bold text-primary">
                      {r.size} {isCurrent && <span className="text-[10px] text-secondary font-normal">(Selected)</span>}
                    </td>
                    <td className="p-3">{r.bust}</td>
                    <td className="p-3">{r.waist}</td>
                    <td className="p-3">{r.hips}</td>
                    <td className="p-3">{r.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-[#f5f3f0] text-[#444748] font-body-sm text-xs flex items-start gap-3 border border-[#eae8e5]">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
          <span>
            Need custom bespoke tailoring? Reach out to our master atelier via WhatsApp at <strong>+91 99119 48738</strong> with your order ID.
          </span>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-primary text-white text-xs uppercase tracking-wider font-bold hover:bg-[#1c1b1b] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
