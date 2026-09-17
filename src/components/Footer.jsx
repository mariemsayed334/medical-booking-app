export default function Footer() {
  return (
    <footer className="bg-pine text-xs text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex flex-wrap items-center gap-4 opacity-90">
          <span>Sun - Thu: 9:00 AM - 9:00 PM</span>
          <span className="hidden sm:inline">Support: +20 100 123 4567</span>
        </div>
        <span className="opacity-90">Fayoum, Egypt</span>
      </div>
    </footer>
  );
}