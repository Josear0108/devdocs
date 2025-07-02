import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Code, FileText } from 'lucide-react';
import { Button } from '../components/ui/button/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Separator } from '../components/ui/Separator';
import React from 'react';
import './module-detail.css';
import { Badge } from '../components/ui/badge/Badge';

interface Module {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'stable' | 'beta' | 'deprecated';
  lastUpdated: string;
  contributors: Array<{
    name: string;
    avatar: string;
    role: string;
  }>;
  documentation: string;
  implementation: string;
  versionHistory: Array<{
    version: string;
    date: string;
    changes: string[];
    author: string;
  }>;
}

export default function ModuleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    // Simulación de carga de datos
    setModule({
      id: id || '1',
      name: 'Módulo de Autenticación',
      description: 'Sistema completo de autenticación y autorización con soporte para múltiples proveedores.',
      version: '2.1.0',
      status: 'stable',
      lastUpdated: '2024-03-15',
      contributors: [
        {
          name: 'Juan Pérez',
          avatar: 'https://github.com/shadcn.png',
          role: 'Lead Developer'
        },
        {
          name: 'María García',
          avatar: 'https://github.com/shadcn.png',
          role: 'Security Expert'
        }
      ],
      documentation: `
# Módulo de Autenticación

## Descripción
Este módulo proporciona una solución completa para la autenticación y autorización en aplicaciones web.

## Características
- Autenticación con múltiples proveedores (Google, GitHub, etc.)
- Gestión de sesiones
- Control de acceso basado en roles
- Integración con JWT

## Uso
\`\`\`typescript
import { Auth } from '@devdocs/auth';

const auth = new Auth({
  providers: ['google', 'github'],
  sessionDuration: '24h'
});
\`\`\`
      `,
      implementation: `
# Implementación

## Estructura del Proyecto
\`\`\`
src/
  ├── auth/
  │   ├── providers/
  │   ├── middleware/
  │   └── utils/
  ├── config/
  └── types/
\`\`\`

## Configuración
\`\`\`typescript
// auth.config.ts
export const authConfig = {
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  }
};
\`\`\`
      `,
      versionHistory: [
        {
          version: '2.1.0',
          date: '2024-03-15',
          changes: [
            'Mejora en el rendimiento de la validación de tokens',
            'Nuevo soporte para autenticación con Apple',
            'Corrección de bugs en la gestión de sesiones'
          ],
          author: 'Juan Pérez'
        },
        {
          version: '2.0.0',
          date: '2024-02-01',
          changes: [
            'Refactorización completa del sistema de autenticación',
            'Implementación de autenticación multifactor',
            'Nueva API para gestión de roles'
          ],
          author: 'María García'
        }
      ]
    });
  }, [id]);

  if (!module) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="module-detail">
      <div className="module-header">
        <div className="header-content">
          <div className="breadcrumb">
            <Button variant="ghost" size="sm" onClick={() => navigate('/modulos')}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Módulos
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{module.name}</span>
          </div>
          <div className="title-section">
            <h1>{module.name}</h1>
            <div className="badges">
              <Badge variant="outline" className="version">
                v{module.version}
              </Badge>
              <Badge variant={module.status === 'stable' ? 'default' : 'secondary'}>
                {module.status}
              </Badge>
            </div>
          </div>
          <p className="description">{module.description}</p>
        </div>
      </div>

      <div className="module-content"> 
        <div className="main-content">
          <Tabs defaultValue="documentation" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="documentation">
                <FileText className="h-4 w-4 mr-2" />
                Documentación
              </TabsTrigger>
              <TabsTrigger value="implementation">
                <Code className="h-4 w-4 mr-2" />
                Implementación
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="h-4 w-4 mr-2" />
                Historial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documentation" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-invert max-w-none">
                    {module.documentation.split('\n').map((line, index) => {
                      if (line.startsWith('#')) {
                        const level = line.match(/^#+/)?.[0].length || 1;
                        const text = line.replace(/^#+\s*/, '');
                        return React.createElement(`h${level}`, { key: index }, text);
                      }
                      if (line.startsWith('```')) {
                        return <pre key={index}><code>{line.replace(/^```/, '')}</code></pre>;
                      }
                      return <p key={index}>{line}</p>;
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementation" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-invert max-w-none">
                    {module.implementation.split('\n').map((line, index) => {
                      if (line.startsWith('#')) {
                        const level = line.match(/^#+/)?.[0].length || 1;
                        const text = line.replace(/^#+\s*/, '');
                        return React.createElement(`h${level}`, { key: index }, text);
                      }
                      if (line.startsWith('```')) {
                        return <pre key={index}><code>{line.replace(/^```/, '')}</code></pre>;
                      }
                      return <p key={index}>{line}</p>;
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="version-history">
                    {module.versionHistory.map((version, index) => (
                      <div key={index} className="version-item">
                        <div className="version-header">
                          <div className="version-info">
                            <h3 className="version-number">v{version.version}</h3>
                            <span className="version-date">{version.date}</span>
                          </div>
                          <Badge variant="outline" className="version-author">
                            {version.author}
                          </Badge>
                        </div>
                        <ul className="version-changes">
                          {version.changes.map((change, changeIndex) => (
                            <li key={changeIndex}>{change}</li>
                          ))}
                        </ul>
                        {index < module.versionHistory.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="sidebar">
          <Card>
            <CardHeader>
              <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="info-section">
                <div className="info-item">
                  <span className="label">Última actualización</span>
                  <span className="value">{module.lastUpdated}</span>
                </div>
                <div className="info-item">
                  <span className="label">Versión</span>
                  <span className="value">v{module.version}</span>
                </div>
                <div className="info-item">
                  <span className="label">Estado</span>
                  <Badge variant={module.status === 'stable' ? 'default' : 'secondary'}>
                    {module.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Contribuidores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="contributors-list">
                {module.contributors.map((contributor, index) => (
                  <div key={index} className="contributor-item">
                    <Avatar>
                      <AvatarImage src={contributor.avatar} />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="contributor-info">
                      <span className="contributor-name">{contributor.name}</span>
                      <span className="contributor-role">{contributor.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 