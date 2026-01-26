"use client";

import { SplashScreen } from "./SplashScreen";
import { useState } from "react";

export function AppSplash() {
    const [finished, setFinished] = useState(false);

    if (finished) return null;

    return <SplashScreen onFinish={() => setFinished(true)} />;
}
