import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function isProductNsfw(product) {
  // Kiểm tra trường nsfw khác null, undefined, rỗng
  return product && product.nsfw != null && product.nsfw !== false;
}

const useNsfwGuard = (product) => {
  const [showNsfwWarning, setShowNsfwWarning] = useState(false);
  const navigate = useNavigate();

  const isNsfw = isProductNsfw(product);

  useEffect(() => {
    if (isNsfw) {
      // Luôn hiển thị cảnh báo khi sản phẩm là NSFW
      setShowNsfwWarning(true);
    } else {
      setShowNsfwWarning(false);
    }
  }, [isNsfw]);

  const handleEnterNsfw = () => {
    // Chỉ đóng cảnh báo, không lưu trạng thái
    setShowNsfwWarning(false);
  };

  const handleExitNsfw = () => {
    setShowNsfwWarning(false);
    // Quay lại trang trước nếu đang ở detail, hoặc đóng modal nếu có callback
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return {
    isNsfw,
    showNsfwWarning,
    handleEnterNsfw,
    handleExitNsfw,
  };
};

export default useNsfwGuard;
