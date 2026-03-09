import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import fleetImg from "@assets/image_1773055600948.png";

const FORMSPREE_URL = "https://formspree.io/f/myknkpjk";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=1184+Nguyen+Van+Tao+Long+Thoi+Nha+Be+TPHCM";

const EASING = [0.16, 1, 0.3, 1] as const;

/* ── Countdown target: pick next upcoming class ── */
const CLASS_DATES = [
  new Date("2026-03-10T08:00:00+07:00"),
  new Date("2026-03-25T08:00:00+07:00"),
  new Date("2026-04-01T08:00:00+07:00"),
  new Date("2026-04-15T08:00:00+07:00"),
];
function getNextClass() {
  return CLASS_DATES.find((d) => d > new Date()) ?? CLASS_DATES[CLASS_DATES.length - 1];
}
function fmtDate(d: Date) {
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function pad(n: number) { return String(n).padStart(2, "0"); }

function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [target]);
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return t;
}

/* ── Session keys ── */
const KEY_MAIN_SEEN = "tc_main_popup_seen";
const KEY_MAIN_CLOSED = "tc_main_popup_closed";
const KEY_EXIT_SEEN = "tc_exit_popup_seen";
const LS_REGISTERED = "tc_registered";

interface Props {
  formSubmitted: boolean;
  onStickyChange?: (visible: boolean) => void;
}

