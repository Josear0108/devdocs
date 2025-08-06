import type { FC } from "react"
import {
    Home,
    Grid,
    PenTool,
    Code,
    BookOpen
} from "react-feather"

export type BadgeType = 'new' | 'warning' | 'deprecated';

export interface MenuItem {
    label: string
    to: string
    badge?: BadgeType;
    icon: FC<any>
    submenu?: MenuItem[]
}

export const mainMenu: MenuItem[] = [
    {
        label: "Inicio",
        to: "/",
        icon: Home,
    },
    // {
    //     label: "Noticias",
    //     to: "/noticias",
    //     icon: FileText,
    // },
]

export const docMenu: MenuItem[] = [
    {
        label: "EdeskWeb 5",
        to: "/plantilla-legacy",
        badge: 'new',
        icon: BookOpen,
    },
    {
        label: "Componentes",
        to: "/componentes",
        icon: Grid,
    },
    // {
    //     label: "Módulos",
    //     to: "/modulos",
    //     icon: Layers,
    // },
    {
        label: "Herramientas",
        to: "/herramientas",
        icon: PenTool,
        submenu: [
            {
                label: "Generador QR",
                to: "/herramientas/generador-qr",
                icon: Code,
            },
            // {
            //     label: "Generador de Plantillas",
            //     to: "/herramientas/generador-plantillas",
            //     icon: Package,
            // },
        ]
    }
]