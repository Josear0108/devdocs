This folder contains the official PDF.js viewer assets that the library needs at runtime.

Contents mirror the structure from pdfjs-dist distribution:
- build/ (pdf.mjs, pdf.worker.mjs, pdf.sandbox.mjs, ...)
- web/ (viewer.html, viewer.mjs, viewer.css, ...)
- wasm/, standard_fonts/, images/, cmaps/, iccs/, locale/

When building the library, Vite copies this folder to dist/pdfjs so it can be published.
On install in a consumer app, a postinstall script copies dist/pdfjs to the app's public/pdfjs.
