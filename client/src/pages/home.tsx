import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronRight, ArrowUp, CheckCircle, MapPin, Clock, Users, Award, Star, ChevronDown, Facebook, Youtube, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/image_1773055619309.png";
import heroCarImg from "@assets/image_1773055587732.png";
import fleetImg from "@assets/image_1773055600948.png";
import bAutoImg from "@assets/image_1773055631232.png";
import bManualImg from "@assets/image_1773055627297.png";
import c1Img from "@assets/image_1773055623145.png";

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

const PILLARS = [
  { icon: Award, title: "Cơ Sở Vật Chất Hiện Đại", desc: "Sân tập đạt chuẩn Bộ GTVT, trang bị cabin điện tử mô phỏng, xe học đời mới nhất" },
  { icon: Users, title: "Đội Ngũ Giáo Viên Giàu Kinh Nghiệm", desc: "100% giáo viên có chứng chỉ hành nghề quốc gia, kinh nghiệm giảng dạy trên 5 năm" },
  { icon: Star, title: "Tỷ Lệ Đậu Sát Hạch Cao", desc: "Hơn 92% học viên đậu sát hạch ngay lần thi đầu tiên — chúng tôi cam kết chất lượng" },
  { icon: MapPin, title: "4 Cơ Sở Thuận Tiện", desc: "Nhà Bè, Tân Bình, Quận 4 — dễ dàng tiếp cận từ mọi quận trong TP.HCM" },
];

const SCHEDULE = [
  { date: "10/03", type: "B Tự Động", branch: "CS 1 - Nhà Bè", status: "available" },
  { date: "15/03", type: "B Cơ Khí", branch: "CS 2 - Nhà Bè", status: "available" },
  { date: "20/03", type: "C1", branch: "CS 1 - Nhà Bè", status: "almost" },
  { date: "25/03", type: "B Tự Động", branch: "CS 3 - Tân Bình", status: "available" },
  { date: "01/04", type: "B Cơ Khí", branch: "CS 4 - Quận 4", status: "available" },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "Tôi đã thử học ở chỗ khác nhưng trượt sát hạch. Chuyển sang Thành Công — đậu ngay lần đầu. Giáo viên tận tình và chuyên nghiệp lắm.",
    name: "Nguyễn Thị Lan",
    info: "Học viên Hạng B Tự Động · CS Nhà Bè",
  },
  {
    stars: 5,
    quote: "Cabin điện tử mô phỏng thực sự giúp ích rất nhiều. Khi ra sân thật mình đã tự tin hơn hẳn so với các bạn chưa học cabin. Cảm ơn Thành Công.",
    name: "Trần Văn Minh",
    info: "Học viên Hạng B Cơ Khí · CS Tân Bình",
  },
  {
    stars: 5,
    quote: "Hỗ trợ hồ sơ từ A đến Z, đăng ký nhanh, lịch học linh hoạt. Trung tâm đáng tin cậy nhất TP.HCM mà tôi từng gặp trong hơn 15 năm hoạt động.",
    name: "Phạm Thị Hoa",
    info: "Học viên Hạng C1 · CS Quận 4",
  },
];

