(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Copy email template
  const copyBtn = document.getElementById("copyBtn");
  const status = document.getElementById("copyStatus");

  function buildEmailText() {
    const name = (document.getElementById("name")?.value || "").trim();
    const topic = document.getElementById("topic")?.value || "Property management inquiry";
    const msg = (document.getElementById("message")?.value || "").trim();

    const greeting = name ? `Hi Brian, my name is ${name}.` : `Hi Brian,`;
    const body = msg ? msg : `I’m reaching out regarding ${topic.toLowerCase()}.`;
    return `${greeting}

Topic: ${topic}

${body}

Thanks,
${name || "[Brian Tran]"}
[2672665811]`;
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text = buildEmailText();
      const ok = await copyToClipboard(text);
      if (status) status.textContent = ok ? "Copied! Paste into an email to send." : "Couldn’t copy—please select and copy manually.";
    });
  }
})();
