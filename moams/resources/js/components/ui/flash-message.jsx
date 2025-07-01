import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function FlashMessage({
    message,
    type = "success", // "success", "error", "info", "warning"
    duration = 5000,
    className = "",
    onClose,
}) {
    const [show, setShow] = useState(!!message);

    useEffect(() => {
        if (message) {
            setShow(true);
            if (duration > 0) {
                const timer = setTimeout(() => {
                    setShow(false);
                    if (onClose) onClose();
                }, duration);
                return () => clearTimeout(timer);
            }
        }
    }, [message, duration, onClose]);

    if (!show || !message) return null;

    const typeStyles = {
        success: "bg-green-200 text-green-900 border-green-400",
        error: "bg-red-200 text-red-900 border-red-400",
        info: "bg-blue-200 text-blue-900 border-blue-400",
        warning: "bg-yellow-200 text-yellow-900 border-yellow-400",
    };

    return (
        <div
            className={cn(
                "fixed top-4 right-4 z-50 max-w-xs w-full flex items-center gap-3 px-5 py-3 rounded-lg border shadow-2xl font-semibold text-base transition-all duration-300 justify-center text-center",
                show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
                typeStyles[type] || typeStyles.success,
                className
            )}
            style={{ minWidth: 220 }}
        >
            {message}
        </div>
    );
} 