import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Event } from "@/lib/types";

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden min-h-65 sm:min-h-80 md:min-h-95">
      {/* Background image */}
      <Image
        src={event.image}
        alt={event.title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, #000000 2.3%, rgba(102, 102, 102, 0) 45.05%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-6 sm:p-8 md:p-10 min-h-65 sm:min-h-80 md:min-h-95">
        <h2 className="font-cormorant font-bold text-white text-3xl sm:text-4xl md:text-[64px] mb-3">
          Lagos Live,
          <br />
          The Main Event
        </h2>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mt-3 mb-5">
          <MetaBadge
            icon={<MapPin className="w-4.5 h-4.5" />}
            label={event.location}
          />
          <MetaBadge
            icon={<Calendar className="w-4.5 h-4.5" />}
            label={event.date}
          />
          <MetaBadge
            icon={<Clock className="w-4.5 h-4.5" />}
            label={event.time}
          />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center mt-4 gap-6 py-2 px-4 rounded-[40px] border border-white">
          <span className="text-white font-semibold text-xl sm:text-2xl md:text-[40px]">
            {event.price}
          </span>
          <button className="relative overflow-hidden bg-white cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all shadow-lg flex items-center justify-center group">
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Register Now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex font-light items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-base px-3 py-1.5 rounded-[40px] ">
      {icon}
      {label}
    </span>
  );
}
