"use client"

import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import ComponentDetailPage from "./pages/ComponentDetailPage"
import ComponentsPage from "./pages/ComponentsPage"
import ModuleDetailPage from "./pages/ModuleDetailPage"
import ModulesPage from "./pages/ModulesPage"
import NewsDetailPage from "./pages/NewsDetailPage"
import NewsPage from "./pages/NewsPage"
import NotFoundPage from "./pages/NotFoundPage"
import { QrGeneratorPage } from "./pages/QrGeneratorPage";
import ToolsPage from "./pages/ToolsPage"

import { useQRCodeStore } from './tools/qr-generator/store/useQRCodeStore';

import { ClientQRCodeAdapter } from './tools/qr-generator/adapters/ClientQRCode.adapter';
//import { ApiQRCodeAdapter } from './Tools/qr-generator/adapters/ApiQRCode.Adapter';

/*Inyecta el adaptador al store al iniciar la app */
useQRCodeStore.getState().setQRCodeAdapter(new ClientQRCodeAdapter());
//useQRCodeStore.getState().setQRCodeAdapter(new ApiQRCodeAdapter());


function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="componentes" element={<ComponentsPage />} />
          <Route path="componentes/:slug" element={<ComponentDetailPage />} />
          <Route path="modulos" element={<ModulesPage />} />
          <Route path="modulos/:slug" element={<ModuleDetailPage />} />
          <Route path="herramientas" element={<ToolsPage />} />
       <Route path="herramientas/generador-qr" element={<QrGeneratorPage />} /> 
          <Route path="noticias" element={<NewsPage />} />
          <Route path="noticias/:slug" element={<NewsDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
