"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function CameraScanner({ onScan, active }) {
    const onScanRef = useRef(onScan);
    onScanRef.current = onScan;
    const last = useRef({ text: "", at: 0 });

    useEffect(() => {
        if (!active) return;
        const scanner = new Html5Qrcode("gate-qr-reader");
        const started = scanner
            .start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (text) => {
                    const now = Date.now();
                    if (text === last.current.text && now - last.current.at < 3000) return;
                    last.current = { text, at: now };
                    onScanRef.current(text);
                },
                () => {},
            )
            .catch((err) => console.error("Camera error:", err));

        return () => {
            started
                .then(() => scanner.stop())
                .then(() => scanner.clear())
                .catch(() => {});
        };
    }, [active]);

    return <div id="gate-qr-reader" className="w-full overflow-hidden rounded-2xl" />;
}