export default function PopupSystem({ formSubmitted, onStickyChange }: Props) {
  const nextClass = getNextClass();
  const countdown = useCountdown(nextClass);

  /* ── Global suppression ── */
  const [globalDone, setGlobalDone] = useState(
    () => formSubmitted || localStorage.getItem(LS_REGISTERED) === "true"
  );
  useEffect(() => {
    if (formSubmitted) { setGlobalDone(true); localStorage.setItem(LS_REGISTERED, "true"); }
  }, [formSubmitted]);

  /* ── Main popup ── */
  const [showMain, setShowMain] = useState(false);
  const [mainWasClosed, setMainWasClosed] = useState(false);
  const [mainPhone, setMainPhone] = useState("");
  const [mainSubmitting, setMainSubmitting] = useState(false);
  const [mainSuccess, setMainSuccess] = useState(false);

  /* ── Exit popup ── */
  const [showExit, setShowExit] = useState(false);

  /* ── Sticky bar ── */
  const [stickyVisible, setStickyVisible] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  /* ── Trigger: main popup — 25s OR 60% scroll ── */
  useEffect(() => {
    if (globalDone || sessionStorage.getItem(KEY_MAIN_SEEN)) return;
    const open = () => {
      if (sessionStorage.getItem(KEY_MAIN_SEEN)) return;
      sessionStorage.setItem(KEY_MAIN_SEEN, "1");
      setShowMain(true);
    };
    const timer = setTimeout(open, 25000);
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct >= 0.6) { clearTimeout(timer); open(); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [globalDone]);

  /* ── Trigger: sticky bar — scroll > 400px ── */
  useEffect(() => {
    if (globalDone || stickyDismissed) { setStickyVisible(false); onStickyChange?.(false); return; }
    const onScroll = () => {
      const v = window.scrollY > 400;
      setStickyVisible(v);
      onStickyChange?.(v);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [globalDone, stickyDismissed, onStickyChange]);

  /* ── Trigger: exit intent — after main was closed ── */
  useEffect(() => {
    if (!mainWasClosed || globalDone || sessionStorage.getItem(KEY_EXIT_SEEN)) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        sessionStorage.setItem(KEY_EXIT_SEEN, "1");
        setShowExit(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [mainWasClosed, globalDone]);

  /* ── ESC key to close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setShowMain(false); setShowExit(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMain = useCallback(() => {
    setShowMain(false);
    setMainWasClosed(true);
    sessionStorage.setItem(KEY_MAIN_CLOSED, "1");
  }, []);

  const dismissSticky = useCallback(() => {
    setStickyDismissed(true);
    setStickyVisible(false);
    onStickyChange?.(false);
  }, [onStickyChange]);

  const handleMainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainPhone.trim()) return;
    setMainSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          phone: mainPhone,
          source: "popup_main",
          message: `Đăng ký giữ chỗ từ popup — SĐT: ${mainPhone}`,
        }),
      });
      if (res.ok) {
        setMainSuccess(true);
        setGlobalDone(true);
        localStorage.setItem(LS_REGISTERED, "true");
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại hoặc gọi 1900 636 836.");
      }
    } catch {
      alert("Không thể kết nối. Vui lòng thử lại sau.");
    } finally {
      setMainSubmitting(false);
    }
  };

  const openMainFromExit = () => {
    setShowExit(false);
    setTimeout(() => setShowMain(true), 150);
  };

  const shimmer = (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)", backgroundSize: "200% 100%" }}
      animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
    />
  );

  return (
    <>
      {/* ══════════ POPUP 1 — MAIN ══════════ */}
      <AnimatePresence>
        {showMain && !globalDone && (
          <>
            <motion.div
              className="fixed inset-0 z-[80]"
              style={{ backgroundColor: "rgba(26,26,46,0.78)", backdropFilter: "blur(5px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={closeMain}
            />
            <div className="fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                className="relative w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                style={{ maxWidth: "520px", maxHeight: "92vh", overflowY: "auto" }}
                initial={{ scale: 0.85, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -16, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog" aria-modal="true" aria-label="Giữ chỗ lớp học lái xe"
              >
                {/* Red top bar */}
                <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ backgroundColor: "#C8102E" }}>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-white"
                        animate={{ opacity: [1, 0.25, 1] }}
                        transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }} />
                    ))}
                    <span className="text-white text-sm font-semibold ml-1">
                      Chỉ còn 3 chỗ cho lớp tháng 3
                    </span>
                  </div>
                  <button onClick={closeMain} className="text-white/60 hover:text-white transition-colors" aria-label="Đóng popup">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {mainSuccess ? (
                    /* Success state */
                    <motion.div key="success" className="p-8 text-center"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                      <motion.div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: "#ECFDF5" }}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        <CheckCircle className="w-10 h-10" style={{ color: "#059669" }} />
                      </motion.div>
                      <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>Đã Giữ Chỗ Thành Công!</h3>
                      <p className="text-sm mb-4" style={{ color: "#6B7280" }}>Tư vấn viên sẽ gọi cho bạn trong vòng 30 phút.</p>
                      <div className="rounded-xl p-4 text-left space-y-2 mb-5" style={{ backgroundColor: "#F8F6F2" }}>
                        <div className="text-sm">📅 Lớp khai giảng: <strong>{fmtDate(nextClass)}</strong></div>
                        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-sm block hover:underline">
                          📍 Cơ sở: <strong>1184 Nguyễn Văn Tạo, Nhà Bè, TP.HCM</strong>
                        </a>
                        <div className="text-sm">📞 Hotline: <strong>1900 636 836</strong></div>
                      </div>
                      <button onClick={() => setShowMain(false)} className="text-sm font-semibold underline" style={{ color: "#6B7280" }}>Đóng lại</button>
                    </motion.div>
                  ) : (
                    /* Form state */
                    <motion.div key="form" className="p-5 sm:p-6"
                      initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

                      {/* Icon + headline */}
                      <div className="text-center mb-5">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: "#FFF8E6" }}>⏳</div>
                        <h2 className="font-serif text-2xl font-bold leading-snug" style={{ color: "#1A1A2E" }}>
                          Lớp Tháng 3 Đang<br />Được Lấp Đầy
                        </h2>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2 text-sm">
                          <span className="font-semibold" style={{ color: "#1A1A2E" }}>Số chỗ đã đăng ký</span>
                          <span className="font-bold" style={{ color: "#C8102E" }}>22/25 học viên</span>
                        </div>
                        <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E0D8" }}>
                          <motion.div className="h-full rounded-full origin-left" style={{ backgroundColor: "#C8102E" }}
                            initial={{ scaleX: 0 }} animate={{ scaleX: 0.88 }}
                            transition={{ duration: 1.2, ease: EASING, delay: 0.3 }} />
                        </div>
                        <p className="text-xs mt-1.5" style={{ color: "#6B7280" }}>
                          Còn đúng <strong style={{ color: "#C8102E" }}>3 chỗ trống</strong> cuối cùng
                        </p>
                      </div>

                      <hr style={{ borderColor: "#E5E0D8" }} className="mb-4" />

                      <p className="text-sm mb-3 leading-relaxed" style={{ color: "#374151" }}>
                        Mỗi tháng chúng tôi chỉ nhận giới hạn <strong>25 học viên</strong> để đảm bảo chất lượng đào tạo 1-1 với giáo viên. Khi đủ chỗ — lớp đóng ngay.
                      </p>

                      <ul className="space-y-1.5 mb-4">
                        {[
                          "Thực hành cùng giáo viên riêng",
                          "Tỷ lệ đậu sát hạch 92% ngay lần đầu",
                          `Khai giảng ${fmtDate(nextClass)} — học ngay tuần tới`,
                        ].map((v, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                            <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: "#F0A500" }}>✓</span>{v}
                          </li>
                        ))}
                      </ul>

                      {/* Countdown */}
                      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#F8F6F2" }}>
                        <p className="text-xs text-center mb-3" style={{ color: "#6B7280" }}>Đến khi lớp tháng 3 khai giảng</p>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { val: pad(countdown.days), label: "Ngày" },
                            { val: pad(countdown.hours), label: "Giờ" },
                            { val: pad(countdown.minutes), label: "Phút" },
                            { val: pad(countdown.seconds), label: "Giây" },
                          ].map((unit) => (
                            <div key={unit.label} className="text-center">
                              <div className="rounded-lg py-2 font-mono text-xl font-bold" style={{ backgroundColor: "#1A1A2E", color: "#F0A500" }}>{unit.val}</div>
                              <div className="text-xs mt-1" style={{ color: "#6B7280" }}>{unit.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Phone input + submit */}
                      <form onSubmit={handleMainSubmit}>
                        <div className="mb-3">
                          <input
                            type="tel" required placeholder="Số điện thoại của bạn"
                            value={mainPhone} onChange={(e) => setMainPhone(e.target.value)}
                            className="w-full border-2 rounded-xl px-4 text-base focus:outline-none transition-all"
                            style={{ height: "52px", borderColor: "#E5E0D8", color: "#1A1A2E" }}
                            onFocus={(e) => { e.target.style.borderColor = "#C8102E"; e.target.style.boxShadow = "0 0 0 3px rgba(200,16,46,0.12)"; }}
                            onBlur={(e) => { e.target.style.borderColor = "#E5E0D8"; e.target.style.boxShadow = "none"; }}
                            data-testid="input-popup-phone"
                          />
                        </div>
                        <motion.button
                          type="submit" disabled={mainSubmitting}
                          className="w-full font-bold rounded-xl text-base relative overflow-hidden"
                          style={{ height: "56px", backgroundColor: "#F0A500", color: "#1A1A2E" }}
                          whileHover={{ scale: 1.01, boxShadow: "0 6px 24px rgba(240,165,0,0.4)" }}
                          whileTap={{ scale: 0.97 }}
                          data-testid="button-popup-submit">
                          {mainSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <motion.span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black"
                                animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} />
                              Đang xử lý...
                            </span>
                          ) : (
                            <><span className="relative z-10">Giữ Chỗ Của Tôi Ngay →</span>{shimmer}</>
                          )}
                        </motion.button>
                      </form>

                      <p className="text-center text-xs mt-2" style={{ color: "#9CA3AF" }}>
                        🔒 Không mất phí — Tư vấn viên liên hệ trong 30 phút
                      </p>
                      <div className="text-center mt-3">
                        <button onClick={closeMain} className="text-xs hover:underline" style={{ color: "#C4B9AF" }}>
                          Tôi không cần học lái xe lúc này
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════ POPUP 2 — EXIT INTENT ══════════ */}
      <AnimatePresence>
        {showExit && !globalDone && (
          <>
            <motion.div className="fixed inset-0 z-[80]"
              style={{ backgroundColor: "rgba(26,26,46,0.78)", backdropFilter: "blur(5px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowExit(false)} />
            <div className="fixed inset-0 z-[81] flex items-start justify-center pt-8 p-4">
              <motion.div
                className="relative w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                style={{ maxWidth: "480px" }}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASING }}
                onClick={(e) => e.stopPropagation()}
                role="dialog" aria-modal="true">
                <button onClick={() => setShowExit(false)}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "rgba(0,0,0,0.35)", color: "white" }} aria-label="Đóng">
                  <X className="w-4 h-4" />
                </button>
                {/* Hero image */}
                <div className="relative h-36 overflow-hidden">
                  <img src={fleetImg} alt="Đội xe Thành Công" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,46,0.65) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#F0A500", color: "#1A1A2E" }}>
                    ⚡ 3 chỗ cuối tháng 3
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
                    Khoan đã —<br />
                    <span style={{ color: "#C8102E" }}>Bạn Sắp Bỏ Lỡ Lớp Học Tháng 3</span>
                  </h3>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: "#6B7280" }}>
                    Người đăng ký hôm nay sẽ được xếp lớp trước. Chỉ 3 chỗ còn lại — khi hết là phải đợi sang tháng 4.
                  </p>
                  <div className="space-y-3">
                    <motion.button onClick={openMainFromExit}
                      className="w-full font-bold rounded-xl py-3.5 text-white"
                      style={{ backgroundColor: "#C8102E" }}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      Giữ Chỗ Cho Tôi →
                    </motion.button>
                    <button onClick={() => setShowExit(false)}
                      className="w-full font-medium rounded-xl py-3 text-sm border"
                      style={{ borderColor: "#E5E0D8", color: "#9CA3AF" }}>
                      Tôi sẽ đợi đến tháng 4
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════ POPUP 3 — STICKY BOTTOM BAR ══════════ */}
      <AnimatePresence>
        {stickyVisible && !globalDone && !stickyDismissed && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[44]"
            style={{ backgroundColor: "#1A1A2E" }}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
            data-testid="sticky-bar">
            <div className="max-w-7xl mx-auto px-4 py-3">
              {/* Desktop */}
              <div className="hidden sm:flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <motion.span className="font-bold text-sm whitespace-nowrap"
                    style={{ color: "#F0A500" }}
                    animate={{ textShadow: ["0 0 0px rgba(240,165,0,0)", "0 0 10px rgba(240,165,0,0.9)", "0 0 0px rgba(240,165,0,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    🔴 Còn 3 chỗ
                  </motion.span>
                  <span className="text-white/60 text-sm whitespace-nowrap">tháng 3 —</span>
                  <span className="text-white text-sm whitespace-nowrap">Lớp khai giảng {fmtDate(nextClass)}</span>
                </div>
                <div className="text-white/50 text-xs font-mono whitespace-nowrap flex-shrink-0">
                  {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <motion.button onClick={() => { setShowMain(true); setStickyVisible(false); }}
                    className="font-bold text-sm px-5 py-2 rounded-full text-white whitespace-nowrap"
                    style={{ backgroundColor: "#C8102E" }}
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(200,16,46,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    data-testid="button-sticky-register">
                    Đăng Ký Ngay →
                  </motion.button>
                  <button onClick={dismissSticky} className="text-white/35 hover:text-white/80 transition-colors flex-shrink-0" aria-label="Đóng thanh">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile */}
              <div className="sm:hidden">
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="text-xs text-white/75 leading-tight">
                    <motion.span className="font-bold" style={{ color: "#F0A500" }}
                      animate={{ opacity: [1, 0.55, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      🔴 Còn 3 chỗ
                    </motion.span>
                    {" "}• Lớp {fmtDate(nextClass)} • {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
                  </span>
                  <button onClick={dismissSticky} className="text-white/35 flex-shrink-0" aria-label="Đóng">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <motion.button
                  onClick={() => { setShowMain(true); setStickyVisible(false); }}
                  className="w-full font-bold py-3 rounded-xl text-sm text-white"
                  style={{ backgroundColor: "#C8102E" }}
                  whileTap={{ scale: 0.97 }}>
                  Đăng Ký Giữ Chỗ Ngay
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
