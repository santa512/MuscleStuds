import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import "../globals.css";
import Wrestlers from "@/components/Wrestlers";
import ScrollToTop from "@/components/commons/ScrollToTopButton";

export const metadata = {
  title: "Muscle Studs",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen mx-auto">
        <div className="flex flex-row pt-10 gap-8 max-w-7xl mx-auto px-2">
          <div className="hidden md:flex flex-col w-[320px] ">
            {/* TODO: wrestler sidebar + catalog sidebar */}
            <Wrestlers />
          </div>
          <div className="w-full">
            {/* Primary view */}
            {children}
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </>
  );
}
