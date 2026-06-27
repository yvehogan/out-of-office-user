import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const intro =
  "Solomon O. Ayodele is one of Africa's leading voices where innovation, leadership, and social transformation converge. With over a decade of experience in product and technology within the banking and financial technology ecosystem, he has built a reputation for designing and scaling customer-centered solutions, leading high-impact teams, and driving meaningful business transformation where people, product, process, and technology meet.";

const productJourney =
  "His professional journey spans critical roles such as his time at Standard Bank Group, where he contributed to advancing digital strategy, led end-to-end product development, facilitated enterprise-wide design thinking, and forged strategic partnerships that strengthened innovation culture across the organization. He currently leads as Head of Product & Technology Innovation at Wema Bank Plc, and serves as an advisory board member of three high-growth startups across Africa spanning health, legal, and financial services.";

const boardroom =
  "Beyond the boardroom, Solomon is the Founder of Boys Quarters Africa, a pioneering social movement committed to raising a generation of emotionally grounded, socially responsible, and purpose-driven boys and men.";

const platform =
  "Through this work, he has built a global platform for redefining masculinity and leadership, engaging over 2 million boys and men across Africa through grassroots programs, policy engagement, and community transformation initiatives.";

const recognition =
  "In recognition of his work, he is a two-time recipient of The Future Awards Africa Prize for Intrapreneurship and for Activism and Advocacy, reflecting both his influence within corporate innovation and his commitment to societal change. His life's work is driven by a clear conviction: to shape the future of Africa through his faith, voice and the enabling power of technology.";

const socials = [
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: "/screenshots/linkedin.svg",
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: "/screenshots/instagram.svg",
  },
  {
    href: "https://x.com/",
    label: "X",
    icon: "/screenshots/x.svg",
  },
  {
    href: "https://www.solomonayodele.com/",
    label: "Website",
    icon: "/screenshots/global.svg",
  },
];

export default function AuthorPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white animate-slide-up font-unageo">
      <section className="flex-1 max-w-350 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page heading */}
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-8">
            Author
          </h1>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1 text-sm text-gray-400"
          >
            <Link
              href="/"
              className="hover:text-brand-navy transition-colors text-black font-semibold text-1base"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
            <span className="text-brand-purple font-semibold text-base">
              Author
            </span>
          </nav>
        </div>

        <div className="grid items-start gap-x-16 gap-y-14 lg:grid-cols-2">
          <article className="space-y-12 ">
            <div>
              <h2 className="font-cormorant text-[56px] font-bold leading-[108%] text-brand-purple2 sm:text-[80px]">
                Solomon
                <br />
                <span className="italic text-brand-purple">Ayodele</span>
              </h2>
              <p className="mt-8 font-sans text-[18px] font-light leading-[1.65] text-brand-purple2 sm:text-[24px]">
                {intro}
              </p>
            </div>

            <figure className="mx-auto max-w-139.5 lg:mx-0 ">
              <Image
                src="/author/award-stage.png"
                alt="Solomon Ayodele receiving an award on stage"
                width={590}
                height={405}
                className="h-auto w-full object-contain"
              />
            </figure>

            <div className="space-y-8">
              <p className="text-justify font-sans text-[18px] font-light leading-[1.65] text-brand-purple2 sm:text-[24px]">
                {productJourney}
              </p>
              <p className="text-justify font-sans text-[18px] font-light leading-[1.65] text-brand-purple2 sm:text-[24px]">
                {boardroom}
              </p>
            </div>
          </article>

          <article className="space-y-12 ">
            <figure className="mx-auto max-w-125">
              <Image
                src="/author/authorM.png"
                alt="Solomon Ayodele"
                width={1170}
                height={1556}
                priority
                className="mx-auto  h-auto w-full max-w-140 object-contain"
              />
            </figure>

            <p className="text-justify font-sans text-[18px] font-light leading-[1.65] text-brand-purple2 sm:text-[24px]">
              {platform}
            </p>

            <figure className="mx-auto max-w-105">
              <Image
                src="/author/award-yellow.png"
                alt="Solomon Ayodele holding two Future Awards Africa plaques"
                width={540}
                height={720}
                className="h-auto w-full object-contain"
              />
            </figure>

            <p className=" text-justify font-sans text-[18px] font-light leading-[1.65] text-brand-purple2 sm:text-[24px] lg:ml-auto">
              {recognition}
            </p>
          </article>
        </div>

        <section className="mt-20 text-center md:mt-28">
          <h2 className="font-unageo text-xl font-medium text-brand-purple2">
            Connect with Solomon
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-14 h-12 items-center justify-center rounded-[47px] border border-brand-purple text-brand-purple transition hover:-translate-y-0.5 hover:bg-brand-purple hover:[&_img]:brightness-0 hover:[&_img]:invert"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={22}
                  height={22}
                  className="size-6"
                />
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-24 text-center font-sans text-sm font-medium text-brand-purple2">
          © 2026 Solomon Ayodele · Out of Office
        </footer>
      </section>
    </main>
  );
}
