import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollGallery() {
  useEffect(() => {
    // لكل صورة نعمل حركة دخول بانحناءة
    gsap.utils.toArray(".photo").forEach((photo, i) => {
      gsap.fromTo(
        photo,
        {
          opacity: 0,
          y: 150,
          rotate: i % 2 === 0 ? -10 : 10,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: photo,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  // صور تجريبية
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  ];

  return (
    <div className="scroll-gallery">
      {images.map((src, i) => (
        <div className="photo" key={i}>
          <img src={src} alt={`photo-${i}`} />
        </div>
      ))}
    </div>
  );
}
