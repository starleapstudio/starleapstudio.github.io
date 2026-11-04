(() => {
  const WALLPAPERS = [
    { title: "星云漂流", img: "assets/wallpapers/01-nebula.svg" },
    { title: "霓虹都市", img: "assets/wallpapers/02-city.svg" },
    { title: "极光深处", img: "assets/wallpapers/03-aurora.svg" },
    { title: "樱雨", img: "assets/wallpapers/04-sakura.svg" },
    { title: "山雾", img: "assets/wallpapers/05-mountain.svg" },
    { title: "频谱律动", img: "assets/wallpapers/06-spectrum.svg" },
  ];

  /* —— Nav —— */
  const nav = document.querySelector(".site-nav");
  const onScroll = () => nav && nav.classList.toggle("is-solid", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* —— Hero carousel —— */
  const shot = document.getElementById("hero-shot");
  const dots = document.getElementById("hero-dots");
  let index = 0;
  let timer = 0;

  const renderDots = () => {
    if (!dots) return;
    dots.innerHTML = WALLPAPERS.map(
      (_, i) =>
        `<button type="button" role="tab" aria-label="预览 ${i + 1}" aria-selected="${i === index}"></button>`
    ).join("");
    [...dots.children].forEach((btn, i) => {
      btn.addEventListener("click", () => show(i, true));
    });
  };

  const show = (i, manual = false, instant = false) => {
    index = (i + WALLPAPERS.length) % WALLPAPERS.length;
    const item = WALLPAPERS[index];
    if (shot) {
      const apply = () => {
        shot.src = item.img;
        shot.alt = item.title;
        shot.style.opacity = "1";
        shot.style.transform = "scale(1)";
      };
      if (instant || !shot.src) {
        apply();
      } else {
        shot.style.opacity = "0";
        shot.style.transform = "scale(1.03)";
        window.setTimeout(apply, 160);
      }
    }
    renderDots();
    if (manual) restartAuto();
  };

  const restartAuto = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => show(index + 1), 4200);
  };

  document.querySelectorAll(".stage-arrow").forEach((btn) => {
    btn.addEventListener("click", () => {
      show(index + Number(btn.dataset.dir), true);
    });
  });

  show(0, false, true);
  restartAuto();

  /* —— Gallery —— */
  const grid = document.getElementById("gallery-grid");
  if (grid) {
    grid.innerHTML = WALLPAPERS.map(
      (item, i) => `
      <button class="wp-card" type="button" data-index="${i}" aria-label="预览 ${item.title}">
        <img src="${item.img}" alt="${item.title}" loading="lazy" />
        <div class="wp-card__play" aria-hidden="true"><span>▶</span></div>
        <div class="wp-card__title">${item.title}</div>
      </button>`
    ).join("");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".wp-card");
      if (!card) return;
      const i = Number(card.dataset.index);
      show(i, true);
      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* —— 公开 Releases（私有源码仓无法给外部下载） —— */
  // 有独立安装包文件名后，把 windows/mac 换成
  // .../releases/download/<tag>/Clover-Windows-x64.exe 等形式即可一键下文件。
  const RELEASES = {
    latest: "https://github.com/starleapstudio/starleapstudio.github.io/releases/latest",
    windows: "https://github.com/starleapstudio/starleapstudio.github.io/releases/latest",
    mac: "https://github.com/starleapstudio/starleapstudio.github.io/releases/latest",
  };

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  const prefer = isMac ? RELEASES.mac : RELEASES.windows;

  const bindDownload = (el, href, preferred) => {
    if (!el) return;
    el.href = href;
    el.target = "_blank";
    if (!preferred) return;
    el.classList.add("btn--primary");
    el.classList.remove("btn--dark");
  };

  const win = document.getElementById("download-windows");
  const mac = document.getElementById("download-mac");
  const winFoot = document.getElementById("footer-download-windows");
  const macFoot = document.getElementById("footer-download-mac");
  const navDl = document.getElementById("nav-download");

  bindDownload(win, RELEASES.windows, !isMac);
  bindDownload(mac, RELEASES.mac, isMac);
  bindDownload(winFoot, RELEASES.windows, !isMac);
  bindDownload(macFoot, RELEASES.mac, isMac);

  if (win && isMac) {
    win.classList.add("btn--dark");
    win.classList.remove("btn--primary");
  }
  if (mac && !isMac) {
    mac.classList.add("btn--dark");
    mac.classList.remove("btn--primary");
  }
  if (winFoot && isMac) {
    winFoot.classList.add("btn--dark");
    winFoot.classList.remove("btn--primary");
  }
  if (macFoot && !isMac) {
    macFoot.classList.add("btn--dark");
    macFoot.classList.remove("btn--primary");
  }

  // 顶栏「下载」：当前系统对应包，一次点击直达 Releases（不再先滚到页内）
  if (navDl) {
    navDl.href = prefer;
    navDl.target = "_blank";
    navDl.rel = "noopener noreferrer";
  }
})();
