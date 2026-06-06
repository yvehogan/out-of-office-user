import Link from "next/link";
import Image from "next/image";
import { BookOpenText, ChevronRight } from "lucide-react";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { ALL_INSIGHTS, getInsightBySlug } from "@/lib/data/events-data";

interface InsightDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_INSIGHTS.map((insight) => ({
    slug: insight.slug,
  }));
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white animate-slide-up">
      <main className="flex-1 max-w-350 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page heading */}
        <div className="text-center mb-6">
          <h1 className="font-cormorant text-brand-purple2 font-bold text-5xl sm:text-6xl md:text-[110px] mb-8">
            Insights
          </h1>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1 text-sm text-gray-400"
          >
            <Link
              href="/"
              className="hover:text-brand-navy transition-colors text-black font-semibold text-base"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
            <Link
              href="/insights"
              className="hover:text-brand-navy transition-colors text-black font-semibold text-base"
            >
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-black font-bold" />
            <span className="text-brand-purple font-semibold text-base">
              Post
            </span>
          </nav>
        </div>

        {/* Post Content */}
        <article
          className="max-w-6xl mx-auto bg-white rounded-[40px] p-6"
          style={{ boxShadow: "0px 4px 17.6px 0px #0000001A" }}
        >
          {/* Featured Image */}
          <div className="relative w-full aspect-3/1 overflow-hidden rounded-3xl mb-8">
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6">
            <span className="flex items-center gap-2 text-brand-purple2 text-base font-light rounded-[40px] py-1 px-2 bg-black/5">
              <Calendar className="w-4.5 h-4.5 text-brand-purple2" />
              <span>{insight.date}</span>
            </span>
            <span className="flex items-center gap-2 text-brand-purple2 text-base font-light rounded-[40px] py-1 px-2 bg-black/5">
              <BookOpenText className="w-4.5 h-4.5 text-brand-purple2" />
              <span>{insight.time}</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="font-cormorant font-bold text-brand-purple2 text-3xl sm:text-4xl md:text-5xl mb-8 whitespace-pre-line">
            {insight.title.replace(",", ",\n")}
          </h2>

          {/* Placeholder content */}
          <div className="prose prose-lg space-y-10 max-w-none text-brand-purple2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
              odio felis. Vestibulum id felis neque. Morbi euismod libero dolor,
              a placerat augue finibus vitae. Sed vitae sem a ex viverra semper.
              Nulla pellentesque laoreet rutrum. Fusce cursus tellus et
              condimentum egestas. Phasellus mattis augue non sagittis
              elementum. Quisque fringilla, mi vitae egestas scelerisque, magna
              lorem tempus sem, cursus mollis est lectus vitae nulla.
              Suspendisse quis felis tristique, consectetur diam sed, ornare
              felis. Aliquam rhoncus sagittis leo eget viverra. Nulla feugiat
              turpis vitae tristique blandit. Sed quis luctus ligula. Fusce et
              dolor vehicula justo egestas tristique in ac urna. Nulla elementum
              ultrices libero, sit amet rutrum nibh condimentum at. Suspendisse
              vel metus aliquam, interdum leo sed, dignissim nisl. Nam vehicula
              leo eget tincidunt euismod.
            </p>
            <p>
              Vestibulum vestibulum vulputate turpis, id pellentesque tellus
              viverra et. Proin dapibus, urna quis vulputate sagittis, nunc
              tellus rhoncus quam, nec placerat urna tellus in nisl. Aliquam
              vitae nibh lacinia, luctus mauris a, commodo augue. Integer non
              tincidunt eros, eu congue ligula. Vivamus vehicula ultrices dolor,
              vitae mollis arcu eleifend sit amet. Mauris volutpat nunc sodales
              malesuada placerat. In ac ligula felis. Donec risus odio,
              fringilla quis nulla ac, vulputate volutpat metus. Duis placerat
              rutrum sagittis. Integer sed consectetur ex, ut maximus diam.
            </p>
            <p>
              Vestibulum vestibulum vulputate turpis, id pellentesque tellus
              viverra et. Proin dapibus, urna quis vulputate sagittis, nunc
              tellus rhoncus quam, nec placerat urna tellus in nisl. Aliquam
              vitae nibh lacinia, luctus mauris a, commodo augue. Integer non
              tincidunt eros, eu congue ligula. Vivamus vehicula ultrices dolor,
              vitae mollis arcu eleifend sit amet. Mauris volutpat nunc sodales
              malesuada placerat. In ac ligula felis. Donec risus odio,
              fringilla quis nulla ac, vulputate volutpat metus. Duis placerat
              rutrum sagittis. Integer sed consectetur ex, ut maximus diam.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
