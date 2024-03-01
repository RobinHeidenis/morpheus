import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import catppuccinPlugin from "@catppuccin/tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [catppuccinPlugin({defaultFlavour: 'mocha'})],
} satisfies Config;
