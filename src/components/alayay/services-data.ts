// Full construction, general contracting, fit-out and maintenance service
// catalogue. Used by the /services listing page and the homepage category grid.

export type ServiceCategory = {
  id: string;
  icon: string;
  title: string;
  titleAr: string;
  items: string[];
  itemsAr: string[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'construction',
    icon: 'crane',
    title: 'Construction Services',
    titleAr: 'خدمات البناء',
    items: [
      'Luxury Villa Construction', 'Residential Building Construction', 'Commercial Building Construction',
      'Turnkey Construction Projects', 'Structural Construction', 'Reinforced Concrete Works',
      'Foundation Works', 'Excavation & Earthworks', 'Waterproofing Works', 'Blockwork & Masonry',
      'Roof Construction', 'Steel Reinforcement Installation', 'Formwork & Shuttering',
      'Concrete Pouring', 'Structural Repairs',
      'Warehouse Construction', 'Annex Construction', 'Office Construction',
      'Retail Shop Construction', 'Residential Complex Construction',
    ],
    itemsAr: [
      'بناء الفلل الفاخرة', 'بناء المباني السكنية', 'بناء المباني التجارية',
      'مشاريع البناء الجاهزة بالكامل', 'الإنشاءات الهيكلية', 'أعمال الخرسانة المسلحة',
      'أعمال الأساسات', 'الحفر وأعمال التربة', 'أعمال العزل المائي', 'أعمال البلوك والبناء',
      'إنشاء الأسقف', 'تركيب حديد التسليح', 'أعمال الشدة الخشبية',
      'صب الخرسانة', 'الإصلاحات الإنشائية',
      'إنشاء المستودعات', 'إنشاء الملاحق', 'إنشاء المكاتب',
      'إنشاء المحلات التجارية', 'إنشاء المجمعات السكنية',
    ],
  },
  {
    id: 'general-contracting',
    icon: 'hardhat',
    title: 'General Contracting',
    titleAr: 'المقاولات العامة',
    items: [
      'Design & Build', 'Project Management', 'Construction Supervision', 'Civil Engineering Works',
      'Site Preparation', 'Quantity Surveying', 'Material Procurement', 'Contractor Coordination',
      'Municipality Approvals Assistance', 'Quality Assurance & Quality Control (QA/QC)',
    ],
    itemsAr: [
      'التصميم والبناء', 'إدارة المشاريع', 'الإشراف على البناء', 'الأعمال المدنية',
      'تجهيز الموقع', 'حصر الكميات', 'توريد المواد', 'تنسيق المقاولين',
      'المساعدة في اعتمادات البلدية', 'ضمان وضبط الجودة',
    ],
  },
  {
    id: 'villa-expansion',
    icon: 'extension',
    title: 'Villa Expansion & Extensions',
    titleAr: 'توسعة وإضافات الفلل',
    items: [
      'Villa Extensions', 'Villa Expansion', 'New Rooms Addition', 'Majlis Construction',
      'Guest House Construction', 'Outdoor Living Areas', 'Roof Extensions',
      'Basement Construction', 'Garage Construction',
    ],
    itemsAr: [
      'إضافات الفلل', 'توسعة الفلل', 'إضافة غرف جديدة', 'بناء المجالس',
      'بناء بيوت الضيافة', 'مناطق المعيشة الخارجية', 'توسعة الأسطح',
      'إنشاء البدروم', 'بناء الكراجات',
    ],
  },
  {
    id: 'renovation',
    icon: 'renovation',
    title: 'Renovation & Remodeling',
    titleAr: 'التجديد وإعادة التصميم',
    items: [
      'Villa Renovation', 'Interior Renovation', 'Exterior Renovation', 'Complete Property Remodeling',
      'Structural Renovation', 'Office Renovation', 'Commercial Renovation', 'Apartment Renovation',
      'Kitchen Remodeling', 'Bathroom Remodeling',
    ],
    itemsAr: [
      'تجديد الفلل', 'التجديد الداخلي', 'التجديد الخارجي', 'إعادة تصميم العقار بالكامل',
      'التجديد الإنشائي', 'تجديد المكاتب', 'التجديد التجاري', 'تجديد الشقق',
      'تجديد المطابخ', 'تجديد الحمامات',
    ],
  },
  {
    id: 'maintenance',
    icon: 'amc',
    title: 'Maintenance Services',
    titleAr: 'خدمات الصيانة',
    items: [
      'Annual Maintenance Contracts (AMC)', 'Preventive Maintenance', 'Corrective Maintenance',
      'Emergency Maintenance', 'Building Maintenance', 'Villa Maintenance', 'Property Maintenance',
      'Facility Maintenance',
      'Apartment Maintenance', 'Office Maintenance', 'Warehouse Maintenance', 'Shop Maintenance',
    ],
    itemsAr: [
      'عقود الصيانة السنوية', 'الصيانة الوقائية', 'الصيانة التصحيحية',
      'الصيانة الطارئة', 'صيانة المباني', 'صيانة الفلل', 'صيانة العقارات',
      'صيانة المرافق',
      'صيانة الشقق', 'صيانة المكاتب', 'صيانة المستودعات', 'صيانة المحلات',
    ],
  },
  {
    id: 'civil-works',
    icon: 'civil',
    title: 'Civil Works',
    titleAr: 'الأعمال المدنية',
    items: [
      'Concrete Repair', 'Structural Strengthening', 'Crack Repair', 'Plaster Works', 'Cement Works',
      'Pavement Works', 'Kerbstone Installation', 'Interlock Installation', 'Boundary Walls', 'Retaining Walls',
      'Restoration Works', 'Rehabilitation Works', 'Boundary Wall Maintenance',
      'Internal Pavement Restoration', 'Walkway Repair', 'Private Parking Maintenance',
    ],
    itemsAr: [
      'إصلاح الخرسانة', 'التقوية الإنشائية', 'إصلاح الشروخ', 'أعمال المحارة', 'أعمال الإسمنت',
      'أعمال الرصف', 'تركيب الأرصفة الحجرية', 'تركيب الإنترلوك', 'الأسوار الخارجية', 'جدران الاستناد',
      'أعمال الترميم', 'أعمال إعادة التأهيل', 'صيانة الأسوار',
      'ترميم الأرصفة داخل المشروع', 'إصلاح الممرات', 'صيانة المواقف الخاصة',
    ],
  },
  {
    id: 'fit-out',
    icon: 'fitout',
    title: 'Interior Fit-Out',
    titleAr: 'التشطيبات الداخلية',
    items: [
      'Complete Fit-Out', 'Gypsum Ceiling', 'Drywall Systems', 'Partition Works', 'Decorative Ceilings',
      'Feature Walls', 'Flooring Installation', 'Marble Installation', 'Porcelain Installation',
      'Wooden Flooring', 'Carpentry', 'Joinery', 'Wardrobes', 'Doors & Frames', 'Kitchen Cabinets',
      'Stone Works',
    ],
    itemsAr: [
      'التشطيب الكامل', 'أسقف الجبس', 'أنظمة الدريوال', 'أعمال الفواصل', 'الأسقف الديكورية',
      'الجدران المميزة', 'تركيب الأرضيات', 'تركيب الرخام', 'تركيب البورسلين',
      'الأرضيات الخشبية', 'أعمال النجارة', 'أعمال التلبيس الخشبي', 'الخزائن', 'الأبواب والإطارات', 'خزائن المطبخ',
      'الحجر',
    ],
  },
  {
    id: 'exterior-works',
    icon: 'facade',
    title: 'Exterior Works',
    titleAr: 'الأعمال الخارجية',
    items: [
      'Stone Cladding', 'Natural Stone Installation', 'Facade Restoration', 'External Painting',
      'Decorative Stone', 'Pergolas', 'Boundary Walls', 'Gates Installation', 'Aluminium Works', 'Glass Installation',
    ],
    itemsAr: [
      'تكسية الحجر', 'تركيب الحجر الطبيعي', 'ترميم الواجهات', 'الدهان الخارجي',
      'الحجر الديكوري', 'البرجولات', 'الأسوار الخارجية', 'تركيب البوابات', 'أعمال الألمنيوم', 'تركيب الزجاج',
    ],
  },
  {
    id: 'mep',
    icon: 'mep',
    title: 'Mechanical, Electrical & Plumbing (MEP)',
    titleAr: 'الأعمال الميكانيكية والكهربائية والصحية',
    items: [
      'Electrical Installation', 'Plumbing Works', 'Drainage Systems', 'Water Supply Systems',
      'Sewer Connections', 'HVAC Installation', 'Air Conditioning', 'Ventilation Systems',
      'Water Tanks', 'Pump Installation',
      'Lighting Installation', 'Socket & Switch Installation', 'Distribution Panels', 'Cable Installation',
      'Electrical Maintenance', 'Wiring Replacement', 'New Building Wiring', 'Leak Repair',
      'Sanitary Fixtures Installation', 'Bathroom Plumbing Maintenance', 'Kitchen Plumbing Maintenance',
      'Mixer & Tap Installation', 'Water Heater Replacement', 'Water Tank Repair', 'Small Pump Installation',
    ],
    itemsAr: [
      'التركيبات الكهربائية', 'أعمال السباكة', 'أنظمة الصرف', 'أنظمة إمدادات المياه',
      'توصيلات الصرف الصحي', 'تركيب التكييف المركزي', 'التكييف', 'أنظمة التهوية',
      'خزانات المياه', 'تركيب المضخات',
      'تركيب الإنارة', 'تركيب الأفياش والمفاتيح', 'لوحات التوزيع', 'تمديد الكابلات',
      'صيانة الكهرباء', 'استبدال التمديدات', 'تمديدات المباني الجديدة', 'إصلاح التسريبات',
      'تركيب الأدوات الصحية', 'صيانة دورات المياه', 'صيانة المطابخ',
      'تركيب الخلاطات', 'تبديل السخانات', 'إصلاح الخزانات', 'تركيب المضخات الصغيرة',
    ],
  },
  {
    id: 'painting',
    icon: 'paint',
    title: 'Painting Services',
    titleAr: 'خدمات الدهان',
    items: ['Interior Painting', 'Exterior Painting', 'Decorative Painting', 'Protective Coatings', 'Waterproof Coatings', 'Boundary Wall Painting'],
    itemsAr: ['الدهان الداخلي', 'الدهان الخارجي', 'الدهان الديكوري', 'الطلاءات الحمائية', 'الطلاءات العازلة للماء', 'دهان الأسوار'],
  },
  {
    id: 'waterproofing',
    icon: 'waterproof',
    title: 'Waterproofing',
    titleAr: 'أعمال العزل المائي',
    items: [
      'Roof Waterproofing', 'Basement Waterproofing', 'Bathroom Waterproofing',
      'Swimming Pool Waterproofing', 'Foundation Waterproofing',
      'Kitchen Waterproofing', 'Roof Repair', 'Damp & Moisture Treatment', 'Crack Treatment',
    ],
    itemsAr: [
      'عزل الأسطح', 'عزل البدروم', 'عزل الحمامات',
      'عزل المسابح', 'عزل الأساسات',
      'عزل المطابخ', 'إصلاح الأسطح', 'معالجة الرطوبة', 'معالجة التشققات',
    ],
  },
  {
    id: 'landscaping',
    icon: 'landscape',
    title: 'Landscaping',
    titleAr: 'تنسيق الحدائق',
    items: [
      'Landscape Construction', 'Irrigation Systems', 'Artificial Grass', 'Natural Grass',
      'Garden Design', 'Outdoor Lighting', 'Hardscape', 'Walkways', 'Water Features',
    ],
    itemsAr: [
      'إنشاء الحدائق', 'أنظمة الري', 'العشب الصناعي', 'العشب الطبيعي',
      'تصميم الحدائق', 'الإضاءة الخارجية', 'الأعمال الصلبة', 'الممرات', 'المسطحات المائية',
    ],
  },
  {
    id: 'pools',
    icon: 'pool',
    title: 'Swimming Pools',
    titleAr: 'المسابح',
    items: [
      'Swimming Pool Construction', 'Pool Renovation', 'Pool Waterproofing', 'Pool Tiling',
      'Pool Maintenance', 'Jacuzzi Construction',
    ],
    itemsAr: [
      'إنشاء المسابح', 'تجديد المسابح', 'عزل المسابح', 'تبليط المسابح',
      'صيانة المسابح', 'إنشاء الجاكوزي',
    ],
  },
  {
    id: 'aluminium-glass',
    icon: 'aluminium',
    title: 'Aluminium & Glass',
    titleAr: 'الألمنيوم والزجاج',
    items: [
      'Aluminium Doors', 'Aluminium Windows', 'Curtain Walls', 'Glass Facades',
      'Glass Railings', 'Skylights', 'Glass Partitions',
      'Window Installation', 'Glass Replacement',
    ],
    itemsAr: [
      'أبواب الألمنيوم', 'نوافذ الألمنيوم', 'الجدران الستائرية', 'واجهات زجاجية',
      'درابزين زجاجي', 'الفتحات السقفية', 'الفواصل الزجاجية',
      'تركيب النوافذ', 'استبدال الزجاج',
    ],
  },
  {
    id: 'metal-works',
    icon: 'metal',
    title: 'Metal Works',
    titleAr: 'الأعمال المعدنية',
    items: [
      'Stainless Steel Fabrication', 'Decorative Metal Works', 'Handrails', 'Gates',
      'Balconies', 'Staircases', 'Structural Steel',
    ],
    itemsAr: [
      'تصنيع الستانلس ستيل', 'الأعمال المعدنية الديكورية', 'الدرابزين', 'البوابات',
      'الشرفات', 'السلالم', 'الحديد الإنشائي',
    ],
  },
  {
    id: 'flooring',
    icon: 'flooring',
    title: 'Flooring',
    titleAr: 'الأرضيات',
    items: [
      'Marble Flooring', 'Granite Flooring', 'Porcelain Tiles', 'Ceramic Tiles',
      'Vinyl Flooring', 'Epoxy Flooring', 'Industrial Flooring', 'Cement Flooring',
    ],
    itemsAr: [
      'أرضيات الرخام', 'أرضيات الجرانيت', 'بلاط البورسلين', 'بلاط السيراميك',
      'أرضيات الفينيل', 'أرضيات الإيبوكسي', 'الأرضيات الصناعية', 'الأرضيات الإسمنتية',
    ],
  },
  {
    id: 'smart-home',
    icon: 'smarthome',
    title: 'Smart Home & Low Current',
    titleAr: 'المنزل الذكي والتيار الخفيف',
    items: [
      'Smart Home Automation', 'CCTV Systems', 'Access Control', 'Intercom Systems',
      'Home Networking', 'Security Systems',
    ],
    itemsAr: [
      'أتمتة المنزل الذكي', 'أنظمة كاميرات المراقبة', 'أنظمة التحكم بالدخول', 'أنظمة الإنتركم',
      'الشبكات المنزلية', 'أنظمة الأمان',
    ],
  },
  {
    id: 'consultancy',
    icon: 'consultancy',
    title: 'Project Consultancy',
    titleAr: 'استشارات المشاريع',
    items: [
      'Site Inspection', 'Construction Consultation', 'Engineering Consultation',
      'Project Planning', 'Cost Estimation', 'Technical Reports',
    ],
    itemsAr: [
      'معاينة الموقع', 'استشارات البناء', 'استشارات هندسية',
      'تخطيط المشاريع', 'تقدير التكاليف', 'التقارير الفنية',
    ],
  },
  {
    id: 'specialized',
    icon: 'star',
    title: 'Specialized Services',
    titleAr: 'خدمات متخصصة',
    items: [
      'Villa Restoration', 'Heritage Building Restoration', 'Luxury Finishing',
      'Premium Stone Works', 'Custom Architectural Details', 'High-End Residential Projects',
    ],
    itemsAr: [
      'ترميم الفلل', 'ترميم المباني التراثية', 'التشطيبات الفاخرة',
      'أعمال الحجر الفاخرة', 'التفاصيل المعمارية المخصصة', 'المشاريع السكنية الراقية',
    ],
  },
];

export const SEO_FOCUS_KEYWORDS = [
  'Villa Construction Abu Dhabi', 'General Contracting Abu Dhabi', 'Villa Renovation Abu Dhabi',
  'Building Maintenance Abu Dhabi', 'Luxury Villa Contractor UAE', 'Civil Contractor Abu Dhabi',
  'Villa Extension Abu Dhabi', 'MEP Contractor Abu Dhabi', 'Waterproofing Abu Dhabi',
  'Fit-Out Contractor Abu Dhabi', 'Swimming Pool Construction Abu Dhabi', 'Stone Cladding Abu Dhabi',
  'Interior Fit-Out UAE', 'Annual Maintenance Contract Abu Dhabi', 'Luxury Villa Maintenance',
];
