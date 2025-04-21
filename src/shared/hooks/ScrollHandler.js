import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
  const location = useLocation(); // Lấy route hiện tại

  useEffect(() => {
    const elements = document.querySelectorAll(".unseen");

    // Kiểm tra nếu chưa có hiệu ứng thì mới reset, tránh giật
    elements.forEach((el) => {
      if (!el.classList.contains("animateIn")) {
        el.classList.remove("animateOut");
        el.classList.add("unseen");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animateIn");
            entry.target.classList.remove("unseen", "animateOut");
          } else {
            entry.target.classList.add("animateOut");
            entry.target.classList.remove("animateIn");
          }
        });
      },
      { threshold: 0 } // Chỉ kích hoạt khi ít nhất 50% phần tử vào viewport
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]); // Mỗi lần route thay đổi, chạy lại hiệu ứng

  return null; // Không render gì cả
};

export default ScrollHandler;
