import React from "react";
import { useGeneralPageData } from "../pages/general";

export const useNotification = () => {
  const { openNotification } = useGeneralPageData();
  
  const showSuccess = React.useCallback(
    (title: React.ReactNode, description?: React.ReactNode) => {
      openNotification("success", title, description);
    },
    [openNotification],
  );

  const showError = React.useCallback(
    (title: React.ReactNode, description: React.ReactNode) => {
      openNotification("error", title, description);
    },
    [openNotification],
  );

  return {
    showSuccess,
    showError,
  };
};
