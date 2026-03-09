import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronRight, ArrowUp, CheckCircle, Clock, ChevronDown, Facebook, Youtube, MessageCircle, Star, MapPin } from "lucide-react";
import logoImg from "@assets/image_1773055619309.png";
import heroImg from "@assets/image_1773056237351.png";
import fleetImg from "@assets/image_1773055600948.png";
import bAutoImg from "@assets/image_1773055631232.png";
import bManualImg from "@assets/image_1773055627297.png";
import c1Img from "@assets/image_1773055623145.png";
import partnerNhaBe from "@assets/image_1773056136813.png";
import partnerThanhDanh from "@assets/image_1773056140838.png";
import partnerThaiSon from "@assets/image_1773056146795.png";
import partnerThienTai from "@assets/image_1773056150642.png";
import partnerDayNghe from "@assets/image_1773056154584.png";
import partnerThongNhat from "@assets/image_1773056159700.png";
import partnerTD from "@assets/image_1773056164314.png";

const NAV_LINKS = [
  { label: "Trang Chủ", href: "#home" },
  { label: "Khóa Học", href: "#courses" },
  { label: "Quy Trình", href: "#process" },
  { label: "Lịch Khai Giảng", href: "#schedule" },
  { label: "Tin Tức", href: "#news" },
  { label: "Liên Hệ", href: "#contact" },
];

const COURSES = [
  {
    id: "b-auto",
    badge: "PHỔ BIẾN NHẤT",
    title: "Hạng B Tự Động",
    subtitle: "Xe ô tô số tự động dưới 9 chỗ",
    img: bAutoImg,
    features: [
      "292 giờ học theo chuẩn Bộ GTVT",
      "Thực hành tại sân tập đạt chuẩn",
      "Cabin điện tử mô phỏng hiện đại",
      "Giáo viên chứng chỉ hành nghề quốc gia",
    ],
    duration: "3–4 tháng",
    highlight: true,
  },
  {
    id: "b-manual",
    badge: "",
    title: "Hạng B Cơ Khí",
    subtitle: "Xe ô tô số sàn dưới 9 chỗ",
    img: bManualImg,
    features: [
      "352 giờ học theo chuẩn Bộ GTVT",
      "Luyện kỹ năng sang số thành thạo",
      "Thực hành trên xe đời mới nhất",
      "Ôn luyện 450 câu lý thuyết pháp luật",
    ],
    duration: "4–5 tháng",
    highlight: false,
  },
  {
    id: "c1",
    badge: "",
    title: "Hạng C1",
    subtitle: "Xe tải trọng tải dưới 3,5 tấn",
    img: c1Img,
    features: [
      "Đào tạo lái xe tải hạng nhẹ",
      "Kỹ năng xử lý xe tải chuyên biệt",
      "Sân luyện tập xe tải chuẩn Bộ GTVT",
      "Hỗ trợ hồ sơ thi sát hạch trọn gói",
    ],
    duration: "4–5 tháng",
    highlight: false,
  },
];

const STEPS = [
  { num: "01", title: "Thủ Tục Đăng Ký", desc: "Điền form đăng ký, nộp hồ sơ, chọn lịch khai giảng phù hợp với lịch cá nhân" },
  { num: "02", title: "Nộp & Xử Lý Hồ Sơ", desc: "Trung tâm tiếp nhận và hoàn tất xử lý hồ sơ trong vòng 2–3 ngày làm việc" },
  { num: "03", title: "Nhận Thông Tin Lớp", desc: "Xác nhận lịch học, nhận tài liệu và thông tin lớp học đầy đủ" },
  { num: "04", title: "Học Lý Thuyết", desc: "Ôn 450 câu hỏi pháp luật giao thông, học trực tiếp kết hợp ứng dụng ôn tập" },
  { num: "05", title: "Học Cabin Điện Tử", desc: "Luyện lái xe mô phỏng trong cabin điện tử hiện đại trước khi ra sân thật" },
  { num: "06", title: "Học Thực Hành", desc: "Thực hành lái xe trên sân tập đạt chuẩn với giáo viên dày dạn kinh nghiệm" },
  { num: "07", title: "Thi Tốt Nghiệp", desc: "Thi đánh giá kỹ năng nội bộ trước khi đăng ký thi sát hạch chính thức" },
  { num: "08", title: "Thi Sát Hạch", desc: "Thi tại Trung tâm sát hạch, nhận bằng lái xe ngay sau khi đậu" },
];

