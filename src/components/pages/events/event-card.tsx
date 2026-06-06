import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article
      className="bg-white rounded-[40px] p-6 overflow-hidden"
      style={{ boxShadow: "0px 4px 17.6px 0px #0000001A" }}
    >
      {/* Image */}
      <div className="relative w-full aspect-5/2 overflow-hidden rounded-3xl">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-cormorant font-bold text-brand-purple2 text-lg sm:text-xl md:text-[32px] tracking-[0%] transition-colors">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 my-4">
          <MetaItem
            icon={<MapPin className="w-4.5.5 h-4.5.5 text-brand-purple2" />}
            label={event.location}
          />
          <MetaItem
            icon={<Calendar className="w-4.5.5 h-4.5.5 text-brand-purple2" />}
            label={event.date}
          />
          <MetaItem
            icon={<Clock className="w-4.5.5 h-4.5.5 text-brand-purple2" />}
            label={event.time}
          />
        </div>

        {/* Price + CTA */}

        <div className="flex items-center mt-10 gap-6 py-2 px-4 rounded-[40px] border border-brand-green2 w-fit">
          <span className="text-brand-purple2 font-semibold text-xl sm:text-2xl">
            {event.price}
          </span>
          <button className="relative overflow-hidden bg-brand-green cursor-pointer font-sans text-base text-brand-navy h-12.25 font-medium px-10 py-5 rounded-[47px] active:scale-95 transition-all flex items-center justify-center group">
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Register Now
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 text-brand-purple2 text-base font-light rounded-[40px] py-1 px-2 bg-black/5">
      {icon}
      <span>{label}</span>
    </span>
  );
}
