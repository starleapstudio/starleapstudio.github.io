(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-solid", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const reveals = document.querySelectorAll(".reveal");
  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* —— Hero：深色品牌氛围 —— */
  const heroCanvas = document.getElementById("hero-canvas");
  if (heroCanvas) {
    const ctx = heroCanvas.getContext("2d", { alpha: false });
    let w = 0;
    let h = 0;
    let dpr = 1;
    let t0 = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = heroCanvas.clientWidth;
      h = heroCanvas.clientHeight;
      heroCanvas.width = Math.floor(w * dpr);
      heroCanvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const t = (now - t0) / 1000;
      ctx.fillStyle = "#080A12";
      ctx.fillRect(0, 0, w, h);

      const blobs = [
        { x: 0.72, y: 0.22, r: 0.42, c: [124, 77, 255], a: 0.28 },
        { x: 0.22, y: 0.55, r: 0.36, c: [32, 217, 255], a: 0.14 },
        { x: 0.55, y: 0.7, r: 0.3, c: [75, 123, 245], a: 0.12 },
      ];

      blobs.forEach((b, i) => {
        const px = w * b.x + Math.sin(t * 0.28 + i) * 36;
        const py = h * b.y + Math.cos(t * 0.22 + i * 1.3) * 28;
        const r = Math.max(w, h) * b.r;
        const g = ctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a})`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Soft starfield
      for (let i = 0; i < 48; i++) {
        const x = ((i * 97 + t * (6 + (i % 5))) % (w + 20)) - 10;
        const y = (i * 53) % h;
        const a = 0.15 + (i % 4) * 0.08;
        ctx.fillStyle = `rgba(228, 230, 239, ${a})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      if (!prefersReduced) requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now());
    window.addEventListener("resize", () => {
      resize();
      if (prefersReduced) draw(performance.now());
    });
  }

  /* —— Showcase 类型预览 —— */
  const scenes = {
    scene: {
      title: "Nebula Drift",
      sub: "场景 · CSF 图层与特效",
      paint(ctx, w, h, t) {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#0b0618");
        g.addColorStop(0.5, "#12182e");
        g.addColorStop(1, "#071018");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < 3; i++) {
          const px = w * (0.3 + i * 0.2) + Math.sin(t * 0.4 + i) * 30;
          const py = h * (0.35 + i * 0.1);
          const orb = ctx.createRadialGradient(px, py, 0, px, py, 140 + i * 40);
          orb.addColorStop(0, i === 1 ? "rgba(32,217,255,0.28)" : "rgba(124,77,255,0.3)");
          orb.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = orb;
          ctx.beginPath();
          ctx.arc(px, py, 160 + i * 30, 0, Math.PI * 2);
          ctx.fill();
        }

        // Parallax cloud bands (Scroll feel)
        for (let i = 0; i < 5; i++) {
          const x = ((t * (12 + i * 4) + i * 80) % (w + 120)) - 60;
          ctx.fillStyle = `rgba(196, 181, 253, ${0.04 + i * 0.015})`;
          ctx.beginPath();
          ctx.ellipse(x, h * 0.62 + i * 12, 90 + i * 20, 16, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      },
    },
    video: {
      title: "Aurora Depths",
      sub: "视频 · MPV 渲染",
      paint(ctx, w, h, t) {
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "#041520");
        g.addColorStop(0.55, "#0a3a4a");
        g.addColorStop(1, "#020810");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < 8; i++) {
          const y = h * (0.2 + i * 0.08) + Math.sin(t * 0.7 + i) * 10;
          const band = ctx.createLinearGradient(0, y, w, y + 40);
          band.addColorStop(0, "rgba(32,217,255,0)");
          band.addColorStop(0.5, `rgba(${60 + i * 20},${180 - i * 10},220,${0.08 + (i % 3) * 0.03})`);
          band.addColorStop(1, "rgba(124,77,255,0)");
          ctx.fillStyle = band;
          ctx.fillRect(0, y, w, 36);
        }
      },
    },
    audio: {
      title: "Spectrum",
      sub: "音频可视化 · 频谱响应",
      paint(ctx, w, h, t) {
        ctx.fillStyle = "#080A12";
        ctx.fillRect(0, 0, w, h);

        const bars = 48;
        const gap = 4;
        const bw = (w - gap * (bars + 1)) / bars;
        for (let i = 0; i < bars; i++) {
          const n =
            0.25 +
            0.55 * Math.abs(Math.sin(t * 2.2 + i * 0.35)) *
              (0.5 + 0.5 * Math.sin(t * 1.1 + i * 0.15));
          const bh = h * 0.55 * n;
          const x = gap + i * (bw + gap);
          const y = h * 0.72 - bh;
          const grad = ctx.createLinearGradient(x, y + bh, x, y);
          grad.addColorStop(0, "#7C4DFF");
          grad.addColorStop(1, "#20D9FF");
          ctx.fillStyle = grad;
          ctx.fillRect(x, y, bw, bh);
        }
      },
    },
    particle: {
      title: "Sakura Rise",
      sub: "粒子 · Emitter / Operator",
      paint(ctx, w, h, t) {
        ctx.fillStyle = "#0c101c";
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < 60; i++) {
          const life = (t * 0.35 + i * 0.17) % 1;
          const x = ((i * 89) % w) + Math.sin(t + i) * 18;
          const y = h + 20 - life * (h + 60);
          const s = 2 + (i % 4);
          ctx.fillStyle = `rgba(244, 180, 200, ${0.55 - life * 0.4})`;
          ctx.beginPath();
          ctx.ellipse(x, y, s * 1.4, s, life * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }

        const glow = ctx.createRadialGradient(w * 0.5, h * 0.85, 0, w * 0.5, h * 0.85, 200);
        glow.addColorStop(0, "rgba(124,77,255,0.18)");
        glow.addColorStop(1, "rgba(124,77,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.85, 200, 0, Math.PI * 2);
        ctx.fill();
      },
    },
  };

  const stageCanvas = document.getElementById("showcase-canvas");
  const stageLabel = document.getElementById("showcase-label");
  const stageSub = document.getElementById("showcase-sub");
  const tabs = document.querySelectorAll(".showcase-tab");
  let activeKey = "scene";
  let stageT0 = performance.now();

  const paintStage = (now) => {
    if (!stageCanvas) return;
    const ctx = stageCanvas.getContext("2d", { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = stageCanvas.clientWidth;
    const h = stageCanvas.clientHeight;
    if (stageCanvas.width !== Math.floor(w * dpr) || stageCanvas.height !== Math.floor(h * dpr)) {
      stageCanvas.width = Math.floor(w * dpr);
      stageCanvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    scenes[activeKey].paint(ctx, w, h, (now - stageT0) / 1000);
    if (!prefersReduced) requestAnimationFrame(paintStage);
  };

  const setScene = (key) => {
    if (!scenes[key]) return;
    activeKey = key;
    if (stageLabel) stageLabel.textContent = scenes[key].title;
    if (stageSub) stageSub.textContent = scenes[key].sub;
    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.scene === key));
    });
    stageT0 = performance.now();
    if (prefersReduced) paintStage(performance.now());
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setScene(tab.dataset.scene));
  });

  if (stageCanvas) {
    setScene(activeKey);
    paintStage(performance.now());
    window.addEventListener("resize", () => {
      if (prefersReduced) paintStage(performance.now());
    });
  }

  const ua = navigator.userAgent;
  const isMac = /Mac|iPhone|iPad|iPod/.test(ua);
  const winBtn = document.getElementById("download-windows");
  const macBtn = document.getElementById("download-mac");
  if (isMac && macBtn) macBtn.classList.add("is-preferred");
  if (!isMac && winBtn) winBtn.classList.add("is-preferred");
})();
