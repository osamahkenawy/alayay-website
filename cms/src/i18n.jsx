import { createContext, useContext, useEffect, useState } from 'react'

const STRINGS = {
  en: {
    // App / auth
    cmsName: 'Alayay CMS',
    contentManager: 'Content Manager',
    signInSubtitle: 'Sign in to manage your website content',
    password: 'Password',
    passwordPlaceholder: 'Enter admin password',
    signIn: 'Sign In',
    signingIn: 'Signing in…',
    incorrectPassword: 'Incorrect password',
    cannotConnect: 'Cannot connect to server',
    signOut: 'Sign Out',
    viewWebsite: 'View Website',

    // Nav
    nav_overview: 'Dashboard',
    nav_leads: 'Messages',
    nav_settings: 'Site Settings',
    nav_hero: 'Hero Section',
    nav_services: 'Services',
    nav_projects: 'Projects',
    nav_testimonials: 'Testimonials',
    nav_media: 'Media Library',
    nav_account: 'Account',
    group_content: 'Content',
    group_system: 'System',

    // Leads / messages
    leadsSubtitle: 'Every quote request submitted through the website contact form.',
    noLeads: 'No messages yet. New contact-form submissions will show up here.',
    newLead: 'New',
    markRead: 'Mark as read',
    markUnread: 'Mark as unread',
    deleteLead: 'Delete message',
    deleteLeadTitle: 'Delete this message?',
    callNow: 'Call',
    chatWhatsapp: 'WhatsApp',
    unreadLeads: 'unread',

    // Overview
    welcomeBack: 'Welcome back',
    overviewSubtitle: 'Manage everything that appears on your website from here.',
    quickActions: 'Quick actions',
    recentActivity: 'Recently updated',
    never: 'Not created yet',
    justNow: 'just now',
    minutesAgo: 'min ago',
    hoursAgo: 'h ago',
    daysAgo: 'd ago',
    edit: 'Edit',
    itemsCount: 'items',
    mediaFiles: 'media files',
    openWebsite: 'Open live website',

    // Save bar / dirty
    unsavedChanges: 'You have unsaved changes',
    discard: 'Discard',
    allSaved: 'All changes saved',

    // Reorder / actions
    moveUp: 'Move up',
    moveDown: 'Move down',
    duplicate: 'Duplicate',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
    deleteConfirmTitle: 'Delete this item?',
    deleteConfirmBody: 'This action cannot be undone.',
    copyUrl: 'Copy URL',
    copied: 'Link copied',
    empty: 'Nothing here yet',

    // Media
    mediaSubtitle: 'All images uploaded to your website.',
    uploadImage: 'Upload image',
    deleteImage: 'Delete image',
    imageDeleted: 'Image deleted',
    noMedia: 'No images uploaded yet. Upload one to get started.',

    // Account
    accountSubtitle: 'Manage your login and security.',
    changePassword: 'Change Password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmPassword: 'Confirm new password',
    updatePassword: 'Update password',
    passwordChanged: 'Password updated successfully',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters',

    // Content language
    contentLang: 'Content language',
    english: 'English',
    arabic: 'العربية',

    // Common
    save: 'Save',
    saving: 'Saving…',
    saved: 'Saved successfully',
    uploading: 'Uploading…',
    clickToUpload: 'Click or drop an image to upload',
    orPasteUrl: 'Or paste an image URL',
    add: 'Add',
    remove: 'Remove',
    interfaceLang: 'Interface',

    // Settings
    companyInfo: 'Company Info',
    companyName: 'Company Name',
    tagline: 'Tagline',
    phone: 'Phone',
    whatsappUrl: 'WhatsApp URL',
    email: 'Email',
    address: 'Address',
    socialMedia: 'Social Media',
    instagram: 'Instagram URL',
    facebook: 'Facebook URL',
    linkedin: 'LinkedIn URL',
    seo: 'SEO',
    metaTitle: 'Meta Title',
    metaDescription: 'Meta Description',
    settingsSaved: 'Settings saved',

    // Hero
    heroContent: 'Hero Content',
    eyebrow: 'Eyebrow Text',
    heading1: 'Heading Line 1',
    heading2: 'Heading Line 2',
    description: 'Description',
    primaryButton: 'Primary Button',
    secondaryButton: 'Secondary Button',
    backgroundImage: 'Background Image',
    heroSaved: 'Hero section saved',

    // Services
    serviceTitle: 'Service Title',
    shortDescription: 'Short Description (card)',
    longDescription: 'Long Description (service page)',
    whatsIncluded: "What's Included",
    serviceImage: 'Service Image',
    saveAllServices: 'Save All Services',
    servicesSaved: 'Services saved',

    // Projects
    project: 'Project',
    projects: 'Projects',
    addProject: 'Add Project',
    removeProject: 'Remove This Project',
    projectTitle: 'Project Title',
    category: 'Category',
    status: 'Status',
    completed: 'Completed',
    ongoing: 'Ongoing',
    beforeAfter: 'Before / After Photos',
    before: 'Before',
    after: 'After',
    saveProjects: 'Save Projects',
    projectsSaved: 'Projects saved',

    // Testimonials
    testimonial: 'Testimonial',
    testimonials: 'Testimonials',
    addTestimonial: 'Add Testimonial',
    removeTestimonial: 'Remove This Testimonial',
    clientName: 'Client Name',
    roleTitle: 'Role / Title',
    reviewText: 'Review Text',
    starRating: 'Star Rating',
    stars: 'Stars',
    avatarPhoto: 'Avatar Photo',
    saveTestimonials: 'Save Testimonials',
    testimonialsSaved: 'Testimonials saved',
  },
  ar: {
    cmsName: 'نظام إدارة ALAYAY',
    contentManager: 'إدارة المحتوى',
    signInSubtitle: 'سجّل الدخول لإدارة محتوى موقعك',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة مرور المدير',
    signIn: 'تسجيل الدخول',
    signingIn: 'جارٍ الدخول…',
    incorrectPassword: 'كلمة المرور غير صحيحة',
    cannotConnect: 'تعذّر الاتصال بالخادم',
    signOut: 'تسجيل الخروج',
    viewWebsite: 'عرض الموقع',

    nav_overview: 'الرئيسية',
    nav_leads: 'الرسائل',
    nav_settings: 'إعدادات الموقع',
    nav_hero: 'القسم الرئيسي',
    nav_services: 'الخدمات',
    nav_projects: 'المشاريع',
    nav_testimonials: 'آراء العملاء',
    nav_media: 'مكتبة الوسائط',
    nav_account: 'الحساب',
    group_content: 'المحتوى',
    group_system: 'النظام',

    leadsSubtitle: 'كل طلب عرض سعر تم إرساله عبر نموذج التواصل في الموقع.',
    noLeads: 'لا توجد رسائل بعد. ستظهر هنا طلبات التواصل الجديدة.',
    newLead: 'جديد',
    markRead: 'وضع علامة كمقروءة',
    markUnread: 'وضع علامة كغير مقروءة',
    deleteLead: 'حذف الرسالة',
    deleteLeadTitle: 'حذف هذه الرسالة؟',
    callNow: 'اتصال',
    chatWhatsapp: 'واتساب',
    unreadLeads: 'غير مقروءة',

    welcomeBack: 'مرحباً بعودتك',
    overviewSubtitle: 'أدر كل ما يظهر على موقعك من هنا.',
    quickActions: 'إجراءات سريعة',
    recentActivity: 'آخر التحديثات',
    never: 'لم يُنشأ بعد',
    justNow: 'الآن',
    minutesAgo: 'دقيقة مضت',
    hoursAgo: 'ساعة مضت',
    daysAgo: 'يوم مضى',
    edit: 'تعديل',
    itemsCount: 'عناصر',
    mediaFiles: 'ملفات وسائط',
    openWebsite: 'فتح الموقع المباشر',

    unsavedChanges: 'لديك تغييرات غير محفوظة',
    discard: 'تجاهل',
    allSaved: 'تم حفظ جميع التغييرات',

    moveUp: 'تحريك لأعلى',
    moveDown: 'تحريك لأسفل',
    duplicate: 'نسخ',
    delete: 'حذف',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    deleteConfirmTitle: 'حذف هذا العنصر؟',
    deleteConfirmBody: 'لا يمكن التراجع عن هذا الإجراء.',
    copyUrl: 'نسخ الرابط',
    copied: 'تم نسخ الرابط',
    empty: 'لا يوجد شيء هنا بعد',

    mediaSubtitle: 'جميع الصور المرفوعة إلى موقعك.',
    uploadImage: 'رفع صورة',
    deleteImage: 'حذف الصورة',
    imageDeleted: 'تم حذف الصورة',
    noMedia: 'لم تُرفع أي صور بعد. ارفع صورة للبدء.',

    accountSubtitle: 'إدارة تسجيل الدخول والأمان.',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور الجديدة',
    updatePassword: 'تحديث كلمة المرور',
    passwordChanged: 'تم تحديث كلمة المرور بنجاح',
    passwordMismatch: 'كلمتا المرور غير متطابقتين',
    passwordTooShort: 'يجب ألا تقل كلمة المرور عن 6 أحرف',

    contentLang: 'لغة المحتوى',
    english: 'English',
    arabic: 'العربية',

    save: 'حفظ',
    saving: 'جارٍ الحفظ…',
    saved: 'تم الحفظ بنجاح',
    uploading: 'جارٍ الرفع…',
    clickToUpload: 'اضغط أو أفلت صورة للرفع',
    orPasteUrl: 'أو الصق رابط الصورة',
    add: 'إضافة',
    remove: 'حذف',
    interfaceLang: 'الواجهة',

    companyInfo: 'معلومات الشركة',
    companyName: 'اسم الشركة',
    tagline: 'الشعار النصي',
    phone: 'الهاتف',
    whatsappUrl: 'رابط واتساب',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    socialMedia: 'وسائل التواصل',
    instagram: 'رابط إنستغرام',
    facebook: 'رابط فيسبوك',
    linkedin: 'رابط لينكدإن',
    seo: 'تحسين محركات البحث',
    metaTitle: 'عنوان الميتا',
    metaDescription: 'وصف الميتا',
    settingsSaved: 'تم حفظ الإعدادات',

    heroContent: 'محتوى القسم الرئيسي',
    eyebrow: 'النص التمهيدي',
    heading1: 'العنوان الأول',
    heading2: 'العنوان الثاني',
    description: 'الوصف',
    primaryButton: 'الزر الأساسي',
    secondaryButton: 'الزر الثانوي',
    backgroundImage: 'صورة الخلفية',
    heroSaved: 'تم حفظ القسم الرئيسي',

    serviceTitle: 'اسم الخدمة',
    shortDescription: 'وصف قصير (البطاقة)',
    longDescription: 'وصف مفصّل (صفحة الخدمة)',
    whatsIncluded: 'ما تشمله الخدمة',
    serviceImage: 'صورة الخدمة',
    saveAllServices: 'حفظ كل الخدمات',
    servicesSaved: 'تم حفظ الخدمات',

    project: 'مشروع',
    projects: 'مشاريع',
    addProject: 'إضافة مشروع',
    removeProject: 'حذف هذا المشروع',
    projectTitle: 'عنوان المشروع',
    category: 'الفئة',
    status: 'الحالة',
    completed: 'مكتمل',
    ongoing: 'قيد التنفيذ',
    beforeAfter: 'صور قبل / بعد',
    before: 'قبل',
    after: 'بعد',
    saveProjects: 'حفظ المشاريع',
    projectsSaved: 'تم حفظ المشاريع',

    testimonial: 'رأي',
    testimonials: 'آراء',
    addTestimonial: 'إضافة رأي',
    removeTestimonial: 'حذف هذا الرأي',
    clientName: 'اسم العميل',
    roleTitle: 'المسمى / الصفة',
    reviewText: 'نص الرأي',
    starRating: 'التقييم بالنجوم',
    stars: 'نجوم',
    avatarPhoto: 'الصورة الشخصية',
    saveTestimonials: 'حفظ الآراء',
    testimonialsSaved: 'تم حفظ الآراء',
  },
}

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cms_ui_lang') || 'en')

  useEffect(() => {
    localStorage.setItem('cms_ui_lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t = (key) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key
  const toggle = () => setLang(l => (l === 'en' ? 'ar' : 'en'))

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
