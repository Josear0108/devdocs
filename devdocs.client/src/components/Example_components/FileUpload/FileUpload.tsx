// src/components/examples/FileUploadExample.tsx

import { FileUploadContainer } from 'edesk-components';
import './FileUpload.css'; // Usamos el mismo CSS que ya creamos

const FileUploadExample = () => {
  return (
    // Usaremos un fragmento para agrupar los ejemplos
    <>
      <section className="example-section">
        <h2 className="example-section-title">Ejemplo 1: Tipo Large (con drag & drop)</h2>
        <FileUploadContainer
          title="Documento de identificación"
          subtitle="Arrastra y suelta archivos PDF aquí o haz clic para seleccionar"
          showExtensions
          uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
          encryptedPath="ruta-cifrada-de-ejemplo"
          maxFileSize={9765630} // ~9.3MB
          acceptedFileTypes={['pdf']}
          maxFiles={5}
        />
      </section>

      <section className="example-section">
        <h2 className="example-section-title">Ejemplo 2: Tipo Button</h2>
        <FileUploadContainer
          type="button"
          title="Adjuntar archivo"
          uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
          encryptedPath="ruta-cifrada-de-ejemplo"
          maxFileSize={5242880} // 5MB
          acceptedFileTypes={['pdf', 'jpg', 'png']}
          multiSelectFile={false}
        />
      </section>

      <section className="example-section">
        <h2 className="example-section-title">Ejemplo 3: Tipo DragOff (sin drag & drop)</h2>
        <FileUploadContainer
          type="dragOff"
          title="Seleccionar documentos"
          subtitle="Haz clic para seleccionar archivos"
          showExtensions
          allowedExtensionsText="Formatos permitidos: PDF, DOCX"
          uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
          encryptedPath="ruta-cifrada-de-ejemplo"
          maxFileSize={10485760} // 10MB
          acceptedFileTypes={['pdf', 'docx']}
          maxFiles={3}
          minSelectFile={1}
        />
      </section>
    </>
  );
};

export default FileUploadExample;