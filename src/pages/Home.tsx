import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import QRCode from "qrcode";
import { ArrowUpRight } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/ayesha-saifi-5453bb392/";

function useQRDataUrl(value: string) {
  const [dataUrl, setDataUrl] = useState("");
  useEffect(() => {
    QRCode.toDataURL(value, {
      width: 110,
      margin: 1,
      color: { dark: "#f5eeee", light: "#00000000" },
    })
      .then(setDataUrl)
      .catch(() => {});
  }, [value]);
  return dataUrl;
}

/* Clip-reveal: word slides up from below its container (Dribbble-style) */
function RevealWord({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", ...style }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "block" }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Floating animation wrapper */
function FloatingFlower({
  src,
  style,
  duration = 6,
  amplitude = 12,
  rotate = 0,
  rotateAmp = 4,
}: {
  src: string;
  style?: React.CSSProperties;
  duration?: number;
  amplitude?: number;
  rotate?: number;
  rotateAmp?: number;
}) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      animate={{
        y: [0, -amplitude, 0, amplitude / 2, 0],
        rotate: [rotate, rotate + rotateAmp, rotate, rotate - rotateAmp, rotate],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={style}
    />
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const portfolioY = useTransform(scrollYProgress, [0, 0.3], ["0%", "18%"]);
  const photoY = useTransform(scrollYProgress, [0, 0.5], ["0%", "28%"]);
  const flowerParallax = useTransform(scrollYProgress, [0, 0.4], ["0%", "-30%"]);
  const linkedinQR = useQRDataUrl(LINKEDIN_URL);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#1f0508ff", color: "#f0ebe8" }}
    >
      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%", left: "-10%",
            width: "55vw", height: "55vw",
            background: "radial-gradient(circle, rgba(39, 4, 8) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "10%", right: "-15%",
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(49, 4, 9, 1) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* ════════════════════════════════
          NAV
      ════════════════════════════════ */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5"
      >
        <div
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ayesha<span style={{ color: "#810101ff" }}>.dev</span>
        </div>
        <div
          className="flex gap-7 text-xs uppercase tracking-[0.2em]"
          style={{ fontFamily: "'Inter', sans-serif", color: "#c8b8b8" }}
        >
          {["About", "Projects", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-white transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: 600 }}
      >
        {/* ── Giant "Portfolio" — at top, behind the photo ── */}
        <motion.div
          className="absolute inset-x-0 top-0 flex items-flex-start justify-center pointer-events-none select-none"
          style={{ y: portfolioY, paddingTop: "clamp(100px, 15vh, 160px)", zIndex: 5 }}
          aria-hidden
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.25em" }}
            animate={{ opacity: 1, letterSpacing: "-0.02em" }}
            transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(110px, 23vw, 370px)",
              lineHeight: 0.85,
              color: "#120102",
              WebkitTextStroke: "0px transparent",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            Portfolio
          </motion.span>
        </motion.div>

        {/* ── Flower LEFT — pinned to far left edge, below text ── */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{
            y: flowerParallax,
            left: "clamp(-100px, -7vw, -30px)",
            top: "38%",
            zIndex: 5,
            width: "clamp(180px, 22vw, 300px)",
            filter: "drop-shadow(0 8px 32px rgba(139,28,46,0.55))",
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 0.55, scale: 1, rotate: -10 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <FloatingFlower
            src="/flower.png"
            duration={7}
            amplitude={10}
            rotate={-10}
            rotateAmp={5}
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>

        {/* ── Flower RIGHT — pinned to far right edge, mid height ── */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{
            right: "clamp(-120px, -8vw, -40px)",
            top: "30%",
            zIndex: 5,
            width: "clamp(220px, 28vw, 400px)",
            opacity: 0.7,
            filter: "drop-shadow(0 10px 40px rgba(139,28,46,0.5))",
          }}
          initial={{ opacity: 0, scale: 0.75, rotate: 30 }}
          animate={{ opacity: 0.7, scale: 1, rotate: 20 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <FloatingFlower
            src="/flower.png"
            duration={8}
            amplitude={14}
            rotate={18}
            rotateAmp={6}
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>

        {/* ── Portrait hero photo — overlaps Portfolio text ── */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{
            y: photoY,
            top: "clamp(100px, 18vh, 180px)",
            width: "clamp(220px, 32vw, 480px)",
          }}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/me6.png"
            alt="Ayesha Saifi, a full-stack web developer"
            style={{
              width: "100%",
              height: "clamp(420px, 82vh, 800px)",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          {/* fade into dark background at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, transparent 0%, #0d0507 100%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* ── Left labels: REACT / NODE / TYPE / SCRIPT ── */}
        <motion.div
          className="absolute z-30 flex flex-col"
          style={{
            left: "clamp(20px, 3.5vw, 48px)",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 2vw, 80px)",
            letterSpacing: "0.14em",
            lineHeight: 1.25,
          }}
        >
          {["REACT", "NODE", "TYPE", "SCRIPT"].map((word, i) => (
            <RevealWord key={word} delay={0.55 + i * 0.08}>
              <span style={{ color: i % 2 === 0 ? "#f0ebe8" : "rgba(161, 16, 0, 0.7)" }}>
                {word}
              </span>
            </RevealWord>
          ))}
        </motion.div>

        {/* ── Right: "FULL" / "STACK" clip-reveal ── */}
        <div
          className="absolute z-30 flex flex-col items-end leading-none"
          style={{
            right: "clamp(20px, 3.5vw, 48px)",
            top: "75%",
            transform: "translateY(-50%)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 11vw, 140px)",
            letterSpacing: "0.01em",
            lineHeight: 0.9,
          }}
        >
          <RevealWord delay={0.45} style={{ display: "block" }}>
            <span style={{ color: "#ffffff" }}>FULL</span>
          </RevealWord>
          <RevealWord delay={0.6} style={{ display: "block" }}>
            <span style={{ color: "#690c01ff" }}>STACK</span>
          </RevealWord>
        </div>

        {/* ── Flower BOTTOM-LEFT corner of hero ── */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ bottom: "-40px", left: "clamp(80px,10vw,160px)", zIndex: 5, width: "clamp(130px,16vw,220px)", filter: "drop-shadow(0 6px 20px rgba(139,28,46,0.55))" }}
          initial={{ opacity: 0, scale: 0.7, rotate: 20 }}
          animate={{ opacity: 0.5, scale: 1, rotate: 35 }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={9} amplitude={8} rotate={35} rotateAmp={5} style={{ width: "100%", height: "auto" }} />
        </motion.div>

        {/* ── Flower BOTTOM-RIGHT corner of hero ── */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ bottom: "-50px", right: "clamp(80px,10vw,160px)", zIndex: 5, width: "clamp(110px,14vw,190px)", filter: "drop-shadow(0 6px 20px rgba(139,28,46,0.5))" }}
          initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
          animate={{ opacity: 0.45, scale: 1, rotate: -28 }}
          transition={{ duration: 1.3, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={11} amplitude={7} rotate={-28} rotateAmp={4} style={{ width: "100%", height: "auto" }} />
        </motion.div>

        {/* ── Bottom strip ── */}
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between px-5 md:px-10 pb-5"
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(243, 233, 233, 0.5)",
                marginBottom: 2,
              }}
            >
              linkedin:
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(200,170,170,0.4)",
                letterSpacing: "0.08em",
              }}
            >
              linkedin.com/in/ayesha-saifi-5453bb392
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: -30, x: -100 }}
            transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(45px, 10vw, 120px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
              color: "#f0ebe8",
              position: "relative",
              zIndex: 40,
              marginBottom: "-0.12em",
              textShadow: "0 4px 40px rgba(139,28,46,0.35)",
            }}
          >
            Ayesha
          </motion.div>

          <div className="flex flex-col items-center gap-1">
            <span
              style={{
                fontFamily: "cursive",
                fontStyle: "normal",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "rgba(109, 99, 99, 0.4)",
              }}
            >
              scroll
            </span>
          </div>
        </motion.div>

        {/* ── Hero → WHO AM I blend ── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: "18vh", background: "linear-gradient(to bottom, transparent, #0d0507)", zIndex: 25 }}
        />
      </section>

      {/* ════════════════════════════════
          WHO AM I?
      ════════════════════════════════ */}
      <section
        id="who"
        className="relative z-10 overflow-hidden"
        style={{ background: "rgba(139,28,46,0.06)" }}
      >
        {/* Flower — top right decoration */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ top: "-60px", right: "clamp(-60px,-4vw,-20px)", width: "clamp(200px,26vw,380px)", opacity: 0.22, zIndex: 0, filter: "drop-shadow(0 0 40px rgba(139,28,46,0.7))" }}
          initial={{ opacity: 0, scale: 0.8, rotate: 40 }}
          whileInView={{ opacity: 0.22, scale: 1, rotate: 28 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={8} amplitude={10} rotate={28} rotateAmp={5} style={{ width: "100%", height: "auto" }} />
        </motion.div>

        {/* Flower — bottom left decoration */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ bottom: "-50px", left: "clamp(-50px,-3vw,-10px)", width: "clamp(150px,18vw,260px)", opacity: 0.18, zIndex: 0, filter: "drop-shadow(0 0 30px rgba(139,28,46,0.6))" }}
          initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
          whileInView={{ opacity: 0.18, scale: 1, rotate: -18 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={10} amplitude={8} rotate={-18} rotateAmp={4} style={{ width: "100%", height: "auto" }} />
        </motion.div>

        <div className="relative z-10 mx-auto px-6 md:px-10 py-20 md:py-28" style={{ maxWidth: 1100 }}>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* ── Left: big heading + avatar ── */}
            <div className="flex flex-col items-center md:items-start gap-8 shrink-0">
              {/* Giant heading */}
              <div style={{ overflow: "hidden" }}>
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(52px, 9vw, 130px)",
                    lineHeight: 0.9,
                    letterSpacing: "0.04em",
                    color: "#f0ebe8",
                  }}
                >
                  WHO
                </motion.h2>
              </div>
              <div style={{ overflow: "hidden", marginTop: -8 }}>
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(52px, 9vw, 130px)",
                    lineHeight: 0.9,
                    letterSpacing: "0.04em",
                    color: "#c0392b",
                  }}
                >
                  AM I?
                </motion.h2>
              </div>

              {/* Name label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(14px,1.6vw,20px)", letterSpacing: "0.3em", color: "rgba(200,170,170,0.55)", marginTop: 4 }}
              >
                AYESHA · DEVELOPER
              </motion.p>
            </div>

            {/* ── Right: description text — slightly bigger ── */}
            <div className="flex-1">
              {/* Crimson rule accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: 2, background: "linear-gradient(90deg, #c0392b, rgba(192,57,43,0.2))", transformOrigin: "left", marginBottom: 28 }}
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(20px, 2.1vw, 28px)", lineHeight: 1.6, color: "#f0ebe8", marginBottom: 20 }}
              >
                "My journey into the digital world started with a curiosity for how
                things are built — and a desire to build them better."
              </motion.p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "✦", text: "Full-stack web applications from concept to deployment" },
                  { icon: "✦", text: "Interactive UIs with smooth animations and micro-interactions" },
                  { icon: "✦", text: "Scalable REST & GraphQL APIs backed by PostgreSQL and MongoDB" },
                  { icon: "✦", text: "Performance-first architecture — fast by default, accessible always" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span style={{ color: "#c0392b", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(14px, 1.25vw, 17px)", lineHeight: 1.7, color: "rgba(200,170,170,0.8)" }}>{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex items-center gap-4 mt-10"
              >
                <a
                  href="#projects"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 14,
                    letterSpacing: "0.22em",
                    padding: "12px 28px",
                    background: "#c0392b",
                    color: "#f5eeee",
                    display: "inline-block",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  SEE MY WORK
                </a>
                <a
                  href="#contact"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 14,
                    letterSpacing: "0.22em",
                    padding: "12px 28px",
                    border: "1px solid rgba(192,57,43,0.5)",
                    color: "rgba(200,170,170,0.8)",
                    display: "inline-block",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#c0392b"; e.currentTarget.style.color = "#f5eeee"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(192,57,43,0.5)"; e.currentTarget.style.color = "rgba(200,170,170,0.8)"; }}
                >
                  CONTACT ME
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* WHO AM I → About blend */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "120px", background: "linear-gradient(to bottom, transparent, #0d0507)", zIndex: 2 }} />
      </section>

      {/* ════════════════════════════════
          ABOUT ME
      ════════════════════════════════ */}
      <section id="about" className="relative z-10 py-24 px-6 md:px-10 overflow-hidden">
        {/* Flower — top right of About section */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ top: "-30px", right: "clamp(-60px,-4vw,-10px)", width: "clamp(140px,16vw,220px)", opacity: 0.2, zIndex: 0, filter: "drop-shadow(0 0 24px rgba(139,28,46,0.6))" }}
          initial={{ opacity: 0, scale: 0.8, rotate: 50 }}
          whileInView={{ opacity: 0.2, scale: 1, rotate: 38 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={12} amplitude={6} rotate={38} rotateAmp={4} style={{ width: "100%", height: "auto" }} />
        </motion.div>
        {/* Flower — bottom left of About section */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ bottom: "-20px", left: "clamp(-50px,-3vw,-5px)", width: "clamp(120px,13vw,180px)", opacity: 0.15, zIndex: 0, filter: "drop-shadow(0 0 20px rgba(139,28,46,0.5))" }}
          initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
          whileInView={{ opacity: 0.15, scale: 1, rotate: -25 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={10} amplitude={7} rotate={-25} rotateAmp={3} style={{ width: "100%", height: "auto" }} />
        </motion.div>
        <SectionHeader number="01" title="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-12"
          style={{
            border: "1px solid rgba(139,28,46,0.22)",
            background: "rgba(139,28,46,0.04)",
            padding: "clamp(24px, 4vw, 56px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(24px, 5vw, 64px)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 1.2vw, 17px)",
                lineHeight: 1.85,
                color: "#d8cece",
                marginBottom: 20,
              }}
            >
              I'm a computer science engineering 2nd year student with a passion for building exceptional
              digital experiences. My journey into web development started when I
              began customizing my IDE and realizing I could build the tools I
              wanted to see in the world.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 1.2vw, 17px)",
                lineHeight: 1.85,
                color: "#d8cece",
              }}
            >
              I specialize in building robust full-stack applications with an
              emphasis on performance, accessibility, and pixel-perfect design.
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 13,
                letterSpacing: "0.2em",
                color: "rgba(200,170,170,0.55)",
                marginBottom: 16,
              }}
            >
              TECHNOLOGIES
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "JavaScript (ES6+)",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "Tailwind CSS",
                "Framer Motion",
                "PostgreSQL",
                "MongoDB",
                "GraphQL",
                "Git",
              ].map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.05em",
                    padding: "5px 12px",
                    border: "1px solid rgba(139,28,46,0.3)",
                    background: "rgba(139,28,46,0.07)",
                    color: "#d8cece",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* About → Projects blend */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "120px", background: "linear-gradient(to bottom, transparent, #0d0507)", zIndex: 2 }} />
      </section>

      {/* ════════════════════════════════
          SELECTED WORK
      ════════════════════════════════ */}
      <section id="projects" className="relative z-10 py-24 px-6 md:px-10 overflow-hidden">
        {/* Flower — top left of Projects */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ top: "-20px", left: "clamp(-70px,-5vw,-15px)", width: "clamp(150px,18vw,240px)", opacity: 0.18, zIndex: 0, filter: "drop-shadow(0 0 28px rgba(139,28,46,0.65))" }}
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          whileInView={{ opacity: 0.18, scale: 1, rotate: -30 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={11} amplitude={9} rotate={-30} rotateAmp={5} style={{ width: "100%", height: "auto" }} />
        </motion.div>
        {/* Flower — bottom right of Projects */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ bottom: "-30px", right: "clamp(-70px,-5vw,-15px)", width: "clamp(160px,19vw,260px)", opacity: 0.2, zIndex: 0, filter: "drop-shadow(0 0 30px rgba(139,28,46,0.6))" }}
          initial={{ opacity: 0, scale: 0.8, rotate: 55 }}
          whileInView={{ opacity: 0.2, scale: 1, rotate: 42 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <FloatingFlower src="/flower.png" duration={9} amplitude={8} rotate={42} rotateAmp={4} style={{ width: "100%", height: "auto" }} />
        </motion.div>
        <SectionHeader number="02" title="Selected Work" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} />
          ))}
        </div>

        {/* Projects → Contact blend */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "120px", background: "linear-gradient(to bottom, transparent, #0d0507)", zIndex: 2 }} />
      </section>

      {/* ════════════════════════════════
          CONTACT PANEL
      ════════════════════════════════ */}
      <section
        id="contact"
        className="relative z-10 overflow-hidden"
        style={{ background: "#120102" }}
      >
        {/* Background flower — large, right side decoration */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            right: "-5%",
            bottom: "0%",
            width: "clamp(280px, 38vw, 560px)",
            opacity: 0.12,
            zIndex: 0,
            filter: "drop-shadow(0 0 60px rgba(139,28,46,0.8))",
          }}
          aria-hidden
        >
          <FloatingFlower
            src="/flower.png"
            duration={9}
            amplitude={8}
            rotate={20}
            rotateAmp={3}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Small flower — upper left accent */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{
            left: "-3%",
            top: "5%",
            width: "clamp(120px, 14vw, 200px)",
            opacity: 0.18,
            zIndex: 0,
            filter: "drop-shadow(0 0 30px rgba(139,28,46,0.6))",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.18, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          aria-hidden
        >
          <FloatingFlower
            src="/flower.png"
            duration={10}
            amplitude={6}
            rotate={-30}
            rotateAmp={4}
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>

        <div
          className="relative z-10 mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12"
          style={{ maxWidth: 1100 }}
        >
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 13,
              letterSpacing: "0.22em",
              color: "#c0392b",
              marginBottom: 16,
            }}
          >
            03 —
          </motion.p>

          {/* Big heading — clip reveal */}
          <div style={{ overflow: "hidden", marginBottom: 40 }}>
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(48px, 8vw, 110px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#f5eeee",
              }}
            >
              Let's Work<br />Together
            </motion.h2>
          </div>

          {/* Crimson rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: "rgba(192,57,43,0.45)",
              transformOrigin: "left",
              marginBottom: 40,
            }}
          />

          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
            {/* Left column */}
            <div className="flex-1">
              {/* Bordered text box */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{
                  border: "1px solid rgba(192,57,43,0.35)",
                  padding: "22px 26px",
                  marginBottom: 32,
                  maxWidth: 420,
                  background: "rgba(192,57,43,0.06)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(13px, 1.05vw, 15px)",
                    lineHeight: 1.8,
                    color: "rgba(240,235,232,0.78)",
                  }}
                >
                  Want a unique website built from scratch or a redesign of an
                  existing project?
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(13px, 1.05vw, 15px)",
                    lineHeight: 1.8,
                    color: "rgba(240,235,232,0.78)",
                    marginTop: 10,
                  }}
                >
                  Write to me and together we'll create a unique solution for
                  your business.
                </p>
              </motion.div>

              {/* LinkedIn QR */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex items-start gap-5"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    style={{
                      padding: 10,
                      background: "rgba(192,57,43,0.08)",
                      border: "1px solid rgba(192,57,43,0.3)",
                      width: 122,
                      height: 122,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {linkedinQR ? (
                      <img
                        src={linkedinQR}
                        alt="LinkedIn QR code"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          background: "rgba(192,57,43,0.05)",
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(240,235,232,0.4)",
                    }}
                  >
                    LinkedIn
                  </p>
                </div>
              </motion.div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,235,232,0.35)",
                  letterSpacing: "0.08em",
                  marginTop: 8,
                }}
              >
                linkedin: linkedin.com/in/ayesha-saifi-5453bb392/
              </p>
            </div>

            {/* Right column — photo + name + flower accent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-4 md:mt-auto md:ml-auto"
            >
             
              {/* Circular photo */}
              <div
                style={{
                  width: "clamp(250px, 16vw, 300px)",
                  height: "clamp(250px, 16vw, 300px)",
                  borderRadius: "100%",
                  border: "1.5px solid rgba(192,57,43,0.4)",
                  background: "radial-gradient(circle, rgba(192,57,43,0.1) 0%, rgba(13,5,7,0.5) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/me.png"
                  alt="Profile"
                  style={{
                    width: "165%",
                    height: "165%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(18px, 2vw, 26px)",
                  letterSpacing: "0.28em",
                  color: "rgba(240,235,232,0.65)",
                }}
              >
                AYESHA
              </p>

              <a
                href="mailto:ayeshaas281@gmail.com"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(192,57,43,0.8)",
                  letterSpacing: "0.05em",
                }}
              >
                ayeshaas281@gmail.com
                <ArrowUpRight size={12} />
              </a>

              {/* ── Download Resume button ── */}
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 mt-2"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.22em",
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #c0392b, #8b1c2e)",
                  color: "#f5eeee",
                  textDecoration: "none",
                  border: "1px solid rgba(192,57,43,0.5)",
                  boxShadow: "0 4px 20px rgba(192,57,43,0.35)",
                  cursor: "pointer",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                DOWNLOAD RESUME
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Footer strip */}
        <div
          className="relative z-10 flex justify-between items-center px-6 md:px-10 py-5"
          style={{ borderTop: "1px solid rgba(192,57,43,0.18)" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: "rgba(240,235,232,0.25)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            linkedin.com/in/ayesha-saifi-5453bb392
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: "rgba(240,235,232,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()} Ayesha
          </p>
        </div>
      </section>
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader({ number, title }: { number: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <p
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 13,
          letterSpacing: "0.22em",
          color: "#c0392b",
          marginBottom: 8,
        }}
      >
        {number} —
      </p>
      <div className="flex items-end gap-6">
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 64px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
        <div
          className="flex-1 mb-1"
          style={{ height: 1, background: "rgba(139,28,46,0.3)" }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Project card ─── */
const projects = [
  {
    num: "01",
    title: "Weather Forecast App",
    desc: "Real-time weather application with location-based forecasts, temperature trends, and dynamic weather icons using API integration.",
    tags: ["React", "OpenWeather API", "CSS", "Geolocation"],
    link: "https://weather-app-project-e2wp.onrender.com",
  },
  {
    num: "02",
    title: "Netflix Clone",
    desc: "Responsive streaming UI with dynamic movie browsing, category-based rows, and API-driven content fetching for real-time updates.",
    tags: ["React", "TMDB API", "CSS", "Firebase"],
    link: "https://netflix-clone-gk2t.onrender.com/",
  },
  {
    num: "03",
    title: "Fashion E-Commerce Website",
    desc: "Modern online fashion store with product filtering, cart management, and seamless checkout experience with responsive UI design.",
    tags: ["Next.js", "Stripe", "Tailwind", "MongoDB"],
    link: "https://fashion-web-gxke.onrender.com",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group relative flex flex-col"
      style={{
        border: "1px solid rgba(139,28,46,0.22)",
        background: "rgba(139,28,46,0.04)",
        padding: "32px 28px",
        cursor: "pointer",
        transition: "border-color 0.3s",
      }}
      whileHover={{
        borderColor: "rgba(192,57,43,0.5)",
        background: "rgba(192,57,43,0.07)",
      }}
    >
      {/* Ghost number */}
      <span
        aria-hidden
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 80,
          lineHeight: 0.8,
          color: "transparent",
          WebkitTextStroke: "1px rgba(192,57,43,0.22)",
          position: "absolute",
          top: 16,
          right: 20,
          userSelect: "none",
        }}
      >
        {project.num}
      </span>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(20px, 2.2vw, 28px)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          marginBottom: 14,
          color: "#f0ebe8",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          lineHeight: 1.75,
          color: "rgba(200,170,170,0.7)",
          flexGrow: 1,
          marginBottom: 20,
        }}
      >
        {project.desc}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              letterSpacing: "0.06em",
              padding: "3px 10px",
              border: "1px solid rgba(192,57,43,0.3)",
              color: "rgba(200,170,170,0.65)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:gap-3 transition-all"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 13,
          letterSpacing: "0.2em",
          color: "#c0392b",
        }}
      >
        VIEW LIVE <ArrowUpRight size={13} />
      </a>
    </motion.div>
  );
}