const NEWS = [
  {
    category: "Sự Kiện",
    title: "Khai giảng lớp học lái xe tháng 3/2026 tại 4 cơ sở",
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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
      setScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
        data-testid="header-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Logo */}
            <a href="#home" className="flex items-center flex-shrink-0" data-testid="link-logo">
              <img src={logoImg} alt="Thành Công Logo" className="h-10 lg:h-12 w-auto object-contain" />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-red-600"
                  style={{ color: scrolled ? "#1A1A2E" : "#1A1A2E" }}
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
                style={{ borderColor: "#C8102E", color: "#C8102E" }}
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
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src={heroCarImg} alt="Xe thực hành lái xe Thành Công" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(26,26,46,0.92) 0%, rgba(26,26,46,0.75) 55%, rgba(26,26,46,0.4) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-6 mb-10"
            >
              {[
                { val: "15+", label: "Năm Kinh Nghiệm" },
                { val: "92%", label: "Tỷ Lệ Đậu Sát Hạch" },
                { val: "4", label: "Cơ Sở TP.HCM" },
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
          </div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-10 right-6 lg:right-16 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#C8102E" }} />
            <div>
              <div className="text-xs font-bold" style={{ color: "#1A1A2E" }}>Được Cấp Phép Bộ GTVT</div>
              <div className="text-xs" style={{ color: "#6B7280" }}>Thành lập 2009 · TP.HCM</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — TRUST BAR */}
      <div className="py-4 overflow-hidden" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              {[
                "Thành lập 2009 — 15+ năm hoạt động",
                "Được cấp phép Sở GTVT TP.HCM",
                "Hơn 10.000 học viên đã tốt nghiệp",
                "4 cơ sở tại Nhà Bè, Tân Bình, Quận 4",
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
                  className={`group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${course.highlight ? "" : "border border-gray-200"}`}
                  style={{
                    backgroundColor: "white",
                    boxShadow: course.highlight ? "0 8px 32px rgba(200,16,46,0.15), 0 0 0 2px #C8102E" : "0 2px 12px rgba(0,0,0,0.07)",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                  data-testid={`card-course-${course.id}`}
                >
                  {/* Image */}
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
                    {/* Red left accent on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "#C8102E" }} />
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
                  className="group relative p-6 rounded-xl cursor-default hover-elevate transition-all duration-300"
                  style={{ backgroundColor: "#F8F6F2", border: "1px solid #E5E0D8" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold mb-4 transition-colors duration-300"
                    style={{ backgroundColor: "#1A1A2E", color: "#F0A500" }}
                  >
                    {step.num}
                  </div>
                  {/* connector line */}
                  {i % 4 !== 3 && (
                    <div className="hidden lg:block absolute top-11 left-[calc(100%_-_0px)] w-6 h-0.5 z-10" style={{ backgroundColor: "#F0A500" }} />
                  )}
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

      {/* SECTION 5 — WHY CHOOSE US */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white text-center mb-14">
              Tại Sao Hơn 10.000 Học Viên<br />
              <span style={{ color: "#F0A500" }}>Tin Chọn Thành Công?</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div
                  className="group p-6 rounded-xl hover-elevate transition-all duration-300 cursor-default"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(240,165,0,0.15)" }}>
                    <p.icon className="w-6 h-6" style={{ color: "#F0A500" }} />
                  </div>
                  <h4 className="font-semibold text-base text-white mb-2">{p.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Fleet image */}
          <FadeUp delay={0.3}>
            <div className="mt-16 rounded-2xl overflow-hidden" style={{ maxHeight: "360px" }}>
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
                Chúng tôi khai giảng liên tục mỗi tháng tại tất cả cơ sở. Đăng ký sớm để giữ chỗ — mỗi lớp giới hạn số lượng học viên để đảm bảo chất lượng.
              </p>
              <div className="mb-6 p-4 rounded-xl border-l-4 flex items-center gap-3" style={{ backgroundColor: "#FFF8E6", borderLeftColor: "#F0A500" }}>
                <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>Lớp tháng 3 sắp đầy — chỉ còn vài chỗ cuối!</span>
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
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7280" }}>Cơ Sở</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7280" }}>Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCHEDULE.map((row, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors" data-testid={`row-schedule-${i}`}>
                        <td className="px-4 py-3.5 font-mono font-semibold" style={{ color: "#1A1A2E" }}>{row.date}</td>
                        <td className="px-4 py-3.5 font-medium" style={{ color: "#1A1A2E" }}>{row.type}</td>
                        <td className="px-4 py-3.5 text-xs" style={{ color: "#6B7280" }}>{row.branch}</td>
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
                  className="group p-6 rounded-xl hover-elevate transition-all duration-300 cursor-default relative"
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
                Điền form đăng ký — chúng tôi sẽ liên hệ tư vấn trong vòng 24 giờ để tìm khóa học phù hợp nhất với nhu cầu và lịch trình của bạn.
              </p>
              <ul className="space-y-3">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#6B7280" }}>Cơ Sở Gần Nhất</label>
                        <select
                          className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white"
                          style={{ borderColor: "#E5E0D8", color: formData.branch ? "#1A1A2E" : "#9CA3AF" }}
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          data-testid="select-branch"
                        >
                          <option value="">Chọn cơ sở...</option>
                          <option value="nb1">CS 1 - Nhà Bè (705 NV Tạo)</option>
                          <option value="nb2">CS 2 - Nhà Bè (1752 HT Phát)</option>
                          <option value="tb">CS 3 - Tân Bình (286 Âu Cơ)</option>
                          <option value="q4">CS 4 - Quận 4 (152 Khánh Hội)</option>
                        </select>
                      </div>
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
                  className="group rounded-xl overflow-hidden hover-elevate cursor-pointer transition-all duration-300"
                  style={{ backgroundColor: "#F8F6F2", border: "1px solid #E5E0D8" }}
                  data-testid={`card-news-${i}`}
                >
                  <div className="h-32 flex items-center justify-center" style={{ backgroundColor: "#1A1A2E" }}>
                    <Award className="w-10 h-10" style={{ color: "#F0A500" }} />
                  </div>
                  <div className="p-4">
                    <span
                      className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2"
                      style={{ backgroundColor: "#FFF3CD", color: "#92400E" }}
                    >
                      {item.category}
                    </span>
                    <h4
                      className="font-semibold text-sm leading-snug mb-2 group-hover:underline transition-all"
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

            {/* Col 2 - Branches */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: "#F0A500" }}>Trụ Sở</h4>
              <ul className="space-y-3">
                {[
                  { loc: "CS 1: 705 Nguyễn Văn Tạo, Nhà Bè", phone: "0334 705 705" },
                  { loc: "CS 2: 1752 Huỳnh Tấn Phát, Nhà Bè", phone: "1900 636 836" },
                  { loc: "CS 3: 286 Âu Cơ, Q. Tân Bình", phone: "0349 075 570" },
                  { loc: "CS 4: 152 Khánh Hội, Q.4", phone: "0372 730 152" },
                ].map((b, i) => (
                  <li key={i} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <div className="mb-0.5">{b.loc}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)" }}>{b.phone}</div>
                  </li>
                ))}
              </ul>
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

            {/* Col 4 - Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: "#F0A500" }}>Liên Hệ</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#F0A500" }} />
                  1900 636 836
                </li>
                <li className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-xs" style={{ color: "#F0A500" }}>@</span>
                  dangkyhoc@trungtamthanhcong.vn
                </li>
                <li className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#F0A500" }} />
                  trungtamthanhcong.vn
                </li>
              </ul>
              <div className="mt-5 px-3 py-2 rounded-lg text-xs font-semibold text-center" style={{ backgroundColor: "rgba(240,165,0,0.15)", color: "#F0A500", border: "1px solid rgba(240,165,0,0.3)" }}>
                Đã Thông Báo Bộ Công Thương
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
