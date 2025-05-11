import { ThemeProvider } from "@/components/theme-provider"
import { Particles } from "@/components/magicui/particles";
import Navbar from "@/components/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Background />
        <Navbar />
        <main className="max-w-screen-2xl mx-auto px-10">
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
}

const Background = () => (
  <div className="absolute top-0 left-0 overflow-hidden h-screen w-screen -z-10">
    <div className="absolute -top-300 -left-400">
      <Ellipse1 />
    </div>
    <div className="absolute -top-130 left-0">
      <Ellipse4 />
    </div>
    <div className="absolute -top-120 -left-150">
      <Ellipse3 />
    </div>
    <div className="absolute -top-150 left-0">
      <Ellipse2 />
    </div>
    <div className="absolute top-0 left-0 h-screen w-screen">
      <Particles className="h-screen w-screen" />
    </div>
  </div>
);

const Ellipse1 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3473" height="2702" viewBox="0 0 3473 2702" fill="none">
    <g filter="url(#filter0_f_101_1802)">
      <path d="M2431.46 1152.99C1893.52 1497.1 2283.48 1627.55 1748.65 1696.51C1460.16 1733.71 1023.71 1554.98 1002.11 1387.46C980.509 1219.94 1196.86 1053.98 1485.35 1016.79C1773.84 979.59 2673.93 997.885 2431.46 1152.99Z" fill="#C2410C" />
    </g>
    <defs>
      <filter id="filter0_f_101_1802" x="0.62207" y="0.377451" width="3471.83" height="2701.09" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="500" result="effect1_foregroundBlur_101_1802" />
      </filter>
    </defs>
  </svg>
);

const Ellipse2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1784" height="1204" viewBox="0 0 1784 1204" fill="none">
    <g filter="url(#filter0_f_101_1801)">
      <path d="M1584 931.044C1584 1095.2 1300.95 931.044 1012.21 931.044C723.466 931.044 200 682.937 200 518.785C200 354.634 723.466 336.599 1012.21 336.599C1226.63 -138.957 1584 766.892 1584 931.044Z" fill="black" />
    </g>
    <defs>
      <filter id="filter0_f_101_1801" x="0" y="0" width="1784" height="1204" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_101_1801" />
      </filter>
    </defs>
  </svg>
);

const Ellipse3 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1842" height="1097" viewBox="0 0 1842 1097" fill="none">
    <g filter="url(#filter0_f_101_1803)">
      <path d="M1502.86 479.802C1022.97 671.139 1330.49 797 882.395 797C640.697 797 300 633.345 300 514.745C300 396.144 495.935 300 737.633 300C979.331 300 1719.17 393.559 1502.86 479.802Z" fill="#C2410C" />
    </g>
    <defs>
      <filter id="filter0_f_101_1803" x="0" y="0" width="1842" height="1097" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_101_1803" />
      </filter>
    </defs>
  </svg>
);

const Ellipse4 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="2491" height="2168" viewBox="0 0 2491 2168" fill="none">
    <g filter="url(#filter0_f_101_1800)">
      <path d="M1906.55 1396.86C1178.82 1433.58 1391.88 1853.14 894.479 1568.83C626.186 1415.47 414.819 907.45 535.713 695.951C656.607 484.453 972.105 437.322 1240.4 590.68C1508.69 744.038 2234.57 1380.31 1906.55 1396.86Z" fill="#C2410C" />
    </g>
    <defs>
      <filter id="filter0_f_101_1800" x="0.842773" y="0.566772" width="2489.22" height="2166.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_101_1800" />
      </filter>
    </defs>
  </svg>
);

export default Layout;