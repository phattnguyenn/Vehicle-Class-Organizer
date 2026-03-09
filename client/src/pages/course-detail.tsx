import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, MapPin, Clock, Phone, ArrowLeft, FileText, Calendar, Users, Award } from "lucide-react";
import logoImg from "@assets/image_1773055619309.png";
import bAutoImg from "@assets/image_1773055631232.png";
import bManualImg from "@assets/image_1773055627297.png";
import c1Img from "@assets/image_1773055623145.png";
import { MAPS_URL } from "@/components/PopupSystem";

const PHONE = "0867741919";
const PHONE_DISPLAY = "0867 741 919";
const EASE_OUT = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring" as const, stiffness: 200, damping: 25 };

interface CourseData {
  slug: string;
  title: string;
  badge: string;
  img: string;
  tagline: string;
  licenseType: string;
  what: string;
  minAge: number;
  vehicles: string[];
  material: string;
  validity: string;
  hours: string;
  duration: string;
  color: string;
}

const COURSES: Record<string, CourseData> = {
  "hang-b1": {
    slug: "hang-b1",
    title: "Hạng B Tự Động (B1)",
    badge: "PHỔ BIẾN NHẤT",
    img: bAutoImg,
    tagline: "Bằng lái xe ô tô số tự động — lựa chọn lý tưởng cho cá nhân và gia đình",
    licenseType: "B1",
    what: "Bằng lái xe B1 là hạng xe ưu tiên và dành riêng cho các bạn mua xe riêng để chở gia đình, hoặc tài xế công ty để chở công nhân viên đi làm công sở. Bằng B1 chỉ được phép lái các loại ô tô có hệ thống xe số tự động (từ 4 đến 9 chỗ), xe tải có tải trọng dưới 3,5 tấn. Lưu ý: Bằng B1 không lái được xe số sàn và không phục vụ cho các hoạt động kinh doanh như chạy Grab, taxi…",
    minAge: 18,
    vehicles: [
      "Xe ô tô số tự động từ 4 đến 9 chỗ",
      "Xe tải trọng tải dưới 3,5 tấn (số tự động)",
    ],
    material: "Bằng lái xe B1 được làm từ chất liệu nhựa PET có thể chịu đựng nhiệt độ lên đến 200°C và cực kỳ bền. Hình dáng tương tự thẻ ATM.",
    validity: "Giấy phép lái xe hạng B1 có thời hạn đến khi người lái xe đủ 55 tuổi đối với nữ và đủ 60 tuổi đối với nam. Trường hợp người lái xe trên 45 tuổi (nữ) hoặc trên 50 tuổi (nam) thì giấy phép được cấp có thời hạn 10 năm kể từ ngày cấp.",
    hours: "292 giờ học",
    duration: "3–4 tháng",
    color: "#C8102E",
  },
  "hang-b2": {
    slug: "hang-b2",
    title: "Hạng B Cơ Khí (B2)",
    badge: "",
    img: bManualImg,
    tagline: "Bằng lái xe ô tô số sàn — linh hoạt, đổi được bằng quốc tế",
    licenseType: "B2",
    what: "Bằng lái xe B2 là hạng xe được nhiều người chọn học hiện nay. Bằng B2 được phép lái xe số sàn (từ 4 đến 9 chỗ), xe số tự động (từ 4 đến 9 chỗ), xe tải có tải trọng dưới 3,5 tấn. Ngoài ra, bằng B2 có thể đổi sang bằng lái xe quốc tế khi đi nước ngoài.",
    minAge: 18,
    vehicles: [
      "Xe ô tô số sàn từ 4 đến 9 chỗ",
      "Xe ô tô số tự động từ 4 đến 9 chỗ",
      "Xe tải trọng tải dưới 3,5 tấn",
      "Đổi được bằng lái xe quốc tế (IDP)",
    ],
    material: "Bằng lái xe B2 được làm từ chất liệu nhựa PET có thể chịu đựng nhiệt độ lên đến 200°C và cực kỳ bền. Hình dáng tương tự thẻ ATM.",
    validity: "Thời hạn bằng lái xe B2 là 10 năm kể từ ngày cấp.",
    hours: "352 giờ học",
    duration: "4–5 tháng",
    color: "#1A1A2E",
  },
  "hang-c": {
    slug: "hang-c",
    title: "Hạng C1",
    badge: "",
    img: c1Img,
    tagline: "Bằng lái xe tải hạng nặng — mở rộng cơ hội việc làm chuyên nghiệp",
    licenseType: "C",
    what: "Bằng lái xe C là hạng xe được nhiều người chọn học hiện nay để mở rộng cơ hội việc làm. Bằng C được phép lái xe số sàn (từ 4 đến 9 chỗ), xe số tự động (từ 4 đến 9 chỗ), xe tải có tải trọng 3,5 tấn trở lên. Ngoài ra, bằng C có thể đổi sang bằng lái xe quốc tế khi đi nước ngoài.",
    minAge: 21,
    vehicles: [
      "Xe ô tô số sàn và số tự động từ 4 đến 9 chỗ",
      "Xe tải trọng tải từ 3,5 tấn trở lên",
      "Đổi được bằng lái xe quốc tế (IDP)",
    ],
    material: "Bằng lái xe C được làm từ chất liệu nhựa PET có thể chịu đựng nhiệt độ lên đến 200°C và cực kỳ bền. Hình dáng tương tự thẻ ATM.",
    validity: "Thời hạn bằng lái xe C là 5 năm kể từ ngày cấp.",
    hours: "420 giờ học",
    duration: "4–5 tháng",
    color: "#C8102E",
  },
};