const PARTNERS = [
  { img: partnerNhaBe, name: "Trung Tâm Dạy Nghề Nhà Bè" },
  { img: partnerThanhDanh, name: "Thành Danh" },
  { img: partnerThaiSon, name: "Thai Son Group" },
  { img: partnerThienTai, name: "Thiên Tài" },
  { img: partnerDayNghe, name: "Trung Tâm Dạy Nghề" },
  { img: partnerThongNhat, name: "Thống Nhất" },
  { img: partnerTD, name: "Trung Tâm DN & ĐT Lái Xe" },
];

const SCHEDULE = [
  { date: "10/03", type: "B Tự Động", branch: "1184 Nguyễn Văn Tạo", status: "available" },
  { date: "15/03", type: "B Cơ Khí", branch: "1184 Nguyễn Văn Tạo", status: "available" },
  { date: "20/03", type: "C1", branch: "1184 Nguyễn Văn Tạo", status: "almost" },
  { date: "25/03", type: "B Tự Động", branch: "1184 Nguyễn Văn Tạo", status: "available" },
  { date: "01/04", type: "B Cơ Khí", branch: "1184 Nguyễn Văn Tạo", status: "available" },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "Tôi đã thử học ở chỗ khác nhưng trượt sát hạch. Chuyển sang Thành Công — đậu ngay lần đầu. Giáo viên tận tình và chuyên nghiệp lắm.",
    name: "Nguyễn Thị Lan",
    info: "Học viên Hạng B Tự Động · Nhà Bè",
  },
  {
    stars: 5,
    quote: "Cabin điện tử mô phỏng thực sự giúp ích rất nhiều. Khi ra sân thật mình đã tự tin hơn hẳn so với các bạn chưa học cabin. Cảm ơn Thành Công.",
    name: "Trần Văn Minh",
    info: "Học viên Hạng B Cơ Khí · Nhà Bè",
  },
  {
    stars: 5,
    quote: "Hỗ trợ hồ sơ từ A đến Z, đăng ký nhanh, lịch học linh hoạt. Trung tâm đáng tin cậy nhất TP.HCM mà tôi từng gặp trong hơn 15 năm hoạt động.",
    name: "Phạm Thị Hoa",
    info: "Học viên Hạng C1 · Nhà Bè",
  },
];

