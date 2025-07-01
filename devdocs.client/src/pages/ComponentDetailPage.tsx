"use client"

import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { PageHeader } from "../components/ui/PageHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Card, CardContent } from "../components/ui/Card"

import { componentsData } from "../data/components"
import type { Block, TabsBlock, TableBlock, Badge, ChangeItem } from "../types/component"
import "../styles/component-detail.css"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"


const pageAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.2 },
  },
}

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/** Renderiza cualquier Block según su type */
function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <p className="mb-4">{block.content}</p>

    case "list":
      return (
        <ul className="list-disc list-inside mb-4">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    case "code":
      return (
        <Card className="mb-4">
          <CardContent>
            <SyntaxHighlighter
              language={block.language}
              style={materialDark}
              showLineNumbers
              wrapLongLines
              customStyle={{ borderRadius: 8, padding: "1rem" }}
            >
              {block.code}
            </SyntaxHighlighter>
          </CardContent>
        </Card >
      )

    case "tabs":
      const tabsBlock = block as TabsBlock
      return (
        <Tabs defaultValue={tabsBlock.tabs[0].id} className="mb-4">
          <TabsList className="mb-2">
            {tabsBlock.tabs.map(t => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabsBlock.tabs.map(t => (
            <TabsContent key={t.id} value={t.id}>
              {t.blocks.map((inner, j) => (
                <RenderBlock key={j} block={inner} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )

    case "table": {
  const tbl = block as TableBlock

  return (
    <div className="overflow-x-auto mb-6">
      <table className="table">
        <thead>
          <tr>
            {tbl.columns.map((col, ci) => (
              <th key={ci}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbl.rows.map((row, ri) => (
            <tr key={ri}>
              {/* Versión */}
              <td>{row[0] as string}</td>

              {/* Fecha */}
              <td>{row[1] as string}</td>

              {/* Cambios */}
              <td>
                <ul>
                  {(row[2] as ChangeItem[]).map((c, ci) => (
                    <li key={ci}>
                      <span>{c.text}</span>
                      <span
                        className="badge"
                        style={{ backgroundColor: c.badge.color }}
                      >
                        {c.badge.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>

              {/* Tipo */}
              <td>
                <span
                  className="badge"
                  style={{ backgroundColor: (row[3] as Badge).color }}
                >
                  {(row[3] as Badge).label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


    default:
      return null
  }
}

const ComponentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const component = componentsData.find(c => c.id === slug)

  if (!component) {
    return (
      <div className="container">
        <PageHeader
          title="Componente no encontrado"
          description="El componente que buscas no existe."
        />
      </div>
    )
  }

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
    >
      <motion.div variants={itemAnimation}>
        <PageHeader
          title={component.name}
          description={`${component.description}`}
        />
      </motion.div>

      <motion.div className="component-detail-content" variants={itemAnimation}>
        <Tabs defaultValue={component.tabs[0].id} className="w-full">
          <TabsList className="mb-4">
            {component.tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {component.tabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              {tab.sections.map((sec, si) => (
                <section key={si} className="component-section mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{sec.title}</h2>
                  {sec.blocks.map((block, bi) => (
                    <RenderBlock key={bi} block={block} />
                  ))}
                </section>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

export default ComponentDetailPage
