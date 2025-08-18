import { LoginLeftPanel } from "@widgets/login/ui/LoginLeftPanel";
import { LoginRightHero } from "@widgets/login/ui/LoginRightHero";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F8FC] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LoginLeftPanel />
            <LoginRightHero />
          </div>
        </div>
      </div>
    </main>
  );
}