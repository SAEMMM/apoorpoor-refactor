"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Snackbar, { type AppSnackbarVariant } from "./index";

type ShowSnackbarOptions = {
  message: string;
  variant?: AppSnackbarVariant;
};

type SnackbarContextValue = {
  showSnackbar: (options: ShowSnackbarOptions) => void;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }

  return context;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<ShowSnackbarOptions>({
    message: "",
  });

  const showSnackbar = useCallback((options: ShowSnackbarOptions) => {
    setSnackbar(options);
    setOpen(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        message={snackbar.message}
        variant={snackbar.variant}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </SnackbarContext.Provider>
  );
}
