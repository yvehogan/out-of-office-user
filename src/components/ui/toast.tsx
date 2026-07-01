"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──
export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

type ToastListener = (toast: ToastData) => void;

// ── Pub/Sub Emitter for Outside-React usage (e.g. Axios Interceptors) ──
const listeners = new Set<ToastListener>();

export const toast = {
  show: (message: string, type: ToastType = "info", duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toastData: ToastData = { id, message, type, duration };
    listeners.forEach((listener) => listener(toastData));
    return id;
  },
  success: (message: string, duration?: number) => {
    return toast.show(message, "success", duration);
  },
  error: (message: string, duration?: number) => {
    return toast.show(message, "error", duration);
  },
  info: (message: string, duration?: number) => {
    return toast.show(message, "info", duration);
  },
  warning: (message: string, duration?: number) => {
    return toast.show(message, "warning", duration);
  },
};

// ── Context for inside React components (optional helper) ──
interface ToastContextType {
  toasts: ToastData[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return toast; // Fallback to direct static toast API if used outside provider
  }
  return context;
}

// ── Provider Component ──
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (message: string, type: ToastType, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Subscribe to the static toast emitter
  useEffect(() => {
    const handleNewToast = (newToast: ToastData) => {
      setToasts((prev) => [...prev, newToast]);
    };

    listeners.add(handleNewToast);
    return () => {
      listeners.delete(handleNewToast);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// ── Toast Container Component ──
function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed top-6 right-6 z-10000 flex flex-col gap-3 w-full max-w-105 pointer-events-none px-4 sm:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((item) => (
          <ToastItem key={item.id} toast={item} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Toast Item Component ──
function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastData;
  onRemove: (id: string) => void;
}) {
  const { id, message, type, duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  // Icons and Brand Color Mapping
  const iconMap = {
    success: (
      <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#00CC8D" }} />
    ),
    error: (
      <AlertCircle className="w-5 h-5 shrink-0" style={{ color: "#FF0000" }} />
    ),
    info: <Info className="w-5 h-5 shrink-0" style={{ color: "#5700FF" }} />,
    warning: (
      <AlertTriangle
        className="w-5 h-5 shrink-0"
        style={{ color: "#eab308" }}
      />
    ),
  };

  // Styling helper for subtle left color indicator
  const borderMap = {
    success: "border-l-4 border-l-[#00CC8D]",
    error: "border-l-4 border-l-[#FF0000]",
    info: "border-l-4 border-l-[#5700FF]",
    warning: "border-l-4 border-l-[#eab308]",
  };

  // Progress Bar background color mapping
  const progressBgMap = {
    success: "bg-[#00CC8D]",
    error: "bg-[#FF0000]",
    info: "bg-[#5700FF]",
    warning: "bg-[#eab308]",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "pointer-events-auto relative flex w-full items-start gap-3 rounded-xl p-4 shadow-lg border border-neutral-200/50 bg-white/90 backdrop-blur-md dark:bg-zinc-900/90 dark:border-zinc-800/50 overflow-hidden font-ui text-[14px] leading-relaxed text-zinc-800 dark:text-zinc-200",
        borderMap[type],
      )}
    >
      {/* Icon */}
      <div className="mt-0.5">{iconMap[type]}</div>

      {/* Content */}
      <div className="flex-1 pr-6 font-medium">{message}</div>

      {/* Close Button */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-3.5 right-3.5 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors duration-150 cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Elegant Animated Progress Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={cn("absolute bottom-0 left-0 h-0.75", progressBgMap[type])}
      />
    </motion.div>
  );
}
