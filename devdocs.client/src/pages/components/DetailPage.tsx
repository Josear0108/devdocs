"use client"

import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { componentsData } from "../../data/components";
import { PageHeader } from "../../components/ui/PageHeader";
import { Documentation } from "../../components/ui/Documentation";
import "../../styles/component-detail.css";
import type { ComponentItem } from "../../types/component";

const ComponentDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();

    // Encontrar los datos del componente 
    const componentItem: ComponentItem | undefined = useMemo(() =>
        componentsData.find(c => c.id === slug),
        [slug]
    );

    // Función para manejar las props del Playground 
    const handlePlaygroundPropsChange = (props: Record<string, unknown>) => {
        // Aquí puedes manejar los cambios de props si necesitas hacer algo específico
        console.log('🎮 [DetailPage] Playground props changed:', props);
    };

    if (!componentItem) {
        return (
            <motion.div
                className="container component-detail-page"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <PageHeader
                    title="Componente no encontrado"
                    description={`No se encontró documentación para el slug "${slug}".`}
                />
            </motion.div>
        );
    }

    // Renderizar usando el componente <Documentation />
    return (
        <motion.div
            className="container component-detail-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <PageHeader
                title={componentItem.name}
                description={componentItem.description}
            />

            <div className="documentation-container">
                <Documentation
                    componentItem={componentItem}
                    onPlaygroundPropsChange={handlePlaygroundPropsChange}
                />
            </div>
        </motion.div>
    );
};

export default ComponentDetailPage;