import type { ComponentItem } from "../types/component"
import { EdeskFileUpload, EdeskLayout, EdeskViewerPDF, PdfViewerMode, PdfViewerOption } from "edesk-components";
import { edeskFileUploadConfig } from "../config/playground-specific/edesk-file-upload.config";
import { edeskViewerPDFConfig } from "../config/playground-specific/edesk-viewer-pdf.config";
import { edeskLayoutConfig } from "../config/playground-specific/edesk-layout.config";

// Exportar enums para uso en playground
export { PdfViewerMode, PdfViewerOption };

export const componentsData: ComponentItem[] = [
  //FILEUPLOAD
  {
    id: "file-upload",
    name: "FileUpload",
    component: EdeskFileUpload as unknown as React.ComponentType<Record<string, unknown>>,
    category: "Básico",
    type: "component",
    description: "Componente React ligero y personalizable para subir archivos con validación, drag & drop y feedback visual, ideal para flujos documentales empresariales.",
    lastUpdate: "2025-08-11",
    
    playgroundConfig: {
      componentName: 'EdeskFileUpload',
      componentSpecificConfig: edeskFileUploadConfig,
      mockData: {
        uploadUrl: "https://cargue.sycpruebas.com/servicioweb.svc",
        encryptedPath: "demo-encrypted-path",
        //acceptedFileTypes: ['pdf', 'jpg', 'png']
      },
      excludeProps: [], // Ocultar props técnicas
      
      // Desactivar agrupamiento con array vacío
      groups: [],
      
      customControls: {
        type: {
          type: 'select',
          options: ['Large', 'DragOff', 'Button'],
          defaultValue: 'Large'
        },
        title: {
          defaultValue: 'Documento de identificación'
        },
        subtitle: {
          defaultValue: 'Arrastra y suelta archivos PDF aquí o haz clic para seleccionar',
          showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
        },
        disabled: {
          type: 'switch',
          defaultValue: false
        },
        showExtensions: {
          type: 'switch',
          defaultValue: true,
          showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
        },
        allowedExtensionsText: {
          defaultValue: 'Formatos permitidos: PDF, JPG, PNG',
          showWhen: [
            { prop: 'type', value: ['Large', 'DragOff'] },
            { prop: 'showExtensions', value: true }
          ]
        },
        showCloseButton: {
          type: 'switch',
          defaultValue: false,
          showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
        },
        hideIcon: {
          type: 'switch',
          defaultValue: false
        },
        unstyled: {
          type: 'switch',
          defaultValue: false
        },
        multiSelectFile: {
          type: 'switch',
          defaultValue: true
        },
        maxFiles: {
          type: 'number',
          defaultValue: 5,
          min: 1,
          max: 20,
        },
        minSelectFile: {
          type: 'number',
          defaultValue: 1,
          min: 1,
          max: 10,
        },
        maxFileSize: {
          type: 'select',
          options: [1048576, 5242880, 10485760, 52428800], // 1MB, 5MB, 10MB, 50MB
          defaultValue: 10485760
        },
        acceptedFileTypes: {
          type: 'select-check',
          options: [
            'pdf', 'svg', 'png', 'jpg', 'csv', 'psd', 'zip', 's01', 'mid', 'midi', 'mpga', 'mp2', 'mp3', 'wav', 'bmp', 'gif', 'jpeg', 'jfif', 'jpe', 'tiff', 'tif', 'txt', 'text', 'dat', 'rtx', 'rtf', 'xml', 'xsl', 'mpeg', 'mpg', 'mpe', 'mp4', 'webm', 'qt', 'mov', 'avi', 'movie', 'doc', 'xls', 'docx', 'xlsx', 'xlsm', 'xltm', 'xlam', 'xlsb', 'word', 'xl', 'ppt', 'pptx', 'eml', 'msg', 'i01', 'p8', 'key', 'p10', 'csr', 'cer', 'crl', 'p7c', 'crt', 'der', 'pem', 'p12', 'pfx', 'p7b', 'spc', 'p7r', 'i00', 'r00', 'r000', 's00', 'e00', 'm4a', 'aac'
          ],
          defaultValue: ['pdf'],
        }
      },
      // Nueva configuración de controles CSS
      cssControls: [
        //colors
        {
          id: 'colors',
          label: 'Colores',
          controls: [
            {
              variable: '--edeskFileUpload-accent',
              label: 'Color principal',
              type: 'color',
              defaultValue: '#007FFF',
            },
            {
              variable: '--edeskFileUpload-accent-bg',
              label: 'Color del hover',
              type: 'color',
              defaultValue: '#f3f9fF',
            },
            {
              variable: '--edeskFileUpload-bg',
              label: 'Color de fondo',
              type: 'color',
              defaultValue: '#fff',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-bg-file',
              label: 'Color de fondo para los archivos cargados',
              type: 'color',
              defaultValue: '#CEE3F9',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-text',
              label: 'Color del titulo y subtitulo',
              type: 'color',
              defaultValue: '#000000',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-text-extensions',
              label: 'Color del texto de las extensiones',
              type: 'color',
              defaultValue: '#747474',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-bg-error',
              label: 'Color de fondo para el error',
              type: 'color',
              defaultValue: '#ffeaea',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-text-error',
              label: 'Color de texto para el error',
              type: 'color',
              defaultValue: '#d32f2f',
            }
          ]
        },
        // Espaciado
        {
          id: 'spacing',
          label: 'Espaciado',
          controls: [
            {
              variable: '--edeskFileUpload-border-radius',
              label: 'Radio del borde',
              type: 'range',
              defaultValue: '8px',
              min: 0,
              max: 20,
              step: 1,
              unit: 'px',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-border-radius-pill',
              label: 'Radio del borde de los archivos cargados',
              type: 'range',
              defaultValue: '30px',
              min: 0,
              max: 50,
              step: 1,
              unit: 'px',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-border-width',
              label: 'Grosor del borde',
              type: 'range',
              defaultValue: '2px',
              min: 1,
              max: 8,
              step: 1,
              unit: 'px',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
            {
              variable: '--edeskFileUpload-button-type-width',
              label: 'ancho para el tipo boton',
              type: 'range',
              defaultValue: '300px',
              min: 200,
              max: 800,
              step: 1,
              unit: 'px',
              showWhen: { prop: 'type', value: ['Button'] }
            },
             {
              variable: '--edeskFileUpload-container-width',
              label: 'ancho para el tipo Large y DragOff',
              type: 'range',
              defaultValue: '650px',
              min: 500,
              max: 1200,
              step: 1,
              unit: 'px',
              showWhen: { prop: 'type', value: ['Large', 'DragOff'] }
            },
          ]
        },
        // Tipografía
        {
          id: 'typography',
          label: 'Tipografía',
          controls: [
            {
              variable: '--edeskFileUpload-font-main',
              label: 'Tipo de fuente',
              type: 'text',
              defaultValue: 'Roboto, sans-serif'
            }
          ]
        }
      ]
    },
    //RECIPIES
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
          allowedExtensionsText: 'Formatos permitidos: JPG, PNG',
          acceptedFileTypes: ['jpg', 'jpeg', 'png'],
          maxFileSize: 5242880
        },
        code: `<EdeskFileUpload
                uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
                encryptedPath="ruta-cifrada-de-ejemplo"
                type="Button"
                acceptedFileTypes={['jpg', 'jpeg', 'png']}
                title="Sube tu foto de perfil"
                maxFiles={1}
                maxFileSize={5242880}
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
          maxFileSize: 10485760,
          acceptedFileTypes: ['pdf', 'doc', 'docx'],
          allowedExtensionsText: 'Formatos permitidos: PDF, DOC, DOCX'
        },
        code: `<EdeskFileUpload
                uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
                encryptedPath="demo-encrypted-path"
                type="Large"
                acceptedFileTypes={["pdf","doc","docx"]}
                title="Sube tus documentos"
                subtitle="Arrastra y suelta archivos aquí o haz clic para seleccionar"
                showExtensions
                allowedExtensionsText="Formatos permitidos: PDF, DOC, DOCX"
                maxFiles={10}
                minSelectFile={1}
                maxFileSize={10485760}
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
          minSelectFile: 1,
          showExtensions: true,
          allowedExtensionsText: 'Formatos permitidos: PDF, DOCX',
          acceptedFileTypes: ['pdf', 'docx'],
          showCloseButton: true,
          hideIcon: true
        },
        code: `<EdeskFileUpload
                uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
                encryptedPath="demo-encrypted-path"
                type="DragOff"
                acceptedFileTypes={["pdf","docx"]}
                title="Seleccionar documentos"
                subtitle="Haz clic para seleccionar archivos"
                showExtensions
                allowedExtensionsText="Formatos permitidos: PDF, DOCX"
                showCloseButton
                hideIcon
                maxFiles={3}
                minSelectFile={1}
                maxFileSize={10485760}
              />`
      }
    ],

    tabs: [
      
      //PLAYGROUND
      {
        id: 'playground',
        label: 'Playground',
        sections: [

        ]
      },

      //INSTALACIÓN
      {
        id: 'installation',
        label: 'Instalación',
        sections: [
          {
            title: 'Descarga',
            blocks: [
              {
                type: 'code',
                language: 'bash',
                code: 'npm install edesk-components@0.0.14'
              }
            ]
          },
          {
            title: 'Importación',
            blocks: [
              {
                type: 'code',
                language: 'javascript',
                code: 'import { EdeskFileUpload } from "edesk-components";'
              }
            ]
          },
        ]
      },
      
      ///PROPS
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
                  ['multiSelectFile', 'boolean', 'true', 'Permite al usuario seleccionar múltiples archivos simultáneamente, Sí es false solo podran cargar un archivo desde el explorador.'],
                  ['maxFiles', 'number', 'undefined', 'Limita el número total de archivos que se pueden adjuntar.'],
                  ['minSelectFile', 'number', 'undefined', 'Define el número mínimo de archivos que deben ser adjuntados.'],
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
                  ['allowedExtensionsText', 'string', 'undefined', 'Permite definir un texto personalizado para la línea de extensiones (requiere showExtensions: true).'],
                  ['iconComponent', 'React.ReactNode', 'CloudUploadIcon', 'Permite reemplazar el icono por defecto con un componente de React personalizado.'],
                  ['hideIcon', 'boolean', 'false', 'Oculta el icono principal en todas las variantes del componente.'],
                  ['unstyled', 'boolean', 'false', 'Elimina todos los estilos por defecto para permitir una personalización completa vía CSS.'],
                  ['className', 'string', 'undefined', 'Asigna una clase CSS al contenedor raíz del componente.'],
                  ['style', 'React.CSSProperties', 'undefined', 'Aplica estilos en línea al contenedor raíz.']
                ]
              },
              {
                type: 'text',
                content: 'Variables CSS globales del componenete:'
              },
              {
                type: 'table',
                columns: ['Variable CSS', 'Descripción', 'Por Defecto'],
                rows: [
                  ['--edeskFileUpload-accent', 'Color principal', '#007FFF'],
                  ['--edeskFileUpload-accent-bg', 'Color del hover', '#f3f9ff'],
                  ['--edeskFileUpload-bg', 'Color del fondo', '#f3f9ff'],
                  ['--edeskFileUpload-bg-file', 'Color de fondo para los archivos cargados', '#CEE3F9'],
                  ['--edeskFileUpload-text', 'Color del titulo y subtitulo', '#000'],
                  ['--edeskFileUpload-text-extensions', 'Color del texto de las extensiones', '#747474'],
                  ['--edeskFileUpload-border-radius', 'Radio del borde', '10px'],
                  ['--edeskFileUpload-border-radius-pill', 'Radio del borde de los archivos cargados', '30px'],
                  ['--edeskFileUpload-border-width', 'Grosor del borde', '2px'],
                  ['--edeskFileUpload-border-dashed', 'Color borde para large', 'var(--edeskFileUpload-border-width) dashed var(--edeskFileUpload-accent)'],
                  ['--edeskFileUpload-border-solid', 'Color borde para dragOff', 'var(--edeskFileUpload-border-width) solid var(--edeskFileUpload-accent)'],
                  ['--edeskFileUpload-bg-error', 'Color de fondo para el error', '#ffeaea'],
                  ['--edeskFileUpload-text-error', 'Color de texto para el error', '#d32f2f'],
                  ['--edeskFileUpload-font-main', 'Tipo de fuente', 'Roboto, sans-serif'],
                  ['--edeskFileUpload-button-type-width', 'ancho para el tipo boton', '300px'],
                  ['--edeskFileUpload-container-width', 'ancho para el tipo Large y DragOff', '650px'],
                ]
              }
            ]
          }
        ]
      },
      //IMPLEMENTACIÓN
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
                code: `
                import React from 'react';
                import { EdeskFileUpload } from 'edesk-components';

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

                          <EdeskFileUpload
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
      //RECOMENDACIÓNES
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
    architecture: {
      nodes: [
        { id: 'drag-handler', label: 'useDragAndDrop', type: 'Caso de Uso', description: 'Maneja la lógica de arrastrar y soltar, activando los estados visuales correspondientes.' },
        { id: 'validation-utils', label: 'EdeskFileValidationUtils', type: 'Caso de Uso', description: 'Valida los archivos según su tamaño, extensión y el límite configurado.' },
        { id: 'file-list-ui', label: 'AnimatedFileList', type: 'UI', description: 'Componente de UI que renderiza la lista de archivos seleccionados con animaciones.' },
        { id: 'main-container', label: 'EdeskFileUpload', type: 'UI', description: 'El componente principal que orquesta la UI y la lógica de alto nivel.' },
        { id: 'core-logic', label: 'Core Logic', type: 'Lógica central', description: 'Gestiona el estado interno, las props y la comunicación entre los casos de uso y la UI.' }
      ],
      connections: [
        { from: 'drag-handler', to: 'core-logic' },
        { from: 'validation-utils', to: 'core-logic' },
        { from: 'file-list-ui', to: 'core-logic' },
        { from: 'main-container', to: 'core-logic' },
      ]
    }
  },
  //LAYOUT
  {
    id: "layout",
    name: "EdeskLayout",
    component: EdeskLayout as unknown as React.ComponentType<Record<string, unknown>>,
    category: "Básico",
    type: "component",
    description: "Contenedor layout animado con dos estados; abierto: con un título y subtítulo, cerrado: contenido",
    lastUpdate: "2025-08-11",
    
    playgroundConfig: {
      componentName: 'EdeskLayout',
      componentSpecificConfig: edeskLayoutConfig,
      mockData: {
        title: 'Demo Layout 1',
        subtitle: 'Puedes mostrar u ocultar el body con el botón.',
        open: true,
        children: 'Contenido opcional aquí'
      },
      
      // Desactivar agrupamiento con array vacío
      groups: [],
      
      customControls: {
        title: {
          type: 'text',
          defaultValue: 'Demo Layout 1'
        },
        subtitle: {
          type: 'text',
          defaultValue: 'Puedes mostrar u ocultar el body con el botón.'
        },
        open: {
          type: 'switch',
          defaultValue: true
        },
        autofill: {
          type: 'switch',
          defaultValue: false
        },
        hiddenSVG: {
          type: 'switch',
          defaultValue: false
        },
        children: {
          type: 'textarea',
          defaultValue: 'Contenido opcional aquí'
        }
      },
      // Configuración de controles CSS para EdeskLayout
      cssControls: [
        {
          id: 'colors',
          label: 'Colores',
          description: 'Personaliza los colores del layout',
          controls: [
            {
              variable: '--edeskLayout-bg-svg-color',
              label: 'Color del svg',
              type: 'color',
              defaultValue: '#1877d7'
            },
            {
              variable: '--edeskLayout-header-bg',
              label: 'Color de fondo para el header',
              type: 'color',
              defaultValue: 'linear-gradient(90deg, #1877d7 0%, #0a2e5c 100%)'
            },
            {
              variable: '--edeskLayout-container-bg',
              label: 'Color de fondo del contenedor',
              type: 'color',
              defaultValue: '#ffffff'
            },
            {
              variable: '--edeskLayout-text-title',
              label: 'Color del título',
              type: 'color',
              defaultValue: '#ffffff'
            },
            {
              variable: '--edeskLayout-text-subtitle',
              label: 'Color del subtitulo',
              type: 'color',
              defaultValue: '#e0e7ef'
            }
          ]
        },
        {
          id: 'spacing',
          label: 'Espaciado',
          description: 'Ajusta el espaciado y dimensiones',
          controls: [
            {
              variable: '--edeskLayout-container-height',
              label: 'Alto del contenedor',
              type: 'range',
              defaultValue: '600px',
              min: 400,
              max: 1200,
              step: 100,
              unit: 'px'
            },
            {
              variable: '--edeskLayout-container-width',
              label: 'Ancho del contenedor',
              type: 'range',
              defaultValue: '1200px',
              min: 400,
              max: 1500,
              step: 100,
              unit: 'px'
            },
            {
              variable: '--edeskLayout-border-radius',
              label: 'Radio del borde',
              type: 'range',
              defaultValue: '8px',
              min: 0,
              max: 60,
              step: 8,
              unit: 'px',
            },
            {
              variable: '--edeskLayout-padding-header',
              label: 'Padding del header',
              type: 'range',
              defaultValue: '16px',
              min: 0,
              max: 60,
              step: 8,
              unit: 'px',
            },
            {
              variable: '--edeskLayout-padding-body',
              label: 'Padding del body',
              type: 'range',
              defaultValue: '20px',
              min: 0,
              max: 60,
              step: 8,
              unit: 'px',
            },
            {
              variable: '--edeskLayout-font-main',
              label: 'tipo de fuente principal',
              type: 'text',
              defaultValue: 'Inter, sans-serif',
            }
          ]
        }
      ]
    },
    tabs: [
      {
        id: 'playground',
        label: 'Playground',
        sections: [

        ]
      },
      //instalación
      {
        id: 'installation',
        label: 'Instalación',
        sections: [
          {
            title: 'Descarga',
            blocks: [
              {
                type: 'code',
                language: 'bash',
                code: 'npm install edesk-components@0.0.8'
              }
            ]
          },
          {
            title: 'Importación',
            blocks: [
              {
                type: 'code',
                language: 'javascript',
                code: 'import { EdeskLayout } from "edesk-components";'
              }
            ]
          },
        ]
      },
      //API
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
                content: 'Configuración'
              },
              {
                type: 'table',
                columns: ['Propiedad', 'Tipo', 'Por Defecto', 'Descripción'],
                rows: [
                  ['title', 'string', 'null', 'Título principal del header, si no se configura no sepinta.'],
                  ['subtitle', 'string', 'null', 'Subtítulo del header, si no se configura no se pinta.'],
                  ['content', 'ReactNode', 'null', 'Contenido principal del header, es un Nodo de react para agregar cualquierr contenido.'],
                  ['open', 'boolean', 'false', 'Define el estado del componente abireto o cerrado.'],
                  ['autofill', 'boolean', 'false', 'Agrega un width y un heidht de 100%.'],
                  ['children', 'ReactNode', 'null', 'Children de body, es un Nodo de react para agregar cualquierr contenido.'],
                  ['className', 'string','null', 'Clase de estilos para el componente'],
                  ['hiddenSVG', 'boolean', 'false', 'Oculta el SVG del header'],
                  ['svgUrl', 'string', 'false', 'URL del SVG de fondo, si se desea personalizar'],
                  ['svgComponent', 'React.ComponentType', 'null', 'Permite pasar un componente SVG React personalizado para el fondo del header, Si se define, tiene prioridad sobre el SVG por defecto, pero no sobre svgUrl.'],
                  ['style', ' React.CSSProperties', 'null', 'Permite agregar estilos en línea'],
                ]
              },
              {
                type: 'text',
                content: 'Variables CSS globales'
              },
              {
                type: 'table',
                columns: ['Variable CSS', 'Descripción', 'Por Defecto'],
                rows: [
                  ['--edeskLayout-container-heigh', 'Alto del contenedor padre', '600px'],
                  ['--edeskLayout-container-width', 'Ancho del contenedor padre', '1200px'],
                  ['--edeskLayout-border-radius', 'Radio del borde del contenedor padre', '8px'],
                  ['--edeskLayout-bg-svg-color', 'Color de fondo para el SVG', '#1877d7'],
                  ['--edeskLayout-header-bg', 'Color de fondo para el header', 'linear-gradient(90deg, #1877d7 0%, #0a2e5c 100%)'],
                  ['--edeskLayout-padding-header', 'Padding del header', '16px 80px'],
                  ['--edeskLayout-padding-body', 'Padding del doby', '20px'],
                  ['--edeskLayout-container-bg', 'Color de fondo para el body', '#fff'],
                  ['--edeskLayout-text-title', 'Color del texto para el título', '#fff'],
                  ['--edeskLayout-text-subtitle', 'Color del texto para el subtítulo', '#e0e7ef'],
                  ['--edeskLayout-shadow', 'Sombra para el contendor padre', '0 4px 12px rgba(0,0,0,0.10)'],
                  ['--edeskLayout-border', 'Borde para el contendor padre', '1px solid #e0e7ef'],
                  ['--edeskLayout-font-main', 'Fuente del componente', 'Inter, sans-serif'],
                ]
              }
            ]
          }
        ]
      },
      //IMPLEMENTAION
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
                code: `
                import React from 'react';
                import { EdeskLayout } from 'edesk-components';

                function App() {
                  const [open, setOpen] = useState(true);
                  const [closed, setClosed] = useState(false);

                return (
                    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', height: '100%', alignItems: 'center' }}>
                      <h2>Layout Example</h2>
                      {/* Ejemplo 1*/}
                      <div>
                        <EdeskLayout
                          title="Demo Layout 1"
                          subtitle="Puedes mostrar u ocultar el body con el botón."
                          open={open}
                          content={
                            <button onClick={() => setOpen((o) => !o)} style={{ marginLeft: 16 }}>
                              {open ? 'Cerrar body' : 'Abrir body'}
                            </button>
                          }
                        >
                          <div>Children opcional aquí</div>
                        </EdeskLayout>
                      </div>
                      {/* Ejemplo 2*/}
                      <div style={{ "--layout-bg-svg-color": "#d32f2f", "--layout-header-bg": "black", "--layout-container-bg": "#E3F1FF" } as React.CSSProperties}>
                        <button onClick={() => setClosed((o) => !o)} style={{ marginLeft: 16 }}>
                            {closed ? 'Cerrar body' : 'Abrir body'}
                          </button>
                        <EdeskLayout
                          title="Demo Layout 2"
                          subtitle="Puedes mostrar u ocultar el body con el botón."
                          open={closed}
                        >
                          <div>Children opcional aquí</div>
                        </EdeskLayout>
                      </div>
                      {/* Ejemplo 3: Layout con SVG personalizado como componente React */}
                      <div style={{ width: "900px", height: "300px"}}>
                        <button onClick={() => setOpen((o) => !o)} style={{ marginLeft: 16 }}>
                          {open ? 'Cerrar body' : 'Abrir body'}
                        </button>
                        <EdeskLayout
                          autofill
                          svgComponent={CustomHeaderSVG}
                          open={open}
                        >
                          <div>Children opcional aquí (SVG header personalizado)</div>
                        </EdeskLayout>
                      </div>
                      {/* Ejemplo 4*/}
                      <div style={{ width: "1400px", height: "500px"}}>
                        <button onClick={() => setOpen((o) => !o)} style={{ marginLeft: 16 }}>
                          {open ? 'Cerrar body' : 'Abrir body'}
                        </button>
                        <EdeskLayout
                          autofill
                          hiddenSVG
                          open={open}
                        >
                          <div>Children opcional aquí</div>
                        </EdeskLayout>
                      </div>
                    </div>
                  </div>
                )
              }

              export default App`

              }
            ]
          }
        ]
      },
    ],
    recipes: [
      {
        id: 'recipe-1',
        icon: 'user-circle',
        title: 'Layout example',
        description: 'layout abierto sin svg',
        props: {
          title:'Layout 1',
          subtitle:'Subtitulo de ejemplo',
          open: true,
          content:'content del header',
          hiddenSVG: true,
        },
        code: `<EdeskLayout
                title="Layout 1"
                subtitle="Subtitulo de ejemplo"
                open
                hiddenSVG
                content="content del header"
              />`
      },
        
      {
        id: 'recipe-2',
        icon: 'user-circle',
        title: 'Layout cerrado',
        description: 'Configuración para subir una única imagen de perfil con validación de tipo y tamaño.',
        props: {
          title:'Layout 2',
          subtitle:'Subtitulo de ejemplo',
          open:false,
        },
        code: `<EdeskLayout
                title="Layout 2"
                subtitle="Subtitulo de ejemplo"
                children="Contenido opcional aquí"
                hiddenSVG
                content="content del header"
              />`
      },
    ],
    architecture: {
      nodes: [
        { id: 'drag-handler', label: 'useDragAndDrop', type: 'Caso de Uso', description: 'Maneja la lógica de arrastrar y soltar, activando los estados visuales correspondientes.' },
        { id: 'validation-utils', label: 'EdeskFileValidationUtils', type: 'Caso de Uso', description: 'Valida los archivos según su tamaño, extensión y el límite configurado.' },
        { id: 'file-list-ui', label: 'AnimatedFileList', type: 'UI', description: 'Componente de UI que renderiza la lista de archivos seleccionados con animaciones.' },
        { id: 'main-container', label: 'EdeskFileUpload', type: 'UI', description: 'El componente principal que orquesta la UI y la lógica de alto nivel.' },
        { id: 'core-logic', label: 'Core Logic', type: 'Lógica central', description: 'Gestiona el estado interno, las props y la comunicación entre los casos de uso y la UI.' }
      ],
      connections: [
        { from: 'drag-handler', to: 'core-logic' },
        { from: 'validation-utils', to: 'core-logic' },
        { from: 'file-list-ui', to: 'core-logic' },
        { from: 'main-container', to: 'core-logic' },
      ]
    }
  },

  //VIEWERPDF
  {
    id: "viewer-pdf",
    name: "ViewerPDF",
    component: EdeskViewerPDF as unknown as React.ComponentType<Record<string, unknown>>,
    category: "Visualización",
    type: "component",
    description: "Visor de PDF ligero y personalizable con controles de navegación, zoom, y opciones de descarga. Ideal para visualizar documentos PDF de manera interactiva.",
    lastUpdate: "2025-08-11",
    
    playgroundConfig: {
      componentName: 'EdeskViewerPDF',
      componentSpecificConfig: edeskViewerPDFConfig,
      mockData: {
        id: "pdf-viewer-example",
        pdfUrl: "..\\..\\public\\sample.pdf",
      },
      
      groups: [],
      
      // Configuración de enums para conversión automática
      enumConfigs: [
        {
          prop: 'mode',
          enumObject: PdfViewerMode,
          conversionMap: {
            'PdfViewerMode.Light': 'Light',
            'PdfViewerMode.Dark': 'Dark',
            'PdfViewerMode.Basic': 'Basic'
          }
        },
        {
          prop: 'enabledOptions',
          enumObject: PdfViewerOption,
          conversionMap: {
            'PdfViewerOption.Print': 'Print',
            'PdfViewerOption.Download': 'Download',
            'PdfViewerOption.EditorHighlight': 'EditorHighlight',
            'PdfViewerOption.EditorFreeText': 'EditorFreeText',
            'PdfViewerOption.EditorInk': 'EditorInk',
            'PdfViewerOption.EditorStamp': 'EditorStamp'
          }
        }
      ],
      
      customControls: {
        width: {
          type: 'text',
          defaultValue: '100%',
          description: 'Ancho del visor PDF'
        },
        height: {
          type: 'text',
          defaultValue: '600px',
          description: 'Alto del visor PDF'
        },
        title: {
          type: 'text',
          defaultValue: 'ViewerPDF - Gestión documental',
          description: 'Título del documento PDF'
        },
        mode: {
          type: 'select',
          options: ['PdfViewerMode.Basic', 'PdfViewerMode.Dark', 'PdfViewerMode.Light'],
          defaultValue: 'PdfViewerMode.Light',
          description: 'Modo de apariencia del viewerPDF'
        },
        enabledOptions: {
          type: 'select-check',
          options: ['PdfViewerOption.Print', 'PdfViewerOption.Download', 'PdfViewerOption.EditorHighlight', 'PdfViewerOption.EditorFreeText', 'PdfViewerOption.EditorInk', 'PdfViewerOption.EditorStamp'],
          defaultValue: ['PdfViewerOption.Print', 'PdfViewerOption.Download'],
          description: 'Opciones habilitadas del viewerPDF'
        },
      },
    },

    recipes: [
      {
        id: 'recipe-1',
        icon: 'file-pdf',
        title: 'Visor básico',
        description: 'Configuración básica para visualizar un PDF con controles mínimos.',
        props: {
          mode: 'PdfViewerMode.Light',
          enabledOptions: ['PdfViewerOption.Download', 'PdfViewerOption.Print', 'PdfViewerOption.EditorHighlight', 'PdfViewerOption.EditorFreeText', 'PdfViewerOption.EditorInk', 'PdfViewerOption.EditorStamp'],
          width: '80%',
          height: '550px',
          title: 'hola',
          
        },
        code: `<EdeskViewerPDF
                id="pdf-viewer-example"
                pdfUrl={"..\\..\\public\\sample.pdf"}
                mode={PdfViewerMode.Light}
                width="80%"
                height="550px"
                title="hola"
                enabledOptions={[
                  PdfViewerOption.EditorFreeText,
                  PdfViewerOption.EditorStamp,
                  PdfViewerOption.Download,
                  PdfViewerOption.Print,
                ]}
                />`
      },
      
    ],

    tabs: [
      {
        id: 'playground',
        label: 'Playground',
        sections: []
      },
      //INSTALACIÓN
      {
        id: 'installation',
        label: 'Instalación',
        sections: [
          {
            title: 'Descarga',
            blocks: [
              {
                type: 'code',
                language: 'bash',
                code: 'npm install edesk-components@0.0.14'
              }
            ]
          },
          {
            title: 'Importación',
            blocks: [
              {
                type: 'code',
                language: 'javascript',
                code: 'import { EdeskViewerPDF, PdfViewerOption, PdfViewerMode } from "edesk-components";'
              },
            ]
          }
        ]
      },
      //API
      {
        id: 'api',
        label: 'API de Propiedades',
        sections: [
          {
            title: 'API de Propiedades (Props)',
            blocks: [
              {
                type: 'text',
                content: 'El componente ViewerPDF se configura mediante props que controlan la visualización y funcionalidad del visor de PDF.'
              },
              {
                type: 'text',
                content: 'Configuración Esencial - Props básicas para el funcionamiento del visor:'
              },
              {
                type: 'table',
                columns: ['Propiedad', 'Tipo', 'Por Defecto', 'Descripción'],
                rows: [
                  ['id', 'string', 'requerido', 'ID único del viewer'],
                  ['title', 'string', 'requerido', 'Título del componente'],
                  ['pdfUrl', 'string', 'requerido', 'URL del archivo PDF a visualizar. Puede ser una URL externa o un blob URL local.'],
                  ['width', 'string | number', '100%', 'Ancho del visor. Puede ser en píxeles (number) o porcentaje/unidades CSS (string).'],
                  ['height', 'string | number', '600px', 'Alto del visor. Puede ser en píxeles (number) o porcentaje/unidades CSS (string).']
                ]
              },
              {
                type: 'text',
                content: 'Controles de Interfaz - Props que controlan la visibilidad de elementos de la UI:'
              },
              {
                type: 'table',
                columns: ['Propiedad', 'Tipo', 'Por Defecto', 'Descripción'],
                rows: [
                  ['type', 'boolean', 'true', 'Muestra/oculta la barra de herramientas superior con controles.'],
                  ['mode', 'PdfViewerMode', 'PdfViewerMode.basic', 'Modo de apariencia del viewer; ligth, dark y basic(se ajusta al tema del navegador)'],
                  ['enableOptions', 'PdfViewerOption', '[]', 'habilita opciones en el viewerPDF; print(imprimir), download(descargar), editorHighlight(Resaltar), editorFreeText(Texto), editorInk(Dibujar), editorStamp(imagenes)'],
                  ['className', 'string', 'null', 'Asigna una clase CSS al contenedor raíz del componente.'],
                ]
              },
              {
                type: 'text',
                content: 'Callbacks y Eventos - Props de función para manejar eventos:'
              },
              {
                type: 'table',
                columns: ['Propiedad', 'Tipo', 'Descripción'],
                rows: [
                  ['onPdfLoaded', '() => void', 'Callback ejecutado cuando el PDF se carga exitosamente.'],
                  ['onError', '(error: Error) => void', 'Callback ejecutado cuando ocurre un error al cargar el PDF.'],
                  ['onPageChange', '(pageNber: number) => void', 'Callback ejecutado cuando el usuario cambia de página.'],
                ]
              }
            ]
          }
        ]
      },
      //IMPLEMENTACIÓN
      {
        id: 'implementation',
        label: 'Guía de Implementación',
        sections: [
          {
            title: 'Guía de Implementación',
            blocks: [
              {
                type: 'text',
                content: 'Ejemplo básico de implementación del ViewerPDF con configuración estándar.'
              },
              {
                type: 'code',
                language: 'typescript',
                code: `
                import React from 'react';
                import { EdeskViewerPDF, PdfViewerOption, PdfViewerMode } from "edesk-components";

                const ViewerPDF = () => {

                  return (
                      <div style={{ maxWidth: '650px', margin: 'auto' }}>
                          <h2>Carga de Facturas y Documentos</h2>
                          <p>Por favor, adjunte los documentos requeridos. Los archivos no deben exceder los 10 MB.</p>

                          <EdeskViewerPDF
                          id={"pdf-viewer-example"}
                          pdfUrl={"..\..\public\sample.pdf"}
                          width={"100%"}
                          height={"600px"}
                          title={"ViewerPDF - Gestión documental"}
                          mode={PdfViewerMode.Light}
                          enabledOptions={[
                            PdfViewerOption.Print,
                            PdfViewerOption.Download,
                          ]}
                          />
                      </div>
                  );
                };

                export default ViewerPDF;`
              }
            ]
          }
        ]
      },
      //FEATURES
      {
        id: 'features',
        label: 'Características',
        sections: [
          {
            title: 'Características Principales',
            blocks: [
              {
                type: 'text',
                content: 'El ViewerPDF de edesk-components ofrece una experiencia completa de visualización de documentos PDF con las siguientes características:'
              },
              {
                type: 'list',
                items: [
                  'Visualización de PDF responsiva que se adapta a cualquier tamaño de pantalla',
                  'Navegación fluida entre páginas con botones anterior/siguiente y salto directo',
                  'Controles de zoom: acercar, alejar, ajustar a página, ajustar a ancho',
                  'Descarga directa del PDF visualizado',
                  'Función de impresión integrada',
                  'Temas claro y oscuro para mejor experiencia visual',
                  'Estados de carga y error personalizables',
                  'Completamente personalizable vía CSS variables',
                  'Soporte para URLs externas y archivos locales (blob URLs)',
                  'Callbacks para eventos importantes (carga, error, cambio de página/zoom)',
                  'Interfaz táctil optimizada para dispositivos móviles',
                  'Accesibilidad mejorada con ARIA labels y navegación por teclado'
                ]
              }
            ]
          },
          {
            title: 'Casos de Uso Comunes',
            blocks: [
              {
                type: 'text',
                content: 'El ViewerPDF es ideal para múltiples escenarios empresariales y de aplicación:'
              },
              {
                type: 'list',
                items: [
                  'Visualización de contratos y documentos legales',
                  'Revisión de reportes y documentos financieros',
                  'Previsualización de manuales y documentación técnica',
                  'Sistemas de gestión documental',
                  'Plataformas educativas para material de estudio',
                  'Portales de clientes para facturas y estados de cuenta',
                  'Sistemas de workflow para aprobación de documentos',
                  'Archivos digitales y bibliotecas documentales'
                ]
              }
            ]
          }
        ]
      },
      //TROUBLESHOOTING
      {
        id: 'troubleshooting',
        label: 'Solución de Problemas',
        sections: [
          {
            title: 'Problemas Comunes y Soluciones',
            blocks: [
              {
                type: 'text',
                content: 'Aquí se documentan los problemas más frecuentes y sus soluciones:'
              },
              {
                type: 'text',
                content: 'Problema: El PDF no se carga'
              },
              {
                type: 'list',
                items: [
                  'Verificar que la URL del PDF sea accesible y válida',
                  'Comprobar que el servidor permite CORS para el dominio de la aplicación',
                  'Asegurar que el archivo sea un PDF válido',
                  'Revisar la consola del navegador para errores específicos'
                ]
              },
              {
                type: 'text',
                content: 'Problema: Los controles no aparecen'
              },
              {
                type: 'list',
                items: [
                  'Comprobar que no haya CSS personalizado ocultando los controles',
                  'Asegurar que el contenedor tenga suficiente altura para mostrar la toolbar'
                ]
              },
              {
                type: 'text',
                content: 'Problema: El visor no es responsivo'
              },
              {
                type: 'list',
                items: [
                  'Configurar width="100%" para que se adapte al contenedor',
                  'Usar unidades relativas para height (vh, %, etc.)',
                  'Verificar que el contenedor padre no tenga restricciones de tamaño'
                ]
              }
            ]
          }
        ]
      }
    ],

    architecture: {
      nodes: [
        { id: 'pdf-loader', label: 'PDF Loader', type: 'Caso de Uso', description: 'Maneja la carga y procesamiento de archivos PDF desde URLs o blobs.' },
        { id: 'page-renderer', label: 'Page Renderer', type: 'Caso de Uso', description: 'Renderiza las páginas del PDF en canvas con optimización de performance.' },
        { id: 'zoom-controller', label: 'Zoom Controller', type: 'Caso de Uso', description: 'Gestiona los niveles de zoom y escalado del documento.' },
        { id: 'navigation-controller', label: 'Navigation Controller', type: 'Caso de Uso', description: 'Controla la navegación entre páginas y posición del documento.' },
        { id: 'toolbar-ui', label: 'Toolbar UI', type: 'UI', description: 'Barra de herramientas con botones de control y información de estado.' },
        { id: 'viewer-canvas', label: 'Viewer Canvas', type: 'UI', description: 'Área principal de visualización del PDF renderizado.' },
        { id: 'main-container', label: 'EdeskViewerPDF', type: 'UI', description: 'Componente principal que orquesta toda la funcionalidad del visor.' },
        { id: 'core-logic', label: 'Core Logic', type: 'Lógica central', description: 'Gestiona el estado, eventos y comunicación entre todos los módulos.' }
      ],
      connections: [
        { from: 'pdf-loader', to: 'core-logic' },
        { from: 'page-renderer', to: 'core-logic' },
        { from: 'zoom-controller', to: 'core-logic' },
        { from: 'navigation-controller', to: 'core-logic' },
        { from: 'toolbar-ui', to: 'core-logic' },
        { from: 'viewer-canvas', to: 'core-logic' },
        { from: 'main-container', to: 'core-logic' }
      ]
    }
  }
  
]