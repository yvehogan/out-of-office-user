"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import adaobi from "@/assets/images/review/adabobi.png";
import adaIcon from "@/assets/images/review/adaobiIcon.svg";
import toyin from "@/assets/images/review/toyin.png";
import toyinIcon from "@/assets/images/review/toyinIcon.svg";
import topsy from "@/assets/images/review/topsy.png";
import topsyIcon from "@/assets/images/review/topsyIcon.svg";
import Image, { StaticImageData } from "next/image";

interface Reviewer {
  id: number;
  name: string;
  title: string;
  preview: string;
  full: string[];
  bgColor: string;
  borderColor: string;
  tagBgColor: string;
  image: StaticImageData;
  starBadgeColor: StaticImageData;
}

const reviewers: Reviewer[] = [
  {
    id: 1,
    name: "Adaobi Igwe-Okerekeocha",
    title: "Chief Innovation Officer, Interswitch",
    preview:
      "What really stood out to me in this book is how honest it feels and how grounded the storytelling is. It's not the usual \"look how successful I became\" story. It's full of choices, mistakes, people, and the quiet lessons you only learn the hard way. Things we can all relate to.",
    full: [
      "What really stood out to me in this book is how honest it feels and how grounded the storytelling is. It's not the usual \"look how successful I became\" story. It's full of choices, mistakes, people, and the quiet lessons you only learn the hard way. Things we can all relate to.",
      "The Wigwe chapter hit me the most. Saying no to that kind of money, prestige, and access is not something you see every day. It shows the value of knowing what really matters to you and being able to walk away even when everything looks perfect on the surface. That spoke to me.",
      "Solomon doesn't skip over the difficult parts. The failed businesses, the tough bosses, the personal loss – they're all in there, but he doesn't stop at the pain. He shows how those seasons shaped him. That line about being \"grace-sponsored and people-raised\" stayed with me. It's true. None of us gets to where we are by ourselves.",
      "What I see throughout the whole story is the reminder that purpose, people, and impact last longer than titles or paychecks. His time building innovation at WEMA shows that change is never smooth, but persistence and vision can still shift culture. And his take on leadership being about empathy, service, and giving people space to grow rings true for me.",
    ],
    bgColor: "#5700FF",
    borderColor: "#5700FF",
    tagBgColor: "rgba(255, 255, 255, 0.2)",
    image: adaobi,
    starBadgeColor: adaIcon,
  },
  {
    id: 2,
    name: "Toyin Ogunmola",
    title: "Chief Data Officer, Stanbic IBTC Holdings",
    preview:
      "I devoured the first section, 'What is my greatest achievement in life,' the same day you shared the manuscript with me, and I instantly knew this work isn't just a book; it's an inspiration. Since then, I have turned its pages, nodding my head and sometimes becoming momentarily lost in thought about my own journey through life.",
    full: [
      "I devoured the first section, 'What is my greatest achievement in life,' the same day you shared the manuscript with me, and I instantly knew this work isn't just a book; it's an inspiration. Since then, I have turned its pages, nodding my head and sometimes becoming momentarily lost in thought about my own journey through life. In response to your request for thoughts, I must say that your depth of reflection on life's journey is exceptional.",
      "As I immersed myself in its pages, I saw mirrored images of my own triumphs and trials, victories and mistakes, alongside echoes of others' experiences vividly painted across its canvas. The storytelling is compelling, and the reflections coupled with the wisdom keys added at the end of each chapter are utterly captivating.",
      "This book has the power to jolt anyone from passivity and sideline living into seizing divine moments, nudging readers to look inward to discover their 'gusto'—in harmony with their unique divine wiring. It strongly elevates the power of relationship, the dignity of labour, the power of wisdom, the essence of leadership, and the providence of God. It is simply a classic.",
    ],
    bgColor: "#DA0000",
    borderColor: "#DA0000",
    tagBgColor: "rgba(255, 255, 255, 0.2)",
    image: toyin,
    starBadgeColor: toyinIcon,
  },
  {
    id: 3,
    name: "Topsy Kola-Oyeneyin",
    title: "Partner, Augmentum Advisory | Board Member, MTN Nigeria",
    preview:
      "Out of Office is not another career memoir; it is a call back to what truly accelerates growth: relationships, service, and purpose. Solomon shows us that the real thread of success is not luck or strategy, but the genuineness of people who believe in you, and the choices you make to keep adding value even when no one is watching.",
    full: [
      "Out of Office is not another career memoir; it is a call back to what truly accelerates growth: relationships, service, and purpose. Solomon shows us that the real thread of success is not luck or strategy, but the genuineness of people who believe in you, and the choices you make to keep adding value even when no one is watching.",
      "His story confirms that every experience counts. Every season refines. Sometimes you'll give your best, and there will be no applause. Give it anyway, and focus on building the assets that compound: character, competence, and community.",
      "I strongly recommend Out of Office to every young professional navigating the world of work, wrestling with decisions, and seeking the real secrets of growth. You will laugh, sigh, and nod in recognition, but most importantly, you will be reminded that the fastest path up is often found by going deep: into service, into relationships, into purpose.",
    ],
    bgColor: "#00AF79",
    borderColor: "#00AF79",
    tagBgColor: "rgba(255, 255, 255, 0.2)",
    image: topsy,
    starBadgeColor: topsyIcon,
  },
];

