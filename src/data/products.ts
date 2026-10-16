export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  sku: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  category: 'Sets' | 'Kurtis' | 'Tops' | 'Bottoms' | 'Dresses' | 'Jewelry';
  badge?: string;
  image: string;
  gallery?: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  description?: string;
  pairingDescription?: string;
  details?: {
    silhouette: string;
    fastening: string;
    lining: string;
    artisanal: string;
  };
  modelStats?: string;
  rating?: number;
  reviewsCount?: number;
  isSale?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'chaahvi-corset-set',
    name: 'Chaahvi Corset Kurti & Flared Pant Set',
    subtitle: 'Slayvana Atelier • Slayvana Edit',
    sku: 'SLY-SLY-24-CHS',
    price: 2499,
    originalPrice: 3299,
    discountBadge: '24% Off',
    category: 'Sets',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtCnQrB8tzR8vSSVKhZlUginp9vMh_FiMKPsa1YF5rvfz4v9Xp83M3fkGlPZCOC5xzP4eau84PGA1YDLN2_rnNFIIU3HiqJWAUGuaR1nSq6naBueg5AM73wdIwZXlKkZ3z_kHFTRIYDUnl1ev3lIakh0jj3m8O4KuSmR0kQHkNNYY0Ge7MYa7eTIjYDD4jX1Z0pLRLCLt3hzzt0A4mcgDzJQPByEdE_CaxMy7yGR6gIom11JODE6m',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtCnQrB8tzR8vSSVKhZlUginp9vMh_FiMKPsa1YF5rvfz4v9Xp83M3fkGlPZCOC5xzP4eau84PGA1YDLN2_rnNFIIU3HiqJWAUGuaR1nSq6naBueg5AM73wdIwZXlKkZ3z_kHFTRIYDUnl1ev3lIakh0jj3m8O4KuSmR0kQHkNNYY0Ge7MYa7eTIjYDD4jX1Z0pLRLCLt3hzzt0A4mcgDzJQPByEdE_CaxMy7yGR6gIom11JODE6m',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCC6s0ndcvcXbCB9wZ8JfP3iFmYt6J_GUTz0LIrMEaellGD_8ZjuyVW9PtyTTnSqyEPT-XoDU98qX_Yd6EF0CLyg322DVpPVakQu22ijkQWMIX_gc9CzWP2YClnJWUYAU5MZjQbHqptu9ulIOTnIXGWoqP9C2hKjza01DVOvUuLS9PKwG87JjQZwWbRk_OkZCrTL8tPJkTEp7iw51BbTBmnxv5gSQ-nCpMqVWUc3s7ScWJ_hpCsNfny',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8bhUAi3NuyPvV0HYIrdFEZ2BWMO1gN9IpBKCZ6Cx4UYYOq_5iwSzdth8_3fTMRhXTDk4VPIoSVKY1bj1X-dth6RgHOtSjd3gA1ve-ovEvaXxpSLGsJ3A7B628OhxOrHOn0GUIW1ff5fmY-MT6Xsaet0fVK1yeffhjtocadVWXe9bVR0rE83tuKhlmyraRaGVE619WuBFMDptnQLrEYvgE9X4me_wLCXAdICtlDiLB4n83tp1ZTe3d',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQoJT_KPaaC_Ek0slR9mK6UHIngV6VrrYVw691i9skrbMkL7VtiR0gE8CBmXXAiwJVrwHxuyVkolPLfh8dVNML-Kz-fyxvHxXcNpjAxd8l35g_zlZu1G5P93wXK0of1-WF_o4iI9cHpA4HXWxKUyMj6_-HLdxTO_clEMgvhjU0cpeJ-nyyRupZcgN7TdueMwVKF0UX7lWvP-oyNkeYUVwJPflctYhk6-EQDedsc8aCk4uE045HwPq'
    ],
    colors: [
      { name: 'Warm Sandstone', hex: '#f4ecd8' },
      { name: 'Rust Terracotta', hex: '#a23e18' },
      { name: 'Mughal Ivory', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Constructed from handwoven 100% pure cotton mulmul sourced directly from artisan collectives in Sanganer. The kurti features structured interior boning wrapped in double-layered breathable voile with an adjustable criss-cross lace fastening at the spine for customizable waist sculpt.',
    details: {
      silhouette: 'Strapless corset bodice with high-waisted wide-flare palazzo bottoms',
      fastening: 'Concealed side zipper with rear back tie-up eyelets',
      lining: '100% organic unbleached cotton mul throughout',
      artisanal: 'Hand-embroidered resham edge stitch details'
    },
    modelStats: "Height: 5'8\" / 173 cm | Bust: 33\" | Waist: 25\" | Hips: 36\" (Wearing Size S)"
  },
  {
    id: 'chunar-bralette',
    name: 'Chunar Bralette in Silk',
    subtitle: 'Festive Bestseller',
    sku: 'SLY-CHN-008',
    price: 1299,
    originalPrice: 1599,
    category: 'Tops',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4nICwgRrntU-q71X4o5VKq1ORR3T4T6Vm41vHAFoSorioykbSgOGuXMF1dspRNUYP20M7MJ5j9SyMQpFnDVT16rjl9De_ajG9xR6dJl-0reE1YWdH4Rfl2gMsjL_EslKOhwzvvbEMwdUaoQPfSNoGy9BoEnZbNDNkGaAYzthyYuZc5sRhe0rSXgshwu3z-XCX5GwCqd7MMgQxvCrPMdUcUv1pVGZIUSpbLT1MFl-WPibeOSJ0APLW',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4nICwgRrntU-q71X4o5VKq1ORR3T4T6Vm41vHAFoSorioykbSgOGuXMF1dspRNUYP20M7MJ5j9SyMQpFnDVT16rjl9De_ajG9xR6dJl-0reE1YWdH4Rfl2gMsjL_EslKOhwzvvbEMwdUaoQPfSNoGy9BoEnZbNDNkGaAYzthyYuZc5sRhe0rSXgshwu3z-XCX5GwCqd7MMgQxvCrPMdUcUv1pVGZIUSpbLT1MFl-WPibeOSJ0APLW',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7p70uUQbOczrjoXTkAcDnjgxZTa_nHmhCuX3I8hPaOm9ImTmV87-EdwH3UmD8Z_tybi7gxUDfFK4aedkgKnhJZyty2xQfrVL1SM3_hTRSOD3rYkRxpmQ35JTZQocOd9zkbZWbdMQrtrtWbrBjiDmWQWPWxjPYxJ0mKZAUQU_x3MLlHQM9RsaP-qTo_LLNxHVBte3bL64evGvbT3Xoc3V2jKxJymJF2W98MYm2FRAkaU8FDYS-Hnh'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Festive Fuchsia', hex: '#cf2767' },
      { name: 'Sunset Terracotta', hex: '#a23e18' }
    ],
    description: 'Vibrant embroidered Chunar bralette blouse with hand-tied tassel details and pearl trim, warm festive aesthetic.'
  },
  {
    id: 'diya-halter-top',
    name: 'Diya Halter Neck Top',
    subtitle: 'Slayvana Flash Sale',
    sku: 'SLY-DYA-109',
    price: 999,
    originalPrice: 1299,
    discountBadge: '22% Off',
    category: 'Tops',
    badge: '22% Off',
    isSale: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqq9e5xRmTXUcYUDROPHscCWrz0x7dkYOOc3dXff-70uPjD6vvr7pR0dg1kgRfpsA3NGQEAR36-7PaNvHhMcJ4nW9qdWekGAHKeEfOWIbFzH--YUBJlFffylxPGiyX0EA_vCD_TCoEFaA6cJQTkxkX0LOBYxZc_sPHkeZR1MazYNXmP-wn8931NiEGtEsqLKjenMxtCARKy8IFeTuawtxXcVJb8Zu5re5CerYlyZxItZ_oMonDuVij',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqq9e5xRmTXUcYUDROPHscCWrz0x7dkYOOc3dXff-70uPjD6vvr7pR0dg1kgRfpsA3NGQEAR36-7PaNvHhMcJ4nW9qdWekGAHKeEfOWIbFzH--YUBJlFffylxPGiyX0EA_vCD_TCoEFaA6cJQTkxkX0LOBYxZc_sPHkeZR1MazYNXmP-wn8931NiEGtEsqLKjenMxtCARKy8IFeTuawtxXcVJb8Zu5re5CerYlyZxItZ_oMonDuVij',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_rsgjlknHEmDzet270fd8TmWkAefSM-n4JgJtEkMuxvy0CMQUUMXR2XdXUsZa-Q5N0lozf4ymAsxXBOQp_kUStDjap1OZ3Pk0DIzgLpUqJTuRfo1CaJgyG_eO76UOHDykGgjrRKwJVSbvA-Zv9-yqeoDhgJdAp3uLZHLVk8EcYUiqd1RrUollcvbQgPbvX96770FNCTmDyukk2e59E4tmtYp3ij6rh04hZLRS5-Ci5IchqC4LTAPJ'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Vermillion Rust', hex: '#a23e18' },
      { name: 'Raw Ivory', hex: '#fbf9f6' }
    ],
    description: 'Rich vermillion red halterneck top with delicate mirror work borders, backless detailing and handcrafted festive tassels.'
  },
  {
    id: 'rangoli-corset-set',
    name: 'Rangoli Corset Gharara Set',
    subtitle: 'Atelier Royal Weave',
    sku: 'SLY-RNG-310',
    price: 2699,
    originalPrice: 3499,
    category: 'Sets',
    badge: 'Bestseller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIV3KegJsrIVzrBh9YdXCw506ulSwuS152r7uQ6VAlxWvMezkMm_13VHP_xhGBr5h9TS3hs3PweQUkiLCputQWocHfXdoJcmyk0mYIm8eEC8d5kb2-YWAVS2P8m3RwqvbavCnjrrtm8xCO7c0KSZ4lNuoupkFufvCj_PB5Xv5wGCpkD1nRDTomkQBY16O_UGEAQpPl44N8D958c3tr8Uxpvr8dBxGxDdZ-gBXjihwctStHam9nEiYR',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Deep Maroon', hex: '#63131e' },
      { name: 'Rust Sandstone', hex: '#a23e18' }
    ],
    description: 'Intricate rust maroon patterned sleeved corset kurti with tiered ruffled gharara bottoms, heritage courtyard styling.'
  },
  {
    id: 'gunj-mul-cover-up',
    name: 'Gunj Mul Breathable Cover Up',
    subtitle: 'Layering Collection',
    sku: 'SLY-GNJ-044',
    price: 1199,
    originalPrice: 1499,
    category: 'Tops',
    badge: 'Trending',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjtSi4WF7RMp-dhsDgvjKIl8wchU7WjBnjA0Xjg3638Wtie8AAKH_LfYxndbJRwuzD7E0TCw5Pm_CzGkRK0ktkY5dp1K0cN3qkgZLdKZBgHKJHA3FMM40MTlf2tFlN0hQFYfy45vlPAGxtk3xfooFuxKwONd3tamcLd4e7VA9cyI0KIypuSBdYGOUO3S0xpiY_uzsZAMzDytd_u4R033_DpmhhmLSLOeJKmkA5B_bfOSOiq2w5ugv',
    sizes: ['Free Size'],
    colors: [
      { name: 'Sheer Ivory White', hex: '#fbf9f6' }
    ],
    description: 'Lightweight unbleached organic white mulmul cotton sheer tunic cover-up with delicate golden zari neck detailing and breezy kimono silhouette.'
  },
  {
    id: 'meera-deep-back-kurti',
    name: 'Meera Deep Back Kurti',
    subtitle: 'Moonlit Heritage',
    sku: 'SLY-MRA-802',
    price: 1349,
    originalPrice: 1699,
    discountBadge: '21% Off',
    category: 'Kurtis',
    badge: '21% Off',
    isSale: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4IAirDNOaskkZkn43nolml-qvto0BWzNAccPXuKZGBdQszd4wkP8IJsrItdRscjqBnNg70N96re-G7zLoVxYM2PjndE--FLXLdbM4IkpcbecMAnfxGI_Cz2Wbejy2ArWy2Wc6EcFIg7n7TC3W3RxZnRod7Zny29F0wNP9SsqxXHlk5auL_NDqQHCeka0vEoLxQaR-nB6F8eYeesI7z5XMJS3Kqr16OvNor8E18tkdi5szcutpMJPz',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Midnight Indigo', hex: '#1c2847' },
      { name: 'Mughal Ivory', hex: '#fbf9f6' }
    ],
    description: 'Indigo block-print deep back sleeveless kurti with handmade brass and resham tassel cords for relaxed festive evenings.'
  },
  {
    id: 'delilah-handblock-set',
    name: 'Delilah Handblock Pant Set',
    subtitle: 'Artisanal Sanganeri Print',
    sku: 'SLY-DLH-512',
    price: 2499,
    originalPrice: 2999,
    category: 'Sets',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKIAifpTSYW4elxBNbVb2ebZQa1zHzeJRG3Q7dILu5d2a2pNxPHV1gDDeOVzXYbg3Nzv2ztHfERS5F3_yxY011pwqKnhdeJ7OEQKsOg2lWyz4cOY-oa_e7qnlEyl_6CybuYErRoX1TAF8CjMdJw1UGb0B59Z7AyzVTaqJFg5AguAXlz1yzid3watxc8BmahyZDBt7lVxZd10xZvKLTtI4yR52FO0PFH10pFQx_ygB3ectMTnk2WwII',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Olive Botanical', hex: '#5b6b47' },
      { name: 'Warm Cream', hex: '#f7f2e7' }
    ],
    description: 'Summery cream co-ord set with olive green and ochre botanical hand-block printed sleeveless tunic and straight pants.'
  },
  {
    id: 'white-linen-pants',
    name: 'White Linen Loose Fitting Pants',
    subtitle: 'Wardrobe Essential',
    sku: 'SLY-WLP-091',
    price: 1395,
    originalPrice: 1699,
    category: 'Bottoms',
    badge: 'Essential',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2466iWT5a5RA3CY8lCYBVAeLR64VIkTJitdyWgFuJfmXrv99iItaI4yOz0_4GMeDZHb_a8WR0_i6LASqtAY1Nc6Xm7F5G_Nue7nZeZAzLbYd0T0PmppQGOBq1-Es4HrV4TgGLTePIgdfR7eqpNY30mr04h1499_UJh3oG4cbOhW48v0dv6vfNUvfg4g0UTUP20a4E_FR13l0lw4CEIN0JFBkwcEjNWzwcUWXKJgsGgRbdnyXxZ4rT',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Sandstone Beige', hex: '#e8dec8' }
    ],
    description: 'Relaxed high-waisted wide-leg crisp white cotton linen trousers with airy fall, designed to complement kurtis and festive crop tops.'
  },
  {
    id: 'ramla-top',
    name: 'Ramla Tiered Organza Top',
    subtitle: 'Slayvana Edit',
    sku: 'SLY-RML-120',
    price: 1799,
    originalPrice: 2199,
    category: 'Tops',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu3TvTKhkQN-1kt9aadXOF-32Lh5hPnMHdqe64J1Dq4JAoEDn_lk8K_hXSEEn1I2bRnkFCCU_Mce2lZYMnwOe91XYBWWILGQpOijfJ12Wc226JCJPc3097QMAsmXEVwQmEYd4ndtF4p8mO6atKZFmqgjp1MnEQBnRN4JXetBdVT7VmIN0bYENYc0EyYDb5Ejnq59IdQRei7dz13byKQoafDz5SNPdg8WLfNgNKnP51WXmYY_XMTOZO',
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Coral Rose', hex: '#eb7a77' }
    ],
    description: 'Flowy tiered organza slip tunic top with bohemian tie details, styled with clean white flared pants.'
  },
  {
    id: 'aarti-top',
    name: 'Aarti Bandhani Corset Top',
    subtitle: 'Heritage Craft',
    sku: 'SLY-ART-203',
    price: 1799,
    originalPrice: 2299,
    category: 'Tops',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASyb8QK04v-LWSB07JmvTNHLd9nRP9ASF00GPhwVhVLtVRxyOvxBcQUUbX8oDI5TYZmOjTAtvMC0AAgFAC4P_bJ19uI31GybkWIrp8eS9HOXSeaRbPvOepkorYJLBn3rKJuQO-CpiftoZRpwc3l-N5HQSMCnbZQ7jBhNpgSQFES-i7pZwWbdwmaKdUZyBCW7Cqn7JNglCOoXm8kOQPYqiBx9Gg0v4Iq2qKNC6ceqTStrVasVkjCvsA',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Rust Red Bandhani', hex: '#932918' }
    ],
    description: 'Rich rust-red tie-and-dye bandhani sleeveless corset top with delicate shell embellishments and raw silk trims.'
  },
  {
    id: 'umang-kurta',
    name: 'Umang Modern Short Kurta',
    subtitle: 'Artisanal Blockprint',
    sku: 'SLY-UMG-411',
    price: 1799,
    originalPrice: 2199,
    category: 'Kurtis',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2cMwCvKa7agg6NJ0qWsmEqjPVjQLFv-hWki2q0Goo1do-aLQ3r6HEPp3JO9tSPNNadef7ml9rj52MVVsViTewlDh0HRpMBp1HIO_fAQWte83SCMmPGaXqjwlrCa9zTiRc-BonJQcZb_OJ50eqCS3iyPQBMYvCc2a6lynZw-RbVftBxYoXjQ__nTO06JTw73Fukq2V2Wa9eecbUQQ-7KyUa26GQoWsYmGsKgZ2XODAjjsG9vLMoBY2',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Indigo Geometric', hex: '#1d2745' }
    ],
    description: 'Midnight indigo and silver geometric block-print short modern kurta with mandarin collar, tailored for festive soirees.'
  },
  {
    id: 'apsara-set',
    name: 'Apsara Peplum & Sharara Set',
    subtitle: 'Festive Celebration',
    sku: 'SLY-APS-601',
    price: 2499,
    originalPrice: 3199,
    category: 'Sets',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsVhXERofp4WnqgvPZbKD2DxAsk1vLkUcwfXTIpZ0X_KTUKClv1A-HJxBGJ2-4D1kBq5NbgaGB5AyeTsxTPCGNDwzn2ecyiITkNtiiirzGclP1Gcq2ihLZPkLGstAxep_ZIPqxDsLirdq0xVKPB76Scfg8jrF8kB5cvma8zZdOeomti1WsWaJt6qq2Hft4YZtzms0lfQigHh-SgXViBeusU-CSTumIDPY7EijnsS-VQtjCnCA0d09s',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Ochre & Coral', hex: '#d9822b' }
    ],
    description: 'Printed ochre yellow and coral sleeveless short peplum kurti paired with voluminous matching sharara pants.'
  },
  {
    id: 'chashni-set',
    name: 'Chashni Off-Shoulder Set',
    subtitle: 'Minimalist Raw Silk',
    sku: 'SLY-CSH-709',
    price: 2499,
    originalPrice: 3299,
    category: 'Sets',
    badge: 'New In',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzB09AO5qb51zq7urifGrJexVqL8pDWmRnH7eB_FnIY3HQJzuIT9lBjSfm7fHwJSvTQBGowNvYq3S4uPSGgdxuvwPOzYXucOwFBhvHKRfJXZgz1QnpXHwMXRZW45wNKqnhSJUz1a5dPprylJjQlsK9qhEV0Dj-FRYkBywCu7nVtgRk-AzpywWC7RHocHvsHCfIez3JdJZyp79b--AO6-seQFOz5fniDL1SAagbtSrc1ThhWRxZqXYP',
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Raw Silk Ivory', hex: '#f7f4eb' }
    ],
    description: 'Unbleached raw silk off-shoulder tube kurti top and sleek ivory straight trousers with minimalist architectural flair.'
  },
  {
    id: 'jharna-sheer-kurti',
    name: 'Jharna Sheer Short Kurti',
    subtitle: 'Bohemian Festive',
    sku: 'SLY-JHN-331',
    price: 1295,
    originalPrice: 1599,
    category: 'Kurtis',
    badge: 'Trending',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYvOgl_ba4WSwRcJg1kexF0J1OzspejmmSNkhArClpKiT4RrQHjmfMlVEmU7RwA8brNv9VXdodFzqqVfEJQ7pym8cb6R1vFtboeCV7eIS5w8yjnWzeu4msALQ6-UctJhVto8c03K-GzrMnynFDU08q4IytdKBw4G4g-bgYFt55ffEltn9h5moa24FW0ZYfU8T_FmmBxy8575qjvT4zXTt9l12RdPHhtfuVghx8FSdu1e3CIdYQCQiW',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Earthy Brown', hex: '#634735' }
    ],
    description: 'Earthy brown sheer embroidered short kurti top with gold border trimming, effortless for festive layering.'
  },
  {
    id: 'beige-cotton-pants',
    name: 'Beige Cotton Flared Pants',
    subtitle: 'Tailored Linen',
    sku: 'SLY-BCP-114',
    price: 1350,
    originalPrice: 1650,
    category: 'Bottoms',
    badge: 'Bestseller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_GaNfO5G60buTIU9kBAziw2FLmzpFooDKToul0bxdEiQhFuq6Qh-POslgR090GmHFno3SC56XhV2EPP_CTAjj4z2omzTJSZo71JceddvR4HilJ4rFFvsBh5_GaPp4O1sX070nWAtHtnCUa9J0Rs9tPA5N2lpdSwosAjGMk0SPbmshemGNHPwOeEmToHs4wqBZ2SPfqXEKtFGF9lKCnA6NSKyfurjS1vrlWCMXqGQFDSdRMammGAPO',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Natural Sand', hex: '#e3d8c5' }
    ],
    description: 'Tailored beige cotton linen high-waisted pleated trousers with subtle flare and delicate lace inserts.'
  },
  {
    id: 'dabu-halter-corset',
    name: 'Dabu Halter Neck Corset Kurti',
    subtitle: 'Indigo Artisan Blockprint',
    sku: 'SLY-DAB-019',
    price: 1395,
    originalPrice: 1750,
    category: 'Kurtis',
    badge: 'Trending',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBADq71Y93Rf7vv5rgmb-URjMiX64aF0agXGx4xHDYwJK8FU5dj8gv_-FyHCUCPdOr7xVvbDtg2oE3dNtpRSh3oo9BbTmkikfp2sR3xa-16-rms-04zpdoLupEJTNM4_c6JifRxl0MAieGduJFZwvD1WYn0d8iuAUWSGuJjx8BbGShKj7n_UaBP0qwnpl8UhT0VIx-VxF0UiGafNZxXie6wqzIFeMcICsCHbyUxTafAfFrI6vt8_ffY',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBADq71Y93Rf7vv5rgmb-URjMiX64aF0agXGx4xHDYwJK8FU5dj8gv_-FyHCUCPdOr7xVvbDtg2oE3dNtpRSh3oo9BbTmkikfp2sR3xa-16-rms-04zpdoLupEJTNM4_c6JifRxl0MAieGduJFZwvD1WYn0d8iuAUWSGuJjx8BbGShKj7n_UaBP0qwnpl8UhT0VIx-VxF0UiGafNZxXie6wqzIFeMcICsCHbyUxTafAfFrI6vt8_ffY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAE0DgzpHGB1ilte77gwr-kbp1oP3OkvOrsFXRNs6Uwu8PPe5Dxn60N7sSDgDGb7YHccD48Xi_zGOUijMl6_MzhayQaENCdmBIzwjECKTBF4nphxs1exe7jZeJNfYeRdrOBa18idGOgswWtH1uYWAufYAnEvplM1cooDcHjdFJXNJ64Pij7xsxt1X0PaM4QF53gfHu3Fg84SdU6lLS7EDhAHibs9McDA__uBrZxYvKeNkCP6xKetut7'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Indigo Dabu', hex: '#1f305e' }
    ],
    description: 'Contemporary indigo blue Dabu block print halter neck corset kurti with delicate gold zari embroidery on natural handspun cotton.'
  },
  {
    id: 'liza-halterneck-skirt-set',
    name: 'Liza Halterneck Skirt Set',
    subtitle: 'Pistachio Silk Festivity',
    sku: 'SLY-LZA-882',
    price: 2499,
    originalPrice: 3299,
    category: 'Sets',
    badge: 'Festive Edit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5bNy5sBZVrjUwG-GuwOg7Kv5Ms9ZjsFR5iYhgd6TtG4LP9uieldqzJEnCyNtNmJR4IH_WYiyHHjDEKDWJ1FqG0HzslXWXZwWb-2rxIXiobBtoWLWBNIhIppHRHLzmuNO1JC5ivxMe6651kpTH41CXa7eHEyZvOpQNE_83X-r5da2AOLg6v5jI9JWuxEkNkSafWzSwjVz25wLK04J_krrnHh_gqGmSOcOF1kAwmyEzaNHbUQJHBNZa',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Pistachio Green', hex: '#87a96b' }
    ],
    description: 'Vibrant pistachio green silk halterneck corset top and tiered ruffled festive skirt, celebratory and fluid.'
  },
  {
    id: 'eleena-corset-top',
    name: 'Eleena Corset Top',
    subtitle: 'Earth Tone Geometric',
    sku: 'SLY-ELN-449',
    price: 1799,
    originalPrice: 2299,
    category: 'Tops',
    badge: 'Festive Edit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMUoRKoaK0Sp6iCi1Mf9GzQ4tkJHgwSYy9jYQXfefUcjixk5YKxdmdw9HIpklakx97wfajavDQsfwt33tO6wBOH0o8tyuwvLytBjTwr2kuCmyhE2Dz4HMiKfkPghRFSX__-wEU5rTLRoLuPNazCnWeLps_T-uK8gjfCregrdtYqzyfj9girLRiV5njciwMxb4Unl4-oE4WcmdlxOaj2JlLhAHm82BS6ApyFETuiP9xrKuRgKsp86Xo',
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Earth Ochre', hex: '#a67b5b' }
    ],
    description: 'Earth-tone geometric block print halter corset top with tie-up back, paired gracefully with raw silk pants.'
  },
  {
    id: 'karishma-mul-set',
    name: 'Karishma Mul Kurti Pant Dupatta Set',
    subtitle: 'Lavender Pastel Soiree',
    sku: 'SLY-KSH-912',
    price: 2249,
    originalPrice: 2899,
    category: 'Sets',
    badge: 'Festive Edit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrEImGkcLBRypsceWL7F_TPvyjcQjOxgAd6rmChS9SONbDzcynY97uu-lwOw4_av8YKy_yUV5TLAxX-X6GeR7B58Tp5iPyWuBCGhXB4WG48Q_85DBq3O8N9mm4d9pr3yZznyjDfakfY1uSSpKNN16dHvjziA0qp0AF4i1MWX-_jTaDbUvGoF5S3QPQcUinfYj0zIkYXK0Vsh4OEDxQWSXO2nIlbwzCCFqa3jDon27GvYPs07Mh7_Aq',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Lavender Haze', hex: '#b39eb5' }
    ],
    description: 'Modern Indian lavender cotton mulmul kurti pant set with matching lightweight dupatta draped effortlessly.'
  },
  {
    id: 'mausam-top',
    name: 'Mausam Top',
    subtitle: 'Seasonal Discount',
    sku: 'SLY-MSM-330',
    price: 999,
    originalPrice: 1399,
    discountBadge: '28% Off',
    category: 'Tops',
    badge: '28% Off',
    isSale: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrBU3DjF2UToXG6d9daibcTzvFpCQrABUSO3U4wJviXNXFBw6XTkVUa1TZutQiNuS3pq7MDPJwxLnZ3XNmGqcPjc8WhGbpr17FiPe0cr-NPjtuKBR6kRwbuuR18ErSI2pW32dFxlyBUrS15tgsFl3vlNvXEzUFPdjGCf-S4al5Nbn3mkRBBJ8JYdpViJuWEH0D20jQee4OPinKZCcAp7SjBVU5kgF3SJyJrMeuR4gv4WgpUSoWZrI9',
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Sky Tie-Dye', hex: '#5b84b1' }
    ],
    description: 'Tie-dye blue and white asymmetric hem halter top with open back and fluid contouring.'
  },
  {
    id: 'kaya-halter-top',
    name: 'Kaya Halter Neck Top',
    subtitle: 'Indigo Floral Blockprint',
    sku: 'SLY-KYA-770',
    price: 999,
    originalPrice: 1370,
    discountBadge: '24% Off',
    category: 'Tops',
    badge: '24% Off',
    isSale: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr_dLSQ8Mwjixf__RrPli81fPor7Ynlmh3WUxXG71XPOak75i7ioiwvEGQNjNOdgdO1Ic3CYeyNnxZUkaWvJsiqiWpr-xg3BDqdb4Gvf8RmIHEJfffFKKVNBLwMiPUEnGvSVOQGwEhaeyT-wjdGH1VgaHSyCiqGGw0-g32YGjBGbYq6At9aRYC73RnyEAUw72OnpOfOQPBgcXIYRvV9GjGgKsbTRkEDknHBoZQkqay_OxXmzFwrf3c',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Navy Floral', hex: '#1b2a47' }
    ],
    description: 'Deep navy floral block-printed halter neck ethnic top styled with silver oxidised trim.'
  },
  {
    id: 'chandrika-jhumka',
    name: 'Chandrika Jhumka Drops',
    subtitle: 'Antique Brass & Pearl',
    sku: 'SLY-JWL-012',
    price: 799,
    originalPrice: 1100,
    category: 'Jewelry',
    badge: 'Handcrafted',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr1AJYCtZZHFAPTvpcT_urXVMqLgacCOW3Z6MpkNBugfQGdRhBXPdIYYn3eo8lgsJkodVs6WTMpee6JL_7fcICZIWcWltrSdRhXmLW7pmAihguY5NQDkkj1fJCx8Z1XE81sJxcZT1GW9I-_j6bd6_ISfHJxV4Z1OBytrNYK9gjk_Ne0sJ3UXfHa2dMnz3aTuWnGFE1iLlrN6moortMwGwQon8Cssw87khdywYlvrKyHXIQ6z8793uh',
    sizes: ['One Size'],
    colors: [
      { name: 'Antique Brass & Pearl', hex: '#b59a57' }
    ],
    description: 'Handcrafted antique brass oxidized temple statement earrings with freshwater pearl drop beads.'
  }
];

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
