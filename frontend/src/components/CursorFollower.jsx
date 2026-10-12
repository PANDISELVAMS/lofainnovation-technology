import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dotRef = useRef(null);
  useEffect(() => {
    const dot = dotRef.current;
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (dot) dot.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-5 w-5 rounded-full border border-accent-400/70 bg-accent-400/20 mix-blend-difference md:block" />;
}
