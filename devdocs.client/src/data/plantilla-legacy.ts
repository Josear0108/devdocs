import type { ComponentItem } from "../types/component";

export const dataPlantillaLegacy: ComponentItem = {
    id: "plantilla-legacy",
    name: "Plantilla EdeskWeb 5",
    description: "Versión estable: 5.2025.804.1045",
    category: "Servicio",
    lastUpdate: "2025-08-01",
    type: "guide",
    tabs: [
        {
            id: 'information',
            label: 'Información',
            sections: [
                {
                    title: '',
                    blocks: [
                        {
                            type: 'text',
                            content: 'La plantilla Edesk es un módulo reutilizable para aplicaciones ASP.NET (.NET Framework 4.7.2) que provee una interfaz de usuario configurable para el proceso de autenticación y acceso. Permite a los implementadores personalizar la experiencia visual y de interacción del login, integrando fácilmente métodos de autenticación, estilos, y comportamientos según las necesidades de cada proyecto o cliente.'
                        }
                    ]
                },
                {
                    title: 'Características principales',
                    blocks: [
                        {
                            type: 'list',
                            items: [
                                'Interfaz de usuario adaptable: Soporta diferentes estilos visuales, posiciones del formulario y personalización de variables CSS.',
                                'Configuración flexible: Permite definir una configuración global (estática) o personalizada por usuario (dinámica).',
                                'Centralización de configuración: Toda la lógica de configuración se gestiona a través de un centralizador (UIConfigurationManager), facilitando la validación y el acceso desde cualquier parte de la plantilla.',
                                'Integración de métodos de autenticación: Soporta múltiples métodos de autenticación, como usuario/contraseña, OTP, etc.',
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'visual-configuration',
            label: 'Configuración visual',
            sections: [
                {
                    title: '',
                    blocks: [
                        {
                            type: 'text',
                            content: 'La plantilla Edesk permite cambiar la apariencia y el comportamiento de la pantalla de inicio de sesión (login) de una aplicación. Hay dos formas principales de hacerlo:'
                        }
                    ]
                },
                {
                    title: 'Configuración global (para todos los usuarios)',
                    blocks: [
                        {
                            type: 'text',
                            content: 'Se define una sola vez y aplica a toda la aplicación para todos los usuarios, salvo que se sobrescriba por usuario.'
                        },
                        {
                            type: 'code',
                            language: 'csharp',
                            code: `
                            EdeskWeb.Edesk.Login.General.Settings.GlobalUIConfiguration.Initialize(cfg =>
                            {
                                cfg.Style = UIStyle.Glassmorphism;
                                cfg.Position = LoginPosition.Center;
                                cfg.Title = "Mi Portal";
                                cfg.ShowNavBar = true;
                                cfg.CssVariables = new Dictionary<string, string>
                                {
                                    { "login-button-primary-bg", "#00DBDA" },
                                    { "login-color-text", "#222" }
                                };
                                // ...otras propiedades
                            });
                            `
                        }
                    ]
                },
                {
                    title: ' Configuración dinámica (por usuario)',
                    blocks: [
                        {
                            type: 'text',
                            content: 'Permite que cada usuario tenga su propia configuración de UI, almacenada en sesión. Ideal para escenarios multi-tenant o donde la apariencia debe cambiar según el contexto del usuario.'
                        },
                        {
                            type: 'code',
                            language: 'csharp',
                            code: `
                            var custom = new EdeskWeb.Edesk.Login.General.Settings.CustomUIConfiguration
                            {
                                Style = UIStyle.Compact,
                                Title = "Acceso VIP",
                                CssVariables = new Dictionary<string, string>
                                {
                                    ["login-button-primary-bg"] = "#FF5722",
                                    ["login-color-text"] = "#ffffff"
                                }
                                // ...otros valores
                            };

                            UIConfigurationManager.Set(custom); // Aplica solo para el usuario actual
                            `
                        }
                    ]
                },
                {
                    title: 'Tabla de propiedades',
                    blocks: [
                        {
                            type: 'text',
                            content: 'La siguiente tabla muestra todas las propiedades visuales que se pueden configurar en la plantilla Edesk. Estas opciones permiten personalizar la apariencia y el comportamiento de la pantalla de inicio de sesión según las necesidades de cada proyecto o usuario.'
                        },
                        {
                            type: 'table',
                            columns: ['Propiedad', 'Tipo', 'Por Defecto', 'Descripción'],
                            rows: [
                                ['Style', 'UIStyle', 'Glassmorphism', 'Estilo visual general de la interfaz de login (por ejemplo: Glassmorphism, Compact).'],
                                ['Position', 'LoginPosition', 'Center', 'Posición del formulario de login en la pantalla (por ejemplo: Center, Left).'],
                                ['CssVariables', 'Dictionary<string, string>', '{}', 'Variables CSS personalizadas para colores, fondos, bordes, etc.'],
                                ['ShowNavBar', 'boolean', 'false', 'Indica si se muestra la barra de navegación en la interfaz de login.'],
                                ['ShowPass', 'boolean', 'true', 'Indica si el campo de contraseña es visible.'],
                                ['EnableAnimations', 'boolean', 'true', 'Habilita o deshabilita animaciones en la interfaz.'],
                                ['AllowPastePassword', 'boolean', 'false', 'Permite o no pegar texto en el campo de contraseña.'],
                                ['AnimationClass', 'string', "''", 'Nombre de la clase CSS para animaciones.'],
                                ['AnimationDuration', 'number', '500', 'Duración de las animaciones en milisegundos.'],
                                ['Title', 'string', 'undefined', 'Título mostrado en la barra de navegación del portal.'],
                                ['FnPTI', 'JavaScriptAction', 'undefined', 'Acción JavaScript para mostrar políticas de información.'],
                                ['FnMGU', 'JavaScriptAction', 'undefined', 'Acción JavaScript para mostrar el marco general unificado.'],
                                ['FnRegister', 'JavaScriptAction', 'undefined', 'Acción JavaScript para el registro de usuario.'],
                                ['FnForgotPassword', 'JavaScriptAction', 'undefined', 'Acción JavaScript para la funcionalidad de "Olvidé mi contraseña".'],
                                ['FnOnlineSupport', 'JavaScriptAction', 'undefined', 'Acción JavaScript para soporte en línea.'],
                                ['NavBarButtons', 'List<Button>', 'undefined', 'Colección de botones a mostrar en la barra de navegación del login.']
                            ]
                        },
                    ]
                },
            ]
        },
        {
            id: 'multiple-authentications',
            label: 'Autenticación múltiple',
            sections: [
                {
                    title: '',
                    blocks: [
                        {
                            type: 'text',
                            content: 'Este bloque define y registra los servicios de autenticación (login) que estarán disponibles en la plantilla Edesk. Permite que la aplicación soporte diferentes métodos de autenticación, como autenticación por tipo de documento y autenticación por clave dinámica (OTP).'
                        }
                    ]
                },
                {
                    title: 'Explicación paso a paso',
                    blocks: [
                        {
                            type: 'text',
                            content: 'Paso 1: Registro servicio cifrado de credenciales'
                        },
                        {
                            type: 'code',
                            language: 'csharp',
                            code: `
                            services.AddSingleton<Edesk.CryptoClient.ICryptoClientService, Edesk.CryptoClient.DefaultCryptoClientService>();
                            `
                        },
                        {
                            type: 'text',
                            content: 'Se registra e implementa este servicio para proteger la información de los usuarios, cumplir con estándares de seguridad y mantener una arquitectura robusta y fácil de mantener en la aplicación.'
                        },
                        {
                            type: 'text',
                            content: 'Paso 2: Definición de servicios de login'
                        },
                        {
                            type: 'code',
                            language: 'csharp',
                            code: `
                            EdeskWeb.Edesk.Login.General.ILoginServices defaultLoginServices = new EdeskWeb.Edesk.Login.General.LoginServices
                            {
                                Services = new List<EdeskWeb.Edesk.Login.General.ILoginService>
                                {
                                    new EdeskWeb.Edesk.Login.UserPasswordService(),
                                    new EdeskWeb.Edesk.Login.DocumentTypeLoginService(),
                                    new EdeskWeb.Edesk.Login.DynamicPasswordService(721, "ef10adbf-c9ec-42")
                                    {
                                        Type = EdeskWeb.Edesk.Login.DynamicPasswordService.DynamicPasswordType.DocumentNumber
                                    }
                                }
                            };
                            `
                        },
                        {
                            type: 'text',
                            content: 'Se crea una instancia de LoginServices, que es una colección de servicios de autenticación (ILoginService). En la lista Services se agregan los métodos de autenticación disponibles:'
                        },
                        {
                            type: 'list',
                            items: [
                                'UserPasswordService: Permite autenticación usando usuario y contraseña.',
                                'DocumentTypeLoginService: Permite autenticación usando tipo y número de documento.',
                                'DynamicPasswordService: Permite autenticación usando un código dinámico (OTP) enviado por correo o SMS. Para su correcto funcionamiento, debe configurarse con el identificador de la cuenta de correo y el token del servicio de envío de SMS. Además, al instanciarlo se especifica el tipo de autenticación que se utilizará (por ejemplo, DocumentNumber) para determinar qué dato del usuario servirá como credencial en el envío y validación del OTP.'
                            ]
                        },
                        {
                            type: 'text',
                            content: 'Paso 3: Registro de los servicios en el contenedor de dependencias'
                        },
                        {
                            type: 'code',
                            language: 'csharp',
                            code: `
                            services.AddSingleton(defaultLoginServices);
                            `
                        },
                        {
                            type: 'text',
                            content: 'Se registra la instancia de defaultLoginServices como un servicio singleton. Esto permite que la plantilla Edesk acceda a los métodos de autenticación configurados desde cualquier parte de la aplicación.'
                        },
                        {
                            type: 'text',
                            content: 'Paso 4: Inicialización de la plantilla Edesk'
                        },
                        {
                            type: 'code',
                            language: 'csharp',
                            code: `
                            Edesk.EdeskInit edeskInit = new Edesk.EdeskInit(services) { };
                            edeskInit.Start();
                            `
                        },
                        {
                            type: 'text',
                            content: 'Se crea e inicia la instancia principal de la plantilla Edesk, pasando la colección de servicios configurados. Esto habilita los métodos de autenticación definidos para ser usados en el login.'
                        }
                    ]
                },
                {
                    title: 'Código completo',
                    blocks: [
                        {
                            type: 'text',
                            content: 'A continuación, un ejemplo completo de la configuración de múltiples métodos de autenticación.'
                        },
                        {
                            type: 'code',
                            language: 'csharp',
                            code: `
                            IServiceCollection services = new ServiceCollection();
                            services.AddSingleton<Edesk.CryptoClient.ICryptoClientService, Edesk.CryptoClient.DefaultCryptoClientService>();

                            EdeskWeb.Edesk.Login.General.ILoginServices defaultLoginServices = new EdeskWeb.Edesk.Login.General.LoginServices
                            {
                                Services = new List<EdeskWeb.Edesk.Login.General.ILoginService>
                                {
                                    new EdeskWeb.Edesk.Login.UserPasswordService(),
                                    new EdeskWeb.Edesk.Login.DocumentTypeLoginService(),
                                    new EdeskWeb.Edesk.Login.DynamicPasswordService(123, "token-sms")
                                    {
                                        Type = EdeskWeb.Edesk.Login.DynamicPasswordService.DynamicPasswordType.DocumentNumber
                                    }
                                }
                            };

                            services.AddSingleton(defaultLoginServices);

                            Edesk.EdeskInit edeskInit = new Edesk.EdeskInit(services) { };
                            edeskInit.Start();
                            `
                        }
                    ]
                }
            ]
        }
    ]
};