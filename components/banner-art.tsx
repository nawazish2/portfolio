/**
 * Live waterfall banner — reads well in light + dark (self-contained palette).
 * Cascading water uses stroke-dashoffset loops (same idea as Sam's flowing falls).
 */
export function BannerArt() {
  return (
    <div className="banner-art absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 480"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft daylight sky — works on white page */}
          <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="40%" stopColor="#e0f2fe" />
            <stop offset="75%" stopColor="#ecfdf5" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </linearGradient>

          <linearGradient id="b-cliff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="45%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="b-cliff-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="b-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.55" />
          </linearGradient>

          <linearGradient id="b-pool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="b-canopy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <linearGradient id="b-canopy-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          <linearGradient id="b-trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>

          <linearGradient id="b-rays" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="b-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id="b-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="b-softer" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          {/* Water stream masks for flowing dash animation */}
          <linearGradient id="b-foam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1600" height="480" fill="url(#b-sky)" />

        {/* God rays */}
        <g className="banner-rays" opacity="0.55">
          <path d="M200 0 L340 480 L280 480 L140 0 Z" fill="url(#b-rays)" />
          <path d="M380 0 L560 480 L490 480 L310 0 Z" fill="url(#b-rays)" />
          <path d="M1100 0 L980 480 L1040 480 L1160 0 Z" fill="url(#b-rays)" />
        </g>

        {/* Distant trees / haze */}
        <g opacity="0.35" fill="#86efac">
          <ellipse cx="520" cy="210" rx="90" ry="70" />
          <ellipse cx="600" cy="200" rx="70" ry="55" />
          <ellipse cx="1080" cy="195" rx="100" ry="75" />
          <ellipse cx="1160" cy="205" rx="80" ry="60" />
        </g>

        {/* Cliff / rock face */}
        <path
          d="M420 120 C520 90 640 100 720 140 C800 100 900 90 980 130 L1020 480 L380 480 Z"
          fill="url(#b-cliff)"
        />
        <path
          d="M500 180 C580 150 700 160 780 200 C860 155 940 150 1000 190 L1020 480 L460 480 Z"
          fill="url(#b-cliff-dark)"
          opacity="0.55"
        />
        {/* Rock ledges */}
        <path
          d="M560 220 L820 200 L840 230 L540 250 Z"
          fill="#94a3b8"
          opacity="0.45"
        />
        <path
          d="M620 300 L900 275 L920 310 L600 335 Z"
          fill="#64748b"
          opacity="0.4"
        />

        {/* ——— FLOWING WATERFALLS ——— */}
        {/* Main fall body */}
        <g className="banner-fall-body">
          <path
            d="M700 130 C715 200 690 280 710 380 C720 430 705 460 700 480 L780 480 C775 450 790 400 780 340 C765 250 800 180 790 130 Z"
            fill="url(#b-water)"
            opacity="0.75"
          />
          <path
            d="M620 145 C635 220 610 300 630 400 C640 445 625 470 620 480 L680 480 C675 450 690 390 680 320 C665 240 700 180 690 145 Z"
            fill="url(#b-water)"
            opacity="0.55"
          />
          <path
            d="M800 140 C820 230 790 310 815 400 C825 445 810 470 805 480 L870 480 C865 440 885 370 870 300 C850 210 880 160 860 140 Z"
            fill="url(#b-water)"
            opacity="0.5"
          />
        </g>

        {/* Animated stream lines (flowing water) */}
        <g
          fill="none"
          stroke="url(#b-foam)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        >
          <path
            className="banner-flow banner-flow-1"
            d="M730 125 C740 200 715 280 735 360 C745 410 730 450 728 480"
            strokeDasharray="10 18"
          />
          <path
            className="banner-flow banner-flow-2"
            d="M750 130 C760 210 735 290 755 370 C765 420 750 455 748 480"
            strokeDasharray="8 16"
          />
          <path
            className="banner-flow banner-flow-3"
            d="M770 128 C785 205 755 290 775 365 C785 415 770 452 768 480"
            strokeDasharray="12 14"
          />
          <path
            className="banner-flow banner-flow-4"
            d="M650 150 C662 230 640 310 655 390 C662 430 650 460 648 480"
            strokeDasharray="9 15"
          />
          <path
            className="banner-flow banner-flow-5"
            d="M830 145 C848 230 820 310 840 390 C850 430 838 460 836 480"
            strokeDasharray="11 17"
          />
          <path
            className="banner-flow banner-flow-6"
            d="M710 135 C722 215 700 295 718 375 C726 420 714 455 712 480"
            strokeDasharray="7 13"
          />
        </g>

        {/* Secondary thin streams */}
        <g
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        >
          <path
            className="banner-flow banner-flow-fast"
            d="M760 132 C768 220 748 300 762 400 C768 440 760 470 758 480"
            strokeDasharray="6 12"
          />
          <path
            className="banner-flow banner-flow-fast-2"
            d="M740 128 C748 210 728 290 742 380 C748 425 740 460 738 480"
            strokeDasharray="5 11"
          />
        </g>

        {/* Splash / pool at base */}
        <ellipse
          className="banner-pool"
          cx="740"
          cy="455"
          rx="160"
          ry="28"
          fill="url(#b-pool)"
        />
        <g className="banner-splash" fill="#ffffff" opacity="0.7">
          <circle className="banner-drop banner-drop-1" cx="700" cy="430" r="3" />
          <circle className="banner-drop banner-drop-2" cx="740" cy="420" r="2.5" />
          <circle className="banner-drop banner-drop-3" cx="780" cy="428" r="3.5" />
          <circle className="banner-drop banner-drop-4" cx="720" cy="415" r="2" />
          <circle className="banner-drop banner-drop-5" cx="760" cy="412" r="2.2" />
        </g>

        {/* Mist near falls */}
        <ellipse
          className="banner-mist-cloud"
          cx="740"
          cy="400"
          rx="120"
          ry="50"
          fill="#ffffff"
          opacity="0.35"
          filter="url(#b-softer)"
        />

        {/* Left forest */}
        <g>
          <rect x="95" y="280" width="18" height="160" rx="4" fill="url(#b-trunk)" />
          <rect x="160" y="300" width="14" height="140" rx="3" fill="url(#b-trunk)" />
          <rect x="230" y="290" width="16" height="150" rx="4" fill="url(#b-trunk)" />
          <rect x="40" y="310" width="12" height="130" rx="3" fill="url(#b-trunk)" />

          <ellipse className="banner-leaf banner-leaf-1" cx="104" cy="250" rx="70" ry="85" fill="url(#b-canopy)" />
          <ellipse className="banner-leaf banner-leaf-2" cx="167" cy="275" rx="55" ry="70" fill="url(#b-canopy-dark)" />
          <ellipse className="banner-leaf banner-leaf-3" cx="238" cy="260" rx="62" ry="78" fill="url(#b-canopy)" />
          <ellipse className="banner-leaf banner-leaf-4" cx="46" cy="285" rx="48" ry="60" fill="url(#b-canopy-dark)" />
          <ellipse className="banner-leaf banner-leaf-5" cx="300" cy="300" rx="45" ry="55" fill="url(#b-canopy)" opacity="0.9" />
        </g>

        {/* Right forest */}
        <g>
          <rect x="1280" y="270" width="20" height="170" rx="4" fill="url(#b-trunk)" />
          <rect x="1360" y="295" width="16" height="145" rx="3" fill="url(#b-trunk)" />
          <rect x="1440" y="285" width="18" height="155" rx="4" fill="url(#b-trunk)" />
          <rect x="1515" y="305" width="14" height="135" rx="3" fill="url(#b-trunk)" />

          <ellipse className="banner-leaf banner-leaf-6" cx="1290" cy="235" rx="85" ry="100" fill="url(#b-canopy)" />
          <ellipse className="banner-leaf banner-leaf-7" cx="1368" cy="260" rx="60" ry="75" fill="url(#b-canopy-dark)" />
          <ellipse className="banner-leaf banner-leaf-8" cx="1449" cy="245" rx="72" ry="88" fill="url(#b-canopy)" />
          <ellipse className="banner-leaf banner-leaf-9" cx="1522" cy="275" rx="52" ry="65" fill="url(#b-canopy-dark)" />
          <ellipse className="banner-leaf banner-leaf-10" cx="1220" cy="290" rx="50" ry="58" fill="url(#b-canopy)" opacity="0.85" />
        </g>

        {/* Overhanging branches into frame */}
        <path
          d="M0 80 C80 60 120 140 40 180 C100 150 160 100 200 140"
          fill="none"
          stroke="#166534"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.7"
        />
        <ellipse cx="30" cy="70" rx="55" ry="40" fill="url(#b-canopy-dark)" opacity="0.9" />
        <ellipse cx="90" cy="100" rx="40" ry="30" fill="url(#b-canopy)" opacity="0.85" />

        <path
          d="M1600 90 C1500 50 1480 140 1560 170 C1490 140 1440 90 1400 130"
          fill="none"
          stroke="#166534"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.7"
        />
        <ellipse cx="1570" cy="75" rx="60" ry="42" fill="url(#b-canopy)" opacity="0.9" />
        <ellipse cx="1500" cy="110" rx="45" ry="32" fill="url(#b-canopy-dark)" opacity="0.85" />

        {/* Soft bottom vignette so it sits clean on white OR dark page */}
        <rect
          width="1600"
          height="480"
          fill="url(#b-mist)"
          opacity="0.25"
          style={{ pointerEvents: "none" }}
        />
      </svg>
    </div>
  );
}
