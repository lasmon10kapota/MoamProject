import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function FlashMessage({
    message,
    type = "success", // "success", "error", "info", "warning"
    duration = 3000,
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
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    return (
        <div
            className={cn(
                "absolute border rounded-md top-20 right-6 font-bold px-4 py-2 shadow-lg z-50 transition-opacity",
                typeStyles[type] || typeStyles.success,
                className
            )}
        >
            {message}
        </div>
    );
} 