const NEWS = [
  {
    category: "Sự Kiện",
    title: "Khai giảng lớp học lái xe tháng 3/2026 tại 1184 Nguyễn Văn Tạo",
    excerpt: "Trung tâm Thành Công thông báo lịch khai giảng các lớp B tự động, B cơ khí và C1 trong tháng 3...",
    date: "05/03/2026",
  },
  {
    category: "Quy Định Mới",
    title: "Cập nhật quy định mới về sát hạch lái xe 2026",
    excerpt: "Bộ GTVT ban hành thông tư mới về quy trình thi sát hạch, áp dụng từ tháng 01/2026...",
    date: "02/03/2026",
  },
  {
    category: "Kiến Thức Lái Xe",
    title: "10 kỹ năng quan trọng cần nắm vững khi thi bằng B",
    excerpt: "Chia sẻ từ giáo viên 15 năm kinh nghiệm về những điểm thường gặp trong kỳ thi sát hạch...",
    date: "28/02/2026",
  },
  {
    category: "Hình Ảnh",
    title: "Hình ảnh lễ trao bằng tốt nghiệp đợt tháng 2/2026",
    excerpt: "Hơn 120 học viên đã nhận bằng lái xe sau kỳ thi sát hạch thành công, tỷ lệ đậu đạt 94%...",
    date: "22/02/2026",
  },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── BRAND SVG ICONS ── */
function IconFacility({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="20" width="40" height="24" rx="3" fill="#C8102E" />
      <rect x="10" y="26" width="8" height="8" rx="1" fill="white" opacity="0.9" />
      <rect x="22" y="26" width="8" height="8" rx="1" fill="white" opacity="0.9" />
      <rect x="34" y="26" width="6" height="8" rx="1" fill="white" opacity="0.9" />
      <path d="M2 22 L24 6 L46 22" stroke="#F0A500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="20" y="34" width="8" height="10" rx="1" fill="#F0A500" />
      <circle cx="38" cy="12" r="5" fill="#F0A500" />
      <path d="M38 9v3l2 1.5" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconTeacher({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="#C8102E" strokeWidth="3" fill="none" />
      <circle cx="24" cy="24" r="10" stroke="#1A1A2E" strokeWidth="2.5" fill="none" />
      <circle cx="24" cy="24" r="3.5" fill="#C8102E" />
      <line x1="24" y1="6" x2="24" y2="14" stroke="#F0A500" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="34" x2="24" y2="42" stroke="#F0A500" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6" y1="24" x2="14" y2="24" stroke="#F0A500" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="34" y1="24" x2="42" y2="24" stroke="#F0A500" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="7" r="2" fill="#F0A500" />
    </svg>
  );
}

function IconPassRate({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 4 L28 16 L42 16 L31 25 L35 38 L24 30 L13 38 L17 25 L6 16 L20 16 Z" fill="#F0A500" stroke="#C8102E" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="24" cy="22" r="7" fill="#C8102E" />
      <path d="M20 22 L23 25 L29 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 42 Q24 36 38 42" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [floatVisible, setFloatVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "", branch: "", note: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setFloatVisible(true), 2000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#F8F6F2", color: "#1A1A2E" }}>

      {/* STICKY NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "white" : "rgba(26,26,46,0.72)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.10)" : "none",
        }}
        data-testid="header-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Logo */}
            <a href="#home" className="flex items-center flex-shrink-0" data-testid="link-logo">
              <img
                src={logoImg}
                alt="Thành Công Logo"
                className="h-10 lg:h-12 w-auto object-contain transition-all duration-300"
                style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold transition-colors"
                  style={{ color: scrolled ? "#1A1A2E" : "rgba(255,255,255,0.92)" }}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:1900636836"
                className="flex items-center gap-2 text-sm font-semibold border-2 rounded-full px-4 py-2 transition-all"
                style={{
                  borderColor: scrolled ? "#C8102E" : "rgba(255,255,255,0.7)",
                  color: scrolled ? "#C8102E" : "white",
                }}
                data-testid="link-phone-nav"
              >
                <Phone className="w-4 h-4" />
                1900 636 836
              </a>
              <a
                href="#contact"
                className="text-sm font-bold rounded-full px-5 py-2 transition-all"
                style={{ backgroundColor: "#C8102E", color: "white" }}
                data-testid="button-register-nav"
              >
                Đăng Ký Ngay
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle mobile menu"
              style={{ color: scrolled ? "#1A1A2E" : "white" }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium py-2 border-b border-gray-50"
                    style={{ color: "#1A1A2E" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="tel:1900636836"
                  className="mt-2 text-center font-bold py-3 rounded-full border-2"
                  style={{ borderColor: "#C8102E", color: "#C8102E" }}
                >
                  1900 636 836
                </a>
                <a
                  href="#contact"
                  className="text-center font-bold py-3 rounded-full"
                  style={{ backgroundColor: "#C8102E", color: "white" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Đăng Ký Ngay
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 1 — HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Đội xe thực hành Trung Tâm Thành Công" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(26,26,46,0.93) 0%, rgba(26,26,46,0.78) 50%, rgba(26,26,46,0.45) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4">
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}>
                Đào Tạo Lái Xe
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6"
            >
              Hành Trình Đến<br />
              Bằng Lái Xe<br />
              <span style={{ color: "#F0A500" }}>Bắt Đầu Tại Đây</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg text-gray-200 mb-8 leading-relaxed"
            >
              Hơn 15 năm kinh nghiệm đào tạo, tỷ lệ đậu sát hạch trên 92%. Chúng tôi không chỉ dạy lái xe — chúng tôi xây dựng những người lái xe an toàn cho TP.HCM.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-6 mb-10"
            >
              {[
                { val: "15+", label: "Năm Kinh Nghiệm" },
                { val: "92%", label: "Tỷ Lệ Đậu Sát Hạch" },
                { val: "10K+", label: "Học Viên Tốt Nghiệp" },
              ].map((s) => (
                <div key={s.val} className="text-center">
                  <div className="font-mono text-3xl font-bold" style={{ color: "#F0A500" }}>{s.val}</div>
                  <div className="text-xs text-gray-300 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-bold rounded-full px-8 py-4 text-base transition-transform hover:scale-105"
                style={{ backgroundColor: "#C8102E", color: "white" }}
                data-testid="button-register-hero"
              >
                Đăng Ký Học Ngay
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#schedule"
                className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-4 text-base border-2 border-white text-white transition-all hover:bg-white/10"
                data-testid="button-schedule-hero"
              >
                Xem Lịch Khai Giảng
                <ChevronDown className="w-5 h-5" style={{ color: "#F0A500" }} />
              </a>
            </motion.div>

            {/* Address badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.88)" }}
            >
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#F0A500" }} />
              1184 Nguyễn Văn Tạo, Long Thới, Nhà Bè, TP.HCM
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-10 right-6 lg:right-16 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#C8102E" }} />
            <div>
              <div className="text-xs font-bold" style={{ color: "#1A1A2E" }}>Được Cấp Phép Bộ GTVT</div>
              <div className="text-xs" style={{ color: "#6B7280" }}>Thành lập 2009 · Nhà Bè, TP.HCM</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="py-4 overflow-hidden" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              {[
                "Thành lập 2009 — 15+ năm hoạt động",
                "Được cấp phép Sở GTVT TP.HCM",
                "Hơn 10.000 học viên đã tốt nghiệp",
                "1184 Nguyễn Văn Tạo, Long Thới, Nhà Bè",
                "Tỷ lệ đậu sát hạch trên 92%",
              ].map((item, j) => (
                <span key={j} className="inline-flex items-center gap-2 text-sm text-white font-medium">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#F0A500" }} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3 — COURSES */}
      <section id="courses" className="py-20 lg:py-28" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <FadeUp>
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}>
                Khóa Học
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A2E" }}>
                Chọn Hạng Bằng Lái Phù Hợp
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
                Từ xe số tự động đến xe tải hạng nhẹ — chúng tôi có đầy đủ chương trình đào tạo
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {COURSES.map((course, i) => (
              <FadeUp key={course.id} delay={i * 0.1}>
                <div
                  className="group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: "white",
                    boxShadow: course.highlight ? "0 8px 32px rgba(200,16,46,0.18), 0 0 0 2px #C8102E" : "0 2px 12px rgba(0,0,0,0.07)",
                  }}
                  data-testid={`card-course-${course.id}`}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={course.img}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,46,0.5) 0%, transparent 60%)" }} />
                    {course.badge && (
                      <div className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}>
                        {course.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-1" style={{ color: "#1A1A2E" }}>{course.title}</h3>
                    <p className="text-sm mb-4" style={{ color: "#6B7280" }}>{course.subtitle}</p>
                    <ul className="space-y-2 mb-5">
                      {course.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C8102E" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-sm" style={{ color: "#6B7280" }}>
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                        style={{ color: "#C8102E" }}
                        data-testid={`link-learn-more-${course.id}`}
                      >
                        Tìm Hiểu Thêm
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROCESS */}
      <section id="process" className="py-20 lg:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <FadeUp>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A2E" }}>
                Hành Trình 8 Bước Đến Bằng Lái
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
                Quy trình minh bạch — bạn biết mình đang ở bước nào mỗi lúc
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.07}>
                <div
                  className="group relative p-6 rounded-xl cursor-default transition-all duration-300"
                  style={{ backgroundColor: "#F8F6F2", border: "1px solid #E5E0D8" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold mb-4"
                    style={{ backgroundColor: "#1A1A2E", color: "#F0A500" }}
                  >
                    {step.num}
                  </div>
                  <h4 className="font-semibold text-base mb-2 group-hover:text-red-600 transition-colors" style={{ color: "#1A1A2E" }}>
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="py-12 overflow-hidden" style={{ backgroundColor: "#F8F6F2", borderTop: "1px solid #E5E0D8", borderBottom: "1px solid #E5E0D8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}>
              Đối Tác & Liên Kết
            </span>
            <p className="text-base" style={{ color: "#6B7280" }}>Được tin tưởng và hợp tác bởi các đơn vị hàng đầu trong ngành đào tạo lái xe</p>
          </FadeUp>
        </div>

        {/* Scrolling logos — duplicated for seamless loop */}
        <div className="relative">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #F8F6F2, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #F8F6F2, transparent)" }} />

          <div className="flex animate-marquee" style={{ width: "max-content" }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div
                key={i}
                className="group flex-shrink-0 flex items-center justify-center mx-8 transition-all duration-300"
                style={{ width: "100px" }}
                title={p.name}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-16 w-auto object-contain transition-all duration-300"
                  style={{
                    filter: "grayscale(100%) opacity(0.55)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%) opacity(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%) opacity(0.55)")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CHOOSE US */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white text-center mb-4">
              Tại Sao Hơn 10.000 Học Viên
            </h2>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-center mb-14" style={{ color: "#F0A500" }}>
              Tin Chọn Thành Công?
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                Icon: IconFacility,
                title: "Cơ Sở Vật Chất Hiện Đại",
                desc: "Sân tập đạt chuẩn Bộ GTVT tại 1184 Nguyễn Văn Tạo, trang bị cabin điện tử mô phỏng, đội xe học đời mới nhất",
              },
              {
                Icon: IconTeacher,
                title: "Đội Ngũ Giáo Viên Giàu Kinh Nghiệm",
                desc: "100% giáo viên có chứng chỉ hành nghề quốc gia, kinh nghiệm giảng dạy trên 5 năm, tận tâm với từng học viên",
              },
              {
                Icon: IconPassRate,
                title: "Tỷ Lệ Đậu Sát Hạch Cao",
                desc: "Hơn 92% học viên đậu sát hạch ngay lần thi đầu tiên — không phải may mắn, mà là phương pháp đào tạo bài bản",
              },
            ].map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div
                  className="group p-7 rounded-xl transition-all duration-300 cursor-default"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(200,16,46,0.15)" }}>
                    <p.Icon size={30} />
                  </div>
                  <h4 className="font-semibold text-base text-white mb-2">{p.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Address highlight */}
          <FadeUp delay={0.25}>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 p-5 rounded-xl text-center sm:text-left"
              style={{ backgroundColor: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.25)" }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F0A500" }}>
                <MapPin className="w-5 h-5" style={{ color: "#1A1A2E" }} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Cơ Sở Chính</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>1184 Nguyễn Văn Tạo, Long Thới, Nhà Bè, TP. Hồ Chí Minh</div>
              </div>
              <a
                href="https://maps.google.com/?q=1184+Nguyen+Van+Tao+Long+Thoi+Nha+Be"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}
              >
                Xem Bản Đồ
              </a>
            </div>
          </FadeUp>

          {/* Fleet image */}
          <FadeUp delay={0.3}>
            <div className="mt-12 rounded-2xl overflow-hidden" style={{ maxHeight: "360px" }}>
              <img src={fleetImg} alt="Đội xe thực hành Thành Công" className="w-full object-cover object-top" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 6 — SCHEDULE */}
      <section id="schedule" className="py-20 lg:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}>
                Lịch Khai Giảng
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A2E" }}>
                Luôn Có Lớp Học Phù Hợp Với Bạn
              </h2>
              <p className="text-lg mb-6" style={{ color: "#6B7280" }}>
                Chúng tôi khai giảng liên tục mỗi tháng. Đăng ký sớm để giữ chỗ — mỗi lớp giới hạn số lượng học viên để đảm bảo chất lượng.
              </p>
              <div className="flex items-center gap-2 mb-6 p-4 rounded-xl" style={{ backgroundColor: "#FFF8E6", border: "1px solid #F0A500" }}>
                <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>Lớp tháng 3 sắp đầy — chỉ còn vài chỗ cuối!</span>
              </div>
              <div className="flex items-start gap-3 mb-4 p-3 rounded-lg" style={{ backgroundColor: "#F8F6F2" }}>
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#C8102E" }} />
                <div>
                  <div className="text-sm font-bold" style={{ color: "#1A1A2E" }}>Địa Điểm Học</div>
                  <div className="text-sm" style={{ color: "#6B7280" }}>1184 Nguyễn Văn Tạo, Long Thới, Nhà Bè, TP.HCM</div>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-bold rounded-full px-8 py-3 transition-all hover:opacity-90"
                style={{ backgroundColor: "#C8102E", color: "white" }}
                data-testid="button-view-all-schedule"
              >
                Đăng Ký Giữ Chỗ
                <ChevronRight className="w-5 h-5" />
              </a>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="px-6 py-4" style={{ backgroundColor: "#1A1A2E" }}>
                  <h3 className="font-semibold text-white text-sm tracking-wide uppercase">Tháng 3 — 2026</h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8F6F2" }}>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7280" }}>Ngày</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7280" }}>Hạng</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7280" }}>Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCHEDULE.map((row, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors" data-testid={`row-schedule-${i}`}>
                        <td className="px-4 py-3.5 font-mono font-semibold" style={{ color: "#1A1A2E" }}>{row.date}</td>
                        <td className="px-4 py-3.5 font-medium" style={{ color: "#1A1A2E" }}>{row.type}</td>
                        <td className="px-4 py-3.5">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                            style={row.status === "available"
                              ? { backgroundColor: "#ECFDF5", color: "#059669" }
                              : { backgroundColor: "#FFF7ED", color: "#D97706" }}
                          >
                            {row.status === "available" ? "Còn chỗ" : "Sắp đầy"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-4 border-t border-gray-100">
                  <a
                    href="#contact"
                    className="block w-full text-center font-bold py-3 rounded-xl transition-all hover:opacity-90 text-sm"
                    style={{ backgroundColor: "#C8102E", color: "white" }}
                    data-testid="button-register-class"
                  >
                    Đăng Ký Lớp Này
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 7 — TESTIMONIALS */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-center mb-14" style={{ color: "#1A1A2E" }}>
              Học Viên Nói Gì Về Chúng Tôi
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  className="group p-6 rounded-xl cursor-default transition-all duration-300"
                  style={{ backgroundColor: "white", borderLeft: "4px solid #C8102E", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                  data-testid={`card-testimonial-${i}`}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" style={{ color: "#F0A500" }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#374151" }}>"{t.quote}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-bold text-sm" style={{ color: "#1A1A2E" }}>{t.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{t.info}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — CONTACT FORM */}
      <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: "#C8102E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 bg-white/20 text-white">
                Bắt Đầu Ngay Hôm Nay
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
                Một Quyết Định<br />
                Thay Đổi Sự<br />
                Tự Do Di Chuyển
              </h2>
              <p className="text-white/85 text-lg mb-8 leading-relaxed">
                Điền form đăng ký — chúng tôi sẽ liên hệ tư vấn trong vòng 24 giờ để tìm khóa học phù hợp nhất với bạn.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Tư vấn hoàn toàn miễn phí, không ràng buộc",
                  "Hỗ trợ học phí trả góp linh hoạt",
                  "Bảo hành thi lại miễn phí nếu chưa đậu",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <div>
                  <div className="text-sm font-bold text-white">Đến Gặp Chúng Tôi</div>
                  <div className="text-sm text-white/80">1184 Nguyễn Văn Tạo, Long Thới, Nhà Bè, TP.HCM</div>
                  <div className="text-sm text-white/80 mt-1">Điện thoại: <strong>1900 636 836</strong></div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="font-serif text-xl font-bold mb-6" style={{ color: "#1A1A2E" }}>Đăng Ký Tư Vấn Miễn Phí</h3>

                {formSubmitted ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#C8102E" }} />
                    <h4 className="font-bold text-lg mb-2" style={{ color: "#1A1A2E" }}>Đăng ký thành công!</h4>
                    <p className="text-sm" style={{ color: "#6B7280" }}>Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#6B7280" }}>
                          Họ và Tên <span style={{ color: "#C8102E" }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                          style={{ borderColor: "#E5E0D8", color: "#1A1A2E" }}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#6B7280" }}>
                          Số Điện Thoại <span style={{ color: "#C8102E" }}>*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0901 234 567"
                          className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                          style={{ borderColor: "#E5E0D8", color: "#1A1A2E" }}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          data-testid="input-phone"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#6B7280" }}>Email</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                        style={{ borderColor: "#E5E0D8", color: "#1A1A2E" }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#6B7280" }}>Hạng Đăng Ký</label>
                      <select
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white"
                        style={{ borderColor: "#E5E0D8", color: formData.course ? "#1A1A2E" : "#9CA3AF" }}
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        data-testid="select-course"
                      >
                        <option value="">Chọn hạng...</option>
                        <option value="b-auto">B Tự Động</option>
                        <option value="b-manual">B Cơ Khí</option>
                        <option value="c1">C1</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#6B7280" }}>Ghi Chú</label>
                      <textarea
                        rows={3}
                        placeholder="Câu hỏi hoặc yêu cầu thêm..."
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none"
                        style={{ borderColor: "#E5E0D8", color: "#1A1A2E" }}
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        data-testid="textarea-note"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full font-bold py-4 rounded-xl text-base transition-all hover:opacity-90 active:scale-[0.99]"
                      style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}
                      data-testid="button-submit-form"
                    >
                      ĐĂNG KÝ NGAY
                    </button>

                    <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
                      Thông tin của bạn được bảo mật tuyệt đối
                    </p>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 9 — NEWS */}
      <section id="news" className="py-20 lg:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <FadeUp>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ color: "#1A1A2E" }}>
                Cập Nhật Mới Nhất
              </h2>
              <p className="text-lg mt-2" style={{ color: "#6B7280" }}>
                Sự kiện trung tâm, quy định mới và kiến thức lái xe hữu ích
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold border-2 rounded-full px-5 py-2.5 transition-all whitespace-nowrap"
                style={{ borderColor: "#C8102E", color: "#C8102E" }}
                data-testid="link-all-news"
              >
                Xem Tất Cả Tin Tức
                <ChevronRight className="w-4 h-4" />
              </a>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEWS.map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div
                  className="group rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ backgroundColor: "#F8F6F2", border: "1px solid #E5E0D8" }}
                  data-testid={`card-news-${i}`}
                >
                  <div className="h-32 flex items-center justify-center" style={{ backgroundColor: "#1A1A2E" }}>
                    <IconPassRate size={36} />
                  </div>
                  <div className="p-4">
                    <span
                      className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2"
                      style={{ backgroundColor: "#FFF3CD", color: "#92400E" }}
                    >
                      {item.category}
                    </span>
                    <h4
                      className="font-semibold text-sm leading-snug mb-2 group-hover:underline"
                      style={{ color: "#1A1A2E", textDecorationColor: "#C8102E" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "#6B7280" }}>{item.excerpt}</p>
                    <span className="text-xs font-mono" style={{ color: "#9CA3AF" }}>{item.date}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1 - Brand */}
            <div>
              <img src={logoImg} alt="Thành Công" className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                Trung Tâm Giáo Dục Nghề Nghiệp Lái Xe Thành Công<br />
                Quyết định thành lập số 773 — UBND TP.HCM — 27/02/2009
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Youtube, label: "YouTube" },
                  { Icon: MessageCircle, label: "Zalo" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    data-testid={`link-social-${label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 - Address */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: "#F0A500" }}>Địa Chỉ</h4>
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#C8102E" }} />
                <div>
                  <div className="text-xs font-semibold text-white mb-1">Cơ Sở Chính</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>1184 Nguyễn Văn Tạo, Long Thới, Nhà Bè, TP. Hồ Chí Minh</div>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Hotline: <span className="text-white font-semibold">1900 636 836</span></div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>dangkyhoc@trungtamthanhcong.vn</div>
              </div>
            </div>

            {/* Col 3 - Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: "#F0A500" }}>Liên Kết Nhanh</h4>
              <ul className="space-y-2">
                {["Khóa Học", "Lịch Khai Giảng", "Tra Cứu Kết Quả", "Tin Tức", "Hình Ảnh", "Liên Hệ", "Chính Sách Bảo Mật"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 - Trust */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: "#F0A500" }}>Chứng Nhận</h4>
              <div className="space-y-3">
                <div className="px-3 py-2.5 rounded-lg text-xs font-semibold text-center" style={{ backgroundColor: "rgba(240,165,0,0.12)", color: "#F0A500", border: "1px solid rgba(240,165,0,0.25)" }}>
                  Được Cấp Phép Bộ GTVT
                </div>
                <div className="px-3 py-2.5 rounded-lg text-xs font-semibold text-center" style={{ backgroundColor: "rgba(240,165,0,0.12)", color: "#F0A500", border: "1px solid rgba(240,165,0,0.25)" }}>
                  Đã Thông Báo Bộ Công Thương
                </div>
                <div className="px-3 py-2.5 rounded-lg text-xs font-semibold text-center" style={{ backgroundColor: "rgba(200,16,46,0.12)", color: "#ff8899", border: "1px solid rgba(200,16,46,0.25)" }}>
                  Thành Lập 2009 · 15+ Năm
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              © 2025 Thành Công. Bảo lưu mọi quyền.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Đã xác nhận Bộ Công Thương
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTIONS */}
      <AnimatePresence>
        {floatVisible && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed right-4 bottom-24 flex flex-col gap-3 z-40"
          >
            <a
              href="tel:1900636836"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 group relative"
              style={{ backgroundColor: "#C8102E" }}
              aria-label="Gọi điện"
              data-testid="button-float-call"
            >
              <Phone className="w-5 h-5 text-white" />
              <span className="absolute right-14 bg-white text-xs font-semibold px-2 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ color: "#1A1A2E" }}>
                Gọi Ngay
              </span>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 group relative"
              style={{ backgroundColor: "#0866FF" }}
              aria-label="Messenger"
              data-testid="button-float-messenger"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="absolute right-14 bg-white text-xs font-semibold px-2 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ color: "#1A1A2E" }}>
                Messenger
              </span>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 group relative"
              style={{ backgroundColor: "#0068FF" }}
              aria-label="Zalo"
              data-testid="button-float-zalo"
            >
              <span className="text-white text-xs font-bold">Zalo</span>
              <span className="absolute right-14 bg-white text-xs font-semibold px-2 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ color: "#1A1A2E" }}>
                Chat Zalo
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-4 bottom-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-40"
            style={{ backgroundColor: "#1A1A2E", color: "white" }}
            aria-label="Cuộn lên đầu trang"
            data-testid="button-scroll-top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
