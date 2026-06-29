"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ReviewCardProps {
    name: string;
    title: string;
    text: string;
    fullText?: string;
    imageSrc: string;
    imageWidth: number;
    imageWidthClass: string;
    themeColor: string;
    badgeColor: string;
    frameClasses: string;
}

export default function ReviewCard({
    name,
    title,
    text,
    fullText,
    imageSrc,
    imageWidth,
    imageWidthClass,
    themeColor,
    badgeColor,
    frameClasses,
}: ReviewCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full xl:w-[328px] 2xl:!w-[444px] xl:h-[410px] 2xl:!h-[616px] flex flex-col shrink-0 relative pt-[70px] xl:pt-[52px] 2xl:!pt-[70px]">
            {/* Portrait Image (Absolute at top:0) */}
            <div className={`absolute top-0 ${imageWidthClass} h-[363px] xl:h-[214px] 2xl:!h-[369px] z-10 pointer-events-none`}>
                <Image
                    src={imageSrc}
                    alt={name}
                    width={imageWidth}
                    height={363}
                    className="w-full h-full object-cover object-bottom"
                    priority
                />
            </div>

            {/* Upper Image Frame */}
            <div
                className={`w-full border-t-[4px] border-l-[4px] border-r-[4px] bg-white relative h-[297px] xl:h-[162px] 2xl:!h-[302px] ${frameClasses}`}
                style={{ borderColor: themeColor }}
            />

            {/* Rating Badge */}
            <div
                className="absolute -rotate-[20.4deg] rounded-[40px] flex items-center justify-center gap-0 z-20 shadow-md right-[37px] top-[350px] w-[136px] h-[40px] px-[8px] py-[8px] xl:right-[20px] xl:top-[197px] xl:w-[102px] xl:h-[30px] xl:px-[6px] xl:py-[6px] 2xl:!right-[37px] 2xl:!top-[355px] 2xl:!w-[136px] 2xl:!h-[40px] 2xl:!px-[8px] 2xl:!py-[8px]"
                style={{ backgroundColor: badgeColor }}
            >
                {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="#f6ff49" className="w-[24px] h-[24px] xl:w-[18px] xl:h-[18px] 2xl:!w-[24px] 2xl:!h-[24px]">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                ))}
            </div>

            {/* Card Bottom */}
            <div
                className="w-full rounded-b-[28px] flex flex-col justify-between h-[241px] p-[17.4px] xl:h-[196px] xl:p-[13px] 2xl:!h-[244px] 2xl:!p-[17.4px]"
                style={{ backgroundColor: themeColor }}
            >
                <div className="flex flex-col gap-[8px] xl:gap-[6px] 2xl:!gap-[8px]">
                    <h3 className="font-serif font-bold text-white leading-tight text-[18px] xl:text-[14px] 2xl:!text-[18px]">
                        {name}
                    </h3>
                    <div className="rounded-[29px] bg-white/18 w-fit px-[6px] py-[4px] xl:px-[4px] xl:py-[3px] 2xl:!px-[6px] 2xl:!py-[4px]">
                        <span className="font-medium text-white block leading-none text-[12px] xl:text-[10px] 2xl:!text-[12px]">
                            {title}
                        </span>
                    </div>
                    <p className="font-normal text-white leading-[1.35] text-[14px] xl:text-[11px] xl:leading-[1.25] 2xl:!text-[14px] 2xl:!leading-[1.35]">
                        {text}
                    </p>
                </div>
                <button
                    onClick={() => setIsExpanded(true)}
                    className="font-bold text-white underline cursor-pointer text-left text-[14px] xl:text-[12px] 2xl:!text-[14px] hover:text-white/80 transition-colors"
                >
                    Read More
                </button>
            </div>

            {/* Slide-up Overlay Wrapper */}
            <div className={`absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-b-[28px] ${frameClasses}`}>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            className="absolute inset-0 flex flex-col p-[24px] xl:p-[20px] 2xl:p-[30px] pointer-events-auto"
                            style={{ backgroundColor: themeColor }}
                        >
                            {/* Header: Name */}
                            <div className="flex justify-between items-start mb-[16px] xl:mb-[12px] 2xl:mb-[20px]">
                                <div className="flex flex-col gap-[8px] xl:gap-[6px] 2xl:gap-[8px]">
                                    <h3 className="font-serif font-bold text-white leading-tight text-[22px] xl:text-[18px] 2xl:!text-[26px]">
                                        {name}
                                    </h3>
                                    <div className="rounded-[29px] bg-white/18 w-fit px-[6px] py-[4px] xl:px-[4px] xl:py-[3px] 2xl:!px-[6px] 2xl:!py-[4px]">
                                        <span className="font-medium text-white block leading-none text-[12px] xl:text-[10px] 2xl:!text-[12px]">
                                            {title}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Full Text Area */}
                            <div className="flex-1 overflow-y-auto pr-[8px] mb-[16px] xl:mb-[12px] 2xl:mb-[20px] custom-scrollbar">
                                <p className="font-normal text-white leading-[1.35] text-[14px] xl:text-[11px] xl:leading-[1.25] 2xl:!text-[14px] 2xl:!leading-[1.35] whitespace-pre-wrap">
                                    {fullText || text}
                                </p>
                            </div>

                            {/* Back Button */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="font-bold text-white underline cursor-pointer text-left text-[14px] xl:text-[12px] 2xl:!text-[14px] hover:text-white/80 transition-colors mt-auto"
                            >
                                Back
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}