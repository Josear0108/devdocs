"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

export function ModuleImplementation({ slug }: { slug: string }) {
  // En una implementación real, cargarías los datos del módulo basado en el slug

  return (
    <div className="space-y-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Implementación</h2>
        <p>
          A continuación se muestran ejemplos de cómo implementar el módulo de autenticación en diferentes contextos y
          frameworks.
        </p>
      </div>

      <Tabs defaultValue="nextjs">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="nextjs">Next.js</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="node">Node.js</TabsTrigger>
        </TabsList>

        <TabsContent value="nextjs" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Implementación en Next.js</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ejemplo de cómo configurar el módulo de autenticación en una aplicación Next.js.
              </p>
            </CardContent>
          </Card>

          <CodeBlock
            language="tsx"
            code={`// app/api/auth/[...nextauth]/route.ts
import { createAuth } from '@acme/auth-module';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

export const authOptions: NextAuthOptions = {
  providers: [
    createAuth({
      providers: {
        local: { enabled: true },
        google: {
          enabled: true,
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
      },
    }),
  ],
  // Otras opciones de configuración...
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };`}
            showLineNumbers
          />

          <CodeBlock
            language="tsx"
            code={`// app/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}`}
            showLineNumbers
          />
        </TabsContent>

        <TabsContent value="react" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Implementación en React</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ejemplo de cómo configurar el módulo de autenticación en una aplicación React.
              </p>
            </CardContent>
          </Card>

          <CodeBlock
            language="tsx"
            code={`// src/auth/AuthProvider.tsx
import { createAuth } from '@acme/auth-module';
import { createContext, useContext, useState, useEffect } from 'react';

const auth = createAuth({
  providers: {
    local: { enabled: true },
    google: {
      enabled: true,
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
    },
  },
});

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signIn: auth.signIn,
    signOut: auth.signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);`}
            showLineNumbers
          />

          <CodeBlock
            language="tsx"
            code={`// src/components/LoginForm.tsx
import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export function LoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn.withEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}`}
            showLineNumbers
          />
        </TabsContent>

        <TabsContent value="node" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Implementación en Node.js</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ejemplo de cómo configurar el módulo de autenticación en una API Node.js.
              </p>
            </CardContent>
          </Card>

          <CodeBlock
            language="typescript"
            code={`// src/auth.ts
import { createAuth } from '@acme/auth-module';

const auth = createAuth({
  providers: {
    local: { enabled: true },
    jwt: { enabled: true, secret: process.env.JWT_SECRET! },
  },
});

export const authMiddleware = auth.middleware();
export const requireAuth = auth.requireAuth;
export const requireRole = auth.requireRole;`}
            showLineNumbers
          />

          <CodeBlock
            language="typescript"
            code={`// src/server.ts
import http from 'http';
import { URL } from 'url';
import { auth, authMiddleware } from './auth';

const server = http.createServer(async (req, res) => {
  // Aplicar middleware de autenticación
  await authMiddleware(req, res);

  const url = new URL(req.url || '/', \`http://\${req.headers.host}\`);

  // Ruta de login
  if (url.pathname === '/api/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(body);
        const result = await auth.signIn.withEmailAndPassword(email, password);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token: result.token, user: result.user }));
      } catch (error) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Credenciales inválidas' }));
      }
    });
  }
  // Ruta protegida
  else if (url.pathname === '/api/me' && req.method === 'GET') {
    if ((req as any).user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ user: (req as any).user }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No autorizado' }));
    }
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});`}
            showLineNumbers
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
