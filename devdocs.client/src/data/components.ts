import type { ComponentItem } from "../types/component"
import { FileUploadContainer } from "edesk-components";

export const componentsData: ComponentItem[] = [
  //card componente carga de archivos
  {
    id: "file-upload",
    name: "Cargue de archivos",
    component: FileUploadContainer,
    category: "Básico",
    description: "Componente React ligero y personalizable para subir archivos con validación, drag & drop y feedback visual, ideal para flujos documentales empresariales.",
    lastUpdate: "2025-07-11",
    tabs: [
      {
        id: 'installation',
        label: 'Instalación',
        sections: [
          {
            title: 'Instalación',
            blocks: [
              {
                type: 'text',
                content: 'Para integrar el componente en tu proyecto, instala la librería utilizando npm. Se recomienda usar la versión especificada para asegurar la compatibilidad con esta documentación.'
              },
              {
                type: 'code',
                language: 'bash',
                code: 'npm install edesk-components@0.0.5'
              }
            ]
          }
        ]
      },
      {
        id: 'description',
        label: 'Descripción General',
        sections: [
          {
            title: 'Descripción General',
            blocks: [
              {
                type: 'text',
                content: 'FileUploadContainer es un componente de React diseñado para gestionar la carga de archivos de manera robusta y personalizable. Provee una interfaz de usuario completa que soporta la selección de archivos mediante un explorador, la funcionalidad de "arrastrar y soltar" (drag and drop), y la visualización del estado de la carga. Su arquitectura interna está desacoplada, lo que facilita su mantenimiento y extensibilidad.'
              }
            ]
          }
        ]
      },
      {
        id: 'dependencies',
        label: 'Dependencias y Requisitos',
        sections: [
          {
            title: 'Dependencias y Requisitos',
            blocks: [
              {
                type: 'text',
                content: 'Para el correcto funcionamiento del componente, tu proyecto debe cumplir con los siguientes requisitos:'
              },
              {
                type: 'text',
                content: 'Peer Dependencies: La librería ha sido construida sobre React. Asegúrate de que tu proyecto tenga instaladas las siguientes dependencias:'
              },
              {
                type: 'list',
                items: [
                  'react: ^19.0.0 o compatible.',
                  'react-dom: ^19.0.0 o compatible.'
                ]
              },
              {
                type: 'text',
                content: 'Estilos CSS: El componente requiere la importación de su hoja de estilos para un correcto renderizado visual. Debes incluir la siguiente línea en el punto de entrada de tu aplicación (como App.tsx o main.tsx):'
              },
              {
                type: 'code',
                language: 'javascript',
                code: "import 'edesk-components/dist/style.css';"
              },
              {
                type: 'text',
                content: 'Iconos: Para la visualización de iconos, el componente utiliza @mui/icons-material. Asegúrate de que esta dependencia esté resuelta en tu proyecto si no planeas sobreescribir los iconos por defecto.'
              }
            ]
          }
        ]
      },
      {
        id: 'api',
        label: 'API de Propiedades',
        sections: [
          {
            title: 'API de Propiedades (Props)',
            blocks: [
              {
                type: 'text',
                content: 'El componente se configura a través de un conjunto de propiedades. A continuación se detallan todas las props disponibles, agrupadas por su función.'
              },
              {
                type: 'text',
                content: 'Configuración Esencial (Obligatorias) - Estas propiedades son críticas para la funcionalidad básica del servicio de carga:'
              },
              {
                type: 'table',
                columns: ['Propiedad', 'Tipo', 'Descripción'],
                rows: [
                  ['uploadUrl', 'string', 'URL del endpoint del servicio de carga al cual se enviarán los archivos.'],
                  ['encryptedPath', 'string', 'Ruta o identificador cifrado requerido por el backend para el procesamiento del archivo.'],
                  ['maxFileSize', 'number', 'Tamaño máximo permitido por archivo, definido en bytes. Ejemplo: 5 * 1024 * 1024 para 5 MB.'],
                  ['acceptedFileTypes', 'string[]', 'Array de cadenas de texto con las extensiones de archivo permitidas, sin incluir el punto. Ejemplo: [\'pdf\', \'docx\', \'jpg\'].']
                ]
              },
              {
                type: 'text',
                content: 'Configuración de Comportamiento y Límites - Estas props controlan la interacción del usuario y establecen límites en la carga:'
              },
              {
                type: 'table',
                columns: ['Propiedad', 'Tipo', 'Por Defecto', 'Descripción'],
                rows: [
                  ['disabled', 'boolean', 'false', 'Deshabilita toda interacción con el componente.'],
                  ['multiSelectFile', 'boolean', 'true', 'Permite al usuario seleccionar múltiples archivos simultáneamente desde el explorador.'],
                  ['maxFiles', 'number', 'undefined', 'Limita el número total de archivos que se pueden adjuntar.'],
                  ['minSelectFile', 'number', 'undefined', 'Define el número mínimo de archivos que deben ser seleccionados en una sola operación.'],
                  ['onClose', '() => void', 'undefined', 'Callback que se invoca al hacer clic en el botón de cierre (requiere showCloseButton: true).']
                ]
              },
              {
                type: 'text',
                content: 'Configuración Visual y de UI - Estas props permiten personalizar la apariencia y los textos del componente:'
              },
              {
                type: 'table',
                columns: ['Propiedad', 'Tipo', 'Por Defecto', 'Descripción'],
                rows: [
                  ['type', 'string', '\'Large\'', 'Define el modo de renderizado. Opciones: \'Large\' (área de drag-and-drop), \'DragOff\' (sin drag-and-drop), \'Button\' (solo botón).'],
                  ['title', 'string', '\'Subir archivo\'', 'Texto del título principal del componente.'],
                  ['subtitle', 'string', 'undefined', 'Texto secundario o de instrucción.'],
                  ['showCloseButton', 'boolean', 'false', 'Controla la visibilidad del botón de cierre (X).'],
                  ['showExtensions', 'boolean', 'false', 'Muestra un texto informativo con los tipos de archivo y tamaño permitidos.'],
                  ['allowedExtensionsText', 'string', 'undefined', 'Permite definir un texto personalizado para la línea de extensiones.'],
                  ['iconComponent', 'React.ReactNode', 'CloudUploadIcon', 'Permite reemplazar el icono por defecto con un componente de React personalizado.'],
                  ['hideIcon', 'boolean', 'false', 'Oculta el icono principal en todas las variantes del componente.'],
                  ['unstyled', 'boolean', 'false', 'Elimina todos los estilos por defecto para permitir una personalización completa vía CSS.'],
                  ['className', 'string', 'undefined', 'Asigna una clase CSS al contenedor raíz del componente.'],
                  ['style', 'React.CSSProperties', 'undefined', 'Aplica estilos en línea al contenedor raíz.']
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'implementation',
        label: 'Guía de Implementación',
        sections: [
          {
            title: 'Guía de Implementación',
            blocks: [
              {
                type: 'text',
                content: 'A continuación, un ejemplo de uso estándar del componente dentro de una aplicación de React.'
              },
              {
                type: 'code',
                language: 'typescript',
                code: `import React from 'react';
import { FileUploadContainer } from 'edesk-components';
import 'edesk-components/dist/style.css';

// Componente de ejemplo que integra el cargador de archivos.
const FormularioDeDocumentos = () => {

    // Define las propiedades de configuración en un objeto para mayor claridad.
    const fileUploadConfig = {
        uploadUrl: "https://api.tu-servicio.com/files/upload",
        encryptedPath: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d4",
        maxFileSize: 10 * 1024 * 1024, // 10 MB
        acceptedFileTypes: ['pdf', 'xml', 'docx'],
    };

    return (
        <div style={{ maxWidth: '650px', margin: 'auto' }}>
            <h2>Carga de Facturas y Documentos</h2>
            <p>Por favor, adjunte los documentos requeridos. Los archivos no deben exceder los 10 MB.</p>

            <FileUploadContainer
                {...fileUploadConfig}
                type="Large"
                title="Arrastre sus documentos o haga clic aquí"
                subtitle="Formatos permitidos: PDF, DOCX, XML"
                maxFiles={5}
                showExtensions={true}
            />
        </div>
    );
};

export default FormularioDeDocumentos;`
              }
            ]
          }
        ]
      },
      {
        id: 'recommendations',
        label: 'Recomendaciones',
        sections: [
          {
            title: 'Recomendaciones y Puntos Clave',
            blocks: [
              {
                type: 'text',
                content: 'Lo más importante: Las cuatro props de la Configuración Esencial (uploadUrl, encryptedPath, maxFileSize, acceptedFileTypes) son fundamentales. Sin ellas, el componente no funcionará correctamente.'
              },
              {
                type: 'text',
                content: 'Manejo de Errores: El componente gestiona internamente los mensajes de error de validación (ej: "Extensión no permitida", "Tamaño máximo superado") y los muestra en la UI.'
              },
              {
                type: 'list',
                items: [
                  'Valida siempre el formato de la URL del servicio de carga antes de pasar la prop.',
                  'Asegúrate de que el encryptedPath sea válido y esté autorizado por el backend.',
                  'Considera implementar validación adicional en el lado del cliente para mejorar la experiencia del usuario.',
                  'Usa los callbacks de eventos para manejar el estado de la carga en tu aplicación.',
                  'Personaliza los mensajes de error para que sean coherentes con el resto de tu aplicación.'
                ]
              }
            ]
          }
        ]
      }
    ],
    playground: {
      controls: [
        { prop: 'type', label: 'Tipo de Componente', type: 'radio', options: ['Large', 'DragOff', 'Button'], defaultValue: 'Large' },
        { prop: 'title', label: 'Título', type: 'text', defaultValue: 'Documento de identificación' },
        { prop: 'subtitle', label: 'Subtítulo', type: 'text', defaultValue: 'Arrastra y suelta archivos PDF aquí o haz clic para seleccionar' },
        { prop: 'allowedExtensionsText', label: 'Texto de Extensiones', type: 'text', defaultValue: 'Formatos permitidos: PDF, JPG, PNG', showWhen: { prop: 'showExtensions', value: true } },
        { prop: 'disabled', label: 'Deshabilitado', type: 'boolean', defaultValue: false },
        { prop: 'showExtensions', label: 'Mostrar Extensiones', type: 'boolean', defaultValue: true },
        { prop: 'showCloseButton', label: 'Mostrar Botón Cerrar', type: 'boolean', defaultValue: false },
        { prop: 'multiSelectFile', label: 'Selección Múltiple', type: 'boolean', defaultValue: true },
        { prop: 'maxFiles', label: 'Máximo de Archivos', type: 'number', defaultValue: 5, enableWhen: { prop: 'multiSelectFile', value: true } },
        { prop: 'minSelectFile', label: 'Mínimo de Archivos', type: 'number', defaultValue: 1, enableWhen: { prop: 'multiSelectFile', value: true } },
        { prop: 'maxFileSize', label: 'Tamaño Máximo (MB)', type: 'number', defaultValue: 10 },
      ]
    },
    recipes: [
      {
        id: 'recipe-1',
        icon: 'user-circle',
        title: 'Imagen de perfil única',
        description: 'Configuración para subir una única imagen de perfil con validación de tipo y tamaño.',
        props: {
          type: 'Button',
          title: 'Sube tu foto de perfil',
          subtitle: 'Solo imágenes JPG o PNG',
          maxFiles: 1,
          multiSelectFile: false,
          showExtensions: true,
          allowedExtensionsText: 'Formatos permitidos: JPG, PNG'
        },
        code: `<FileUploadContainer
  type="Button"
  title="Sube tu foto de perfil"
  subtitle="Solo imágenes JPG o PNG"
  maxFiles={1}
  multiSelectFile={false}
  showExtensions={true}
  allowedExtensionsText="Formatos permitidos: JPG, PNG"
  uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
  encryptedPath="ruta-cifrada-de-ejemplo"
  maxFileSize={5242880} // 5MB
  acceptedFileTypes={['jpg', 'jpeg', 'png']}
/>`
      },
      {
        id: 'recipe-2',
        icon: 'file-alt',
        title: 'Múltiples documentos',
        description: 'Área para arrastrar múltiples documentos PDF y Word con visualización de extensiones.',
        props: {
          type: 'Large',
          title: 'Sube tus documentos',
          subtitle: 'Arrastra y suelta archivos aquí o haz clic para seleccionar',
          maxFiles: 10,
          showExtensions: true,
          allowedExtensionsText: 'Formatos permitidos: PDF, DOC, DOCX'
        },
        code: `<FileUploadContainer
  type="Large"
  title="Sube tus documentos"
  subtitle="Arrastra y suelta archivos aquí o haz clic para seleccionar"
  maxFiles={10}
  showExtensions={true}
  allowedExtensionsText="Formatos permitidos: PDF, DOC, DOCX"
  uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
  encryptedPath="ruta-cifrada-de-ejemplo"
  maxFileSize={10485760} // 10MB
  acceptedFileTypes={['pdf', 'doc', 'docx']}
/>`
      },
      {
        id: 'recipe-3',
        icon: 'exclamation-triangle',
        title: 'Sin Drag & Drop',
        description: 'Configuración para subir archivos sin funcionalidad de arrastrar y soltar.',
        props: {
          type: 'DragOff',
          title: 'Seleccionar documentos',
          subtitle: 'Haz clic para seleccionar archivos',
          maxFiles: 3,
          showExtensions: true,
          allowedExtensionsText: 'Formatos permitidos: PDF, DOCX',
          minSelectFile: 1
        },
        code: `<FileUploadContainer
  type="DragOff"
  title="Seleccionar documentos"
  subtitle="Haz clic para seleccionar archivos"
  maxFiles={3}
  showExtensions={true}
  allowedExtensionsText="Formatos permitidos: PDF, DOCX"
  minSelectFile={1}
  uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
  encryptedPath="ruta-cifrada-de-ejemplo"
  maxFileSize={10485760} // 10MB
  acceptedFileTypes={['pdf', 'docx']}
/>`
      }
    ],
    architecture: {
      nodes: [
        { id: 'drag-handler', label: 'useDragAndDrop', type: 'Caso de Uso', description: 'Maneja la lógica de arrastrar y soltar, activando los estados visuales correspondientes.' },
        { id: 'validation-utils', label: 'EdeskFileValidationUtils', type: 'Caso de Uso', description: 'Valida los archivos según su tamaño, extensión y el límite configurado.' },
        { id: 'file-list-ui', label: 'AnimatedFileList', type: 'UI', description: 'Componente de UI que renderiza la lista de archivos seleccionados con animaciones.' },
        { id: 'main-container', label: 'FileUploadContainer', type: 'UI', description: 'El componente principal que orquesta la UI y la lógica de alto nivel.' },
        { id: 'core-logic', label: 'Core Logic', type: 'Lógica central', description: 'Gestiona el estado interno, las props y la comunicación entre los casos de uso y la UI.' }
      ],
      connections: [
        { from: 'drag-handler', to: 'core-logic' },
        { from: 'validation-utils', to: 'core-logic' },
        { from: 'file-list-ui', to: 'core-logic' },
        { from: 'main-container', to: 'core-logic' },
      ]
    }
  }
]
  // — aquí tus demás componentes —

