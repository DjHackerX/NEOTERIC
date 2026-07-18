/* =========================================================
   NEOTERIC — app.js
   Vue 3 app powering site-wide interactivity:
   nav, mobile menu, back-to-top, bulb tips, scroll progress,
   animated stats, track picker + tilt hero, feature spotlight,
   countdown, contact form, gallery (filter + lightbox),
   team (tabs + flip cards).
   ========================================================= */

const { createApp } = Vue;

createApp({
  data() {
    return {
      // ---------- chrome ----------
      scrolled: false,
      scrollY: 0,
      scrollProgress: 0,
      menuOpen: false,

      // ---------- lights-off mode (toggled by the big hero bulb) ----------
      lightsOff: localStorage.getItem("neoteric-lights-off") === "1",

      // ---------- bulb widget ----------
      bulbShow: false,
      bulbQuote: "Every startup began as someone's crazy idea.",
      bulbQuotes: [
        "Every startup began as someone's crazy idea.",
        "Ideas are cheap. Execution is everything.",
        "The best time to start was yesterday. The next best time is now.",
        "Innovation distinguishes between a leader and a follower.",
        "Fail fast, learn faster.",
        "Your network is your net worth — build it early.",
        "A prototype is worth a thousand pitch decks.",
        "Curiosity is the spark. Discipline is the current.",
        "Great teams ship rough drafts, not perfect plans.",
        "Talk to your users before you write a line of code."
      ],

      // ---------- hero stat counters ----------
      heroStats: [
        { key: "funding", prefix: "₹", target: 6000, suffix: " Cr+", current: 0, label: "TOTAL STARTUP FUNDINGS" },
        { key: "startups", prefix: "", target: 8000, suffix: "+", current: 0, label: "STARTUPS SUPPORTED" },
        { key: "summits", prefix: "", target: 3, suffix: "+", current: 0, label: "SUMMITS/YEAR" }
      ],

      // ---------- track picker (vivo-style "colorway" swatches) ----------
      // Data-driven pathway schema — same shape as galleryItems below.
      // To add a new pathway (new chip + description panel + site-wide accent
      // theme), just push another object here. Zero HTML changes required:
      // index.html renders chips and the description panel purely via v-for.
      activeTrack: "build",
      tracks: [
        {
          id: "build", label: "Build", icon: "bi-rocket-takeoff-fill",
          desc: "Prototype hardware, software, or both — turn a rough sketch into something that actually works.",
          theme: { yellow: "#FFD400", deep: "#E6BE00", glow: "#FFE666" }
        },
        {
          id: "design", label: "Design", icon: "bi-palette-fill",
          desc: "Shape how people experience the product — from wireframe to an interface people love to use.",
          theme: { yellow: "#38BDF8", deep: "#0EA5E9", glow: "#7DD3FC" }
        },
        {
          id: "connect", label: "Connect", icon: "bi-people-fill",
          desc: "Pitch your prototype, meet mentors, and build the relationships that turn a project into a venture.",
          theme: { yellow: "#FB7185", deep: "#E11D48", glow: "#FDA4AF" }
        }
      ],

      // ---------- hero tilt ----------
      tilt: { x: 0, y: 0 },

      // ---------- about / feature spotlight ----------
      activeFeature: null,
      features: [
        { id: "startup", icon: "bi-rocket-takeoff-fill", title: "Startup Support",
          short: "Idea validation, incubation guidance, and go-to-market help.",
          long: "From your first idea to your first customer — we help you validate assumptions, connect with the right incubation programs, and shape a go-to-market plan that fits a student budget." },
        { id: "funding", icon: "bi-cash-coin", title: "Funding Opportunities",
          short: "Access to KSUM grants, seed support, and pitch competitions.",
          long: "NEOTERIC is your direct line to Kerala Startup Mission grants, seed funding tracks, and campus pitch competitions — real money for real prototypes." },
        { id: "mentorship", icon: "bi-person-workspace", title: "Mentorship",
          short: "1:1 guidance from faculty coordinators and industry mentors.",
          long: "Get matched with a faculty coordinator and an industry mentor who'll actually review your deck, read your code, and tell you the truth." },
        { id: "workshops", icon: "bi-tools", title: "Workshops",
          short: "Hands-on sessions in AI, IoT, design, and product thinking.",
          long: "Regular hands-on labs in AI/ML, IoT, UI/UX, and product thinking — taught by seniors, alumni, and the occasional very patient faculty member." },
        //{ id: "hackathons", icon: "bi-cpu-fill", title: "Hackathons",
          //short: "Build-in-a-weekend sprints that turn concepts into demos.",
          //long: "A weekend, a team, and a deadline. Our hackathons compress months of \"someday\" into 48 hours of \"shipped.\"" },
        { id: "network", icon: "bi-diagram-3-fill", title: "Industry Networking",
          short: "Direct lines to founders, alumni, and hiring partners.",
          long: "We keep our alumni and industry network close, so your next internship, co-founder, or hire could be one NEOTERIC event away." }
      ],

      // ---------- countdown ----------
      ideathonDate: new Date("2026-07-14T12:00:00"),
      countdown: { days: "00", hours: "00", mins: "00", secs: "00" },
      countdownTimer: null,

      // ---------- contact form ----------
      contact: {
        name: "",
        email: "",
        department: "",
        semester: "",
        phone: ""
      },
      contactSending: false,
      contactSent: false,

      // ---------- gallery ----------
      galleryFilter: "all",
      lightboxItem: null,
      filters: [
        { id: "all", label: "All" },
        { id: "events", label: "Events" },
        { id: "competitions", label: "Competitions" }
      ],
      
      galleryItems: [
  {
    image: "images/gallery/introduction.jpeg",
    category: "events",
    tag: "Event",
    title: "NEOTERIC Induction Program",
    desc: "Introduction session for aspiring innovators and entrepreneurs.",
    date: "2025"
  },
  {
    image: "images/gallery/we-all.jpeg",
    //category: "events",
    //tag: "Event",
    title: "NEOTERIC Team ",
    desc: "The complete team coming together for the journey ahead.",
    date: "2025"
  },
  {
    image: "images/gallery/kasergodSummit2k25.HEIC",
    category: "events",
    tag: "Event",
    title: "IEDC Summit 2025",
    desc: "NEOTERIC representatives at IEDC Summit 2025, Kasaragod.",
    date: "2025"
  },
  {
    image: "images/gallery/kasergodSummit2k251.jpeg",
    category: "events",
    tag: "Event",
    title: "IEDC Summit Moments",
    desc: "Memories and networking moments from the summit.",
    date: "2025"
  },
  {
    image: "images/gallery/2025kasergodSummitSidharithFinalRound.jpeg",
    category: "competitions",
    tag: "Competition",
    title: "Final Round Presentation",
    desc: "Sidharth enters the final round with one of the Top 5 ideas across Kerala — a remarkable achievement and a testament to innovation, creativity, and vision.",
    date: "2025"
  },
  {
    image: "images/gallery/groupTKM.jpeg",
    category: "competitions",
    tag: "Competition",
    title: "TKM Innovation Visit",
    desc: "NEOTERIC Team with TKM IEDC members  ",
    date: "2025"
  },
  {
    image: "images/gallery/groupTKM2.jpeg",
    category: "competitions",
    tag: "Competition",
    title: "OffScript Innovex Team",
    desc: "NEOTERIC members representing the college at Innovex.",
    date: "2025"
  },
  {
    image: "images/gallery/innovexTKM1st.jpg",
    category: "competitions",
    tag: "Competition",
    title: "Innovex Champions",
    desc: "Winning first place at OffScript hosted by TKM.",
    date: "2025"
  }
],

      // ---------- team ----------
      teamGroup: "all",
      flippedId: null,
      flippingId: null, // guards against rapid multi-tap double-flips
      teamTabs: [
      { id: "all", label: "All" },
      { id: "leadership", label: "Leadership" },
      { id: "core", label: "Core Team" },
      { id: "colead", label: "Co-Leads" }
    ],
      teamMembers: [// Co-CEOs
// Leadership
// =======================
// LEADERSHIP
// =======================

{
  id: "asm",
  initials: "AM",
  name: "Akhil S Mohan",
  role: "Nodal Officer",
  group: "leadership",
  fact: "Faculty mentor guiding the IEDC chapter.",
  socials: []
},

{
  id: "nt",
  initials: "NT",
  name: "Neethu",
  role: "Assistant Nodal Officer",
  group: "leadership",
  fact: "Supports the Nodal Officer in coordinating IEDC activities.",
  socials: []
},

{
  id: "al",
  initials: "AL",
  name: "Allen Lawrence",
  role: "Student Lead I",
  group: "leadership",
  quote: "Innovation thrives through collaboration.",
  fact: "Leads the student executive committee and chapter initiatives.",
  socials: ["bi-instagram"],
  instagram: "_me_allen_"
},

{
  id: "kp",
  initials: "KP",
  name: "Kavya P Binoy",
  role: "Student Lead II",
  group: "leadership",
  quote: "Leadership is about turning ideas into impact.",
  fact: "Co-leads the student executive committee and promotes inclusive leadership.",
  socials: ["bi-instagram"],
  instagram: "alienfrommarzs"
},// =======================
// CORE TEAM
// =======================

// Deputy Student Lead
{
  id: "jt",
  initials: "JT",
  name: "Joshua T Jose",
  role: "Deputy Student Lead",
  group: "core",
  fact: "Coordinates all Co-Leads and supports the Student Leads in managing chapter activities.",
  socials: ["bi-instagram"],
  instagram: "lens_of_jojo_08"
},

// =======================
// LEADS
// =======================

{
  id: "tz",
  initials: "TZ",
  name: "Thanzeem",
  role: "Technology Lead",
  group: "core",
  fact: "Leads technical projects, workshops, and product development.",
  socials: ["bi-instagram"],
  instagram: "sliceof.thnzm"
},

{
  id: "am",
  initials: "AM",
  name: "Amrdesh Krishna",
  role: "Quality & Operations Lead",
  group: "core",
  fact: "Oversees operational planning, quality assurance, and execution.",
  socials: ["bi-instagram"],
  instagram: "_.amrudesh._"
},

{
  id: "ab",
  initials: "AS",
  name: "Abdul Salam",
  role: "Finance Lead",
  group: "core",
  fact: "Manages budgeting, finance, and resource allocation.",
  socials: ["bi-instagram"],
  instagram: "gallaha.d"
},

{
  id: "eb",
  initials: "EB",
  name: "Edwin B",
  role: "Creative & Innovation Lead",
  group: "core",
  fact: "Leads creative direction, branding, design, and innovation initiatives.",
  socials: ["bi-instagram"],
  instagram: "edwin_b_maliyekkal"
},

{
  id: "ak",
  initials: "AK",
  name: "Ananthakrishnan",
  role: "Branding & Marketing Lead",
  group: "core",
  fact: "Leads branding, marketing, outreach, and promotional campaigns.",
  socials: ["bi-instagram"],
  instagram: "___ananthakrishnan"
},

{
  id: "jj",
  initials: "JJ",
  name: "Jino Joy",
  role: "Community Lead",
  group: "core",
  fact: "Builds community engagement and member relations.",
  socials: ["bi-instagram"],
  instagram: "jawan_scientist"
},
/*
{
  id: "lv",
  initials: "LV",
  name: "Lakshmi V A",
  role: "Women Entrepreneurship Lead",
  group: "core",
  fact: "Promotes women entrepreneurship and leadership initiatives.",
  socials: []
},
*/
{
  id: "nk",
  initials: "NK",
  name: "Nandana K",
  role: "Women Entrepreneurship Lead",
  group: "core",
  fact:"Promotes women entrepreneurship and leadership initiatives.",
  socials: []
},
{
  id: "se",
  initials: "SE",
  name: "Sidharth E",
  role: "IPR & Research Lead",
  group: "core",
  fact: "Leads research, intellectual property, and innovation support.",
  socials: ["bi-instagram"],
  instagram: "sid_ha6th"
},

// =======================
// CO-LEADS
// =======================

{
  id: "aka",
  initials: "AK",
  name: "Aman Krishna K A",
  role: "Co-Lead - Executive",
  group: "core",
  fact: "Supports executive planning and chapter coordination.",
  socials: []
},

{
  id: "sl",
  initials: "SL",
  name: "Swathy Lakshmi V C",
  role: "Co-Lead - Executive",
  group: "core",
  fact: "Supports executive planning and chapter coordination.",
  socials: []
},

{
  id: "aaa",
  initials: "AA",
  name: "Anay A Anil",
  role: "Co-Lead - Technology",
  group: "core",
  fact: "Supports technical initiatives and workshops.",
  socials: []
},

{
  id: "hes",
  initials: "HE",
  name: "Haripriya E S",
  role: "Co-Lead - Technology",
  group: "core",
  fact: "Supports technical development and implementation.",
  socials: []
},

{
  id: "asj",
  initials: "AS",
  name: "Abhinandha S J",
  role: "Co-Lead - Quality & Operations",
  group: "core",
  fact: "Supports operations and event execution.",
  socials: []
},

{
  id: "rv",
  initials: "RV",
  name: "Remya V R",
  role: "Co-Lead - Finance",
  group: "core",
  fact: "Supports budgeting and finance management.",
  socials: []
},

{
  id: "hk",
  initials: "HK",
  name: "Hisana K H",
  role: "Co-Lead - Branding & Marketing",
  group: "core",
  fact: "Supports branding and promotional campaigns.",
  socials: []
},

{
  id: "ses",
  initials: "SE",
  name: "Sriya E S",
  role: "Co-Lead - Community",
  group: "core",
  fact: "Supports community engagement and communications.",
  socials: []
},

{
  id: "ahl",
  initials: "AK",
  name: "Ahlad K A",
  role: "Co-Lead - Social Media",
  group: "core",
  fact: "Supports digital content creation and social media engagement.",
  socials: []
},


]
    };
  },

  computed: {
    currentTrack() {
      return this.tracks.find(t => t.id === this.activeTrack) || this.tracks[0];
    },
    tiltStyle() {
      const { x, y } = this.tilt;
      return { transform: `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)` };
    },
    orbitGlowStyle() {
      return { boxShadow: `0 0 0 1px rgba(255,255,255,.09) inset, 0 30px 80px -20px ${this.currentTrack.theme.yellow}55` };
    },
    bulbTintStyle() {
      return { filter: `drop-shadow(0 0 40px ${this.currentTrack.theme.yellow}88)` };
    },
    filteredGallery() {
      if (this.galleryFilter === "all") return this.galleryItems;
      return this.galleryItems.filter(i => i.category === this.galleryFilter);
    },
    filteredTeam() {
      if (this.teamGroup === "all") return this.teamMembers;
      return this.teamMembers.filter(m => m.group === this.teamGroup);
    },
    leadershipMembers() {
      return this.teamMembers.filter(m => m.group === "leadership");
    },
    coreMembers() {
      return this.teamMembers.filter(m => m.group === "core");
    }
  },

  watch: {
    activeTrack: {
      immediate: true,
      handler(id) { this.applyTheme(id); }
    }
  },

  methods: {
    // ---------- scroll / chrome ----------
    onScroll() {
      this.scrollY = window.scrollY;
      this.scrolled = this.scrollY > 40;
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      this.scrollProgress = Math.min(100, Math.max(0, (this.scrollY / max) * 100));
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    closeMenu() {
      this.menuOpen = false;
    },

    // ---------- lights-off mode ----------
    toggleLights() {
      this.lightsOff = !this.lightsOff;
      localStorage.setItem("neoteric-lights-off", this.lightsOff ? "1" : "0");
      document.documentElement.classList.toggle("lights-off", this.lightsOff);
    },

    // ---------- bulb ----------
    showBulbQuote() {
      this.bulbQuote = this.bulbQuotes[Math.floor(Math.random() * this.bulbQuotes.length)];
      this.bulbShow = true;
    },
    toggleBulb() {
      this.bulbShow ? (this.bulbShow = false) : this.showBulbQuote();
    },
    onDocClick(e) {
      const tip = this.$refs.bulbTip;
      const btn = this.$refs.bulbBtn;
      if (this.bulbShow && tip && !tip.contains(e.target) && btn && !btn.contains(e.target)) {
        this.bulbShow = false;
      }
    },

    // ---------- stat counters ----------
    animateStats() {
      const duration = 1300;
      const start = performance.now();
      const targets = this.heroStats.map(s => s.target);
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        this.heroStats.forEach((s, i) => {
          s.current = Math.round(targets[i] * eased);
        });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },

    // ---------- hero tilt ----------
    tiltMove(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      this.tilt = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      };
    },
    tiltReset() {
      this.tilt = { x: 0, y: 0 };
    },

    // ---------- about spotlight ----------
    toggleFeature(id) {
      this.activeFeature = this.activeFeature === id ? null : id;
    },

    // ---------- countdown ----------
    updateCountdown() {
      const now = new Date();
      let diff = this.ideathonDate - now;
      if (diff < 0) diff = 0;
      const pad = n => String(n).padStart(2, "0");
      this.countdown = {
        days: pad(Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: pad(Math.floor((diff / (1000 * 60 * 60)) % 24)),
        mins: pad(Math.floor((diff / (1000 * 60)) % 60)),
        secs: pad(Math.floor((diff / 1000) % 60))
      };
    },

    // ---------- contact ----------
submitContact() {
  if (this.contactSending) return;

  this.contactSending = true;

  fetch(
    "https://script.google.com/macros/s/AKfycbw9yXHDu94WP5HuKQnCBJvbu81YMhsIfjHWsnja5hfxt2gvu286Nbk6g2I8yYafNpVnaw/exec",
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name: this.contact.name,
        email: this.contact.email,
        department: this.contact.department,
        semester: this.contact.semester,
        phone: this.contact.phone
      })
    }
  )
  .then(() => {
    this.contactSending = false;
    this.contactSent = true;

    this.contact = {
      name: "",
      email: "",
      department: "",
      semester: "",
      phone: ""
    };
  })
  .catch(error => {
    this.contactSending = false;
    console.error(error);
  });
},

    // ---------- gallery ----------
    openLightbox(item) {
      this.lightboxItem = item;
      document.body.style.overflow = "hidden";
    },
    closeLightbox() {
      this.lightboxItem = null;
      document.body.style.overflow = "";
    },

    // ---------- team ----------
    // Exactly one flip per tap: ignore any further taps on this card until
    // the CSS rotation (.6s, see .member-card-inner transition) finishes.
    // Combined with the pointer-events swap in CSS, this eliminates the
    // rapid multi-flip bug on touch devices.
    toggleFlip(id) {
      if (this.flippingId === id) return;
      this.flippingId = id;
      this.flippedId = this.flippedId === id ? null : id;
      window.setTimeout(() => {
        if (this.flippingId === id) this.flippingId = null;
      }, 650);
    },

    // ---------- theme switcher ----------
    // Morphs the whole site's accent palette by writing new values onto the
    // CSS custom properties every yellow-tinted element already reads from.
    applyTheme(trackId) {
      const track = this.tracks.find(t => t.id === trackId) || this.tracks[0];
      const root = document.documentElement.style;
      root.setProperty("--yellow", track.theme.yellow);
      root.setProperty("--yellow-deep", track.theme.deep);
      root.setProperty("--yellow-glow", track.theme.glow);
      root.setProperty("--theme-color", track.theme.yellow);
    },

    // ---------- cursor-reactive micro-interactions ----------
    // Delegated pointermove: magnetic tilt/parallax on cards, buttons, and
    // chips, driven purely through CSS custom properties (--rx/--ry/--mx/--my)
    // so it never fights with existing hover/lift transitions. rAF-throttled
    // and skipped entirely on touch/coarse-pointer devices.
    initMagneticHover() {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      // .member-card is intentionally excluded — team cards use a plain
      // CSS hover lift instead of the cursor-tilt effect (see .member-card
      // override in style.css).
      const SEL = ".glass-card:not(.member-card), .btn-nt, .track-chip, .filter-btn, .team-tab";
      const STRENGTH = 8; // max rotation in degrees
      let activeEl = null;
      let lastX = 0, lastY = 0, raf = null;

      const resetEl = (el) => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      };

      const apply = () => {
        raf = null;
        if (!activeEl) return;
        const r = activeEl.getBoundingClientRect();
        const px = (lastX - r.left) / r.width - 0.5;
        const py = (lastY - r.top) / r.height - 0.5;
        activeEl.style.setProperty("--rx", `${(-py * STRENGTH).toFixed(2)}deg`);
        activeEl.style.setProperty("--ry", `${(px * STRENGTH).toFixed(2)}deg`);
        activeEl.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
        activeEl.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
      };

      window.addEventListener("pointermove", (e) => {
        lastX = e.clientX; lastY = e.clientY;
        const el = e.target.closest ? e.target.closest(SEL) : null;
        if (el !== activeEl) {
          if (activeEl) resetEl(activeEl);
          activeEl = el;
        }
        if (activeEl && !raf) raf = requestAnimationFrame(apply);
      }, { passive: true });

      window.addEventListener("scroll", () => {
        if (activeEl) { resetEl(activeEl); activeEl = null; }
      }, { passive: true });
    }
  },

  mounted() {
    // lights-off mode: sync the html class with saved state (the inline
    // head script already does this pre-paint, this just keeps Vue's
    // reactive state and the DOM class in agreement)
    document.documentElement.classList.toggle("lights-off", this.lightsOff);

    // loader
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
      if (loader) setTimeout(() => loader.classList.add("done"), 350);
    });
    if (document.readyState === "complete" && loader) {
      setTimeout(() => loader.classList.add("done"), 350);
    }
    if (window.AOS) AOS.init({ duration: 800, once: true, offset: 60, easing: "ease-out-cubic" });

    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.onScroll();
    document.addEventListener("click", this.onDocClick);

    // countdown only ticks if the ideathon section exists on this page
    if (document.getElementById("ideathon")) {
      this.updateCountdown();
      this.countdownTimer = setInterval(this.updateCountdown, 1000);
    }

    // animate hero stats shortly after paint, if present on this page
      setTimeout(() => {
        this.animateStats();
      }, 400);

    // close mobile menu + lightbox on Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
        this.closeLightbox();
      }
    });

    // re-run AOS after Vue paints v-for driven content (gallery/team)
    this.$nextTick(() => { if (window.AOS) AOS.refreshHard(); });

    // cursor-reactive magnetic tilt on cards/buttons/chips (desktop only)
    this.initMagneticHover();
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("click", this.onDocClick);
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }
}).mount("#app");
