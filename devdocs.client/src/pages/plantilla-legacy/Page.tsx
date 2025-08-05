import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Documentation } from "../../components/ui/Documentation";
import { PageHeader } from "../../components/ui/PageHeader";
import { dataPlantillaLegacy } from "../../data/plantilla-legacy";

const PlantillaLegacy: React.FC = () => {
    const { slug } = useParams<{ slug: 'file-upload' }>();
    const componentItem = dataPlantillaLegacy

    // Si no lo encontramos, mostramos un mensaje de “no encontrado”
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
                    description={`No hay documentación para “${slug}”`}
                />
            </motion.div>
        );
    }

    // Ya sabemos que componentItem es un ComponentItem, no undefined
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
            <div className="documentation-tabs">
                <Documentation
                    componentItem={componentItem}
                />
            </div>
        </motion.div >
    );
};

export default PlantillaLegacy;
