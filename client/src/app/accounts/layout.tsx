import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex gap-6 items-start">
          <aside className="hidden w-64 shrink-0 lg:block">
            <AccountSidebar />
          </aside>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
