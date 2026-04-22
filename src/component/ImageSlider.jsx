import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const slides = [
  {
    img: "https://picsum.photos/1200/500?1",
    title: "AI Resume Analyzer",
    desc: "Boost your resume ATS score instantly",
    btn: "/resume-analyzer",
  },
  {
    img: "https://picsum.photos/1200/500?2",
    title: "Chat with PDF",
    desc: "Ask anything from your documents",
    btn: "/chatwithpdf",
  },
  {
    img: "https://picsum.photos/1200/500?3",
    title: "Fast & Secure",
    desc: "Lightning fast AI with full data protection",
    btn: "/",
  },
];

const ImageSlider = () => {
  return (
    <div className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 w-full px-2 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop={true}

        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-55 sm:h-87.5 md:h-112.5">
                {/* IMAGE */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent flex items-center">
                  {/* CONTENT */}
                  <div className="px-4 sm:px-10 text-white max-w-lg">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2">
                      {slide.title}
                    </h2>

                    <p className="text-xs sm:text-base md:text-lg mb-4 text-gray-300">
                      {slide.desc}
                    </p>

                    <Link
                      to={slide.btn}
                      className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-red-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:scale-105 transition-transform duration-300"
                    >
                      Explore <FaRocket />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSlider;
