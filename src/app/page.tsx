"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { BeyondCard } from "@/components/pages/home/beyond-card";
import { ShopCard } from "@/components/pages/home/shop-card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import CountryConfirmationModal from "@/components/Modal/country-confirmationModal";
import ReviewCard from "@/components/pages/home/review-card";
import { useProducts } from "@/hooks/use-products";

export default function Home() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const thereIsMoreRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLImageElement>(null);
  const shopRef = useRef<HTMLElement>(null);
  const beyondRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const authorRef = useRef<HTMLElement>(null);
  const insightsTextRef = useRef<HTMLDivElement>(null);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const insightRef = useRef<HTMLImageElement>(null);
  const [openModal, setOpenModal] = useState(false);

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useProducts({ status: "Published" });

  const products = productsResponse?.data ?? [];

  const product1 = products[0] ?? null;
  const product2 = products[1] ?? null;
  const product3 = products[2] ?? null;
  const product4 = products[3] ?? null;

  useEffect(() => {
    const check = () => {
      setIsLargeDesktop(window.innerWidth >= 1400);
      setIsDesktop(window.innerWidth >= 1280);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollXProgress } = useScroll({
    target: thereIsMoreRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "center center"],
  });

  // Icon animation: green starts lower (between red/purple in a line), gets pushed up as they come together
  const greenY = useTransform(scrollXProgress, [0, 1], [60, 0]);
  const purpleX = useTransform(scrollXProgress, [0, 1], [150, 0]);
  const redX = useTransform(scrollXProgress, [0, 1], [-150, 0]);

  // Text block animation: comes from bottom-right diagonally to top-left
  const textOpacity = useTransform(scrollXProgress, [0.4, 0.85], [0, 1]);
  const textScale = useTransform(
    scrollXProgress,
    [0.4, 0.85, 1],
    [0.3, 1.08, 1],
  );
  const textX = useTransform(scrollXProgress, [0.4, 0.85], [80, 0]);
  const textY = useTransform(scrollXProgress, [0.4, 0.85], [60, 0]);

  // Insights text: match the author text scroll reveal
  const { scrollXProgress: insightsScrollProgress } = useScroll({
    target: insightsTextRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start 140%", "start 105%"],
  });
  const insightsTextX = useTransform(insightsScrollProgress, [0, 1], [80, 0]);
  const insightsTextOpacity = useTransform(
    insightsScrollProgress,
    [0, 1],
    [0, 1],
  );

  // Shop section scroll tracking
  const { scrollXProgress: shopScrollProgress } = useScroll({
    target: shopRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start center", "center center"],
  });

  // Shop cards: stacked at Planner's position (left). Cap on top. Spread RIGHT as user scrolls.
  const shopOffset = isLargeDesktop
    ? { card2: -367, card3: -733, card4: -1100 }
    : { card2: -277, card3: -553, card4: -830 };
  const shopCard1X = useTransform(shopScrollProgress, [0, 1], [0, 0]);
  const shopCard2X = useTransform(
    shopScrollProgress,
    [0, 1],
    [shopOffset.card2, 0],
  );
  const shopCard3X = useTransform(
    shopScrollProgress,
    [0, 1],
    [shopOffset.card3, 0],
  );
  const shopCard4X = useTransform(
    shopScrollProgress,
    [0, 1],
    [shopOffset.card4, 0],
  );

  // Beyond section scroll tracking
  const { scrollXProgress: beyondScrollProgress } = useScroll({
    target: beyondRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "start center"],
  });

  // Cards 2-4 start stacked behind card 1 (small + offset left), scale out simultaneously
  const beyondCardOffset = isLargeDesktop
    ? { card2: -430, card3: -860, card4: -1290 }
    : { card2: -296, card3: -592, card4: -888 };
  const beyondCard2X = useTransform(
    beyondScrollProgress,
    [0, 1],
    [beyondCardOffset.card2, 0],
  );
  const beyondCard3X = useTransform(
    beyondScrollProgress,
    [0, 1],
    [beyondCardOffset.card3, 0],
  );
  const beyondCard4X = useTransform(
    beyondScrollProgress,
    [0, 1],
    [beyondCardOffset.card4, 0],
  );
  const beyondCardsScale = useTransform(beyondScrollProgress, [0, 1], [0.3, 1]);

  // Newsletter section scroll tracking
  const { scrollXProgress: newsletterScrollProgress } = useScroll({
    target: newsletterRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "start center"],
  });

  // Newsletter description + form: scales in from top-right
  const newsletterScale = useTransform(
    newsletterScrollProgress,
    [0, 1],
    [0.3, 1],
  );
  const newsletterX = useTransform(newsletterScrollProgress, [0, 1], [80, 0]);
  const newsletterY = useTransform(newsletterScrollProgress, [0, 1], [-60, 0]);
  const newsletterOpacity = useTransform(
    newsletterScrollProgress,
    [0, 1],
    [0, 1],
  );

  // Author section scroll tracking
  const { scrollXProgress: authorScrollProgress } = useScroll({
    target: authorRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "start center"],
  });

  // Author text: scales in from top-left
  const authorTextScale = useTransform(authorScrollProgress, [0, 1], [0.3, 1]);
  const authorTextX = useTransform(authorScrollProgress, [0, 1], [-80, 0]);
  const authorTextY = useTransform(authorScrollProgress, [0, 1], [-60, 0]);
  const authorTextOpacity = useTransform(authorScrollProgress, [0, 1], [0, 1]);

  // Author image: scales in from bottom-left (gentle scale, not too small)
  const authorImageScale = useTransform(authorScrollProgress, [0, 1], [0.6, 1]);
  const authorImageX = useTransform(authorScrollProgress, [0, 1], [-60, 0]);
  const authorImageY = useTransform(authorScrollProgress, [0, 1], [40, 0]);
  const authorImageOpacity = useTransform(authorScrollProgress, [0, 1], [0, 1]);

  // Contact section scroll tracking
  const { scrollXProgress: contactScrollProgress } = useScroll({
    target: contactRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "start center"],
  });

  // Contact form: scales in from bottom-left
  const contactFormScale = useTransform(
    contactScrollProgress,
    [0, 1],
    [0.3, 1],
  );
  const contactFormX = useTransform(contactScrollProgress, [0, 1], [-80, 0]);
  const contactFormY = useTransform(contactScrollProgress, [0, 1], [60, 0]);
  const contactFormOpacity = useTransform(
    contactScrollProgress,
    [0, 1],
    [0, 1],
  );

  // Contact info: scales in from top-right
  const contactInfoScale = useTransform(
    contactScrollProgress,
    [0, 1],
    [0.3, 1],
  );
  const contactInfoX = useTransform(contactScrollProgress, [0, 1], [80, 0]);
  const contactInfoY = useTransform(contactScrollProgress, [0, 1], [-60, 0]);
  const contactInfoOpacity = useTransform(
    contactScrollProgress,
    [0, 1],
    [0, 1],
  );

  // Reviews section scroll tracking
  const { scrollXProgress: reviewsScrollProgress } = useScroll({
    target: reviewsRef,
    container: scrollContainerRef,
    axis: "x",
    offset: ["start end", "start center"],
  });

  // Apply useSpring to smooth out the scroll progress
  const smoothReviewsProgress = useSpring(reviewsScrollProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const reviewsOpacity = useTransform(smoothReviewsProgress, [0, 1], [0, 1]);
  const reviewsY = useTransform(smoothReviewsProgress, [0, 1], [60, 0]);

  // Two cards after the first come into view from bottom left with a bounce
  // We widened the bounce range from [0, 0.85, 1] to [0, 0.7, 1] so it feels less abrupt
  const reviewCard2X = useTransform(
    smoothReviewsProgress,
    [0, 0.7, 1],
    [-200, 0, 0],
  );
  const reviewCard2Y = useTransform(
    smoothReviewsProgress,
    [0, 0.7, 1],
    [200, 0, 0],
  );
  const reviewCard3X = useTransform(
    smoothReviewsProgress,
    [0, 0.7, 1],
    [-400, 0, 0],
  );
  const reviewCard3Y = useTransform(
    smoothReviewsProgress,
    [0, 0.7, 1],
    [400, 0, 0],
  );
  const reviewCardsScale = useTransform(
    smoothReviewsProgress,
    [0, 0.7, 1],
    [0.3, 1.05, 1],
  );

  useEffect(() => {
    document.body.classList.add("landing-page");
    return () => {
      document.body.classList.remove("landing-page");
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const timer = setTimeout(() => {
        scrollContainer.classList.remove("hide-scrollbar");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const book = bookRef.current;
    if (book) {
      const timer = setTimeout(() => {
        book.classList.add("transition-transform", "duration-300");
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || typeof window === "undefined") return;

    let targetScrollLeft = scrollContainer.scrollLeft;
    let animationFrameId: number | null = null;
    const ease = 0.1;

    const smoothScroll = () => {
      const current = scrollContainer.scrollLeft;
      const diff = targetScrollLeft - current;

      if (Math.abs(diff) > 0.5) {
        scrollContainer.scrollLeft = current + diff * ease;
        animationFrameId = requestAnimationFrame(smoothScroll);
      } else {
        scrollContainer.scrollLeft = targetScrollLeft;
        animationFrameId = null;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1280) return;
      e.preventDefault();

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetScrollLeft += delta;
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div>
      <main
        className="hide-scrollbar relative top-0 flex-none h-auto w-full overflow-x-hidden overflow-y-visible whitespace-normal xl:flex-1 xl:overflow-x-auto xl:overflow-y-hidden xl:whitespace-nowrap [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-[#f8f9fa] [&::-webkit-scrollbar-thumb]:bg-brand-purple2 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-brand-purple"
        id="scroll-container"
        ref={scrollContainerRef}
      >
        <div className="flex flex-col h-auto w-full xl:w-max! xl:h-full xl:flex-row">
          {/* 1. HERO SECTION */}
          <section
            className="relative w-full h-auto py-10 px-6 md:px-12 md:flex-row md:items-center xl:py-15 xl:px-0 bg-white flex flex-col-reverse gap-0 xl:border-none xl:h-[calc(100vh-120px)] 2xl:h-full xl:pt-0 xl:shrink-0 xl:inline-flex xl:flex-row xl:align-top xl:whitespace-normal xl:overflow-visible xl:w-max 2xl:w-max xl:gap-7.5 2xl:gap-20"
            id="hero"
          >
            <div className="flex flex-col justify-center w-full h-auto p-0 md:w-1/2 md:pr-0 xl:w-125 2xl:w-170! xl:pl-15 2xl:pl-25! xl:pr-0 xl:h-full relative z-10 xl:shrink-0 xl:pt-16 2xl:pt-0">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -80,
                  scale: 0.3,
                  transformOrigin: "left center",
                }}
                animate={{ opacity: 1, x: 0, scale: [0.3, 1.08, 1] }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  scale: { duration: 1.5, delay: 1, times: [0, 0.82, 1] },
                }}
                className="flex flex-row items-center md:flex-col lg:flex-row md:items-start lg:items-center md:gap-2 gap-3 mb-4 mt-8 md:mt-0 xl:gap-3.75 xl:mb-5 2xl:mb-7.5 xl:mt-0"
              >
                <svg
                  width="50"
                  height="6"
                  viewBox="0 0 50 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                    fill="black"
                  />
                </svg>
                <div className="font-serif text-[18px] font-bold text-brand-green2 xl:text-[24px] 2xl:text-[24px]! uppercase tracking-wider whitespace-nowrap">
                  New Book Now Available
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: 80,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.65,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-full"
              >
                <h1 className="font-serif text-[48px] md:text-[56px] font-bold leading-[1.1] text-brand-purple2 mb-4 xl:mb-5 xl:leading-[1.05] xl:text-[64px] 2xl:text-[96px]! whitespace-nowrap">
                  <span className="text-brand-purple2">Life beyond</span>
                  <br />
                  <span className="text-brand-purple italic">
                    the job title.
                  </span>
                </h1>
                <p className="font-unageo text-lg md:text-[17px] w-full font-light leading-normal text-brand-purple2 mb-7.5 xl:mb-7 xl:text-[16px] 2xl:mb-12 2xl:text-[22px]! whitespace-normal xl:w-full 2xl:w-full">
                  Out of Office is not a book about work. It is a playbook for
                  navigating failed ventures, difficult transitions, and the
                  courage to reinvent yourself, so you can step into the most
                  meaningful season of your life.&apos;
                </p>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -80,
                  scale: 0.3,
                  transformOrigin: "left center",
                }}
                animate={{ opacity: 1, x: 0, scale: [0.3, 1.08, 1] }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  scale: { duration: 1.5, delay: 1, times: [0, 0.82, 1] },
                }}
              >
                <Button
                  // render={<Link href="/shop/work-in-progress-0-0" />}
                  onClick={() => setOpenModal(true)}
                  className="group inline-flex! items-center justify-center w-full px-9 py-6 xl:px-0 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,204,141,0.4)] md:w-50 xl:w-40 2xl:w-55! xl:py-4 2xl:py-6! xl:text-sm 2xl:text-lg!"
                >
                  <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-[47px]"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Buy Out Of Office
                  </span>
                </Button>
              </motion.div>
            </div>

            <div className="flex items-center justify-start z-1 w-full h-auto relative left-auto top-auto md:w-1/2 md:justify-center xl:relative xl:py-0 xl:w-125 2xl:w-162.5! xl:left-auto xl:h-full xl:shrink-0 xl:items-center xl:justify-center xl:-ml-15 xl:mr-5">
              <motion.img
                initial={{
                  opacity: 0,
                  x: 80,
                  y: 80,
                  scale: 0.3,
                  transformOrigin: "bottom right",
                }}
                animate={{
                  opacity: 1,
                  x: [80, -6, 0],
                  y: [80, -6, 0],
                  scale: [0.3, 1.08, 1],
                  transformOrigin: "center",
                }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  x: { duration: 1.5, delay: 1, times: [0, 0.82, 1] },
                  y: { duration: 1.5, delay: 1, times: [0, 0.82, 1] },
                  scale: { duration: 1.5, delay: 1, times: [0, 0.82, 1] },
                }}
                ref={bookRef}
                src="hero-book.png"
                alt="Out of Office Book Cover"
                className="w-[120%] max-w-100 -ml-6 md:w-[130%] md:max-w-none md:scale-[1.15] lg:scale-[1.05] md:-mr-12 md:-ml-12 lg:-ml-20 h-auto xl:w-[125%] 2xl:w-[140%]! xl:h-auto xl:max-h-[105%] 2xl:max-h-[110%]! xl:object-contain xl:-ml-5 xl:mt-35 2xl:mt-25! xl:scale-100 2xl:scale-100!"
              />
            </div>
          </section>

          {/* 2. "THERE IS MORE" SECTION */}
          <section
            className="relative mt-20 flex flex-col md:flex-row md:items-start gap-7.5 w-full h-auto px-6 md:px-12 xl:px-0 xl:w-max 2xl:w-max xl:h-[calc(100vh-120px)] 2xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:flex-row xl:gap-0 2xl:gap-0 xl:-ml-12.5 2xl:-ml-20! xl:mr-2.5 2xl:mr-30 xl:mt-0 xl:pt-20 2xl:pt-31.25!"
            id="there-is-more"
            ref={thereIsMoreRef}
          >
            <div className="flex flex-col w-full h-auto md:w-1/2 md:pr-10 xl:pr-0 xl:w-140 2xl:w-200! 2xl:pr-0! xl:h-full xl:shrink-0 relative">
              <h2 className="font-serif text-[38px] max-w-full font-bold italic leading-[1.2] text-brand-purple2 xl:text-[56px] 2xl:text-[82px]! xl:leading-[1.1] 2xl:leading-[1.1]!">
                "There is{" "}
                <span className="text-brand-purple">more to life</span>
                <br className="hidden xl:block 2xl:hidden" /> than what you do
                for
                <br className="hidden xl:block 2xl:hidden" /> work."
              </h2>

              {/* Tablet/Desktop Icon (Hidden on mobile) - Animated */}
              <div className="relative left-auto top-auto w-full max-w-55 md:max-w-45 mx-auto md:mx-0 mt-8 h-auto py-5 pointer-events-none z-10 xl:absolute xl:max-w-none xl:mx-0 xl:left-auto xl:-right-15 2xl:-right-27.5! xl:-bottom-25 2xl:-bottom-27.5! xl:w-55 2xl:w-85! xl:h-auto 2xl:h-85! xl:py-0 hidden md:block overflow-visible">
                <svg
                  width="374"
                  height="387"
                  viewBox="0 0 374 387"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full object-contain overflow-visible"
                >
                  {/* Red circle - full circle + white inner square */}
                  <motion.g
                    {...(isDesktop
                      ? {
                          style: { x: redX },
                          animate: { opacity: 1, scale: 1 },
                        }
                      : {
                          initial: { opacity: 0, scale: 0 },
                          whileInView: { opacity: 1, scale: 1 },
                          viewport: { once: true },
                          transition: { duration: 1, delay: 0.2 },
                        })}
                  >
                    <circle cx="101.3" cy="257.1" r="86" fill="#FF0000" />
                    <path
                      d="M144.582 253.259L119.245 297.027C116.379 301.985 110.036 303.68 105.067 300.812L61.2988 275.475C56.3408 272.609 54.6458 266.266 57.512 261.308L82.8511 217.528C85.7173 212.57 92.0601 210.875 97.0181 213.742L140.798 239.081C145.756 241.947 147.451 248.29 144.582 253.259Z"
                      fill="white"
                    />
                  </motion.g>
                  {/* Green circle - full circle + white inner square */}
                  <motion.g
                    {...(isDesktop
                      ? {
                          style: { y: greenY },
                          animate: { opacity: 1, scale: 1 },
                        }
                      : {
                          initial: { opacity: 0, scale: 0 },
                          whileInView: { opacity: 1, scale: 1 },
                          viewport: { once: true },
                          transition: { duration: 1, delay: 0 },
                        })}
                  >
                    <circle cx="146.7" cy="101" r="83" fill="#00CC8D" />
                    <path
                      d="M180.599 129.843L131.668 142.617C126.129 144.066 120.46 140.745 119.013 135.195L106.239 86.2641C104.789 80.7254 108.11 75.0562 113.66 73.6091L162.591 60.8349C168.13 59.3854 173.799 62.7062 175.246 68.2564L188.02 117.188C189.47 122.726 186.149 128.395 180.599 129.843Z"
                      fill="white"
                    />
                  </motion.g>
                  {/* Purple circle - full circle + white inner square */}
                  <motion.g
                    {...(isDesktop
                      ? {
                          style: { x: purpleX },
                          animate: { opacity: 1, scale: 1 },
                        }
                      : {
                          initial: { opacity: 0, scale: 0 },
                          whileInView: { opacity: 1, scale: 1 },
                          viewport: { once: true },
                          transition: { duration: 1, delay: 0.4 },
                        })}
                  >
                    <circle cx="258.4" cy="213.3" r="83" fill="#5700FF" />
                    <path
                      d="M302.554 210.584L275.497 253.312C272.426 258.157 266.015 259.598 261.181 256.53L218.454 229.473C213.609 226.402 212.167 219.991 215.236 215.157L242.292 172.43C245.363 167.585 251.775 166.143 256.608 169.212L299.336 196.268C304.181 199.339 305.622 205.751 302.554 210.584Z"
                      fill="white"
                    />
                  </motion.g>
                </svg>
              </div>
            </div>

            <div
              // xl:w-112.5 2xl:w-162.5!
              className="relative lg:pl-20 md:w-1/2 xl:w-112.5  xl:shrink-0"
            >
              <motion.div
                {...(isDesktop
                  ? {
                      style: {
                        opacity: textOpacity,
                        scale: textScale,
                        x: textX,
                        y: textY,
                        transformOrigin: "bottom right",
                      },
                    }
                  : {
                      initial: { opacity: 0, y: 20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 1 },
                    })}
                className="flex flex-col w-full p-0 h-auto xl:h-full xl:pt-3 2xl:pt-6!"
              >
                <p className="font-unageo  lg:-mt-16! lg:max-w-75 text-[16px] font-light leading-[1.6] text-brand-purple2 xl:text-[24px] 2xl:text-[24px]! 2xl:leading-[1.6]! text-left">
                  This is a playbook for young professionals, entrepreneurs,
                  emerging leaders and leaders across every space of life who
                  are ready to take bold steps with their future. It offers
                  unconventional wisdom on how work really works, how life
                  really unfolds, and what it takes to navigate both with
                  clarity, courage and intent.
                  <br />
                  <br />
                </p>
              </motion.div>

              {/* Mobile Icon (Hidden on tablet/desktop) */}
              <div className="relative left-auto top-auto w-full max-w-55 mx-auto mt-8 h-auto py-5 pointer-events-none z-10 block md:hidden overflow-visible">
                <svg
                  width="374"
                  height="387"
                  viewBox="0 0 374 387"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full object-contain overflow-visible"
                >
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <circle cx="101.3" cy="257.1" r="86" fill="#FF0000" />
                    <path
                      d="M144.582 253.259L119.245 297.027C116.379 301.985 110.036 303.68 105.067 300.812L61.2988 275.475C56.3408 272.609 54.6458 266.266 57.512 261.308L82.8511 217.528C85.7173 212.57 92.0601 210.875 97.0181 213.742L140.798 239.081C145.756 241.947 147.451 248.29 144.582 253.259Z"
                      fill="white"
                    />
                  </motion.g>
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0 }}
                  >
                    <circle cx="146.7" cy="101" r="83" fill="#00CC8D" />
                    <path
                      d="M180.599 129.843L131.668 142.617C126.129 144.066 120.46 140.745 119.013 135.195L106.239 86.2641C104.789 80.7254 108.11 75.0562 113.66 73.6091L162.591 60.8349C168.13 59.3854 173.799 62.7062 175.246 68.2564L188.02 117.188C189.47 122.726 186.149 128.395 180.599 129.843Z"
                      fill="white"
                    />
                  </motion.g>
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    <circle cx="258.4" cy="213.3" r="83" fill="#5700FF" />
                    <path
                      d="M302.554 210.584L275.497 253.312C272.426 258.157 266.015 259.598 261.181 256.53L218.454 229.473C213.609 226.402 212.167 219.991 215.236 215.157L242.292 172.43C245.363 167.585 251.775 166.143 256.608 169.212L299.336 196.268C304.181 199.339 305.622 205.751 302.554 210.584Z"
                      fill="white"
                    />
                  </motion.g>
                </svg>
              </div>
            </div>
          </section>

          {/* 3. "insights" SECTION */}

          <section
            className="relative w-full h-auto py-10 px-6 md:px-12 md:flex-row sm:gap-10 md:items-center xl:py-15 xl:px-0 bg-white flex flex-col-reverse gap-0 xl:h-[calc(100vh-120px)] 2xl:h-full xl:pt-0 xl:shrink-0 xl:inline-flex xl:flex-row xl:align-top xl:whitespace-normal xl:overflow-visible xl:w-max 2xl:w-max xl:gap-7.5 2xl:gap-20"
            id="insights"
          >
            <div
              // xl:w-125 2xl:w-162.5! xl:-ml-26
              className=" flex items-center justify-start z-1 w-full h-auto relative left-auto top-auto md:w-1/2 md:justify-center xl:relative xl:py-0  xl:left-auto xl:h-full xl:shrink-0 xl:items-center xl:justify-center  xl:mr-5 perspective-[2500px]"
            >
              <motion.img
                initial={{
                  opacity: 0,
                  rotateY: -100,
                  transformOrigin: "center center",
                }}
                whileInView={{
                  opacity: 1,
                  rotateY: 0,
                  transformOrigin: "center center",
                }}
                animate={{
                  opacity: 0,
                  rotateY: -100,
                  transformOrigin: "center center",
                }}
                viewport={{ once: false, amount: 0.45 }}
                transition={{
                  rotateY: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                  opacity: {
                    duration: 0.16,
                    ease: "linear",
                  },
                }}
                ref={insightRef}
                src="bookM.png"
                alt="Out of Office Book Cover"
                className="w-[90%] max-w-100 md:w-[80%] md:max-w-none md:scale-[1.15] lg:scale-[1.05] md:-mr-12 md:-ml-12 lg:-ml-20 h-auto xl:w-[125%] 2xl:w-[140%]! xl:h-auto xl:max-h-[105%] 2xl:max-h-[110%]! xl:object-contain xl:-ml-5 xl:mt-35 2xl:mt-25! xl:scale-100 2xl:scale-100! transform-3d backface-hidden will-change-transform"
              />
            </div>
            <div
              //xl:w-125 2xl:w-170!
              className=" flex flex-col justify-center w-full h-auto p-0 md:w-1/2 md:pr-0  xl:pl-10 xl:pr-0 xl:h-full relative z-10 xl:shrink-0 xl:pt-16 2xl:pt-0"
            >
              <motion.div
                initial={{ opacity: 0, x: 100, y: -100 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col w-full p-0 h-auto xl:h-full xl:pt-3 2xl:pt-6!"
              >
                <p
                  id="insight-text"
                  className="font-unageo lg:max-w-80 text-lg md:text-[17px] w-full font-light leading-normal text-brand-purple2 mb-7.5 xl:mb-7 xl:text-[24px] 2xl:mb-12 2xl:text-[24px]! whitespace-normal xl:w-full 2xl:w-[265px]"
                >
                  Inside are hard earned insights on transitions, ambition,
                  failure and reinvention. It is a guide for those who refuse to
                  drift through life and are ready to make deliberate moves that
                  shape meaningful work, grounded success and a life that
                  actually reflects who they are becoming.
                </p>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -80,
                  scale: 0.3,
                  transformOrigin: "left center",
                }}
                animate={{ opacity: 1, x: 0, scale: [0.3, 1.08, 1] }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  scale: { duration: 1.5, delay: 1, times: [0, 0.82, 1] },
                }}
              >
                <Button
                  onClick={() => setOpenModal(true)}
                  // render={<Link href="/shop/work-in-progress-0-0" />}
                  className="group inline-flex! items-center justify-center w-full px-9 py-6 xl:px-0 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,204,141,0.4)] md:w-50 xl:w-40 2xl:w-55! xl:py-4 2xl:py-6! xl:text-sm 2xl:text-lg!"
                >
                  <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-[47px]"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Buy Out Of Office
                  </span>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* REVIEW SECTION */}
          <section
            className="flex flex-col w-full h-auto py-10 px-6 md:px-12 xl:pt-0 2xl:!pt-[24px] xl:pb-[16px] 2xl:pb-[60px] xl:px-6 xl:border-none xl:h-[calc(100vh-120px)] 2xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:w-max xl:justify-start xl:pr-[40px] 2xl:pr-[60px] bg-white"
            id="reviews"
            ref={reviewsRef}
          >
            {/* Header portion */}
            <div className="pl-0 xl:pl-16 mb-[30px] xl:mb-0 2xl:mb-[40px]">
              <div className="flex items-center gap-[12px] mb-[16px] xl:gap-[10px] xl:mb-[8px] 2xl:mb-[16px]">
                <svg
                  width="50"
                  height="6"
                  viewBox="0 0 50 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                    fill="#21015f"
                  />
                </svg>
                <div className="font-serif text-[14px] 2xl:text-[16px] font-bold text-[#21015f] tracking-wider uppercase">
                  REVIEWS
                </div>
              </div>
              <h2 className="font-serif text-[36px] 2xl:text-[48px] leading-[40px] font-bold text-[#21015f]  xl:leading-[1.08]">
                Words from Industry{" "}
                <span className="text-[#5700ff]">Leaders.</span>
              </h2>
            </div>

            {/* Testimonials List */}
            <div className="flex flex-col md:grid md:grid-cols-1 gap-[40px] p-0 xl:flex xl:flex-row xl:pl-[64px] xl:h-full xl:min-h-0 items-start pb-10 xl:pb-0">
              <div className="relative z-[3] flex-shrink-0">
                <ReviewCard
                  name="Adaobi Igwe-Okerekeocha"
                  title="Chief Innovation Officer, Interswitch"
                  text="What really stood out to me in this book is how honest it feels and how grounded the storytelling is. It’s not the usual “look how successful I became” story. It’s full of choices, mistakes, people, and the quiet lessons you only learn the hard way. Things we can all relate to."
                  fullText={
                    "What really stood out to me in this book is how honest it feels and how grounded the storytelling is. It’s not the usual “look how successful I became” story. It’s full of choices, mistakes, people, and the quiet lessons you only learn the hard way. Things we can all relate to.\n\nThe Wigwe chapter hit me the most. Saying no to that kind of money, prestige, and access is not something you see every day. It shows the value of knowing what really matters to you and being able to walk away even when everything looks perfect on the surface. That spoke to me.\n\nSolomon doesn’t skip over the difficult parts. The failed businesses, the tough bosses, the personal loss – they’re all in there, but he doesn’t stop at the pain. He shows how those seasons shaped him. That line about being “grace-sponsored and people-raised” stayed with me. It’s true. None of us gets to where we are by ourselves.\n\nWhat I see throughout the whole story is the reminder that purpose, people, and impact last longer than titles or paychecks. His time building innovation at WEMA shows that change is never smooth, but persistence and vision can still shift culture. And his take on leadership being about empathy, service, and giving people space to grow rings true for me."
                  }
                  imageSrc="/reviewer-adaobi.png"
                  imageWidth={308}
                  imageWidthClass="w-[308px] xl:w-[181px] 2xl:!w-[312px]"
                  themeColor="#5700ff"
                  badgeColor="#00cc8d"
                  frameClasses="rounded-tl-[28px] rounded-tr-0 rounded-br-0 rounded-bl-0"
                />
              </div>
              <motion.div
                {...(isDesktop
                  ? {
                      style: {
                        x: reviewCard2X,
                        y: reviewCard2Y,
                        scale: reviewCardsScale,
                        transformOrigin: "bottom left",
                      },
                      animate: { opacity: 1 },
                    }
                  : {
                      initial: { opacity: 0, x: 50 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.1 },
                    })}
                className="relative z-[2] flex-shrink-0"
              >
                <ReviewCard
                  name="Toyin Ogunmola"
                  title="Chief Data Officer, Stanbic IBTC Holdings"
                  text="I devoured the first section, 'What is my greatest achievement in life,' the same day you shared the manuscript with me, and I instantly knew this work isn't just a book; it’s an inspiration. Since then, I have turned its pages, nodding my head and sometimes becoming momentarily lost in thought about my own journey through life."
                  fullText={
                    "I devoured the first section, 'What is my greatest achievement in life,' the same day you shared the manuscript with me, and I instantly knew this work isn't just a book; it’s an inspiration. Since then, I have turned its pages, nodding my head and sometimes becoming momentarily lost in thought about my own journey through life. In response to your request for thoughts, I must say that your depth of reflection on life's journey is exceptional.\n\nAs I immersed myself in its pages, I saw mirrored images of my own triumphs and trials, victories and mistakes, alongside echoes of others' experiences vividly painted across its canvas. The storytelling is compelling, and the reflections coupled with the wisdom keys added at the end of each chapter are utterly captivating.\n\nThis book has the power to jolt anyone from passivity and sideline living into seizing divine moments, nudging readers to look inward to discover their 'gusto'—in harmony with their unique divine wiring. It strongly elevates the power of relationship, the dignity of labour, the power of wisdom, the essence of leadership, and the providence of God. It is simply a classic."
                  }
                  imageSrc="/reviewer-toyin.png"
                  imageWidth={259}
                  imageWidthClass="w-[259px] xl:w-[153px] 2xl:!w-[264px]"
                  themeColor="#da0000"
                  badgeColor="#5700ff"
                  frameClasses="rounded-none"
                />
              </motion.div>
              <motion.div
                {...(isDesktop
                  ? {
                      style: {
                        x: reviewCard3X,
                        y: reviewCard3Y,
                        scale: reviewCardsScale,
                        transformOrigin: "bottom left",
                      },
                      animate: { opacity: 1 },
                    }
                  : {
                      initial: { opacity: 0, x: 50 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.2 },
                    })}
                className="relative z-[1] flex-shrink-0"
              >
                <ReviewCard
                  name="Topsy Kola-Oyeneyin"
                  title="Partner, Augmentum Advisory | Board Member, MTN Nigeria"
                  text="Out of Office is not another career memoir; it is a call back to what truly accelerates growth: relationships, service, and purpose. Solomon shows us that the real thread of success is not luck or strategy, but the genuineness of people who believe in you, and the choices you make to keep adding value even when no one is watching."
                  fullText={
                    "Out of Office is not another career memoir; it is a call back to what truly accelerates growth: relationships, service, and purpose. Solomon shows us that the real thread of success is not luck or strategy, but the genuineness of people who believe in you, and the choices you make to keep adding value even when no one is watching.\n\nHis story confirms that every experience counts. Every season refines. Sometimes you’ll give your best, and there will be no applause. Give it anyway, and focus on building the assets that compound: character, competence, and community.\n\nI strongly recommend Out of Office to every young professional navigating the world of work, wrestling with decisions, and seeking the real secrets of growth. You will laugh, sigh, and nod in recognition, but most importantly, you will be reminded that the fastest path up is often found by going deep: into service, into relationships, into purpose."
                  }
                  imageSrc="/reviewer-topsy.png"
                  imageWidth={308}
                  imageWidthClass="w-[308px] xl:w-[181px] 2xl:!w-[312px]"
                  themeColor="#00af79"
                  badgeColor="#ff0000"
                  frameClasses="rounded-tr-[28px] rounded-tl-0 rounded-br-0 rounded-bl-0"
                />
              </motion.div>
            </div>
          </section>

          {/* 5. BEYOND THE BOOK SECTION */}
          <section
            className="flex flex-col w-full h-auto py-10 px-6 md:px-12 xl:pt-6 xl:pb-4 2xl:py-15 xl:px-6 xl:border-none xl:h-[calc(100vh-120px)] 2xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:w-max xl:justify-start xl:pr-10 2xl:pr-15"
            id="beyond-the-book"
            ref={beyondRef}
          >
            <div className="pl-0 mb-7.5 xl:pl-15 xl:mb-6 2xl:mb-10 2xl:pl-25!">
              <div className="flex items-center gap-3 mb-4 xl:gap-2.5 xl:mb-2 2xl:mb-4">
                <svg
                  className=""
                  width="50"
                  height="6"
                  viewBox="0 0 50 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                    fill="black"
                  />
                </svg>
                <div className="font-serif text-[13px] xl:text-[14px] 2xl:text-[16px]! font-bold text-brand-purple2">
                  BEYOND THE BOOK
                </div>
              </div>
              <h2 className="font-serif text-[36px] leading-10 font-bold text-brand-purple2 xl:text-[36px] 2xl:text-[48px]! xl:leading-[1.1] 2xl:leading-[1.05]! 2xl:pb-4.5">
                The OUT OF OFFICE{" "}
                <span className="text-brand-purple">Experience</span>
              </h2>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-7.5 p-0 xl:flex xl:flex-row xl:pl-15 2xl:pl-25! xl:h-full xl:min-h-0 xl:gap-4 2xl:gap-7.5! items-start">
              <div className="relative z-4 shrink-0">
                <BeyondCard
                  href="/coming-soon"
                  image="screenshots/beyond-community.webp"
                  clipId="beyond-clip-1"
                  title="Out of Office Community"
                  titleColor="text-brand-purple"
                  description="Join a growing space for thinkers, builders, and bold professionals who are redefining success beyond the desk."
                />
              </div>
              <motion.div
                ref={insightsTextRef}
                {...(isDesktop
                  ? {
                      style: {
                        x: beyondCard2X,
                        scale: beyondCardsScale,
                        transformOrigin: "top left",
                        y: 0,
                      },
                      animate: { opacity: 1, y: 0 },
                    }
                  : {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.1 },
                    })}
                className="relative z-3 shrink-0"
              >
                <BeyondCard
                  href="/coming-soon"
                  image="screenshots/beyond-podcast.webp"
                  clipId="beyond-clip-2"
                  title="Out of Office Podcast"
                  titleColor="text-[#00AF79]"
                  description="Real conversations on work, life, purpose, and the in between. Stories from people who stepped outside the expected."
                />
              </motion.div>
              <motion.div
                {...(isDesktop
                  ? {
                      style: {
                        x: beyondCard3X,
                        scale: beyondCardsScale,
                        transformOrigin: "top left",
                        y: 0,
                      },
                      animate: { opacity: 1, y: 0 },
                    }
                  : {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.2 },
                    })}
                className="relative z-2 shrink-0"
              >
                <BeyondCard
                  href="/coming-soon"
                  image="screenshots/beyond-tours.webp"
                  clipId="beyond-clip-3"
                  title="Out of Office Tour"
                  titleColor="text-[#DA0000]"
                  description="A live experience that moves across cities, gathering leaders to rethink life, work, and what it means to truly live fully."
                />
              </motion.div>
              <motion.div
                {...(isDesktop
                  ? {
                      style: {
                        x: beyondCard4X,
                        scale: beyondCardsScale,
                        transformOrigin: "top left",
                        y: 0,
                      },
                      animate: { opacity: 1, y: 0 },
                    }
                  : {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.3 },
                    })}
                className="relative z-1 shrink-0"
              >
                <BeyondCard
                  href="/coming-soon"
                  image="screenshots/Subtract.webp"
                  clipId="beyond-clip-4"
                  title="Out of Office Newsletter"
                  titleColor="text-brand-purple"
                  description="A weekly dose of unconventional wisdom, honest insights, and practical perspective for people choosing a different path."
                />
              </motion.div>
            </div>
          </section>

          {/* 5. AUTHOR SECTION */}
          <section
            className="flex flex-col md:flex-row md:flex-wrap md:items-center xl:items-start w-full h-auto py-10 px-6 md:px-12 xl:pt-6 2xl:py-15 xl:px-6 gap-10 xl:gap-0 2xl:gap-10 relative xl:h-full 2xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:w-max xl:pr-6 2xl:pr-15 xl:pb-0 2xl:pb-0 xl:flex-nowrap"
            id="author"
            ref={authorRef}
          >
            <div className="w-full md:w-[45%] md:pr-0 p-0 h-auto flex flex-col justify-center xl:justify-start text-left items-start z-1 shrink-0 xl:w-87.5 2xl:w-150! xl:p-[16px_0_16px_24px] 2xl:p-[16px_0_64px_100px]! xl:h-full">
              <div className="flex items-center gap-3 mb-4 xl:gap-2.5 xl:mb-2 2xl:mb-3">
                <svg
                  className=""
                  width="50"
                  height="6"
                  viewBox="0 0 50 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                    fill="black"
                  />
                </svg>
                <div className="font-serif text-[13px] xl:text-[14px] 2xl:text-[16px]! font-bold text-brand-purple2">
                  THE AUTHOR
                </div>
              </div>
              <h2 className="font-serif text-[48px] font-bold leading-[1.08] text-brand-purple2 mb-5 xl:text-[42px] 2xl:text-[52px]! xl:mb-4 2xl:mb-10!">
                <span className="text-[#21015F]">Solomon</span>
                <br />
                <span className="text-[#5700FF] italic">Ayodele</span>
              </h2>
              <motion.p
                {...(isDesktop
                  ? {
                      style: {
                        opacity: authorTextOpacity,
                        scale: authorTextScale,
                        x: authorTextX,
                        y: authorTextY,
                        transformOrigin: "top left",
                      },
                    }
                  : {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 1 },
                    })}
                className="font-sans text-[18px] font-light leading-[1.68] text-brand-purple2 text-left xl:text-[14px] 2xl:text-[22px]! 2xl:leading-[1.6]!"
              >
                Solomon O. Ayodele is one of Africa's leading voices where
                innovation, leadership, and social transformation converge. With
                over a decade of experience in product and technology within the
                banking and financial technology ecosystem, he has built a
                reputation for designing and scaling customer-centered
                solutions, leading high-impact teams, and driving meaningful
                business transformation where people, product, process, and
                technology meet.
              </motion.p>

              <Button
                render={<Link href="/author" />}
                className="group mt-8 inline-flex! items-center justify-center w-full px-9 py-6 xl:px-0 rounded-[47px] bg-brand-green text-brand-[#18063A] font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,204,141,0.4)] md:w-50 xl:w-55 xl:py-4 2xl:py-6! xl:text-sm 2xl:text-lg!"
              >
                <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-[47px]"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Read More
                </span>
              </Button>
            </div>

            <motion.div
              {...(isDesktop
                ? {
                    style: {
                      opacity: authorImageOpacity,
                      scale: authorImageScale,
                      x: authorImageX,
                      y: authorImageY,
                      transformOrigin: "bottom left",
                    },
                  }
                : {
                    initial: { opacity: 0, y: 30, scale: 0.8 },
                    whileInView: { opacity: 1, y: 0, scale: 1 },
                    viewport: { once: true },
                    transition: { duration: 1 },
                  })}
              className="w-full md:w-[45%] py-5 h-auto ml-0 top-0 relative z-2 shrink-0 flex items-start justify-start md:justify-end xl:items-end xl:justify-end xl:w-87.5 2xl:w-137.5! xl:h-full 2xl:h-full! xl:top-0 xl:ml-0 xl:mr-5 xl:py-0 2xl:py-0 2xl:top-auto 2xl:ml-0! 2xl:mr-0"
            >
              <div className="w-full max-w-[320px] h-105 mx-0 md:ml-auto bg-transparent overflow-hidden flex items-end justify-start xl:items-end xl:justify-center xl:w-full xl:max-w-none xl:h-full 2xl:h-full">
                <img
                  src="author-portrait.png"
                  alt="Solomon Ayodele"
                  className="w-full h-full object-cover object-bottom block xl:w-auto xl:h-full xl:max-h-full xl:object-contain xl:object-bottom"
                />
              </div>
            </motion.div>

            {/* <motion.div
              {...(!isDesktop
                ? {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 1, delay: 0.15 },
                  }
                : { animate: { opacity: 1, y: 0 } })}
              className="flex flex-col w-full md:w-full h-auto p-0 gap-7.5 z-1 shrink-0 md:flex-row md:mt-0 xl:w-170 2xl:w-275! xl:h-full 2xl:h-full xl:gap-5 2xl:gap-10! xl:pt-4 xl:flex-row xl:self-center xl:ml-5 2xl:ml-0!"
            >
              <div className="w-full md:w-1/2 flex items-start flex-col xl:w-82.5 2xl:w-130!">
                <p className="font-sans text-[18px] font-light leading-[1.68] text-left xl:text-justify text-brand-purple2 xl:text-[14px] 2xl:text-[22px]! 2xl:leading-[1.6]!">
                  His professional journey spans critical roles such as his time
                  at Standard Bank Group, where he contributed to advancing
                  digital strategy, led end-to-end product development,
                  facilitated enterprise-wide design thinking, and forged
                  strategic partnerships that strengthened innovation culture
                  across the organization. He currently leads as Head of Product
                  & Technology Innovation at Wema Bank Plc, and serves as an
                  advisory board member of three high-growth startups across
                  Africa spanning health, legal, and financial services.
                </p>
                <p
                  className="font-sans text-[18px] font-light leading-[1.68] text-left xl:text-justify text-brand-purple2 xl:text-[14px] 2xl:text-[22px]! 2xl:leading-[1.6]!"
                  style={{ paddingTop: "10px" }}
                >
                  Beyond the boardroom, Solomon is the Founder of Boys Quarters
                  Africa, a pioneering social movement committed to raising a
                  generation of emotionally grounded, socially responsible, and
                  purpose-driven boys and men.
                </p>
              </div>

              <div className="flex flex-col w-full md:w-1/2 xl:w-82.5 2xl:w-130!">
                <p className="font-sans text-[18px] font-light leading-[1.68] text-left xl:text-justify text-brand-purple2 xl:text-[14px] 2xl:text-[22px]! 2xl:leading-[1.6]!">
                  Through this work, he has built a global platform for
                  redefining masculinity and leadership, engaging over 2 million
                  boys and men across Africa through grassroots programs, policy
                  engagement, and community transformation initiatives.
                </p>
                <p
                  className="font-sans text-[18px] font-light leading-[1.68] text-left xl:text-justify text-brand-purple2 xl:text-[14px] 2xl:text-[22px]! 2xl:leading-[1.6]!"
                  style={{ paddingTop: "10px" }}
                >
                  In recognition of his work, he is a two-time recipient of The
                  Future Awards Africa Prize for Intrapreneurship and for
                  Activism and Advocacy, reflecting both his influence within
                  corporate innovation and his commitment to societal change.
                  His life's work is driven by a clear conviction: to shape the
                  future of Africa through his faith, voice and the enabling
                  power of technology.
                </p>

                <motion.div
                  {...(!isDesktop
                    ? {
                        initial: { opacity: 0, x: 40 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true },
                        transition: { duration: 1, delay: 0.2 },
                      }
                    : { animate: { opacity: 1, x: 0 } })}
                  className="mt-8 flex flex-col items-start gap-2.5 xl:mt-8 xl:gap-1.5 2xl:gap-4!"
                >
                  <h4 className="font-sans text-[20px] font-medium leading-[1.68] text-brand-purple2 xl:text-[14px] 2xl:text-[24px]!">
                    Connect with Solomon
                  </h4>
                  <div className="flex gap-2.5 2xl:gap-4!">
                    <a
                      href="https://www.linkedin.com/in/soar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social w-10.5 h-9 rounded-[18px] 2xl:w-14! 2xl:h-12! 2xl:rounded-3xl! border border-brand-purple bg-transparent text-brand-purple flex items-center justify-center cursor-pointer no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white hover:border-brand-purple [&>svg]:w-4.5 [&>svg]:h-4.5 2xl:[&>svg]:w-6! 2xl:[&>svg]:h-6! hover:[&_.ig-inner]:fill-brand-purple"
                      aria-label="LinkedIn"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.4491 20.4496H16.8931V14.8805C16.8931 13.5525 16.8694 11.8429 15.0436 11.8429C13.1915 11.8429 12.9081 13.2899 12.9081 14.7838V20.4492H9.35203V8.99689H12.7658V10.562H12.8136C13.1553 9.97782 13.649 9.49726 14.2421 9.17149C14.8352 8.84572 15.5056 8.68693 16.1819 8.71203C19.7861 8.71203 20.4506 11.0828 20.4506 14.167L20.4491 20.4496ZM5.33963 7.43144C4.93148 7.43151 4.53247 7.31055 4.19307 7.08385C3.85367 6.85715 3.58913 6.53489 3.43287 6.15783C3.27661 5.78077 3.23566 5.36584 3.31521 4.96551C3.39477 4.56517 3.59125 4.19743 3.8798 3.90876C4.16835 3.6201 4.53602 3.42348 4.93631 3.34378C5.3366 3.26408 5.75152 3.30488 6.12863 3.46101C6.50573 3.61713 6.82807 3.88158 7.05489 4.22091C7.2817 4.56025 7.40281 4.95922 7.40288 5.36738C7.40293 5.63839 7.34959 5.90675 7.24593 6.15715C7.14227 6.40754 6.99032 6.63507 6.79873 6.82674C6.60714 7.0184 6.37966 7.17045 6.1293 7.27421C5.87895 7.37796 5.61062 7.43139 5.33963 7.43144ZM7.11765 20.4496H3.5579V8.99689H7.11765V20.4496ZM22.222 0.00163516H1.77099C1.30681 -0.00360329 0.859518 0.175663 0.52744 0.500042C0.195362 0.824421 0.00566506 1.26737 0 1.73156V22.2681C0.00547117 22.7325 0.195057 23.1758 0.527123 23.5005C0.85919 23.8252 1.30658 24.0048 1.77099 23.9999H22.222C22.6873 24.0057 23.1359 23.8266 23.469 23.5019C23.8027 23.1772 23.9936 22.7334 24 22.2681V1.73008C23.9934 1.26497 23.8024 0.821515 23.469 0.497144C23.1356 0.172773 22.6871 -0.00598143 22.222 0.000152822"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/thesolomonayodele/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social w-10.5 h-9 rounded-[18px] 2xl:w-14! 2xl:h-12! 2xl:rounded-3xl! border border-brand-purple bg-transparent text-brand-purple flex items-center justify-center cursor-pointer no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white hover:border-brand-purple [&>svg]:w-4.5 [&>svg]:h-4.5 2xl:[&>svg]:w-6! 2xl:[&>svg]:h-6! hover:[&_.ig-inner]:fill-brand-purple"
                      aria-label="Instagram"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9727 -0.0625C6.94974 -0.0625 5.48072 -0.0573162 5.19517 -0.0336251C4.16438 0.0520814 3.52297 0.214427 2.82417 0.562428C2.28564 0.829924 1.86092 1.13998 1.44176 1.57463C0.678384 2.36727 0.21573 3.34244 0.0482458 4.50161C-0.0331772 5.06435 -0.0568685 5.17912 -0.0616795 8.05354C-0.0635257 9.01168 -0.0616795 10.2727 -0.0616795 11.964C-0.0616795 16.9843 -0.0561319 18.4522 -0.0320678 18.7373C0.0512104 19.7406 0.208508 20.3718 0.541621 21.0623C1.17824 22.384 2.39408 23.3762 3.82646 23.7464C4.32243 23.8741 4.87021 23.9445 5.57344 23.9778C5.87139 23.9907 8.90824 24 11.9469 24C14.9857 24 18.0244 23.9963 18.3149 23.9815C19.1292 23.9432 19.602 23.8797 20.1248 23.7445C21.5664 23.3725 22.7601 22.3951 23.4096 21.0549C23.7363 20.3811 23.9019 19.7258 23.9769 18.7748C23.9932 18.5675 24 15.262 24 11.9609C24 8.65922 23.9926 5.35979 23.9763 5.15246C23.9004 4.18618 23.7348 3.53644 23.3976 2.84967C23.121 2.28749 22.8138 1.86765 22.3678 1.43839C21.5718 0.677946 20.5984 0.215164 19.4384 0.0478253C18.8764 -0.0334431 18.7644 -0.0575071 15.8886 -0.0625H11.9727Z"
                          fill="currentColor"
                        />
                        <path
                          className="ig-inner"
                          d="M11.9737 3.02734C9.54398 3.02734 9.23905 3.03796 8.28474 3.08136C7.3323 3.12494 6.68218 3.27561 6.11332 3.4967C5.5249 3.72504 5.02575 4.03048 4.52847 4.52758C4.03082 5.0245 3.72513 5.52327 3.49588 6.11108C3.27407 6.6797 3.1231 7.32952 3.08023 8.28088C3.03755 9.23448 3.02637 9.53937 3.02637 11.9673C3.02637 14.3953 3.03718 14.699 3.08042 15.6526C3.12422 16.6044 3.27501 17.254 3.49606 17.8224C3.72476 18.4104 4.03044 18.9092 4.5279 19.4061C5.02501 19.9034 5.52415 20.2096 6.1122 20.4379C6.68142 20.659 7.33174 20.8097 8.28399 20.8533C9.2383 20.8967 9.54304 20.9073 11.9726 20.9073C14.4025 20.9073 14.7065 20.8967 15.6609 20.8533C16.6133 20.8097 17.2642 20.659 17.8334 20.4379C18.4216 20.2096 18.92 19.9034 19.4171 19.4061C19.9148 18.9092 20.2205 18.4104 20.4497 17.8226C20.6696 17.254 20.8206 16.6042 20.8654 15.6528C20.9082 14.6992 20.9194 14.3953 20.9194 11.9673C20.9194 9.53936 20.9082 9.23467 20.8654 8.28107C20.8206 7.32933 20.6696 6.6797 20.4497 6.11127C20.2205 5.52327 19.9148 5.02449 19.4171 4.52758C18.9195 4.03029 18.4218 3.72485 17.8328 3.49669C17.2625 3.27561 16.612 3.12494 15.6596 3.08136C14.7052 3.03796 14.4014 3.02734 11.9709 3.02734H11.9737ZM11.1711 4.6384C11.4093 4.63803 11.6751 4.6384 11.9737 4.6384C14.3625 4.6384 14.6456 4.64697 15.5889 4.68981C16.4612 4.72967 16.9346 4.87531 17.25 4.99767C17.6675 5.15971 17.9652 5.35341 18.2781 5.66631C18.5912 5.97921 18.7851 6.27721 18.9476 6.69441C19.0701 7.00917 19.216 7.48224 19.2557 8.35389C19.2986 9.29631 19.3079 9.57941 19.3079 11.9653C19.3079 14.3511 19.2986 14.6342 19.2557 15.5766C19.2158 16.4483 19.0701 16.9214 18.9476 17.2361C18.7855 17.6533 18.5912 17.9504 18.2781 18.2631C17.965 18.576 17.6677 18.7697 17.25 18.9317C16.935 19.0547 16.4612 19.1999 15.5889 19.2398C14.6458 19.2826 14.3625 19.2919 11.9737 19.2919C9.58479 19.2919 9.30167 19.2826 8.35855 19.2398C7.48626 19.1996 7.01284 19.0539 6.69728 18.9316C6.27977 18.7695 5.98154 18.5758 5.66842 18.2629C5.35528 17.95 5.16144 17.6528 4.99891 17.2354C4.87645 16.9206 4.73051 16.4475 4.69081 15.5759C4.64794 14.6335 4.63937 14.3504 4.63937 11.963C4.63937 9.57569 4.64794 9.29407 4.69081 8.35166C4.7307 7.48001 4.87645 7.00694 4.99891 6.6918C5.16106 6.2746 5.35528 5.9766 5.66842 5.66371C5.98154 5.3508 6.27977 5.15711 6.69728 4.9947C7.01265 4.87177 7.48626 4.7265 8.35855 4.68645C9.18387 4.6492 9.50372 4.63803 11.1711 4.63616V4.6384ZM16.7494 6.12281C16.1566 6.12281 15.6758 6.60278 15.6758 7.19523C15.6758 7.78751 16.1566 8.26803 16.7494 8.26803C17.3421 8.26803 17.823 7.78751 17.823 7.19523C17.823 6.60296 17.3421 6.12244 16.7494 6.12244V6.12281ZM11.9737 7.37626C9.43643 7.37626 7.37927 9.4319 7.37927 11.9673C7.37927 14.5027 9.43643 16.5574 11.9737 16.5574C14.511 16.5574 16.5674 14.5027 16.5674 11.9673C16.5674 9.4319 14.5108 7.37626 11.9735 7.37626H11.9737ZM11.9737 8.98733C13.6206 8.98733 14.9559 10.3214 14.9559 11.9673C14.9559 13.613 13.6206 14.9473 11.9737 14.9473C10.3266 14.9473 8.99152 13.613 8.99152 11.9673C8.99152 10.3214 10.3266 8.98733 11.9737 8.98733Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/thesolomonayo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social w-10.5 h-9 rounded-[18px] 2xl:w-14! 2xl:h-12! 2xl:rounded-3xl! border border-brand-purple bg-transparent text-brand-purple flex items-center justify-center cursor-pointer no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white hover:border-brand-purple [&>svg]:w-4.5 [&>svg]:h-4.5 2xl:[&>svg]:w-6! 2xl:[&>svg]:h-6! hover:[&_.ig-inner]:fill-brand-purple"
                      aria-label="X"
                    >
                      <svg
                        width="24"
                        height="22"
                        viewBox="0 0 24 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.8431 0H22.4964L14.5169 9.1812L23.9384 21.6311H16.5358L10.7675 14.0843L4.13395 21.6311H0.480691L9.037 11.825L0 0H7.59492L12.8345 6.92195L18.8431 0ZM17.5452 19.4199H19.5641L6.48933 2.06697H4.27815L17.5452 19.4199Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.solomonayodele.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social w-10.5 h-9 rounded-[18px] 2xl:w-14! 2xl:h-12! 2xl:rounded-3xl! border border-brand-purple bg-transparent text-brand-purple flex items-center justify-center cursor-pointer no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white hover:border-brand-purple [&>svg]:w-4.5 [&>svg]:h-4.5 2xl:[&>svg]:w-6! 2xl:[&>svg]:h-6! hover:[&_.ig-inner]:fill-brand-purple"
                      aria-label="Website"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.92531 22.3951C6.89031 22.3951 6.84365 22.4185 6.80865 22.4185C4.54531 21.2985 2.70198 19.4435 1.57031 17.1801C1.57031 17.1451 1.59365 17.0985 1.59365 17.0635C3.01698 17.4835 4.48698 17.7985 5.94531 18.0435C6.20198 19.5135 6.50531 20.9718 6.92531 22.3951Z"
                          fill="currentColor"
                        />
                        <path
                          d="M22.4299 17.1918C21.2749 19.5135 19.3499 21.3918 17.0049 22.5235C17.4482 21.0418 17.8215 19.5485 18.0665 18.0435C19.5365 17.7985 20.9832 17.4835 22.4065 17.0635C22.3949 17.1101 22.4299 17.1568 22.4299 17.1918Z"
                          fill="currentColor"
                        />
                        <path
                          d="M22.5232 6.9949C21.0532 6.55156 19.5715 6.1899 18.0665 5.93323C17.8215 4.42823 17.4599 2.9349 17.0049 1.47656C19.4199 2.63156 21.3682 4.5799 22.5232 6.9949Z"
                          fill="currentColor"
                        />
                        <path
                          d="M6.9249 1.60531C6.5049 3.02865 6.20156 4.47531 5.95656 5.94531C4.45156 6.17865 2.95823 6.55198 1.47656 6.99531C2.60823 4.65031 4.48656 2.72531 6.80823 1.57031C6.84323 1.57031 6.8899 1.60531 6.9249 1.60531Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16.072 5.68801C13.3654 5.38467 10.6354 5.38467 7.92871 5.68801C8.22038 4.08967 8.59371 2.49134 9.11871 0.951341C9.14204 0.858008 9.13038 0.788008 9.14204 0.694674C10.0637 0.473008 11.0087 0.333008 12.0004 0.333008C12.9804 0.333008 13.937 0.473008 14.847 0.694674C14.8587 0.788008 14.8587 0.858008 14.882 0.951341C15.407 2.50301 15.7804 4.08967 16.072 5.68801Z"
                          fill="currentColor"
                        />
                        <path
                          d="M5.68801 16.072C4.07801 15.7804 2.49134 15.407 0.951341 14.882C0.858008 14.8587 0.788008 14.8704 0.694674 14.8587C0.473008 13.937 0.333008 12.992 0.333008 12.0004C0.333008 11.0204 0.473008 10.0637 0.694674 9.15371C0.788008 9.14204 0.858008 9.14204 0.951341 9.11871C2.50301 8.60538 4.07801 8.22038 5.68801 7.92871C5.39634 10.6354 5.39634 13.3654 5.68801 16.072Z"
                          fill="currentColor"
                        />
                        <path
                          d="M23.6665 12.0004C23.6665 12.992 23.5265 13.937 23.3049 14.8587C23.2115 14.8704 23.1415 14.8587 23.0482 14.882C21.4965 15.3954 19.9099 15.7804 18.3115 16.072C18.6149 13.3654 18.6149 10.6354 18.3115 7.92871C19.9099 8.22038 21.5082 8.59371 23.0482 9.11871C23.1415 9.14204 23.2115 9.15371 23.3049 9.15371C23.5265 10.0754 23.6665 11.0204 23.6665 12.0004Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16.072 18.3115C15.7804 19.9215 15.407 21.5082 14.882 23.0482C14.8587 23.1415 14.8587 23.2115 14.847 23.3049C13.937 23.5265 12.9804 23.6665 12.0004 23.6665C11.0087 23.6665 10.0637 23.5265 9.14204 23.3049C9.13038 23.2115 9.14204 23.1415 9.11871 23.0482C8.60538 21.4965 8.22038 19.9215 7.92871 18.3115C9.28204 18.4632 10.6354 18.5682 12.0004 18.5682C13.3654 18.5682 14.7304 18.4632 16.072 18.3115Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16.3902 16.3902C13.4723 16.7584 10.5271 16.7584 7.60912 16.3902C7.24097 13.4723 7.24097 10.5271 7.60912 7.60912C10.5271 7.24097 13.4723 7.24097 16.3902 7.60912C16.7584 10.5271 16.7584 13.4723 16.3902 16.3902Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div> */}
          </section>

          {/* 5 SHOP SECTION */}
          <section
            className="w-full h-auto py-10 px-6 md:px-12 xl:pt-6 2xl:py-15 xl:px-6 bg-white flex flex-col gap-1.5 xl:border-none xl:h-[calc(100vh-120px)] 2xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:overflow-visible xl:w-max xl:justify-start xl:pr-15"
            id="shop"
            ref={shopRef}
          >
            <div className="pl-0 mb-7.5 xl:pl-6 2xl:pl-25! xl:mb-4 2xl:mb-10">
              <div className="flex items-center gap-3 mb-4 xl:gap-2.5 xl:mb-2 2xl:mb-3">
                <svg
                  width="50"
                  height="6"
                  viewBox="0 0 50 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                    fill="black"
                  />
                </svg>
                <div className="font-cormorant text-[13px] font-bold text-brand-purple2 xl:text-[16px] 2xl:text-[16px]!">
                  THE SHOP
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 w-full md:flex-row md:justify-start md:gap-6 md:items-center xl:items-center xl:gap-8 2xl:pb-4.5">
                <h2 className="font-cormorant text-4xl font-bold text-brand-purple2 xl:text-[42px] 2xl:text-[48px]! tracking-tight">
                  Wear the <span className="text-brand-purple">movement</span>
                </h2>
                <Button
                  render={<Link href="/shop" />}
                  className="group inline-flex! items-center justify-center w-full md:w-auto md:px-10 px-7 py-6 rounded-[47px] bg-brand-green text-brand-purple2 font-ui text-base font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-[0_4px_14px_rgba(0,204,141,0.2)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,204,141,0.4)] xl:w-auto xl:py-2 xl:px-6 2xl:px-9! 2xl:py-5! 2xl:text-lg!"
                >
                  <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-[47px]"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Shop Now
                  </span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 p-0 w-full xl:flex xl:flex-row xl:h-full xl:min-h-0 xl:gap-4 2xl:gap-7.5! xl:pl-6 2xl:pl-25!">
              <motion.div
                {...(isDesktop
                  ? { style: { x: shopCard1X }, animate: { opacity: 1 } }
                  : {
                      initial: { opacity: 0, x: -40 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { duration: 1 },
                    })}
                className="relative z-1"
              >
                {product1 !== null && product1 !== undefined && (
                  <ShopCard
                    product={product1}
                    title={product1?.name ?? "T-Shirt"}
                    image={product1?.primaryImageUrl ?? "shirt"}
                    // bgColor="bg-[#FFEEF5]"
                    // features={["4 Colours", "Sizes: S, M, L, XL"]}
                    imagePosition="-bottom-2 -right-4"
                  />
                )}
              </motion.div>
              <motion.div
                {...(isDesktop
                  ? { style: { x: shopCard2X }, animate: { opacity: 1 } }
                  : {
                      initial: { opacity: 0, x: 40 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.1 },
                    })}
                className="relative z-2"
              >
                {product2 !== null && product2 !== undefined && (
                  <ShopCard
                    product={product2}
                    title={product2?.name ?? "Book"}
                    image={product2?.primaryImageUrl ?? "journal"}
                    // bgColor="bg-[#CCF4E9]"
                    // features={["3 Colours", "Sizes: S, M, L, XL"]}
                    // price="₦32,000"
                    imagePosition="-bottom-4 -right-8"
                  />
                )}
              </motion.div>
              <motion.div
                {...(isDesktop
                  ? { style: { x: shopCard3X }, animate: { opacity: 1 } }
                  : {
                      initial: { opacity: 0, x: -40 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.2 },
                    })}
                className="relative z-3"
              >
                {product3 !== null && product3 !== undefined && (
                  <ShopCard
                    product={product3}
                    title={product3?.name ?? "Cap"}
                    image={product3?.primaryImageUrl ?? "cap"}
                    // bgColor="bg-[#DECCFF]"
                    // features={["4 Colours", "Sizes: S, M, L, XL"]}
                    imagePosition="-bottom-3 -right-3"
                  />
                )}
              </motion.div>
              <motion.div
                {...(isDesktop
                  ? { style: { x: shopCard4X }, animate: { opacity: 1 } }
                  : {
                      initial: { opacity: 0, x: 40 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { duration: 1, delay: 0.3 },
                    })}
                className="relative z-4"
              >
                {product4 !== null && product4 !== undefined && (
                  <ShopCard
                    product={product4}
                    title={product4?.name ?? "Journal"}
                    image={product4?.primaryImageUrl ?? "journal"}
                    // bgColor="bg-[#FEEECB]"
                    // features={["4 Colours", "1,500 Pages"]}
                    imagePosition="-bottom-2 -right-4"
                  />
                )}
              </motion.div>
            </div>
          </section>

          {/* Newsletter and Contact Tablet Wrapper */}
          <div className="w-full flex flex-col xl:contents">
            {/* 6. NEWSLETTER SECTION */}
            <section
              className="w-full h-auto py-10 px-6 md:px-12 xl:pt-6 xl:pb-4 2xl:py-10! xl:px-0 xl:border-none xl:inline-flex xl:align-top flex-col xl:h-[calc(100vh-120px)] 2xl:h-full xl:w-112.5 2xl:w-187.5! xl:shrink-0 xl:whitespace-normal"
              id="newsletter"
              ref={newsletterRef}
            >
              <div className="w-full p-0 flex flex-col h-full xl:justify-start xl:px-10 2xl:pl-25! 2xl:pr-10!">
                <div className="flex items-center gap-3 mb-4 xl:gap-2.5 xl:mb-2 2xl:mb-4!">
                  <svg
                    className=""
                    width="50"
                    height="6"
                    viewBox="0 0 50 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                      fill="black"
                    />
                  </svg>
                  <div className="font-serif text-[13px] xl:text-[14px] 2xl:text-[16px]! font-bold text-brand-purple2">
                    THE NEWSLETTER
                  </div>
                </div>
                <div className="max-w-125 2xl:max-w-175!">
                  <h2 className="font-serif text-[48px] font-bold leading-[1.1] text-brand-purple2 mb-4 xl:text-[42px] 2xl:text-[96px]! xl:mb-3 2xl:mb-6! xl:leading-[1.08] whitespace-normal 2xl:whitespace-nowrap">
                    <span style={{ color: "#21015F" }}>Stay in</span>{" "}
                    <span style={{ color: "#5700FF" }}>the loop</span>
                  </h2>
                  <motion.p
                    {...(isDesktop
                      ? {
                          style: {
                            opacity: newsletterOpacity,
                            scale: newsletterScale,
                            x: newsletterX,
                            y: newsletterY,
                            transformOrigin: "top right",
                          },
                        }
                      : {
                          initial: { opacity: 0, y: 20 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { duration: 1 },
                        })}
                    className="font-sans text-[18px] font-light leading-[1.68] text-brand-purple2 mb-6 xl:text-[14px] 2xl:text-[22px]! 2xl:mb-10! 2xl:leading-[1.6]!"
                  >
                    Join thousands of readers who get weekly reflections on
                    purpose, identity, and what it means to live a full life.
                  </motion.p>
                </div>

                <motion.form
                  {...(isDesktop
                    ? {
                        style: {
                          opacity: newsletterOpacity,
                          scale: newsletterScale,
                          x: newsletterX,
                          y: newsletterY,
                          transformOrigin: "top right",
                        },
                      }
                    : {
                        initial: { opacity: 0, y: 20 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: { duration: 1, delay: 0.15 },
                      })}
                  className="flex flex-col gap-6 w-full items-start xl:w-auto xl:gap-4 2xl:gap-8!"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Subscribed successfully!");
                  }}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full xl:w-75 2xl:w-120! h-12.5 xl:h-10 2xl:h-15! shrink-0 rounded-[40px] border border-brand-purple2 px-6 2xl:px-7.5! font-sans text-[14px] 2xl:text-[18px]! text-brand-purple2 bg-transparent outline-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"
                    required
                  />
                  <Button
                    type="submit"
                    className="group shrink-0 inline-flex! items-center justify-center w-full xl:w-30 2xl:w-45! py-6 xl:py-4 2xl:py-6! rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[16px] xl:text-[14px] 2xl:text-[18px]! font-medium tracking-[-0.02em] no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,204,141,0.4)]"
                  >
                    <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-[47px]"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      Subscribe
                    </span>
                  </Button>
                </motion.form>
              </div>
            </section>

            {/* 7. CONTACT SECTION */}
            <section
              className="flex flex-col w-full h-auto py-10 px-6 md:px-12 xl:pt-6 xl:pb-4 2xl:py-10! xl:px-0 relative items-start xl:inline-flex xl:align-top xl:flex-row xl:h-[calc(100vh-120px)] 2xl:h-full xl:justify-start xl:w-max xl:pr-10 2xl:pr-24! xl:shrink-0 xl:whitespace-normal"
              id="contact"
              ref={contactRef}
            >
              <div className="w-full p-0 h-auto flex flex-col justify-center xl:justify-start shrink-0 xl:w-90 2xl:w-140! xl:pl-10 2xl:pl-15! xl:h-[calc(100vh-120px)] 2xl:h-full">
                <div className="flex items-center gap-3 mb-4 xl:gap-2.5 xl:mb-2 2xl:mb-4!">
                  <svg
                    className=""
                    width="50"
                    height="6"
                    viewBox="0 0 50 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.3333 2.66699C44.3333 4.13975 45.5272 5.33366 47 5.33366C48.4728 5.33366 49.6667 4.13975 49.6667 2.66699C49.6667 1.19423 48.4728 0.000325441 47 0.000325441C45.5272 0.000325441 44.3333 1.19423 44.3333 2.66699ZM0 2.66699V3.16699H47V2.66699V2.16699H0V2.66699Z"
                      fill="black"
                    />
                  </svg>
                  <div className="font-serif text-[13px] xl:text-[14px] 2xl:text-[16px]! font-bold text-brand-purple2">
                    GET IN TOUCH
                  </div>
                </div>
                <h2 className="font-serif text-[48px] font-bold leading-[1.08] text-brand-purple2 mb-6 xl:text-[42px] 2xl:text-[96px]! xl:mb-4 2xl:mb-6! whitespace-normal 2xl:whitespace-nowrap">
                  Let's <span className="text-brand-purple">Talk</span>
                </h2>

                <motion.form
                  {...(isDesktop
                    ? {
                        style: {
                          opacity: contactFormOpacity,
                          scale: contactFormScale,
                          x: contactFormX,
                          y: contactFormY,
                          transformOrigin: "bottom left",
                        },
                      }
                    : {
                        initial: { opacity: 0, y: 30 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: { duration: 1 },
                      })}
                  className="flex flex-col gap-0 items-start w-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Message sent successfully!");
                  }}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full xl:w-70 2xl:w-120! h-12.5 xl:h-10 2xl:h-15! mb-4 xl:mb-3 2xl:mb-6! shrink-0 rounded-[40px] border border-brand-purple2 px-6 2xl:px-7.5! font-sans text-[14px] 2xl:text-[18px]! text-brand-purple2 bg-transparent outline-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full xl:w-70 2xl:w-120! h-12.5 xl:h-10 2xl:h-15! mb-4 xl:mb-3 2xl:mb-6! shrink-0 rounded-[40px] border border-brand-purple2 px-6 2xl:px-7.5! font-sans text-[14px] 2xl:text-[18px]! text-brand-purple2 bg-transparent outline-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"
                    required
                  />
                  <textarea
                    placeholder="How can we help you?"
                    className="w-full xl:w-70 2xl:w-120! h-25 xl:h-20 2xl:h-35! mb-6 xl:mb-4 2xl:mb-8! shrink-0 rounded-[20px] 2xl:rounded-[30px]! border border-brand-purple2 p-[20px_24px] 2xl:p-[20px_30px] font-sans text-[14px] 2xl:text-[18px]! text-brand-purple2 bg-transparent outline-none resize-none transition-all duration-300 ease focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,0,255,0.1)]"
                    required
                  ></textarea>
                  <Button
                    type="submit"
                    className="group shrink-0 inline-flex! items-center justify-center w-full xl:w-37.5 2xl:w-45! py-6 xl:py-4 2xl:py-6! rounded-[47px] bg-[#00CC8D] text-brand-purple2 font-ui text-[16px] xl:text-[14px] 2xl:text-[18px]! font-medium no-underline border-none cursor-pointer relative overflow-hidden transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(33,1,95,0.15)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,204,141,0.4)]"
                  >
                    <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-[47px]"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      Send Message
                    </span>
                  </Button>
                </motion.form>
                <div className="hidden xl:block xl:mt-auto xl:pb-6 xl:mb-2 font-sans text-[13px] 2xl:text-[16px]! text-brand-purple2 opacity-60">
                  <p>
                    © {new Date().getFullYear()} Solomon Ayodele · Out of Office
                  </p>
                </div>
              </div>

              <motion.div
                {...(isDesktop
                  ? {
                      style: {
                        opacity: contactInfoOpacity,
                        scale: contactInfoScale,
                        x: contactInfoX,
                        y: contactInfoY,
                        transformOrigin: "top right",
                      },
                    }
                  : {
                      initial: { opacity: 0 },
                      whileInView: { opacity: 1 },
                      viewport: { once: true },
                      transition: { duration: 1 },
                    })}
                className="flex flex-col w-full px-0 pt-15 gap-7.5 h-auto shrink-0 md:items-start xl:w-80 2xl:w-115! xl:pl-5 2xl:pl-15! xl:pt-9 2xl:pt-13.75! xl:justify-start xl:gap-6 2xl:gap-10! xl:items-start"
              >
                {/* Web detail */}
                <motion.div
                  {...(!isDesktop
                    ? {
                        initial: { opacity: 0, y: 20 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: { duration: 1, delay: 0 },
                      }
                    : { animate: { opacity: 1, y: 0 } })}
                  className="flex items-center gap-4 xl:gap-4 2xl:gap-6!"
                >
                  <div className="w-11 h-11 rounded-xl bg-[rgba(87,0,255,0.078)] border-none flex items-center justify-center shrink-0 text-brand-purple xl:w-10.5 xl:h-10.5 2xl:w-16! 2xl:h-16! 2xl:rounded-[20px]! [&>svg]:w-6 [&>svg]:h-6 2xl:[&>svg]:w-8! 2xl:[&>svg]:h-8!">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99961 3H8.99961C7.04961 8.84 7.04961 15.16 8.99961 21H7.99961"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3C16.95 8.84 16.95 15.16 15 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 8.99961C8.84 7.04961 15.16 7.04961 21 8.99961"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-brand-purple2 leading-[1.2] text-[18px] xl:text-[16px] 2xl:text-[24px]!">
                      Website
                    </span>
                    <a
                      href="https://www.solomonayodele.com/"
                      className="font-serif text-[16px] font-medium text-[#5700FF] no-underline transition-colors duration-300 ease hover:text-brand-purple2 2xl:text-[24px]!"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.solomonayodele.com
                    </a>
                  </div>
                </motion.div>

                {/* Email detail */}
                <motion.div
                  {...(!isDesktop
                    ? {
                        initial: { opacity: 0, y: 20 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: { duration: 1, delay: 0.15 },
                      }
                    : { animate: { opacity: 1, y: 0 } })}
                  className="flex items-center gap-4 xl:gap-4 2xl:gap-6!"
                >
                  <div className="w-11 h-11 rounded-xl bg-[rgba(87,0,255,0.078)] border-none flex items-center justify-center shrink-0 text-brand-purple xl:w-10.5 xl:h-10.5 2xl:w-16! 2xl:h-16! 2xl:rounded-[20px]! [&>svg]:w-6 [&>svg]:h-6 2xl:[&>svg]:w-8! 2xl:[&>svg]:h-8!">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-brand-purple2 leading-[1.2] text-[18px] xl:text-[16px] 2xl:text-[24px]!">
                      Email
                    </span>
                    <a
                      href="mailto:contact.solomonayodele@gmail.com"
                      className="font-serif text-[16px] font-medium text-[#5700FF] no-underline transition-colors duration-300 ease hover:text-brand-purple2 2xl:text-[24px]!"
                    >
                      contact.solomonayodele@gmail.com
                    </a>
                    <a
                      href="mailto:me@solomonayodele.com"
                      className="font-serif text-[16px] font-medium text-[#5700FF] no-underline transition-colors duration-300 ease hover:text-brand-purple2 2xl:text-[24px]!"
                    >
                      me@solomonayodele.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone detail */}
                <motion.div
                  {...(!isDesktop
                    ? {
                        initial: { opacity: 0, y: 20 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: { duration: 1, delay: 0.3 },
                      }
                    : { animate: { opacity: 1, y: 0 } })}
                  className="flex items-center gap-4 xl:gap-4 2xl:gap-6!"
                >
                  <div className="w-11 h-11 rounded-xl bg-[rgba(87,0,255,0.078)] border-none flex items-center justify-center shrink-0 text-brand-purple xl:w-10.5 xl:h-10.5 2xl:w-16! 2xl:h-16! 2xl:rounded-[20px]! [&>svg]:w-6 [&>svg]:h-6 2xl:[&>svg]:w-8! 2xl:[&>svg]:h-8!">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 7V17C20 21 19 22 15 22H9C5 22 4 21 4 17V7C4 3 5 2 9 2H15C19 2 20 3 20 7Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 5.5H10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.0002 19.1C12.8562 19.1 13.5502 18.406 13.5502 17.55C13.5502 16.694 12.8562 16 12.0002 16C11.1442 16 10.4502 16.694 10.4502 17.55C10.4502 18.406 11.1442 19.1 12.0002 19.1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-brand-purple2 leading-[1.2] text-[18px] xl:text-[16px] 2xl:text-[24px]!">
                      Phone
                    </span>
                    <a
                      href="tel:+2347037373284"
                      className="font-serif text-[16px] font-medium text-[#5700FF] no-underline transition-colors duration-300 ease hover:text-brand-purple2 2xl:text-[24px]!"
                    >
                      +234 810 391 0919
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </section>
          </div>
          <div className="w-full xl:hidden">
            <Footer />
          </div>
        </div>
      </main>

      <CountryConfirmationModal
        isOpen={openModal}
        onDone={() => setOpenModal(false)}
      />
    </div>
  );
}