function ReviewCard({
  reviewer,
  index,
}: {
  reviewer: Reviewer;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const isInView = useInView(cardRef, {
    once: false,
    margin: "0px 0px -60px 0px",
  });

  const visible = index === 0 ? true : isInView;
  const cornerClass =
    index === 0
      ? "rounded-[28px] rounded-tr-none"
      : index === 1
        ? "rounded-b-[28px]"
        : "rounded-[28px] rounded-tl-none";

  return (
    <motion.div
      ref={cardRef}
      initial={index === 0 ? false : { opacity: 0, y: 80, scale: 0.78 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 80, scale: 0.78 }
      }
      transition={{
        duration: 0.48,
        delay: visible && index > 0 ? (index - 1) * 0.1 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className={`relative w-109.5 h-152 overflow-hidden ${cornerClass}`}
        style={{ border: `4px solid ${reviewer.borderColor}` }}
      >
        {/* BASE CARD */}
        <div className="flex flex-col h-full">
          {/* Photo — sits inside the border, no negative margin */}
          <div className="relative w-86 h-90 ">
            <Image
              src={reviewer.image}
              alt={reviewer.name}
              className="object-cover object-top"
            />
            <div className="absolute -bottom-4 -right-8 ">
              <Image
                src={reviewer.starBadgeColor}
                alt="Tag"
                className="w-34 h-17.5"
              />
            </div>
          </div>

          {/* Text — flex-1 fills remaining card height */}
          <div
            className="flex flex-col gap-2.75 p-4 flex-1"
            style={{ backgroundColor: reviewer.bgColor }}
          >
            <div>
              <h3 className="text-white font-cormorant font-bold text-lg leading-snug">
                {reviewer.name}
              </h3>
              <span
                className="inline-block mt-2 text-xs px-1.5 py-1 rounded-full text-white font-medium"
                style={{ backgroundColor: reviewer.tagBgColor }}
              >
                {reviewer.title}
              </span>
            </div>
            <p className="text-white text-sm tracking-normal line-clamp-5 opacity-95">
              {reviewer.preview}
            </p>
            <button
              onClick={() => setExpanded(true)}
              className="text-white font-bold underline underline-offset-2 text-sm self-start hover:opacity-75 transition-opacity"
            >
              Read More
            </button>
          </div>
        </div>

        {/* EXPANDED DRAWER */}
        <motion.div
          initial={false}
          animate={{ y: expanded ? "0%" : "100%" }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 flex flex-col gap-4 overflow-y-auto p-5"
          style={{ backgroundColor: reviewer.bgColor }}
        >
          <div>
            <h3 className="text-white font-bold text-xl leading-snug">
              {reviewer.name}
            </h3>
            <span
              className="inline-block mt-2 text-xs px-3 py-1 rounded-full text-white font-medium"
              style={{ backgroundColor: reviewer.tagBgColor }}
            >
              {reviewer.title}
            </span>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            {reviewer.full.map((para, i) => (
              <p
                key={i}
                className="text-white text-sm leading-relaxed opacity-95"
              >
                {para}
              </p>
            ))}
          </div>

          <button
            onClick={() => setExpanded(false)}
            className="text-white font-bold underline underline-offset-2 text-sm self-start hover:opacity-75 transition-opacity"
          >
            Back
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="flex border border-red-400 -mt-8!  flex-col w-full h-auto py-10 px-6 md:px-12 xl:pt-6 xl:pb-4 2xl:py-15 xl:px-6  xl:h-[calc(100vh-120px)] 2xl:h-full xl:shrink-0 xl:inline-flex xl:align-top xl:whitespace-normal xl:w-max xl:justify-start xl:pr-10 2xl:pr-15">
      {/* Header */}

      <div className="pl-0 mb-7.5 xl:pl-15 xl:mb-6  2xl:pl-25!">
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
            REVIEWS
          </div>
        </div>
        <h2 className="font-serif text-[36px] leading-10 font-bold text-brand-purple2 xl:text-[36px] 2xl:text-[48px]! xl:leading-[1.1] 2xl:leading-[1.05]! 2xl:pb-4.5">
          Words from Industry{" "}
          <span className="text-brand-purple">Leaders.</span>
        </h2>
      </div>
      {/* Cards */}

      <div className="flex flex-col md:grid md:grid-cols-2 gap-7.5 p-0 xl:flex xl:flex-row xl:pl-15 2xl:pl-25! xl:h-full xl:min-h-0 xl:gap-4 2xl:gap-7.5! items-start">
        {reviewers.map((reviewer, index) => (
          <ReviewCard key={reviewer.id} reviewer={reviewer} index={index} />
        ))}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"></div> */}
    </section>
  );
}
