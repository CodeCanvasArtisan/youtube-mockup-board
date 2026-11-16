import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { toPng } from "html-to-image";

import { MockupView } from "../components/Mockup.jsx";
import { getAllMockups } from "./dataStoreUtils.js";

const waitForImages = container =>
    Promise.all([...container.querySelectorAll("img")].map(img =>
        img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = res; })
    ));

const safeFilename = (title, used) => {
    let base = (title || "mockup").replace(/[\\/:*?"<>|]+/g, "").trim().slice(0, 80) || "mockup";
    let name = base, n = 2;
    while (used.has(name)) name = `${base} (${n++})`;
    used.add(name);
    return `${name}.png`;
};

const download = (dataUrl, filename) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
};

// Renders every starred mockup offscreen and downloads each as its own PNG.
// Returns the number exported.
export async function exportStarredMockups() {
    const starred = (await getAllMockups()).filter(m => m.isFavourited && m.thumbnail);
    if (starred.length === 0) return 0;

    const stage = document.createElement("div");
    stage.className = "export-stage";
    stage.style.cssText = "position:fixed;left:-99999px;top:0;width:max-content;";
    document.body.appendChild(stage);

    const used = new Set();
    try {
        for (const m of starred) {
            const holder = document.createElement("div");
            stage.appendChild(holder);
            const root = createRoot(holder);
            flushSync(() => root.render(createElement(MockupView, {
                size: m.size, isDarkMode: m.isDarkMode, isActive: false,
                title: m.title, thumbnail: m.thumbnail,
            })));
            await waitForImages(holder);
            await document.fonts?.ready;

            const target = holder.firstElementChild;
            const dataUrl = await toPng(target, { pixelRatio: 2, cacheBust: false });
            download(dataUrl, safeFilename(m.title, used));
            root.unmount();
            holder.remove();
            await new Promise(r => setTimeout(r, 150)); // let the browser accept multiple downloads
        }
    } finally {
        stage.remove();
    }
    return starred.length;
}
