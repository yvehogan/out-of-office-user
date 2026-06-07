"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full  mt-6">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-base text-brand-purple2 font-normal">
          © {currentYear} Solomon Ayodele · Out of Office
        </p>
      </div>
    </footer>
  );
}
