import React, { useState } from 'react';
import { CartItem, PRODUCTS, Product } from '../data/products';

interface BagCheckoutScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onMoveToWishlist: (item: CartItem) => void;
  onNavigateScreen: (screen: 'home' | 'shop-all' | 'pdp' | 'bag', category?: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
}

export const BagCheckoutScreen: React.FC<BagCheckoutScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onMoveToWishlist,
  onNavigateScreen,
  onAddToCart,
}) => {
  // Promo code state
  const [promoCode, setPromoCode] = useState('FESTIVE20');
  const [promoApplied, setPromoApplied] = useState(true);
  const [promoError, setPromoError] = useState('');

  // Keepsake packaging checkbox
  const [giftPackaging, setGiftPackaging] = useState(true);

  // Address form fields
  const [mobile, setMobile] = useState('98201 44820');
  const [email, setEmail] = useState('ananya.sharma@gmail.com');
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [building, setBuilding] = useState('Apt 702, Silver Birch Towers');
  const [street, setStreet] = useState('Opposite Joggers Park, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('400050');

  // Payment tab state
  const [paymentTab, setPaymentTab] = useState<'upi' | 'cards' | 'netbanking' | 'cod'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [upiVerified, setUpiVerified] = useState(true);

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  // Order Placement Modal
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [addToastText, setAddToastText] = useState<string | null>(null);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? (subtotal > 1500 ? 500 : Math.round(subtotal * 0.15)) : 0;
  const shipping = subtotal >= 1999 ? 0 : 150;
  const gst = Math.round((subtotal - discount) * 0.12);
  const total = Math.max(0, subtotal - discount + (shipping === 0 ? 0 : shipping) + gst);

  const freeShippingGoal = 1999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingGoal) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FESTIVE20' || promoCode.trim().toUpperCase() === 'SLAY10' || promoCode.trim().toUpperCase() === 'SLAY20') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try FESTIVE20 or SLAY10');
    }
  };

  const handleCompleteOrder = () => {
    const randomId = 'SLY-' + Math.floor(100000 + Math.random() * 900000);
    setPlacedOrderId(randomId);
    setOrderSuccess(true);
  };

  const recommendedItems = PRODUCTS.filter((p) =>
    ['beige-cotton-pants', 'dabu-halter-corset', 'gunj-mul-cover-up', 'chandrika-jhumka'].includes(p.id)
  );

  return (
    <div className="flex flex-col w-full bg-[#fbf9f6] min-h-screen">
      {/* Progress Header & Step Ribbon */}
      <section className="w-full bg-[#f5f3f0]/70 py-3 sm:py-4 border-b border-[#eae8e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
          <nav className="flex items-center gap-2 sm:gap-4 font-label-md text-[11px] sm:text-xs uppercase tracking-wider text-[#444748] overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5">
            <span className="flex items-center gap-1.5 text-primary font-bold shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                01
              </span>
              Shopping Bag
            </span>
            <span className="text-outline-variant shrink-0">/</span>
            <span className="flex items-center gap-1.5 text-[#444748] hover:text-primary transition-colors cursor-pointer shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#eae8e5] text-on-surface-variant flex items-center justify-center text-[10px]">
                02
              </span>
              Address
            </span>
            <span className="text-outline-variant shrink-0">/</span>
            <span className="flex items-center gap-1.5 text-[#444748] hover:text-primary transition-colors cursor-pointer shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#eae8e5] text-on-surface-variant flex items-center justify-center text-[10px]">
                03
              </span>
              Payment
            </span>
          </nav>
          <div className="hidden sm:flex items-center gap-1.5 text-[#444748] font-label-xs text-[10px] tracking-widest uppercase font-bold">
            <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
            <span>Guaranteed Artisanal Quality</span>
          </div>
        </div>
      </section>

      {/* Free Shipping Announcement Banner with Dynamic Meter */}
      <section className="w-full bg-[#fbf9f6] py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="w-full bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-[#eae8e5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fe8357]/15 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-sm md:text-base text-primary font-bold">
                    {subtotal >= freeShippingGoal
                      ? "You've unlocked FREE Express Shipping!"
                      : `Add ₹${freeShippingGoal - subtotal} more to unlock FREE Express Shipping!`}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#fe8357]/20 text-secondary font-label-xs text-[9px] uppercase font-bold">
                    {subtotal >= freeShippingGoal ? 'Eligible' : 'In Progress'}
                  </span>
                </div>
                <p className="font-body-sm text-xs text-[#444748]">
                  Qualified for festive deliveries across 19,000+ Indian PIN codes.
                </p>
              </div>
            </div>

            <div className="w-full md:w-72 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-label-xs text-[#444748] uppercase font-bold">
                <span>Progress: ₹{subtotal.toLocaleString()} spent</span>
                <span className="font-bold text-secondary">
                  {subtotal >= freeShippingGoal ? 'Goal ₹1,999 Met' : `Goal: ₹1,999`}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#eae8e5] overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Workspace Grid (Two-Column Layout: Left 62%, Right 38%) */}
      <section className="w-full py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Bag Items & Integrated Shipping Details (7 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
              {/* Bag Items Module */}
              <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-[#eae8e5]">
                <div className="flex items-baseline justify-between pb-4 border-b border-[#eae8e5]">
                  <div className="flex items-center gap-2">
                    <h1 className="font-headline-md text-2xl text-primary font-serif">Your Bag</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f5f3f0] text-on-surface font-label-xs text-[10px] uppercase font-bold">
                      {cart.length} Articles
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateScreen('shop-all')}
                    className="font-label-md text-xs text-secondary hover:underline font-bold"
                  >
                    Continue Exploring
                  </button>
                </div>

                {cart.length > 0 ? (
                  <div className="divide-y divide-[#eae8e5]">
                    {cart.map((item, index) => (
                      <div key={`${item.product.id}-${index}`} className="py-5 flex flex-col sm:flex-row gap-4 items-start group">
                        <div className="relative w-28 h-36 md:w-32 md:h-44 rounded-lg overflow-hidden bg-[#f5f3f0] shrink-0 border border-[#eae8e5]">
                          <img
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            src={item.product.image}
                            alt={item.product.name}
                          />
                          {item.product.badge && (
                            <span
                              className={`absolute top-2 left-2 px-2 py-0.5 rounded-full font-label-xs text-[9px] uppercase font-bold ${
                                item.product.badge.includes('Off')
                                  ? 'bg-secondary text-white'
                                  : 'bg-white/90 backdrop-blur-md text-primary'
                              }`}
                            >
                              {item.product.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between h-full w-full">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                            <div>
                              <h2 className="font-headline-sm text-base text-primary tracking-tight font-bold">
                                {item.product.name}
                              </h2>
                              <p className="font-body-sm text-xs text-[#444748] mt-0.5">
                                Style ID: #{item.product.sku}
                              </p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-[#444748]">
                                <span>Size: <strong className="text-primary font-semibold">{item.size}</strong></span>
                                <span className="w-1 h-1 rounded-full bg-[#c4c7c7]"></span>
                                <span>Color: <strong className="text-primary font-semibold">{item.color}</strong></span>
                              </div>
                            </div>

                            <div className="text-left sm:text-right mt-1 sm:mt-0">
                              <span className="font-price-sale text-base text-primary font-bold">
                                ₹{(item.product.price * item.quantity).toLocaleString()}.00
                              </span>
                              <span className="block text-[10px] text-[#444748]">
                                MRP incl. of taxes
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-1">
                            {/* Stepper */}
                            <div className="inline-flex items-center bg-[#f5f3f0] rounded-full p-1 shadow-inner border border-[#eae8e5]">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                                className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center hover:bg-[#eae8e5] transition-colors"
                              >
                                <span className="material-symbols-outlined text-[14px]">remove</span>
                              </button>
                              <span className="px-3 text-xs font-bold text-primary">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center hover:bg-[#eae8e5] transition-colors"
                              >
                                <span className="material-symbols-outlined text-[14px]">add</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => onMoveToWishlist(item)}
                                className="flex items-center gap-1 text-xs text-[#444748] hover:text-secondary transition-colors font-medium"
                              >
                                <span className="material-symbols-outlined text-[16px]">favorite</span>
                                <span className="hidden sm:inline">Move to Wishlist</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(index)}
                                className="text-outline hover:text-error transition-colors p-1"
                                title="Remove article"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-[#444748] space-y-3">
                    <span className="material-symbols-outlined text-4xl text-outline">shopping_bag</span>
                    <p className="text-sm font-medium">Your shopping bag is currently empty.</p>
                    <button
                      type="button"
                      onClick={() => onNavigateScreen('shop-all')}
                      className="px-6 py-2 rounded-full bg-primary text-white text-xs uppercase tracking-wider font-bold"
                    >
                      Browse Festive Collection
                    </button>
                  </div>
                )}

                {/* Festive Gift Packaging Upgrade */}
                <div className="mt-6 p-4 rounded-xl bg-[#f5f3f0] flex items-start gap-3 border border-[#eae8e5]">
                  <input
                    checked={giftPackaging}
                    onChange={(e) => setGiftPackaging(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-secondary accent-secondary focus:ring-0 cursor-pointer"
                    id="gift-packaging"
                    type="checkbox"
                  />
                  <label className="cursor-pointer select-none" htmlFor="gift-packaging">
                    <span className="flex items-center gap-1.5 font-headline-sm text-sm text-primary font-bold">
                      <span className="material-symbols-outlined text-secondary text-[18px]">redeem</span>
                      Complimentary Festive Keepsake Packaging
                    </span>
                    <p className="font-body-sm text-xs text-[#444748] mt-0.5 leading-relaxed">
                      Includes Slayvana signature eco-friendly unbleached cotton drawstring dust bag with golden metallic embossed wish card.
                    </p>
                  </label>
                </div>
              </div>

              {/* Express Customer Details & Address Form (Step 02 of 03) */}
              <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-[#eae8e5]">
                <div className="flex items-center justify-between pb-4 border-b border-[#eae8e5]">
                  <div>
                    <span className="text-[10px] font-label-xs uppercase tracking-widest text-secondary font-bold">
                      Step 02 of 03
                    </span>
                    <h3 className="font-headline-md text-xl text-primary mt-1 font-serif">
                      Delivery Address &amp; Contact
                    </h3>
                  </div>
                  <span className="font-label-xs text-[10px] text-[#444748] uppercase tracking-wider bg-[#f5f3f0] px-3 py-1 rounded-full font-bold">
                    Fast Autofill
                  </span>
                </div>

                <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>
                  {/* Contact row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                        Contact Mobile (Dispatch Updates)
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs text-outline font-semibold">+91</span>
                        <input
                          className="w-full bg-[#f5f3f0] rounded-lg pl-12 pr-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                        Email Address (Order Invoicing)
                      </label>
                      <input
                        className="w-full bg-[#f5f3f0] rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                      Recipient Full Name
                    </label>
                    <input
                      className="w-full bg-[#f5f3f0] rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  {/* Street Address & Landmark */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                        Flat, Building, Suite
                      </label>
                      <input
                        className="w-full bg-[#f5f3f0] rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                        type="text"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                        Street, Colony, Landmark
                      </label>
                      <input
                        className="w-full bg-[#f5f3f0] rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* City, State, PIN code */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                        City
                      </label>
                      <input
                        className="w-full bg-[#f5f3f0] rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                        State
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-[#f5f3f0] rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                      >
                        <option>Maharashtra</option>
                        <option>Delhi NCR</option>
                        <option>Karnataka</option>
                        <option>Gujarat</option>
                        <option>Rajasthan</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-1 font-bold">
                        PIN Code
                      </label>
                      <div className="relative flex items-center">
                        <input
                          className="w-full bg-[#f5f3f0] rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:bg-[#eae8e5] transition-colors border border-transparent focus:border-[#c4c7c7]"
                          type="text"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                        />
                        <span className="absolute right-3 text-secondary material-symbols-outlined text-[18px]">
                          check_circle
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Choice Card */}
                  <div className="mt-4 p-4 rounded-xl bg-[#eae8e5]/60 flex items-center justify-between border border-[#c4c7c7]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <div>
                        <span className="font-headline-sm text-xs font-bold text-primary block">
                          Bluedart Express Surface Air (2-3 Business Days)
                        </span>
                        <p className="font-body-sm text-xs text-[#444748]">
                          Tracked courier with OTP verification at delivery
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-label-md text-xs uppercase text-secondary font-bold">FREE</span>
                      <span className="block line-through text-outline font-label-xs text-[10px]">₹150.00</span>
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Options Module (Step 03 of 03) */}
              <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-[#eae8e5]">
                <div className="flex items-center justify-between pb-4 border-b border-[#eae8e5]">
                  <div>
                    <span className="text-[10px] font-label-xs uppercase tracking-widest text-secondary font-bold">
                      Step 03 of 03
                    </span>
                    <h3 className="font-headline-md text-xl text-primary mt-1 font-serif">
                      Select Payment Architecture
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[#444748] font-label-xs text-[10px] uppercase font-bold">
                    <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                    <span>Encrypted</span>
                  </div>
                </div>

                {/* Tab Pills for Payment */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('upi')}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                      paymentTab === 'upi'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-[#f5f3f0] text-on-surface hover:bg-[#eae8e5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                    <span>UPI Fast</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('cards')}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                      paymentTab === 'cards'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-[#f5f3f0] text-on-surface hover:bg-[#eae8e5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">credit_card</span>
                    <span>Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('netbanking')}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                      paymentTab === 'netbanking'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-[#f5f3f0] text-on-surface hover:bg-[#eae8e5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">account_balance</span>
                    <span>Netbanking</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('cod')}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                      paymentTab === 'cod'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-[#f5f3f0] text-on-surface hover:bg-[#eae8e5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                    <span>COD</span>
                  </button>
                </div>

                {/* Tab Content */}
                {paymentTab === 'upi' && (
                  <div className="p-4 rounded-xl bg-[#f5f3f0] space-y-4 border border-[#eae8e5]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="font-label-md text-xs text-primary uppercase font-bold block">
                          Instant UPI Apps
                        </span>
                        <p className="font-body-sm text-xs text-[#444748]">
                          Tap to pay directly via Google Pay, PhonePe, Paytm or BHIM UPI.
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedUpiApp('gpay')}
                          className={`px-3 py-1 rounded text-[10px] uppercase font-bold shadow-sm transition-all ${
                            selectedUpiApp === 'gpay' ? 'bg-primary text-white' : 'bg-white text-on-surface'
                          }`}
                        >
                          GPay
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedUpiApp('phonepe')}
                          className={`px-3 py-1 rounded text-[10px] uppercase font-bold shadow-sm transition-all ${
                            selectedUpiApp === 'phonepe' ? 'bg-primary text-white' : 'bg-white text-on-surface'
                          }`}
                        >
                          PhonePe
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedUpiApp('paytm')}
                          className={`px-3 py-1 rounded text-[10px] uppercase font-bold shadow-sm transition-all ${
                            selectedUpiApp === 'paytm' ? 'bg-primary text-white' : 'bg-white text-on-surface'
                          }`}
                        >
                          Paytm
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white rounded-lg p-1.5 shadow-inner border border-[#eae8e5]">
                      <input
                        className="w-full bg-transparent px-2 text-xs text-on-surface placeholder:text-outline focus:outline-none"
                        placeholder="Enter UPI ID (e.g. ananya@okhdfcbank)"
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiVerified(false);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setUpiVerified(true)}
                        className={`px-4 py-1.5 rounded-md font-label-md text-xs uppercase tracking-wider font-bold transition-colors ${
                          upiVerified
                            ? 'bg-[#3A6351] text-white'
                            : 'bg-[#eae8e5] text-primary hover:bg-[#dbdad7]'
                        }`}
                      >
                        {upiVerified ? 'Verified ✓' : 'Verify'}
                      </button>
                    </div>
                  </div>
                )}

                {paymentTab === 'cards' && (
                  <div className="p-4 rounded-xl bg-[#f5f3f0] space-y-3 border border-[#eae8e5]">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-outline font-bold mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 text-xs text-primary focus:outline-none border border-[#eae8e5]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-outline font-bold mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white rounded-lg px-3 py-2 text-xs text-primary focus:outline-none border border-[#eae8e5]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-outline font-bold mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-white rounded-lg px-3 py-2 text-xs text-primary focus:outline-none border border-[#eae8e5]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentTab === 'netbanking' && (
                  <div className="p-4 rounded-xl bg-[#f5f3f0] space-y-3 border border-[#eae8e5]">
                    <span className="block text-xs font-bold text-primary">Popular Banks</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank, i) => (
                        <button
                          key={bank}
                          type="button"
                          className={`p-2 rounded-lg bg-white text-xs font-semibold border ${
                            i === 0 ? 'border-primary text-primary font-bold' : 'border-[#eae8e5] text-[#444748]'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {paymentTab === 'cod' && (
                  <div className="p-4 rounded-xl bg-[#f5f3f0] space-y-2 border border-[#eae8e5]">
                    <span className="block text-xs font-bold text-primary">Cash on Delivery Available</span>
                    <p className="text-xs text-[#444748]">
                      Pay in cash or through QR scan directly to the courier executive upon receipt. Automated WhatsApp confirmation sent after placing order.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Editorial Order Summary (38% / 5 cols) */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-48 flex flex-col gap-6">
              <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-[#eae8e5]">
                <h3 className="font-headline-md text-xl text-primary tracking-tight pb-4 border-b border-[#eae8e5] font-serif">
                  Order Summary
                </h3>

                {/* Promo Code Accordion/Input */}
                <div className="py-4">
                  <label className="block font-label-md text-xs uppercase tracking-wider text-[#444748] mb-1 font-bold">
                    Festive Promo Code
                  </label>
                  <form onSubmit={handleApplyPromo} className="flex items-center gap-1.5 bg-[#f5f3f0] rounded-lg p-1 border border-[#eae8e5]">
                    <span className="material-symbols-outlined text-[18px] text-outline ml-1">sell</span>
                    <input
                      className="w-full bg-transparent px-1 font-label-md text-xs text-primary uppercase font-bold tracking-wider focus:outline-none"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition-colors ${
                        promoApplied ? 'bg-secondary text-white' : 'bg-primary text-white'
                      }`}
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </form>
                  {promoApplied && (
                    <span className="mt-1.5 text-xs text-secondary flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      You saved ₹{discount} on this festive order!
                    </span>
                  )}
                  {promoError && (
                    <span className="mt-1 text-xs text-error font-medium">{promoError}</span>
                  )}
                </div>

                {/* Price Breakdown Architecture */}
                <div className="space-y-2.5 py-4 border-t border-[#eae8e5] text-xs font-sans">
                  <div className="flex items-center justify-between text-[#444748]">
                    <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} Items)</span>
                    <span className="font-semibold text-primary">₹{subtotal.toLocaleString()}.00</span>
                  </div>

                  {promoApplied && (
                    <div className="flex items-center justify-between text-secondary">
                      <span className="flex items-center gap-1">
                        Coupon Discount ({promoCode})
                      </span>
                      <span className="font-bold">-₹{discount.toLocaleString()}.00</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#444748]">
                    <span>Express Courier Shipping</span>
                    <span className="font-semibold text-secondary uppercase text-xs font-bold">
                      {shipping === 0 ? 'FREE' : `₹${shipping}.00`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#444748]">
                    <span>Estimated GST (Integrated 12%)</span>
                    <span className="font-semibold text-primary">₹{gst.toLocaleString()}.00</span>
                  </div>

                  <div className="pt-2">
                    <div className="h-px bg-[#eae8e5] w-full"></div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="font-headline-sm text-sm text-primary font-bold">Total Payable</span>
                      <span className="block text-[10px] text-[#444748]">Taxes and duties included</span>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-md text-xl lg:text-2xl text-primary font-bold font-serif">
                        ₹{total.toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action CTA */}
                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    disabled={cart.length === 0}
                    className="w-full py-4 px-6 rounded-full bg-primary text-white font-label-md text-xs uppercase tracking-widest font-bold hover:bg-[#1c1b1b] transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    <span>Complete Order &amp; Pay ₹{total.toLocaleString()}.00</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                  <p className="text-center font-body-sm text-[10px] text-outline leading-relaxed">
                    By placing this order, you agree to Slayvana’s Terms of Sale, artisanal returns guidelines, and consumer privacy policies.
                  </p>
                </div>

                {/* Trust Architecture Badges */}
                <div className="mt-6 pt-4 border-t border-[#eae8e5] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f5f3f0] flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">security</span>
                    </div>
                    <div>
                      <span className="block text-xs text-primary uppercase font-bold">256-Bit SSL Secured</span>
                      <span className="block text-[10px] text-[#444748]">Bank-grade end-to-end checkout encryption</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f5f3f0] flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                    </div>
                    <div>
                      <span className="block text-xs text-primary uppercase font-bold">Authentic Handcrafted Textiles</span>
                      <span className="block text-[10px] text-[#444748]">Sourced directly from certified Indian craft clusters</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f5f3f0] flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                    </div>
                    <div>
                      <span className="block text-xs text-primary uppercase font-bold">Hassle-Free 7-Day Exchange</span>
                      <span className="block text-[10px] text-[#444748]">Doorstep pickup available in metro hubs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Concierge Card */}
              <div className="bg-[#f5f3f0] rounded-xl p-4 flex items-center justify-between border border-[#eae8e5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                  </div>
                  <div>
                    <span className="block font-headline-sm text-xs font-bold text-primary">Styling or Fit Advice?</span>
                    <span className="block text-[11px] text-[#444748]">Chat live with our Mumbai atelier stylist</span>
                  </div>
                </div>
                <a
                  className="px-4 py-1.5 rounded-full bg-white text-primary font-label-md text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-colors font-bold shadow-sm"
                  href="https://wa.me/919911948738"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete The Look / Cross-Merchandising Carousel Slider */}
      <section className="w-full bg-[#f5f3f0]/50 py-12 mt-6 border-t border-[#eae8e5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-label-xs text-xs uppercase tracking-widest text-secondary font-bold">
                Curated Coordination
              </span>
              <h2 className="font-headline-md text-2xl text-primary mt-1 font-serif">
                Pairs Perfectly With Your Bag
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateScreen('shop-all')}
              className="font-label-md text-xs text-primary uppercase tracking-wider hover:text-secondary transition-colors hidden sm:block font-bold"
            >
              View All Recommendations →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedItems.map((item) => (
              <div key={item.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#efeeeb]">
                  <img
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={item.name}
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-primary font-label-xs text-[9px] uppercase font-bold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(item, item.sizes?.[0] || 'M');
                      setAddToastText(`${item.name} added to your bag!`);
                      setTimeout(() => setAddToastText(null), 2500);
                    }}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-start">
                  <div>
                    <h4 className="font-headline-sm text-xs font-bold text-primary tracking-tight line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="font-body-sm text-[10px] text-[#444748]">
                      {item.category} • {item.subtitle || 'Festive'}
                    </p>
                  </div>
                  <span className="font-price-sale text-xs text-primary font-bold">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Add Toast */}
      {addToastText && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1a] text-white px-4 py-2 rounded-full text-xs font-label-md shadow-xl flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
          <span>{addToastText}</span>
        </div>
      )}

      {/* Sticky Mobile Checkout Bar (Thumb Zone) */}
      {cart.length > 0 && !orderSuccess && (
        <aside aria-label="Mobile Checkout Action" className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#eae8e5] p-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#444748] uppercase tracking-wider block font-bold">Total Payable</span>
            <span className="font-headline-sm text-base font-bold text-primary">
              ₹{total.toLocaleString()}.00
            </span>
          </div>

          <button
            type="button"
            onClick={handleCompleteOrder}
            className="flex-1 max-w-[220px] h-12 px-4 rounded-full bg-primary text-white font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md"
          >
            <span>Complete Order</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </aside>
      )}

      {/* Order Placed Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fbf9f6] rounded-2xl max-w-lg w-full p-8 shadow-2xl relative text-center space-y-4 border border-[#eae8e5]">
            <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">celebration</span>
            </div>
            <span className="font-label-xs text-xs uppercase tracking-widest text-secondary font-bold">
              Order Confirmed
            </span>
            <h3 className="font-headline-lg text-2xl text-primary font-serif">
              Thank you, {fullName}!
            </h3>
            <p className="text-xs text-[#444748] leading-relaxed max-w-sm mx-auto">
              Your order <strong className="text-primary">{placedOrderId}</strong> has been received by our Mumbai Atelier. We have dispatched a confirmation to <strong>{mobile}</strong> and <strong>{email}</strong>.
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#eae8e5] text-left text-xs space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Estimated Delivery:</span>
                <span className="text-primary">Within 48-72 Hours (Express)</span>
              </div>
              <div className="flex justify-between text-[#444748]">
                <span>Shipping Partner:</span>
                <span>Bluedart Surface Air</span>
              </div>
              <div className="flex justify-between text-[#444748]">
                <span>Payment Mode:</span>
                <span className="uppercase font-bold text-secondary">{paymentTab}</span>
              </div>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setOrderSuccess(false);
                  onNavigateScreen('home');
                }}
                className="flex-1 py-3 rounded-full bg-primary text-white text-xs uppercase tracking-wider font-bold hover:bg-[#1c1b1b] transition-colors"
              >
                Return to Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderSuccess(false);
                  onNavigateScreen('shop-all');
                }}
                className="flex-1 py-3 rounded-full bg-[#eae8e5] text-primary text-xs uppercase tracking-wider font-bold hover:bg-[#dbdad7] transition-colors"
              >
                Shop More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
