import { useState } from "react";

const useLayout = (defaultLayout = "grid4") => {
  const [selectedLayout, setSelectedLayout] = useState(defaultLayout);
  const [showLayout, setShowLayout] = useState(true);

  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);
  };

  const toggleLayoutVisibility = () => {
    setShowLayout(!showLayout);
  };

  return {
    selectedLayout,
    showLayout,
    handleLayoutChange,
    toggleLayoutVisibility,
  };
};

export default useLayout;
