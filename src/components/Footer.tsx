import React, { useState } from 'react';

interface FooterProps {
  onNavigateScreen: (screen: 'home' | 'shop-all' | 'pdp' | 'bag', category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateScreen }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [careNotice, setCareNotice] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#f5f3f0] text-[#1b1c1a] border-t border-[#eae8e5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-[#eae8e5]">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-headline-md text-2xl text-primary tracking-wide block">
                SLAYVANA
              </span>
              <p className="font-body-md text-sm text-[#444748] max-w-md leading-relaxed">
                Contemporary Indian ethnic-fusion ready-to-wear. Rooted in artisanal textiles, tailored for the modern festive wardrobe.
              </p>
            </div>

            <div className="mt-4">
              <span className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-2 font-bold">
                Newsletter
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center max-w-md bg-white rounded-lg p-1 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#eae8e5]">
                <input
                  className="w-full bg-transparent px-3 py-2 font-body-sm text-sm text-on-surface placeholder:text-outline focus:outline-none"
                  placeholder="Enter your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-primary text-white font-label-md text-xs uppercase tracking-wider hover:bg-[#1c1b1b] transition-colors font-bold shrink-0"
                >
                  {subscribed ? 'Joined ✓' : 'Join'}
                </button>
              </form>
              {subscribed && (
                <span className="text-xs text-secondary mt-1.5 block">
                  Thank you for subscribing to Slayvana Atelier previews.
                </span>
              )}
            </div>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-4">
            <span className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-4 font-bold">
              Customer Care
            </span>
            <ul className="space-y-2.5 font-body-sm text-sm text-[#444748]">
              <li>
                <button type="button" onClick={() => setCareNotice('Easy 7-day doorstep pickup exchanges available across metro hubs.')} className="hover:text-primary transition-colors text-left">
                  Make a return / Exchange
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setCareNotice('Refund & Exchange: 100% money back or instant store credit within 7 business days.')} className="hover:text-primary transition-colors text-left">
                  Refund &amp; Exchange Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setCareNotice('Express Surface Air dispatched within 24-48 hours. Metro transit: 2-3 days.')} className="hover:text-primary transition-colors text-left">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setCareNotice('Atelier FAQ: Pure mul fabrics are pre-shrunk and colorfast with gentle handwash.')} className="hover:text-primary transition-colors text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setCareNotice('Terms & Conditions: Handcrafted items maintain natural unique weave variations.')} className="hover:text-primary transition-colors text-left">
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>

            {careNotice && (
              <div className="mt-4 p-3 rounded-lg bg-white border border-[#fe8357]/40 shadow-xs flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 text-xs text-primary">
                  <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">help</span>
                  <span>{careNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCareNotice(null)}
                  className="text-[#444748] hover:text-primary shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
          </div>

          {/* The Atelier */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-4 font-bold">
              The Atelier
            </span>
            <div className="space-y-1.5 font-body-sm text-sm text-[#444748]">
              <p className="font-headline-sm text-base text-primary font-bold">Slayvana Pvt Ltd</p>
              <p className="leading-relaxed">Plot 42, Laxmi Woollen Mills Estate, Shakti Mills Lane, Mahalaxmi, Mumbai, Maharashtra 400011</p>
              <p className="pt-2">contact@slayvana.com</p>
              <p className="font-medium">+91 (022) 4890 2200</p>
            </div>
          </div>
        </div>

        {/* Categories Matrix */}
        <div className="py-10 border-b border-[#eae8e5]">
          <span className="block font-label-md text-xs uppercase tracking-widest text-[#444748] mb-6 text-center lg:text-left font-bold">
            Explore Categories
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="space-y-2">
              <span className="block font-label-md text-xs uppercase text-primary tracking-wider font-bold">Kurtis</span>
              <ul className="space-y-1.5 font-body-sm text-xs text-[#444748]">
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'kurti')} className="hover:text-primary transition-colors">All Kurtis</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'kurti')} className="hover:text-primary transition-colors">Short Kurti</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'kurti')} className="hover:text-primary transition-colors">Long Kurti</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'kurti')} className="hover:text-primary transition-colors">Sleeveless Kurti</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'kurti')} className="hover:text-primary transition-colors">Corset Kurti</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'kurti')} className="hover:text-primary transition-colors">Deep Back Kurti</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'kurti')} className="hover:text-primary transition-colors">Halter Kurti</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block font-label-md text-xs uppercase text-primary tracking-wider font-bold">Tops</span>
              <ul className="space-y-1.5 font-body-sm text-xs text-[#444748]">
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'tops')} className="hover:text-primary transition-colors">All Tops</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'tops')} className="hover:text-primary transition-colors">Cover Ups</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'tops')} className="hover:text-primary transition-colors">Corset Tops</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'tops')} className="hover:text-primary transition-colors">Halter Tops</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'tops')} className="hover:text-primary transition-colors">Fitted Tops</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'tops')} className="hover:text-primary transition-colors">Loose Fitted Tops</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block font-label-md text-xs uppercase text-primary tracking-wider font-bold">Sets</span>
              <ul className="space-y-1.5 font-body-sm text-xs text-[#444748]">
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'sets')} className="hover:text-primary transition-colors">All Sets</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('pdp')} className="hover:text-primary transition-colors font-medium">Chaahvi Set</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'sets')} className="hover:text-primary transition-colors">Skirt Sets</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'sets')} className="hover:text-primary transition-colors">3 Piece</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'sets')} className="hover:text-primary transition-colors">2 Piece</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block font-label-md text-xs uppercase text-primary tracking-wider font-bold">Bottoms</span>
              <ul className="space-y-1.5 font-body-sm text-xs text-[#444748]">
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'bottom')} className="hover:text-primary transition-colors">All Bottoms</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'bottom')} className="hover:text-primary transition-colors">Pants</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'bottom')} className="hover:text-primary transition-colors">Skirts</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'bottom')} className="hover:text-primary transition-colors">Palazzos</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block font-label-md text-xs uppercase text-primary tracking-wider font-bold">Dresses</span>
              <ul className="space-y-1.5 font-body-sm text-xs text-[#444748]">
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'dresses')} className="hover:text-primary transition-colors">All Dresses</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'dresses')} className="hover:text-primary transition-colors">Maxi Dresses</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'dresses')} className="hover:text-primary transition-colors">Mini Dresses</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="block font-label-md text-xs uppercase text-primary tracking-wider font-bold">Collections</span>
              <ul className="space-y-1.5 font-body-sm text-xs text-[#444748]">
                <li><button type="button" onClick={() => onNavigateScreen('home')} className="hover:text-primary transition-colors">SlayvanaOffice SS21</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('home')} className="hover:text-primary transition-colors">SlayvanaHaveli SS21</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('home')} className="hover:text-primary transition-colors">SlayvanaHaveli SS22</button></li>
                <li><button type="button" onClick={() => onNavigateScreen('shop-all', 'festive-edit')} className="hover:text-primary transition-colors">Desi Romance</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#444748] font-body-sm text-xs">
          <div className="flex items-center gap-4">
            <span className="font-label-xs uppercase tracking-wider text-outline font-bold">Secure Payment</span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#eae8e5] font-label-xs text-[10px] text-on-surface font-bold tracking-wider">UPI</span>
              <span className="px-2 py-0.5 rounded bg-[#eae8e5] font-label-xs text-[10px] text-on-surface font-bold tracking-wider">CARDS</span>
              <span className="px-2 py-0.5 rounded bg-[#eae8e5] font-label-xs text-[10px] text-on-surface font-bold tracking-wider">NETBANKING</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p>© 2024 SLAYVANA Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
