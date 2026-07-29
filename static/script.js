document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
       CARD REVEAL
    ========================================== */

  const cards = document.querySelectorAll(".animate-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation =
              "fadeUp .7s cubic-bezier(.22,1,.36,1) forwards";
          }, index * 120);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  cards.forEach((card) => observer.observe(card));

  /* ==========================================
       ALERT AUTO CLOSE
    ========================================== */

  document.querySelectorAll(".alert").forEach((alert) => {
    setTimeout(() => {
      alert.style.opacity = "0";

      alert.style.transform = "translateY(-15px)";

      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 3500);
  });

  /* ==========================================
       BALANCE COUNTER
    ========================================== */

  const balance = document.querySelector(".balance-number");

  if (balance) {
    const original = balance.textContent;

    const number = Number(original.replace(/[^\d]/g, ""));

    let current = 0;

    const duration = 1000;

    const fps = 60;

    const increment = number / (duration / (1000 / fps));

    const counter = setInterval(() => {
      current += increment;

      if (current >= number) {
        current = number;

        clearInterval(counter);
      }

      balance.textContent = "Rp " + Math.floor(current).toLocaleString("id-ID");
    }, 1000 / fps);
  }

  /* ==========================================
       RIPPLE BUTTON
    ========================================== */

  document.querySelectorAll("button").forEach((button) => {
    button.style.position = "relative";

    button.style.overflow = "hidden";

    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");

      const size = Math.max(
        this.offsetWidth,

        this.offsetHeight,
      );

      ripple.style.width = size + "px";

      ripple.style.height = size + "px";

      ripple.style.position = "absolute";

      ripple.style.borderRadius = "50%";

      ripple.style.background = "rgba(255,255,255,.35)";

      ripple.style.left = e.offsetX - size / 2 + "px";

      ripple.style.top = e.offsetY - size / 2 + "px";

      ripple.style.pointerEvents = "none";

      ripple.style.transform = "scale(0)";

      ripple.style.transition = "transform .6s ease, opacity .6s ease";

      this.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = "scale(4)";

        ripple.style.opacity = "0";
      });

      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });

  /* ==========================================
       INPUT FOCUS
    ========================================== */

  document.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
    });
  });

  /* ==========================================
       TABLE HOVER
    ========================================== */

  document.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("mouseenter", () => {
      row.style.transform = "translateX(6px)";
    });

    row.addEventListener("mouseleave", () => {
      row.style.transform = "translateX(0px)";
    });
  });

  /* ==========================================
       PARALLAX HERO
    ========================================== */

  const hero = document.querySelector(".hero");

  window.addEventListener("mousemove", (e) => {
    if (!hero) return;

    const x = (window.innerWidth / 2 - e.clientX) / 60;

    const y = (window.innerHeight / 2 - e.clientY) / 60;

    hero.style.transform = `translate(${x}px, ${y}px)`;
  });

  /* ==========================================
       NAV SHADOW ON SCROLL
    ========================================== */

  window.addEventListener("scroll", () => {
    const card = document.querySelector(".balance-card");

    if (!card) return;

    if (window.scrollY > 20) {
      card.style.boxShadow = "0 35px 80px rgba(0,0,0,.55)";
    } else {
      card.style.boxShadow = "";
    }
  });

  /* ==========================================
       BUTTON HOVER SCALE
    ========================================== */

  document
    .querySelectorAll(".btn-submit,.btn-update,.btn-edit,.btn-delete")
    .forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-3px) scale(1.02)";
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });

  /* ==========================================
       FLOATING BACKGROUND
    ========================================== */

  const blur1 = document.querySelector(".blur-1");

  const blur2 = document.querySelector(".blur-2");

  window.addEventListener("mousemove", (e) => {
    if (blur1) {
      blur1.style.transform = `translate(${e.clientX * 0.015}px,${e.clientY * 0.015}px)`;
    }

    if (blur2) {
      blur2.style.transform = `translate(${-e.clientX * 0.01}px,${-e.clientY * 0.01}px)`;
    }
  });
});
