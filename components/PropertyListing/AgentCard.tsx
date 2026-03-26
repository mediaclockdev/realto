"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { ImageSource } from "@/lib/shared/types";

import "swiper/css";
import "swiper/css/effect-flip";

interface Agent {
  name: string;
  company: string;
  license: string;
  experience: number;
  sales: number;
  agentImage: ImageSource;
}

interface AgentCardStackProps {
  agents: Agent[];
}

const AgentCardStack: React.FC<AgentCardStackProps> = ({ agents }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleCardClick = () => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    if (swiper.isEnd) {
      swiper.slideTo(0);
    } else {
      swiper.slideNext();
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-4">
      <Swiper
        effect="flip"
        grabCursor={true}
        modules={[EffectFlip, Autoplay]}
        className="agent-flip-swiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        flipEffect={{
          slideShadows: false,
          limitRotation: true,
        }}
        style={{ width: 260, height: 360 }}
      >
        {agents.map((agent, i) => (
          <SwiperSlide
            key={i}
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
          >
            <CardFace agent={agent} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .agent-flip-swiper .swiper-slide {
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

const CardFace: React.FC<{ agent: Agent }> = ({ agent }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      borderRadius: 20,
      background: "#daeaf5",
      border: "1px solid #bdd4e5",
      boxShadow: "0 10px 40px rgba(60,100,140,0.18)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 30,
      paddingBottom: 26,
      paddingLeft: 20,
      paddingRight: 20,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: 108,
        height: 108,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid rgba(255,255,255,0.9)",
        boxShadow: "0 4px 18px rgba(60,100,140,0.22)",
        marginBottom: 14,
        flexShrink: 0,
      }}
    >
      <Image
        src={agent.agentImage}
        alt={agent.name}
        width={108}
        height={108}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>

    <p
      style={{
        color: "#2d3a45",
        fontSize: 16,
        fontWeight: 600,
        margin: "0 0 4px",
        textAlign: "center",
      }}
    >
      {agent.name}
    </p>
    <p
      style={{
        color: "#1a2a38",
        fontSize: 21,
        fontWeight: 800,
        margin: "0 0 8px",
        textAlign: "center",
        letterSpacing: -0.4,
      }}
    >
      {agent.company}
    </p>
    <p
      style={{ color: "#9ab3c6", fontSize: 12, margin: 0, textAlign: "center" }}
    >
      License#{agent.license}
    </p>

    <div
      style={{
        width: "80%",
        height: 1,
        background: "rgba(150,190,220,0.4)",
        margin: "18px 0 16px",
      }}
    />

    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", flex: 1 }}>
        <p
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#1a2a38",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {agent.experience} <span style={{ fontSize: 14 }}>Yrs</span>
        </p>
        <p style={{ fontSize: 11, color: "#9ab3c6", margin: "4px 0 0" }}>
          Experience
        </p>
      </div>
      <div
        style={{
          width: 1,
          background: "rgba(150,190,220,0.4)",
          margin: "0 8px",
        }}
      />
      <div style={{ textAlign: "center", flex: 1 }}>
        <p
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#1a2a38",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {agent.sales} <span style={{ fontSize: 14 }}>Sales</span>
        </p>
        <p style={{ fontSize: 11, color: "#9ab3c6", margin: "4px 0 0" }}>
          Past 1 year
        </p>
      </div>
    </div>
  </div>
);

export default AgentCardStack;
