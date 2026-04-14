
export const content = {
  nav: {
    home: { en: 'Home', ur: 'گھر' },
    services: { en: 'Services', ur: 'خدمات' },
    gallery: { en: 'Gallery', ur: 'گیلری' },
    locator: { en: 'Find Loved Ones Grave', ur: 'اپنے پیاروں کی قبر تلاش کریں' },
    about: { en: 'About Us', ur: 'ہمارے بارے میں' },
    contact: { en: 'Contact', ur: 'رابطہ' },
    updates: { en: 'Articles & Updates', ur: 'مضامین اور اپ ڈیٹس' },
    faq: { en: 'FAQ', ur: 'سوالات' },
  },
  hero: {
    title: {
      en: 'Premium Marble Gravestones & Custom Artistry in Karachi',
      ur: 'کراچی میں سنگ مرمر کے بہترین کتبے اور کسٹم کاریگری',
    },
    subtitle: {
      en: 'Karachi\'s trusted headstone maker and marble supplier for over 50 years. Specializing in Ziarat White, Black Granite, and custom engraving for memorials and modern kitchens across Pakistan.',
      ur: '50 سال سے زیادہ عرصے سے کراچی کے قابل اعتماد کتبہ بنانے والے اور ماربل سپلائر۔ پاکستان بھر میں یادگاروں اور جدید کچن کے لیے زیارت وائٹ، بلیک گرینائٹ، اور کسٹم کندہ کاری میں مہارت رکھتے ہیں۔',
    },
    cta: { en: 'Explore Our Services', ur: 'ہماری خدمات دریافت کریں' },
    galleryCta: { en: 'View Our Gallery', ur: 'ہماری گیلری دیکھیں' },
  },
  homeServices: {
    title: { en: 'Expert Marble Services in Karachi', ur: 'کراچی میں ماہرانہ ماربل سروسز' },
    services: [
      {
        icon: 'Gem',
        name: { en: 'Marble Gravestones & Memorials', ur: 'ماربل کے کتبے اور یادگاریں' },
        description: {
          en: 'Custom headstone maker in Karachi providing dignified Ziarat White and Black Granite memorials. We handle design, engraving, and installation with compassion.',
          ur: 'کراچی میں کسٹم کتبہ بنانے والے، جو زیارت وائٹ اور بلیک گرینائٹ کی باوقار یادگاریں فراہم کرتے ہیں۔ ہم ڈیزائن، کندہ کاری اور تنصیب کو ہمدردی کے ساتھ سنبھالتے ہیں۔',
        },
      },
      {
        icon: 'Home',
        name: { en: 'Kitchen & Home Marble Installation', ur: 'کچن اور ہوم ماربل کی تنصیب' },
        description: {
          en: 'Premium marble for kitchen countertops, floors, and decor. Get competitive prices for Peshawar White and artificial marble installations in Pakistan.',
          ur: 'کچن کاؤنٹر ٹاپس، فرش اور سجاوٹ کے لیے پریمیم ماربل۔ پاکستان میں پشاور وائٹ اور مصنوعی ماربل کی تنصیبات کے لیے مسابقتی قیمتیں حاصل کریں۔',
        },
      },
      {
        icon: 'Wrench',
        name: { en: 'Custom Marble Engraving', ur: 'کسٹم ماربل کندہ کاری' },
        description: {
          en: 'Specialized marble engraving in Karachi for government buildings, Islamic memorials, and custom signage. Detailed calligraphy on all stone types.',
          ur: 'سرکاری عمارتوں، اسلامی یادگاروں اور کسٹم سائن بورڈز کے لیے کراچی میں خصوصی ماربل کندہ کاری۔ تمام پتھروں پر تفصیلی خطاطی۔',
        },
      },
    ],
  },
  marbleTypes: {
    title: { en: "Marble & Granite Selection", ur: "ماربل اور گرینائٹ کا انتخاب" },
    description: { en: "High-quality stone for every project, from Ziarat White to imported Rosso Verona. Best marble flooring prices in Pakistan.", ur: "زیارت وائٹ سے لے کر درآمد شدہ روسو ویرونا تک ہر پروجیکٹ کے لیے اعلیٰ معیار کا پتھر۔ پاکستان میں ماربل فلورنگ کی بہترین قیمتیں۔" },
    types: [
      {
        slug: "rosso-verona-marble",
        name: { en: "Rosso Verona Marble", ur: "روسو ویرونا ماربل" },
        image: "/Gallery/tom/verona.png",
        hint: "Rosso Verona",
        page_description: {
          en: "Rosso Verona is a premium imported marble known for its rich, reddish tones. Ideal for high-end flooring and wall cladding in Karachi homes.",
          ur: "روسو ویرونا ایک پریمیم درآمد شدہ ماربل ہے جو اپنے گہرے سرخ رنگوں کے لیے جانا جاتا ہے۔ کراچی کے گھروں میں فرش اور دیواروں کی چادر کے لیے مثالی ہے۔"
        }
      },
      {
        slug: "black-granite",
        name: { en: "Black Granite", ur: "سیاہ گرینائٹ" },
        image: "/Gallery/tom/granite.png",
        hint: "black granite",
        page_description: {
          en: "Durable Black Granite for long-lasting gravestones and modern kitchen countertops. Known for its strength and timeless classic look in Pakistan.",
          ur: "پائیدار سیاہ گرینائٹ دیرپا کتبوں اور جدید کچن کاؤنٹر ٹاپس کے لیے۔ پاکستان میں اپنی مضبوطی اور لازوال کلاسک شکل کے لیے مشہور ہے۔"
        }
      },
      {
        slug: "artificial-white",
        name: { en: "Artificial White", ur: "مصنوعی سفید" },
        image: "/Gallery/tom/artificalwhite.png",
        hint: "artificial marble",
        page_description: {
          en: "Minimalist Artificial White marble for consistent, clean flooring and bathroom surfaces. A cost-effective solution for large residential projects.",
          ur: "مستقل اور صاف فرش اور باتھ روم کی سطحوں کے لیے مصنوعی سفید ماربل۔ بڑے رہائشی منصوبوں کے لیے ایک بہترین اور سستی حل۔"
        }
      },
      {
        slug: "sunny-grey",
        name: { en: "Sunny Grey", ur: "سنی گرے" },
        image: "/Gallery/tom/sunnygrey.png",
        hint: "grey marble",
        page_description: {
          en: "Contemporary Sunny Grey marble adds sophistication to any interior. A top-selling choice for modern flooring in Karachi.",
          ur: "عصری سنی گرے ماربل کسی بھی انٹیریئر میں نفاست کا اضافہ کرتا ہے۔ کراچی میں جدید فرش کے لیے سب سے زیادہ فروخت ہونے والا انتخاب۔"
        }
      },
       {
        slug: "sunny-white",
        name: { en: "Sunny White", ur: "سنی وائٹ" },
        image: "/Gallery/tom/sunnywhite.png",
        hint: "white marble",
        page_description: {
          en: "Bright Sunny White marble for airy bathrooms and decorative wall features. Timeless appeal for home interiors across Pakistan.",
          ur: "روشن سنی وائٹ ماربل باتھ رومز اور آرائشی دیواروں کے لیے۔ پاکستان بھر میں گھروں کے انٹیریئر کے لیے لازوال اپیل۔"
        }
      },
       {
        slug: "ziarat-white",
        name: { en: "Ziarat White", ur: "زیارت وائٹ" },
        image: "/Gallery/tom/ziaratwhite.png",
        hint: "Ziarat marble",
        page_description: {
          en: "Pakistan's finest Ziarat White marble. Pure white background with elegant veining, perfect for Islamic memorials and luxury floors.",
          ur: "پاکستان کا بہترین زیارت وائٹ ماربل۔ خالص سفید پس منظر اور خوبصورت رگوں کے ساتھ، اسلامی یادگاروں اور پرتعیش فرش کے لیے بہترین۔"
        }
      },
      {
        slug: "peshawar-white",
        name: { en: "Peshawar White", ur: "پشاور وائٹ" },
        image: "/Gallery/tom/peshawarwhite.png",
        hint: "Peshawar marble",
        page_description: {
          en: "Affordable Peshawar White marble for commercial projects and kitchen countertops. Durable and clean look for everyday use.",
          ur: "تجارتی منصوبوں اور کچن کاؤنٹر ٹاپس کے لیے سستی پشاور وائٹ ماربل۔ روزمرہ استعمال کے لیے پائیدار اور صاف ستھری شکل۔"
        }
      },
      {
        slug: "terbela",
        name: { en: "Terbela", ur: "تربیلا" },
        image: "/Gallery/tom/tarbela.png",
        hint: "Terbela marble",
        page_description: {
          en: "Unique Terbela marble with distinctive natural patterns. Used extensively for architectural accents and custom decorative pieces.",
          ur: "منفرد تربیلا ماربل جس کے مخصوص قدرتی نمونے ہیں۔ آرکیٹیکچرل لہجوں اور کسٹم آرائشی ٹکڑوں کے لیے بڑے پیمانے پر استعمال ہوتا ہے۔"
        }
      },
      {
        slug: "custom-marbles",
        name: { en: "Custom Marbles", ur: "کسٹم ماربلز" },
        image: "/Gallery/tom/custommarble.png",
        hint: "custom marble",
        page_description: {
          en: "Bespoke marble solutions for unique visions. We source and craft specialty stones for any residential or commercial project.",
          ur: "منفرد وژن کے لیے کسٹم ماربل کے حل۔ ہم کسی بھی رہائشی یا تجارتی منصوبے کے لیے خصوصی پتھر حاصل اور تیار کرتے ہیں۔"
        }
      },
    ]
  },
  homeFeed: {
    title: { en: "Recent Projects in Karachi", ur: "کراچی میں حالیہ منصوبے" },
    description: { en: "Fresh from our workshop: custom gravestones, headstones, and home marble installations.", ur: "ہماری ورکشاپ سے براہ راست: کسٹم کتبے اور ہوم ماربل کی تنصیبات۔" },
    cta: { en: "View Full Gallery", ur: "مکمل گیلری دیکھیں" },
    feedItems: [
      {
        image: "/Gallery/Grave/8.png",
        title: { en: "White Marble Gravestone", ur: "سفید ماربل کا کتبہ" },
        alt: { en: "Custom Ziarat White marble gravestone with Urdu engraving, Karachi", ur: "کراچی میں اردو کندہ کاری کے ساتھ کسٹم زیارت وائٹ ماربل کا کتبہ" },
        hint: "marble gravestone",
      },
      {
        image: "/Gallery/Headstone/8.png",
        title: { en: "Black Granite Headstone", ur: "سیاہ گرینائٹ کا کتبہ" },
        alt: { en: "Black granite headstone with Islamic calligraphy, Pakistan", ur: "پاکستان میں اسلامی خطاطی کے ساتھ سیاہ گرینائٹ کا کتبہ" },
        hint: "granite headstone",
      },
      {
        image: "/Gallery/HomeDecor/1.png",
        title: { en: "Modern Kitchen Countertop", ur: "جدید کچن کاؤنٹر ٹاپ" },
        alt: { en: "Marble kitchen countertop installation in a Karachi home", ur: "کراچی کے ایک گھر میں ماربل کچن کاؤنٹر ٹاپ کی تنصیب" },
        hint: "kitchen countertop",
      },
      {
        image: "/Gallery/HomeDecor/3.png",
        title: { en: "Custom Engraved Plaque", ur: "کسٹم کندہ شدہ تختی" },
        alt: { en: "Custom engraved marble plaque for a government building in Karachi", ur: "کراچی میں ایک سرکاری عمارت کے لیے کسٹم کندہ شدہ ماربل کی تختی" },
        hint: "marble plaque",
      }
    ],
  },
  homeAbout: {
    title: { en: '50 Years of Marble Craftsmanship in Pakistan', ur: 'پاکستان میں ماربل کی دستکاری کے 50 سال' },
    paragraph1: {
      en: 'Stylish Marble Art is Karachi\'s legacy stonemasonry business. We specialize in everything from respectful Islamic gravestones and memorials to luxury kitchen marble installations.',
      ur: 'سٹائلش ماربل آرٹ کراچی کا ایک قدیم سنگ تراشی کا کاروبار ہے۔ ہم احترام والے اسلامی کتبوں اور یادگاروں سے لے کر پرتعیش کچن ماربل کی تنصیبات تک ہر چیز میں مہارت رکھتے ہیں۔',
    },
    paragraph2: {
      en: 'Located in Malir 15, we serve families and businesses across Pakistan with high-quality Ziarat White, Black Granite, and specialized engraving services.',
      ur: 'ملیر 15 میں واقع، ہم پورے پاکستان میں خاندانوں اور کاروباروں کو اعلیٰ معیار کے زیارت وائٹ، بلیک گرینائٹ اور خصوصی کندہ کاری کی خدمات فراہم کرتے ہیں۔',
    },
    cta: { en: 'Our Legacy', ur: 'ہماری میراث' },
  },
  servicesPage: {
    title: { en: 'Professional Marble Services in Karachi', ur: 'کراچی میں پیشہ ورانہ ماربل سروسز' },
    description: {
      en: 'Karachi\'s premier headstone maker and marble installation specialists. From Ziarat White Islamic gravestones to modern Black Granite kitchen countertops, we deliver precision and care across Malir 15 and all of Pakistan.',
      ur: 'کراچی کے معروف کتبہ بنانے والے اور ماربل کی تنصیب کے ماہرین۔ زیارت وائٹ اسلامی کتبوں سے لے کر جدید بلیک گرینائٹ کچن کاؤنٹر ٹاپس تک، ہم ملیر 15 اور پورے پاکستان میں درستگی اور احتیاط کے ساتھ کام کرتے ہیں۔',
    },
    processTitle: { en: 'Our Craftsmanship Process', ur: 'ہماری کاریگری کا عمل' },
    processSteps: [
      {
        title: { en: '1. Consultation', ur: '۱. مشاورت' },
        description: { en: 'We discuss your specific needs, whether it is a respectful memorial design or a functional kitchen layout.', ur: 'ہم آپ کی مخصوص ضروریات پر بات کرتے ہیں، چاہے وہ ایک باعزت یادگاری ڈیزائن ہو یا کچن کی ترتیب۔' }
      },
      {
        title: { en: '2. Stone Selection', ur: '۲. پتھر کا انتخاب' },
        description: { en: 'Choose from premium Ziarat White, Black Granite, or Peshawar White marble at our Karachi workshop.', ur: 'ہماری کراچی ورکشاپ میں پریمیم زیارت وائٹ، بلیک گرینائٹ، یا پشاور وائٹ ماربل میں سے انتخاب کریں۔' }
      },
      {
        title: { en: '3. Precision Carving', ur: '۳. درست تراش' },
        description: { en: 'Our artisans use state-of-the-art engraving tools for intricate calligraphy and mirror-finish polishing.', ur: 'ہمارے کاریگر پیچیدہ خطاطی اور مرر فنش پالش کے لیے جدید ترین کندہ کاری کے آلات استعمال کرتے ہیں۔' }
      },
      {
        title: { en: '4. Professional Installation', ur: '۴. پیشہ ورانہ تنصیب' },
        description: { en: 'Safe transport and expert installation in all Karachi cemeteries or residential projects.', ur: 'کراچی کے تمام قبرستانوں یا رہائشی منصوبوں میں محفوظ ترسیل اور ماہرانہ تنصیب۔' }
      }
    ],
    serviceList: [
       {
        name: { en: 'Islamic Gravestones & Memorials', ur: 'اسلامی کتبے اور یادگاریں' },
        description: {
          en: 'As Karachi\'s trusted headstone maker for over 50 years, we specialize in creating dignified Islamic memorials. Using premium Ziarat White marble and durable Black Granite, we ensure a lasting tribute for your loved ones. Our services include high-detail Urdu/Arabic calligraphy engraving, portrait carving, and complete grave preparation in all major Karachi cemeteries including Wadi-e-Hussain and local graveyards. We prioritize compassion and quality in every stone we carve.',
          ur: '50 سال سے زیادہ عرصے سے کراچی کے قابل اعتماد کتبہ بنانے والے کے طور پر، ہم باوقار اسلامی یادگاریں بنانے میں مہارت رکھتے ہیں۔ پریمیم زیارت وائٹ ماربل اور پائیدار بلیک گرینائٹ کا استعمال کرتے ہوئے، ہم آپ کے پیاروں کے لیے ایک دیرپا خراج عقیدت کو یقینی بناتے ہیں۔ ہماری خدمات میں اعلیٰ تفصیل والی اردو/عربی خطاطی کی کندہ کاری، پورٹریٹ تراشنا، اور وادی حسین اور مقامی قبرستانوں سمیت کراچی کے تمام بڑے قبرستانوں میں قبر کی مکمل تیاری شامل ہے۔ ہم ہر اس پتھر میں ہمدردی اور معیار کو ترجیح دیتے ہیں جسے ہم تراشتے ہیں۔',
        },
        images: [
          { src: '/Gallery/Grave/8.png', alt: 'White Ziarat marble gravestone with Urdu engraving in Karachi', hint: 'gravestone' },
          { src: '/Gallery/Headstone/8.png', alt: 'Black granite headstone with custom Islamic calligraphy Pakistan', hint: 'gravestone' },
          { src: '/Gallery/Headstone/4.png', alt: 'Custom grave memorial design and installation Malir 15', hint: 'cemetery work' },
        ],
      },
      {
        name: { en: 'Kitchen & Home Marble Installation', ur: 'کچن اور ہوم ماربل کی تنصیب' },
        description: {
          en: 'Enhance your home with Karachi\'s best kitchen marble installation services. We offer a wide range of premium stones, from cost-effective Peshawar White and Artificial White to luxury imported granite. Our team in Malir 15 provides expert measurement, precision cutting, and professional edge-polishing to ensure a seamless mirror finish. Whether you are renovating your kitchen countertops, installing bathroom vanities, or upgrading your living room flooring, we provide the best marble rates and craftsmanship in Pakistan.',
          ur: 'کراچی کی بہترین کچن ماربل انسٹالیشن سروسز کے ساتھ اپنے گھر کو بہتر بنائیں۔ ہم سستے پشاور وائٹ اور مصنوعی سفید سے لے کر پرتعیش درآمد شدہ گرینائٹ تک پریمیم پتھروں کی ایک وسیع رینج پیش کرتے ہیں۔ ملیر 15 میں ہماری ٹیم ماہرانہ پیمائش، درست کٹنگ، اور پیشہ ورانہ ایج پالشنگ فراہم کرتی ہے تاکہ بغیر کسی جوڑ کے مرر فنش کو یقینی بنایا جا سکے۔ چاہے آپ اپنے کچن کے کاؤنٹر ٹاپس کی تزئین و آرائش کر رہے ہوں، باتھ روم کی وینٹیز لگا رہے ہوں، یا اپنے کمرے کے فرش کو اپ گریڈ کر رہے ہوں، ہم پاکستان میں بہترین ماربل ریٹ اور کاریگری فراہم کرتے ہیں۔',
        },
        images: [
          { src: '/Gallery/HomeDecor/1.png', alt: 'Modern marble kitchen countertop installation Karachi home', hint: 'kitchen countertop' },
          { src: '/Gallery/HomeDecor/2.png', alt: 'Premium marble flooring for high-end Karachi residential project', hint: 'marble floor' },
          { src: '/Gallery/HomeDecor/3.png', alt: 'Custom engraved wall cladding for government building project Pakistan', hint: 'wall cladding' },
        ],
      },
      {
        name: { en: 'Custom Stone Engraving & Signage', ur: 'کسٹم اسٹون کندہ کاری اور سائن بورڈز' },
        description: {
          en: 'Stylish Marble Art provides specialized stone engraving for commercial and government projects across Karachi. From large-scale plaques for public buildings to intricate residential nameplates, our state-of-the-art machinery handles all types of natural and artificial stone. We offer traditional hand-carved calligraphy as well as precision digital engraving. Our work can be seen in numerous institutional landmarks and private estates across Sindh, showcasing our commitment to detail and durability.',
          ur: 'سٹائلش ماربل آرٹ کراچی بھر میں تجارتی اور سرکاری منصوبوں کے لیے خصوصی پتھر کی کندہ کاری فراہم کرتا ہے۔ عوامی عمارتوں کے لیے بڑے پیمانے پر تختیوں سے لے کر پیچیدہ رہائشی نام کی تختیوں تک، ہماری جدید ترین مشینری تمام اقسام کے قدرتی اور مصنوعی پتھروں کو سنبھالتی ہے۔ ہم روایتی ہاتھ سے تراشی گئی خطاطی کے ساتھ ساتھ درست ڈیجیٹل کندہ کاری بھی پیش کرتے ہیں۔ ہمارا کام سندھ بھر کے متعدد ادارہ جاتی نشانات اور نجی جائیدادوں میں دیکھا جا سکتا ہے، جو تفصیل اور پائیداری کے لیے ہماری وابستگی کو ظاہر کرتا ہے۔',
        },
        images: [
          { src: '/Gallery/HomeDecor/3.png', alt: 'Government building marble plaque engraving Karachi', hint: 'stone engraving' },
          { src: '/Gallery/Headstone/3.png', alt: 'Detailed stone calligraphy for residential entrance Karachi', hint: 'calligraphy' },
          { src: '/Gallery/HomeDecor/4.png', alt: 'Custom marble signage and institutional plaques Pakistan', hint: 'signage' },
        ],
      },
    ],
  },
  faqPage: {
    title: { en: 'Frequently Asked Questions', ur: 'اکثر پوچھے گئے سوالات' },
    description: { en: 'Common questions about marble types, gravestones, and pricing in Karachi.', ur: 'کراچی میں ماربل کی اقسام، کتبوں اور قیمتوں کے بارے میں عام سوالات۔' },
    faqs: [
      {
        question: { en: 'Where is Stylish Marble Art located?', ur: 'سٹائلش ماربل آرٹ کہاں واقع ہے؟' },
        answer: { en: 'We are located at Malir 15, on the Main National Highway near Bank Al-Habib Ltd, Karachi, Pakistan.', ur: 'ہم ملیر 15، مین نیشنل ہائی وے، بینک الحبیب لمیٹڈ کے قریب، کراچی، پاکستان میں واقع ہیں۔' },
      },
      {
        question: { en: 'Do you serve locations outside of Karachi?', ur: 'کیا آپ کراچی سے باہر بھی خدمات فراہم کرتے ہیں؟' },
        answer: { en: 'Yes, while based in Karachi, we serve families and homeowners across all of Pakistan and provide international shipping options for the global Muslim community.', ur: 'جی ہاں، اگرچہ ہم کراچی میں مقیم ہیں، ہم پورے پاکستان میں خاندانوں اور گھر مالکان کی خدمت کرتے ہیں اور عالمی مسلم کمیونٹی کے لیے بین الاقوامی شپنگ کے اختیارات بھی فراہم کرتے ہیں۔' },
      },
      {
        question: { en: 'How long has the company been in business?', ur: 'کمپنی کتنے عرصے سے کام کر رہی ہے؟' },
        answer: { en: 'Stylish Marble Art has been operating for over 50 years as a trusted, family-run business in the stonemasonry industry.', ur: 'سٹائلش ماربل آرٹ 50 سال سے زیادہ عرصے سے سنگ تراشی کی صنعت میں ایک قابل اعتماد، خاندانی کاروبار کے طور پر کام کر رہا ہے۔' },
      },
      {
        question: { en: 'How can I get a price quote?', ur: 'میں قیمت کا کوٹیشن کیسے حاصل کر سکتا ہوں؟' },
        answer: { en: 'You can request a quote via our website contact form, WhatsApp (+92 308 3401606), or by visiting our workshop directly in Malir 15.', ur: 'آپ ہماری ویب سائٹ کے رابطہ فارم، واٹس ایپ (+92 308 3401606)، یا ملیر 15 میں ہماری ورکشاپ پر براہ راست آ کر کوٹیشن حاصل کر سکتے ہیں۔' },
      },
      {
        question: { en: 'Can I see your work in person?', ur: 'کیا میں آپ کا کام خود دیکھ سکتا ہوں؟' },
        answer: { en: 'Absolutely. Customers are encouraged to visit our workshop in Karachi to see our quality marble selection and finished craftsmanship firsthand.', ur: 'بالکل۔ صارفین کو کراچی میں ہماری ورکشاپ کا دورہ کرنے کی ترغیب دی جاتی ہے تاکہ وہ ہمارے معیاری ماربل کے انتخاب اور تیار شدہ دستکاری کو خود دیکھ سکیں۔' },
      },
      {
        question: { en: 'What types of gravestone services do you offer?', ur: 'آپ کتبے کی کونسی خدمات پیش کرتے ہیں؟' },
        answer: { en: 'We provide custom design, crafting, and professional installation of high-quality gravestones and headstones across Pakistan and for export to the Middle East and worldwide.', ur: 'ہم پورے پاکستان میں اعلیٰ معیار کے کتبوں اور یادگاروں کے کسٹم ڈیزائن، تیاری اور پیشہ ورانہ تنصیب فراہم کرتے ہیں اور مشرق وسطیٰ اور دنیا بھر میں برآمد کے لیے بھی دستیاب ہیں۔' },
      },
      {
        question: { en: 'Do you handle the complete preparation of a grave?', ur: 'کیا آپ قبر کی مکمل تیاری کو سنبھالتے ہیں؟' },
        answer: { en: 'Yes, we offer comprehensive services for the complete preparation of graves following burial, including the base structure and headstone.', ur: 'جی ہاں، ہم تدفین کے بعد قبروں کی مکمل تیاری بشمول بنیادی ڈھانچے اور کتبے کے جامع خدمات پیش کرتے ہیں۔' },
      },
      {
        question: { en: 'What materials are used for memorials?', ur: 'یادگاروں کے لیے کون سا میٹریل استعمال کیا جاتا ہے؟' },
        answer: { en: 'We work with a variety of premium stones, including Ziarat White marble, Black Granite, and specialized artificial composites.', ur: 'ہم مختلف پریمیم پتھروں کے ساتھ کام کرتے ہیں، بشمول زیارت وائٹ ماربل، بلیک گرینائٹ، اور خصوصی مصنوعی ماربل۔' },
      },
      {
        question: { en: 'Can portraits or custom photos be engraved on a gravestone?', ur: 'کیا کتبے پر تصاویر یا کسٹم ڈیزائن کندہ کیے جا سکتے ہیں؟' },
        answer: { en: 'Yes, our state-of-the-art engraving technology allows for intricate designs, religious text, and detailed portraits on stone.', ur: 'جی ہاں، ہماری جدید ترین کندہ کاری کی ٹیکنالوجی پتھر پر پیچیدہ ڈیزائن، مذہبی متن اور تفصیلی تصاویر بنانے کی اجازت دیتی ہے۔' },
      },
      {
        question: { en: 'Do you offer grave restoration services?', ur: 'کیا آپ قبروں کی بحالی کی خدمات پیش کرتے ہیں؟' },
        answer: { en: 'Yes, we provide cleaning, chip repair, and professional polishing for existing memorials to restore their original dignified appearance.', ur: 'جی ہاں، ہم موجودہ یادگاروں کی صفائی، مرمت اور پروفیشنل پالش فراہم کرتے ہیں تاکہ ان کی اصل باوقار شکل کو بحال کیا جا سکے۔' },
      },
      {
        question: { en: 'What home marble services are available?', ur: 'گھر کے لیے کون سی ماربل خدمات دستیاب ہیں؟' },
        answer: { en: 'We specialize in custom kitchen countertops, elegant marble flooring, wall cladding, and various decorative stone elements for your home.', ur: 'ہم کسٹم کچن کاؤنٹر ٹاپس، خوبصورت ماربل فلورنگ، وال کلیڈنگ اور آپ کے گھر کے لیے مختلف آرائشی پتھروں کے عناصر میں مہارت رکھتے ہیں۔' },
      },
      {
        question: { en: 'Do you offer custom engraving for non-memorial purposes?', ur: 'کیا آپ غیر یادگاری مقاصد کے لیے بھی کندہ کاری کرتے ہیں؟' },
        answer: { en: 'Yes, we create high-quality engraved plaques, nameplates, and custom stone designs for government buildings and residential decor.', ur: 'جی ہاں، ہم سرکاری عمارتوں اور رہائشی سجاوٹ کے لیے اعلیٰ معیار کی کندہ شدہ تختیاں، نام کی تختیاں اور کسٹم ڈیزائن تیار کرتے ہیں۔' },
      },
      {
        question: { en: 'Can I choose the specific type of stone for my kitchen counter?', ur: 'کیا میں اپنے کچن کاؤنٹر کے لیے مخصوص پتھر کا انتخاب کر سکتا ہوں؟' },
        answer: { en: 'Yes, we offer a vast selection of natural stones like Granite and Ziarat White, as well as modern artificial marble to match your specific style.', ur: 'جی ہاں، ہم گرینائٹ اور زیارت وائٹ جیسے قدرتی پتھروں کے ساتھ ساتھ جدید مصنوعی ماربل کا ایک ویب انتخاب پیش کرتے ہیں۔' },
      },
      {
        question: { en: 'Is artificial marble more durable than natural stone?', ur: 'کیا مصنوعی ماربل قدرتی پتھر سے زیادہ پائیدار ہے؟' },
        answer: { en: 'It depends on the specific use. Our expert team provides guidance on which material (natural stone vs. composite) is best for your project.', ur: 'یہ استعمال پر منحصر ہے۔ ہماری ماہر ٹیم اس بارے میں رہنمائی فراہم کرتی ہے کہ آپ کے پروجیکٹ کے لیے کون سا میٹریل (قدرتی بمقابلہ مصنوعی) بہترین ہے۔' },
      },
      {
        question: { en: 'How do I maintain my marble kitchen countertop?', ur: 'میں اپنے ماربل کچن کاؤنٹر کی دیکھ بھال کیسے کروں؟' },
        answer: { en: 'We provide professional cleaning and periodic polishing services to ensure your stone surfaces remain beautiful for years to come.', ur: 'ہم آپ کے پتھر کی سطحوں کو برسوں تک خوبصورت رکھنے کے لیے پیشہ ورانہ صفائی اور وقفے وقفے سے پالش کرنے کی خدمات فراہم کرتے ہیں۔' },
      },
      {
        question: { en: 'What is "Ziarat White" marble?', ur: '"زیارت وائٹ" ماربل کیا ہے؟' },
        answer: { en: 'Ziarat White is a premium natural white stone from Pakistan, highly valued for its serene white look and durability in both memorials and luxury flooring.', ur: 'زیارت وائٹ پاکستان کا ایک پریمیم قدرتی سفید پتھر ہے، جو اپنی خوبصورت سفید شکل اور پائیداری کی وجہ سے یادگاروں اور پرتعیش فرش کے لیے انتہائی موزوں ہے۔' },
      },
      {
        question: { en: 'Can you engrave on artificial marble?', ur: 'کیا آپ مصنوعی ماربل پر کندہ کاری کر سکتے ہیں؟' },
        answer: { en: 'Yes, our modern laser and mechanical engraving technology is fully compatible with both natural stone and artificial composites.', ur: 'جی ہاں، ہماری جدید لیزر اور مکینیکل کندہ کاری کی ٹیکنالوجی قدرتی پتھر اور مصنوعی ماربل دونوں کے لیے موزوں ہے۔' },
      },
      {
        question: { en: 'How long does it take to complete a custom gravestone?', ur: 'ایک کسٹم کتبہ تیار کرنے میں کتنا وقت لگتا ہے؟' },
        answer: { en: 'Completion times vary based on the complexity of the design and text. Most standard headstones are completed within 3 to 7 working days.', ur: 'تیاری کا وقت ڈیزائن اور متن کی پیچیدگی پر منحصر ہے۔ زیادہ تر معیاری کتبے 3 سے 7 کام کے دنوں میں مکمل ہو جاتے ہیں۔' },
      },
      {
        question: { en: 'Do you offer 3D design previews?', ur: 'کیا آپ تھری ڈی ڈیزائن پری ویو پیش کرتے ہیں؟' },
        answer: { en: 'Yes, for custom projects, we provide digital sketches and design previews to ensure the final product meets your expectations.', ur: 'جی ہاں، کسٹم پروجیکٹس کے لیے، ہم ڈیجیٹل خاکے اور ڈیزائن پری ویو فراہم کرتے ہیں تاکہ یہ یقینی بنایا جا سکے کہ فائنل پروڈکٹ آپ کی توقعات کے مطابق ہو۔' },
      },
      {
        question: { en: 'What sets Stylish Marble Art apart from other shops?', ur: 'سٹائلش ماربل آرٹ کو دیگر دکانوں سے کیا چیز ممتاز کرتی ہے؟' },
        answer: { en: 'Our 50-year legacy in Karachi, focus on compassionate service, and the use of cutting-edge engraving technology for unmatched detail, serving clients across the global Muslim Ummah.', ur: 'کراچی میں ہماری 50 سالہ میراث، ہمدردانہ خدمت پر توجہ، اور بے مثال تفصیل کے لیے جدید ترین کندہ کاری کی ٹیکنالوجی کا استعمال، جو عالمی مسلم امت کے صارفین کی خدمت کر رہی ہے۔' },
      }
    ]
  },
  locatorPage: {
    title: { en: 'Find Your Loved Ones Grave', ur: 'اپنے پیاروں کی قبر تلاش کریں' },
    description: {
      en: 'Search our database to find the precise location of a loved one\'s grave in Karachi and access essential care services from anywhere in the world.',
      ur: 'کراچی میں کسی عزیز کی قبر کا صحیح مقام تلاش کرنے کے لیے ہمارا ڈیٹا بیس تلاش کریں اور دنیا میں کہیں سے بھی ضروری دیکھ بھال کی خدمات تک رسائی حاصل کریں۔',
    },
    searchPlaceholder: { en: 'Search by name...', ur: 'نام سے تلاش کریں...' },
    addMemorial: { en: 'Pin a Grave Location', ur: 'قبر کا مقام پن کریں' },
    graveyardLabel: { en: 'Graveyard Name', ur: 'قبرستان کا نام' },
    servicesTitle: { en: 'Grave Care Services', ur: 'قبر کی دیکھ بھال کی خدمات' },
    requestService: { en: 'Request This Service', ur: 'اس سروس کی درخواست کریں' },
  },
  galleryPage: {
    title: { en: 'Marble Work Gallery - Global Islamic Craftsmanship', ur: 'ماربل ورک گیلری - عالمی اسلامی دستکاری' },
    description: {
      en: 'Explore our portfolio of custom gravestones, headstones, and kitchen marble projects crafted in Pakistan for clients worldwide.',
      ur: 'پاکستان میں دنیا بھر کے کلائنٹس کے لیے تیار کردہ کسٹم کتبوں، یادگاروں اور کچن ماربل پروجیکٹس کا ہمارا پورٹ فولیو دیکھیں۔',
    },
  },
  aboutPage: {
    title: { en: 'About Stylish Marble Art', ur: 'سٹائلش ماربل آرٹ کے بارے میں' },
    subtitle: {
      en: 'Legacy Stonemasons & Headstone Makers in Karachi Serving the Global Ummah Since 1970',
      ur: '1970 سے عالمی امت کی خدمت کرنے والے کراچی کے قدیم سنگ تراش اور کتبہ بنانے والے',
    },
    ourStoryTitle: { en: 'Our 50-Year Legacy in Karachi & Beyond', ur: 'کراچی اور اس سے آگے ہماری 50 سالہ میراث' },
    ourStoryText: {
      en: 'Stylish Marble Art is a family-owned legacy business that has stood the test of time on the Main National Highway in Karachi. For over 50 years, our workshop in Malir 15 has been the heart of premium stonemasonry in Pakistan. We specialize in high-quality Islamic gravestones, intricate memorials, and luxury kitchen marble installations. Our mission is to combine traditional hand-carving techniques with modern laser engraving technology to deliver stones that are not only beautiful but carry profound meaning for the families we serve, from Algeria to Yemen and the global Muslim diaspora.',
      ur: 'سٹائلش ماربل آرٹ ایک خاندانی میراثی کاروبار ہے جو کراچی کے مین نیشنل ہائی وے پر وقت کی کسوٹی پر کھڑا اترا ہے۔ 50 سال سے زیادہ عرصے سے، ملیر 15 میں ہماری ورکشاپ پاکستان میں پریمیم سنگ تراشی کا مرکز رہی ہے۔ ہم اعلیٰ معیار کے اسلامی کتبوں، پیچیدہ یادگاروں، اور پرتعیش کچن ماربل کی تنصیبات میں مہارت رکھتے ہیں۔ ہمارا مقصد روایتی ہاتھ سے تراشنے کی تکنیک کو جدید لیزر کندہ کاری کی ٹیکنالوجی کے ساتھ جوڑنا ہے تاکہ ایسے پتھر فراہم کیے جا سکیں جو نہ صرف خوبصورت ہوں بلکہ ان خاندانوں کے لیے گہرے معنی رکھتے ہوں جن کی ہم خدمت کرتے ہیں، الجیریا سے لے کر یمن اور عالمی مسلم ڈائسپورا تک۔',
    },
    ourMissionTitle: { en: 'Our Mission & Global Commitment', ur: 'ہمارا مشن اور عالمی عزم' },
    ourMissionText: {
      en: 'We believe that every piece of marble tells a story. Whether it is a kitchen countertop that brings a family together or a gravestone that honors a loved one\'s memory, we treat every project with the utmost respect and precision. We are committed to sourcing only the finest A-grade Ziarat White, Black Granite, and imported stones to ensure that our craftsmanship endures for generations in the Pakistani climate and worldwide. We proudly serve the global Muslim Ummah, providing dignified memorials across the Middle East, Africa, and Asia.',
      ur: 'ہمارا ماننا ہے کہ ماربل کا ہر ٹکڑا ایک کہانی سناتا ہے۔ چاہے وہ کچن کا کاؤنٹر ٹاپ ہو جو خاندان کو اکٹھا کرتا ہے یا قبر کا پتھر جو کسی عزیز کی یاد کا احترام کرتا ہے، ہم ہر پروجیکٹ کے ساتھ انتہائی احترام اور درستگی کے ساتھ پیش آتے ہیں۔ ہم صرف بہترین اے گریڈ زیارت وائٹ، بلیک گرینائٹ، اور درآمد شدہ پتھر حاصل کرنے کے لیے پرعزم ہیں تاکہ یہ یقینی بنایا جا سکے کہ ہماری کاریگری پاکستانی آب و ہوا میں اور دنیا بھر میں نسلوں تک برقرار رہے۔ ہم فخر کے ساتھ عالمی مسلم امت کی خدمت کرتے ہیں، مشرق وسطیٰ، افریقہ اور ایشیا میں باوقار یادگاریں فراہم کرتے ہیں۔',
    },
    ourValuesTitle: { en: 'Our Core Values', ur: 'ہمارے بنیادی اقدار' },
    values: [
      {
        name: { en: 'Unmatched Integrity', ur: 'بے مثال دیانت داری' },
        description: {
          en: 'We provide honest pricing and genuine material verification for every customer, ensuring complete transparency in Malir 15.',
          ur: 'ہم ہر صارف کے لیے ایماندارانہ قیمتیں اور حقیقی میٹریل کی تصدیق فراہم کرتے ہیں، ملیر 15 میں مکمل شفافیت کو یقینی بناتے ہیں۔',
        },
      },
      {
        name: { en: 'Generational Expertise', ur: 'نسلی مہارت' },
        description: {
          en: 'Our master stonemasons possess skills passed down through decades, specializing in complex Arabic and Urdu calligraphy.',
          ur: 'ہمارے ماسٹر سنگ تراشوں کے پاس دہائیوں سے چلی آنے والی مہارتیں ہیں، جو پیچیدہ عربی اور اردو خطاطی میں مہارت رکھتے ہیں۔',
        },
      },
      {
        name: { en: 'Compassionate Service', ur: 'ہمدردانہ خدمت' },
        description: {
          en: 'We handle memorial services with deep empathy, supporting grieving families through the process of creating a lasting tribute.',
          ur: 'ہم یادگاری خدمات کو گہری ہمدردی کے ساتھ سنبھالتے ہیں، سوگوار خاندانوں کو ایک دیرپا خراج عقیدت پیدا کرنے کے عمل میں مدد فراہم کرتے ہیں۔',
        },
      },
    ],
  },
  contactPage: {
    title: { en: 'Contact Our Karachi Workshop', ur: 'ہماری کراچی ورکشاپ سے رابطہ کریں' },
    description: {
      en: 'Get a quote for marble gravestones, kitchen countertops, or custom engraving. International inquiries welcome.',
      ur: 'ماربل کے کتبوں، کچن کاؤنٹر ٹاپس یا کسٹم کندہ کاری کے لیے کوٹیشن حاصل کریں۔ بین الاقوامی پوچھ گچھ خوش آئند ہے۔',
    },
    form: {
      name: { en: 'Full Name', ur: 'پورا نام' },
      email: { en: 'Email Address', ur: 'ای میل اڈریس' },
      message: { en: 'Message', ur: 'پیغام' },
      submit: { en: 'Send Inquiry', ur: 'درخواست بھیجیں' },
      successTitle: { en: 'Inquiry Received', ur: 'درخواست موصول ہوگئی' },
      successMessage: {
        en: 'Thank you. A specialist from Stylish Marble Art will contact you on WhatsApp or Email shortly.',
        ur: 'شکریہ۔ سٹائلش ماربل آرٹ کا ایک نمائندہ جلد ہی واٹس ایپ یا ای میل کے ذریعے آپ سے رابطہ کرے گا۔',
      },
      topics: {
        inquiry: { en: 'General Inquiry', ur: 'عمومی پوچھ گچھ' },
        pricing: { en: 'Pricing (Gravestones/Kitchen)', ur: 'قیمتیں (کتبے/کچن)' },
        appointment: { en: 'Workshop Appointment', ur: 'ورکشاپ کی ملاقات' },
        support: { en: 'Grave Services', ur: 'قبر کی خدمات' },
      }
    },
    contactInfo: {
      title: { en: 'Visit Stylish Marble Art', ur: 'سٹائلش ماربل آرٹ تشریف لائیں' },
      address: { en: 'Malir 15, At Main National Highway Near Bank Al-Habib Ltd Karachi, Pakistan', ur: 'ملیر 15، مین نیشنل ہائی وے پر، بینک الحبیب لمیٹڈ کے قریب، کراچی، پاکستان' },
      phone: { en: '+92 308 3401606', ur: '+92 308 3401606' },
      email: { en: 'stylishmarbleart2020@gmail.com', ur: 'stylishmarbleart2020@gmail.com' },
    },
  },
  updatesPage: {
    title: { en: 'Marble Articles & Global News', ur: 'ماربل مضامین اور عالمی خبریں' },
    description: { en: 'Expert guides on choosing gravestones, marble types in Pakistan, and serving the global Ummah.', ur: 'کتبوں کے انتخاب، پاکستان میں ماربل کی اقسام اور عالمی امت کی خدمت پر ماہرانہ گائیڈز۔' },
    feedTitle: { en: "Our Articles & Recent Work", ur: "ہمارے مضامین اور حالیہ کام" },
    items: [
        {
          type: 'custom',
          image: '/Gallery/Grave/8.png',
          title: { en: 'How to Choose the Right Gravestone Marble in Pakistan', ur: 'پاکستان میں کتبے کے لیے صحیح ماربل کا انتخاب کیسے کریں' },
          date: { en: 'May 2024', ur: 'مئی ۲۰۲۴' },
          content: { en: 'Choosing a lasting memorial requires understanding stone durability. In Pakistan, Ziarat White and Black Granite are the leading choices for their ability to withstand the harsh Karachi climate. This guide compares porosity, heat resistance, and aesthetic appeal for Islamic memorials.', ur: 'ایک دیرپا یادگار کا انتخاب کرنے کے لیے پتھر کی پائیداری کو سمجھنے کی ضرورت ہے۔ پاکستان میں، زیارت وائٹ اور بلیک گرینائٹ کراچی کی سخت آب و ہوا کو برداشت کرنے کی صلاحیت کی وجہ سے اولین انتخاب ہیں۔ یہ گائیڈ اسلامی یادگاروں کے لیے مسامیت، گرمی کے خلاف مزاحمت اور جمالیاتی اپیل کا موازنہ کرتی ہے۔' },
          alt: { en: 'Choosing gravestone marble Karachi Pakistan', ur: 'کراچی پاکستان میں کتبے کے ماربل کا انتخاب' },
          hint: 'marble guide'
        },
        {
          type: 'custom',
          image: '/Gallery/tom/ziaratwhite.png',
          title: { en: 'Ziarat White Marble: Pakistan\'s Finest Stone Explained', ur: 'زیارت وائٹ ماربل: پاکستان کے بہترین پتھر کی وضاحت' },
          date: { en: 'April 2024', ur: 'اپریل ۲۰۲۴' },
          content: { en: 'Ziarat White is globally recognized for its purity. Sourced from the mountains of Balochistan, it offers a clean, serene look ideal for both luxury home flooring and dignified grave markers. Learn why this stone remains a bestseller at our Malir workshop.', ur: 'زیارت وائٹ اپنی پاکیزگی کی وجہ سے عالمی سطح پر پہچانا جاتا ہے۔ بلوچستان کے پہاڑوں سے حاصل کیا گیا، یہ ایک صاف ستھری، پرسکون شکل پیش کرتا ہے جو پرتعیش گھریلو فرش اور باوقار قبر کے نشانات دونوں کے لیے موزوں ہے۔ جانیں کہ یہ پتھر ہماری ملیر ورکشاپ میں کیوں بیسٹ سیلر رہتا ہے۔' },
          alt: { en: 'Ziarat White marble guide Pakistan stone', ur: 'زیارت وائٹ ماربل گائیڈ پاکستان کا پتھر' },
          hint: 'marble stone'
        },
        {
          type: 'custom',
          image: '/Gallery/HomeDecor/1.png',
          title: { en: 'Best Marble Types for Kitchen Countertops in Pakistan', ur: 'پاکستان میں کچن کاؤنٹر ٹاپس کے لیے بہترین ماربل کی اقسام' },
          date: { en: 'March 2024', ur: 'مارچ ۲۰۲۴' },
          content: { en: 'Kitchen countertops face heat and stains. While Peshawar White is a budget-friendly option, Black Granite provides the ultimate protection. We review the top 5 stones for modern Pakistani kitchens.', ur: 'کچن کاؤنٹر ٹاپس کو گرمی اور داغ دھبوں کا سامنا کرنا پڑتا ہے۔ جبکہ پشاور وائٹ ایک بجٹ فرینڈلی آپشن ہے، بلیک گرینائٹ بہترین تحفظ فراہم کرتا ہے۔ ہم جدید پاکستانی کچن کے لیے ٹاپ 5 پتھروں کا جائزہ لیتے ہیں۔' },
          alt: { en: 'Kitchen marble guide Karachi Pakistan', ur: 'کچن ماربل گائیڈ کراچی پاکستان' },
          hint: 'kitchen marble'
        }
    ]
  },
  footer: {
    tagline: {
      en: 'Karachi\'s Premium Marble & Headstone Maker - Serving the Global Muslim Ummah',
      ur: 'کراچی کا پریمیم ماربل اور کتبہ بنانے والا - عالمی مسلم امت کی خدمت کر رہا ہے',
    },
    quickLinks: { en: 'Quick Links', ur: 'فوری لنکس' },
    legal: {
      en: '© 2024 Stylish Marble Art Karachi. All Rights Reserved.',
      ur: '© 2024 سٹائلش ماربل آرٹ کراچی۔ جملہ حقوق محفوظ ہیں.',
    },
  },
};
