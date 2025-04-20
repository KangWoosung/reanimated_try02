/** @type {import('tailwindcss').Config} */

/*
기본 slate 색상이 마음에 들지 않으면, Claude 에서 다른 색상으로 일괄 변경해달라고 하자.


*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  // darkMode: "class", // 다크 모드 설정 ('class' 기반으로 다크 모드 전환)
  theme: {
    extend: {
      colors: {
        // 라이트 모드와 다크 모드에 따른 배경 및 전경 색상
        background: {
          DEFAULT: "#f1f5f9", // slate-100
          blank: "#fafafa", // slate-100
          dark: "#1E293B", // slate-800
          secondary: "#e2e8f0", // slate-200
          secondaryDark: "#334155", // slate-700
          tertiary: "#cbd5e1", // slate-300
          tertiaryDark: "#475569", // slate-600
        },
        foreground: {
          DEFAULT: "#1E293B", // slate-800
          dark: "#F1F5F9", // slate-100
          secondary: "#475569", // slate-600
          secondaryDark: "#cbd5e1", // slate-300
          tertiary: "#64748b", // slate-500
          tertiaryDark: "#94a3b8", // slate-400
        },
        // 버튼 색상 (Primary 및 Secondary)
        primary: {
          DEFAULT: "#CBD5E1", // slate-300
          dark: "#94A3B8", // slate-400
          hover: "#b8c4d4", // slate-300 - 약간 어둡게
          hoverDark: "#8294ac", // slate-400 - 약간 어둡게
          active: "#a6b5c9", // slate-300 - 더 어둡게
          activeDark: "#7a8ba1", // slate-400 - 더 어둡게
          disabled: "#e2e8f0", // slate-200
          disabledDark: "#64748b", // slate-500
        },
        secondary: {
          DEFAULT: "#94A3B8", // slate-400
          dark: "#64748B", // slate-500
          hover: "#8599ae", // slate-400 - 약간 어둡게
          hoverDark: "#5a697e", // slate-500 - 약간 어둡게
          active: "#7a8ba1", // slate-400 - 더 어둡게
          activeDark: "#525f73", // slate-500 - 더 어둡게
          disabled: "#cbd5e1", // slate-300
          disabledDark: "#475569", // slate-600
        },
        // 경고 (Warning) 색상
        warning: {
          DEFAULT: "#FACC15", // yellow-400
          dark: "#EAB308", // yellow-500
          hover: "#f7c408", // yellow-400 - 약간 어둡게
          hoverDark: "#d7a407", // yellow-500 - 약간 어둡게
          active: "#e8b707", // yellow-400 - 더 어둡게
          activeDark: "#c89606", // yellow-500 - 더 어둡게
        },
        // 에러 색상
        error: {
          DEFAULT: "#EF4444", // red-500
          dark: "#DC2626", // red-600
          hover: "#e53e3e", // red-500 - 약간 어둡게
          hoverDark: "#cb2424", // red-600 - 약간 어둡게
          active: "#d63737", // red-500 - 더 어둡게
          activeDark: "#b92020", // red-600 - 더 어둡게
        },
        // 성공 색상
        success: {
          DEFAULT: "#10B981", // emerald-500
          dark: "#059669", // emerald-600
          hover: "#0fa874", // emerald-500 - 약간 어둡게
          hoverDark: "#05875f", // emerald-600 - 약간 어둡게
          active: "#0e9869", // emerald-500 - 더 어둡게
          activeDark: "#047857", // emerald-600 - 더 어둡게
        },
        // 정보 색상
        info: {
          DEFAULT: "#3B82F6", // blue-500
          dark: "#2563EB", // blue-600
          hover: "#3575dd", // blue-500 - 약간 어둡게
          hoverDark: "#2259d3", // blue-600 - 약간 어둡게
          active: "#2f69cb", // blue-500 - 더 어둡게
          activeDark: "#1e4fc0", // blue-600 - 더 어둡게
        },
      },

      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },

      // 타이포그래피 시스템 (font size와 line height)
      fontSize: {
        // 모바일 우선 타이포그래피 시스템
        "display-1": ["32px", { lineHeight: "40px", letterSpacing: "-0.5px" }],
        "display-2": ["28px", { lineHeight: "36px", letterSpacing: "-0.25px" }],
        h1: ["24px", { lineHeight: "32px", letterSpacing: "0" }],
        h2: ["20px", { lineHeight: "28px", letterSpacing: "0" }],
        h3: ["18px", { lineHeight: "26px", letterSpacing: "0.15px" }],
        h4: ["16px", { lineHeight: "24px", letterSpacing: "0.15px" }],
        h5: ["14px", { lineHeight: "22px", letterSpacing: "0.1px" }],
        "body-1": ["16px", { lineHeight: "24px", letterSpacing: "0.5px" }],
        "body-2": ["14px", { lineHeight: "22px", letterSpacing: "0.25px" }],
        caption: ["12px", { lineHeight: "18px", letterSpacing: "0.4px" }],
        overline: ["10px", { lineHeight: "16px", letterSpacing: "1.5px" }],
        button: ["14px", { lineHeight: "20px", letterSpacing: "1.25px" }],
      },

      // 간격 시스템 (일관된 여백)
      spacing: {
        // 기본 간격 시스템은 유지하면서 필요한 커스텀 값 추가
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },

      // 테두리 반경
      borderRadius: {
        none: "0",
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },

      // 그림자 시스템
      boxShadow: {
        none: "none",
        xs: "0 1px 2px rgba(30, 41, 59, 0.05)",
        sm: "0 1px 3px rgba(30, 41, 59, 0.1), 0 1px 2px rgba(30, 41, 59, 0.06)",
        md: "0 4px 6px -1px rgba(30, 41, 59, 0.1), 0 2px 4px -1px rgba(30, 41, 59, 0.06)",
        lg: "0 10px 15px -3px rgba(30, 41, 59, 0.1), 0 4px 6px -2px rgba(30, 41, 59, 0.05)",
        xl: "0 20px 25px -5px rgba(30, 41, 59, 0.1), 0 10px 10px -5px rgba(30, 41, 59, 0.04)",
      },

      // 애니메이션 지속 시간
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },

      // 애니메이션 타이밍 함수
      transitionTimingFunction: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },

  // 사용자 정의 유틸리티 클래스
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // 텍스트 스타일
        ".text-display-1": {
          fontSize: "32px",
          lineHeight: "40px",
          letterSpacing: "-0.5px",
          fontFamily: "Poppins-Bold, sans-serif",
        },
        ".text-display-2": {
          fontSize: "28px",
          lineHeight: "36px",
          letterSpacing: "-0.25px",
          fontFamily: "Poppins-Bold, sans-serif",
        },
        ".text-heading-1": {
          fontSize: "24px",
          lineHeight: "32px",
          fontFamily: "Poppins-SemiBold, sans-serif",
        },
        ".text-heading-2": {
          fontSize: "20px",
          lineHeight: "28px",
          fontFamily: "Poppins-SemiBold, sans-serif",
        },
        ".text-heading-3": {
          fontSize: "18px",
          lineHeight: "26px",
          letterSpacing: "0.15px",
          fontFamily: "Poppins-Medium, sans-serif",
        },
        ".text-body-1": {
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.5px",
          fontFamily: "Poppins-Regular, sans-serif",
        },
        ".text-body-2": {
          fontSize: "14px",
          lineHeight: "22px",
          letterSpacing: "0.25px",
          fontFamily: "Poppins-Regular, sans-serif",
        },
        ".text-caption": {
          fontSize: "12px",
          lineHeight: "18px",
          letterSpacing: "0.4px",
          fontFamily: "Poppins-Regular, sans-serif",
        },
        ".text-button": {
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "1.25px",
          fontFamily: "Poppins-Medium, sans-serif",
          textTransform: "uppercase",
        },

        // 입력 필드 스타일
        ".input-base": {
          borderWidth: "1px",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "16px",
          lineHeight: "24px",
        },

        // 버튼 스타일
        ".btn-base": {
          borderRadius: "8px",
          padding: "12px 24px",
          textAlign: "center",
          transition: "all 250ms",
        },
        ".btn-small": {
          borderRadius: "8px",
          padding: "8px 16px",
          textAlign: "center",
          fontSize: "12px",
          transition: "all 250ms",
        },
        ".btn-large": {
          borderRadius: "8px",
          padding: "16px 32px",
          textAlign: "center",
          fontSize: "16px",
          transition: "all 250ms",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