const DOCUMENTS = [
  "Đơn xin học theo mẫu (không cần xác nhận địa phương)",
  "Phiếu khám sức khoẻ theo mẫu",
  "12 tấm hình 3×4 (phông nền xanh dương)",
  "1 bản photo CMND / CCCD (không cần thị thực)",
  "1 bản photo bằng PET A1 (không cần thị thực)",
];

const THEORY_SCHEDULE = [
  { day: "Học lý thuyết", session: "Thứ 7 hàng tuần" },
  { day: "Sáng", session: "7h30 – 11h30" },
  { day: "Chiều", session: "13h30 – 17h30" },
];

const PRACTICE_SCHEDULE = [
  { ca: "Ca 1", time: "7h30 – 9h30" },
  { ca: "Ca 2", time: "9h30 – 11h30" },
  { ca: "Ca 3", time: "13h30 – 15h30" },
  { ca: "Ca 4", time: "15h30 – 17h30" },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export default function CourseDetail() {
  const params = useParams<{ slug: string }>();
  const course = COURSES[params.slug ?? ""];

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#F8F6F2" }}>
        <p className="text-xl font-bold" style={{ color: "#1A1A2E" }}>Không tìm thấy khóa học.</p>
        <Link href="/" className="inline-flex items-center gap-2 font-semibold" style={{ color: "#C8102E" }}>
          <ArrowLeft className="w-4 h-4" /> Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: "white", borderColor: "#E5E7EB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <img src={logoImg} alt="Thành Công Logo" className="h-10 object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "#6B7280" }}>
              <ArrowLeft className="w-4 h-4" /> Trang Chủ
            </Link>
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 text-sm font-bold border-2 rounded-full px-4 py-2 transition-all hover:shadow-md"
              style={{ borderColor: "#C8102E", color: "#C8102E" }}
              data-testid="link-phone-nav-detail">
              <Phone className="w-4 h-4" />{PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="absolute inset-0">
          <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,46,0.97) 40%, rgba(200,16,46,0.3) 100%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
            <Link href="/#courses" className="inline-flex items-center gap-2 text-sm mb-6 opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: "rgba(255,255,255,0.8)" }}>
              <ArrowLeft className="w-4 h-4" /> Tất cả khóa học
            </Link>
            {course.badge && (
              <div className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}>
                {course.badge}
              </div>
            )}
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-lg lg:text-xl max-w-2xl mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>{course.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <Clock className="w-4 h-4" style={{ color: "#F0A500" }} /> {course.duration}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <Award className="w-4 h-4" style={{ color: "#F0A500" }} /> {course.hours}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <Users className="w-4 h-4" style={{ color: "#F0A500" }} /> Từ {course.minAge} tuổi
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-3 gap-10">

        {/* ── LEFT COLUMN: main content ── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Section 1: What is it */}
          <FadeUp>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#C8102E" }}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                  Bằng Lái Xe Hạng {course.licenseType} Là Gì?
                </h2>
              </div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#374151" }}>{course.what}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.vehicles.map((v, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ backgroundColor: "#F8F6F2" }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#C8102E" }} />
                    <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Section 2: Material & validity */}
          <FadeUp delay={0.1}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F0A500" }}>
                  <FileText className="w-5 h-5" style={{ color: "#1A1A2E" }} />
                </div>
                <h2 className="font-serif text-2xl font-bold" style={{ color: "#1A1A2E" }}>Chất Liệu & Thời Hạn</h2>
              </div>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>{course.material}</p>
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#FFF8E6", border: "1px solid #F0A500" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A2E" }}>Thời Hạn Sử Dụng:</p>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{course.validity}</p>
              </div>
            </div>
          </FadeUp>

          {/* Section 3: Documents */}
          <FadeUp delay={0.15}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1A1A2E" }}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif text-2xl font-bold" style={{ color: "#1A1A2E" }}>Thủ Tục Hồ Sơ</h2>
              </div>
              <p className="text-sm mb-5 font-medium" style={{ color: "#6B7280" }}>
                Lưu ý: CMND phải còn rõ hình, rõ chữ, rõ số, không bong tróc, không quá 15 năm. Tuổi từ {course.minAge} tuổi trở lên.
              </p>
              <ul className="space-y-3">
                {DOCUMENTS.map((doc, i) => (
                  <motion.li key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-100"
                    initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07, ease: EASE_OUT }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                      style={{ backgroundColor: "#C8102E" }}>{i + 1}</span>
                    <span className="text-sm leading-relaxed" style={{ color: "#374151" }}>{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Section 4: Schedule */}
          <FadeUp delay={0.2}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#C8102E" }}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif text-2xl font-bold" style={{ color: "#1A1A2E" }}>Lịch Học</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Theory */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide mb-3 pb-2 border-b" style={{ color: "#C8102E", borderColor: "#E5E7EB" }}>
                    Lý Thuyết (Thứ 7 hàng tuần)
                  </h3>
                  <div className="space-y-2">
                    {THEORY_SCHEDULE.map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b last:border-b-0" style={{ borderColor: "#F3F4F6" }}>
                        <span className="text-sm font-medium" style={{ color: "#6B7280" }}>{row.day}</span>
                        <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{row.session}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practice */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide mb-3 pb-2 border-b" style={{ color: "#C8102E", borderColor: "#E5E7EB" }}>
                    Thực Hành (Linh Động)
                  </h3>
                  <div className="space-y-2">
                    {PRACTICE_SCHEDULE.map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b last:border-b-0" style={{ borderColor: "#F3F4F6" }}>
                        <span className="text-sm font-medium" style={{ color: "#6B7280" }}>{row.ca}</span>
                        <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl text-sm" style={{ backgroundColor: "#F8F6F2", color: "#6B7280" }}>
                Thực hành được sắp xếp linh động theo yêu cầu của học viên.
              </div>
            </div>
          </FadeUp>

        </div>

        {/* ── RIGHT COLUMN: sticky sidebar ── */}
        <div className="space-y-5">

          {/* CTA Card */}
          <FadeUp>
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2" style={{ borderColor: "#C8102E" }}>
                <div className="p-6" style={{ backgroundColor: "#C8102E" }}>
                  <h3 className="font-serif text-xl font-bold text-white mb-1">Đăng Ký Ngay Hôm Nay</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>Giữ chỗ trước khi lớp đầy — mỗi lớp giới hạn số học viên</p>
                </div>
                <div className="p-6 bg-white space-y-3">
                  <a href={`tel:${PHONE}`}
                    className="flex items-center justify-center gap-2 w-full font-bold rounded-full py-3 text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "#C8102E" }}
                    data-testid="button-call-cta">
                    <Phone className="w-5 h-5" /> Gọi {PHONE_DISPLAY}
                  </a>
                  <Link href="/#contact"
                    className="flex items-center justify-center gap-2 w-full font-bold rounded-full py-3 border-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: "#1A1A2E", color: "#1A1A2E" }}
                    data-testid="button-register-form-cta">
                    Đăng Ký Trực Tuyến <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="mt-5 rounded-2xl p-5 bg-white shadow-sm border border-gray-100">
                <h4 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: "#1A1A2E" }}>Địa Chỉ Nộp Hồ Sơ</h4>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2.5 mb-3 hover:opacity-75 transition-opacity"
                  data-testid="link-maps-detail">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#C8102E" }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>1184 Nguyễn Văn Tạo, Xã Long Thới, Huyện Nhà Bè, TP.HCM</div>
                    <div className="text-xs mt-1" style={{ color: "#6B7280" }}>Nhấn để xem trên Google Maps</div>
                  </div>
                </a>
                <div className="border-t pt-3 mt-3" style={{ borderColor: "#F3F4F6" }}>
                  <div className="text-xs" style={{ color: "#6B7280" }}>
                    <strong className="block mb-1" style={{ color: "#1A1A2E" }}>Giờ làm việc:</strong>
                    7h30 – 11h30 và 13h30 – 18h00<br />
                    Làm việc cả Thứ 7 và Chủ Nhật
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 rounded-2xl p-5 bg-white shadow-sm border border-gray-100">
                <h4 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: "#1A1A2E" }}>Cam Kết Của Chúng Tôi</h4>
                {[
                  "Tư vấn miễn phí, không ràng buộc",
                  "Hỗ trợ học phí trả góp linh hoạt",
                  "Bảo hành thi lại miễn phí nếu chưa đậu",
                  "Tỷ lệ đậu sát hạch trên 92%",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#C8102E" }} />
                    <span className="text-sm" style={{ color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── FOOTER CTA BAND ── */}
      <FadeUp>
        <div className="py-14" style={{ backgroundColor: "#1A1A2E" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              Sẵn Sàng Bắt Đầu Hành Trình?
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
              Liên hệ ngay để được tư vấn miễn phí và đăng ký giữ chỗ lớp {course.licenseType}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 font-bold rounded-full px-8 py-4 text-white hover:opacity-90 transition-all"
                style={{ backgroundColor: "#C8102E", boxShadow: "0 6px 24px rgba(200,16,46,0.35)" }}
                data-testid="button-call-footer">
                <Phone className="w-5 h-5" /> Gọi Ngay: {PHONE_DISPLAY}
              </a>
              <Link href="/#contact"
                className="inline-flex items-center gap-2 font-bold rounded-full px-8 py-4 border-2 transition-all hover:bg-white/10"
                style={{ borderColor: "#F0A500", color: "#F0A500" }}
                data-testid="button-register-footer">
                Đăng Ký Trực Tuyến <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ── MINIMAL FOOTER ── */}
      <div className="py-6 border-t" style={{ backgroundColor: "#0F0F1E", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <img src={logoImg} alt="Thành Công" className="h-8 object-contain opacity-80" />
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.45)" }}>
            © 2025 Trung Tâm Đào Tạo & Sát Hạch Lái Xe Thành Công. Được cấp phép Sở GTVT TP.HCM.
          </p>
          <Link href="/" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.5)" }}>
            ← Về Trang Chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
