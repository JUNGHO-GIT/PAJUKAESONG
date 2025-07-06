// useCdn.tsx

import { useState, useEffect } from "react";

// -------------------------------------------------------------------------------------------------
export const useCdn = () => {

  // 2-1. useState ---------------------------------------------------------------------------------
  const [styles, _setStyles] = useState([
    {
      name: "Reset",
      rel: "stylesheet",
      href: "https://jungho-git.github.io/JCDN/styles/Reset.min.css",
      crossorigin: true,
    },
    {
      name: "Pretendard",
      rel: "stylesheet",
      href: "https://jungho-git.github.io/JCDN/fonts/Pretendard.min.css",
      crossorigin: true,
    },
    {
      name: "Init",
      rel: "stylesheet",
      href: "https://jungho-git.github.io/JCDN/styles/Init.min.css",
      crossorigin: true,
    },
    {
      name: "Jstyle",
      rel: "stylesheet",
      href: "https://jungho-git.github.io/JCDN/styles/Jstyle.min.css",
      crossorigin: true,
    },
  ]);
  const [scripts, _setScripts] = useState([
    {
      name: "Postcode",
      src: "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",
      defer: false,
    },
  ]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {

    // styles 추가
    styles.forEach(({ name, rel, href, crossorigin }) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        console.log(`${name} style is already loaded.`);
        return;
      }
      const link = document.createElement("link");
      Object.assign((link), {
        rel: rel,
        href: href,
        crossorigin: crossorigin ? "anonymous" : undefined,
      });
      document.head.appendChild(link);
    });

    // scripts 추가
    scripts.forEach(({ name, src, defer }) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        console.log(`${name} script is already loaded.`);
        return;
      }
      const script = document.createElement("script");
      Object.assign((script), {
        src: src,
        async: true,
        defer: defer,
      });
      document.body.appendChild(script);
    });

    // 10. return ----------------------------------------------------------------------------------
    /* return () => {
      // 필요 시 cleanup
      styles.forEach(({ href }) => {
        const link = document.querySelector(`link[href="${href}"]`);
        if (link) {
          document.head.removeChild(link);
        }
      });
      scripts.forEach(({ src }) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    }; */
  }, [styles, scripts]);
};