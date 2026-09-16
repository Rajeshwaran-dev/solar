import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "success") => {
      const now = Date.now();
      setToasts((prev) => {
        // Prevent duplicate toasts within 1000ms window
        const isDuplicate = prev.some(
          (t) => t.message === message && t.type === type && now - t.createdAt < 1000
        );
        if (isDuplicate) return prev;

        const id = ++idCounter;
        setTimeout(() => dismiss(id), 3200);
        return [...prev, { id, message, type, createdAt: now }];
      });
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2.5 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type] ?? Info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-ink-900 px-4 py-3.5 text-sand-50 shadow-lift"
              >
                <Icon
                  className={
                    "mt-0.5 h-5 w-5 shrink-0 " +
                    (t.type === "success"
                      ? "text-accent-400"
                      : t.type === "error"
                      ? "text-red-400"
                      : "text-primary-300")
                  }
                />
                <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-sand-50/50 transition hover:text-sand-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
