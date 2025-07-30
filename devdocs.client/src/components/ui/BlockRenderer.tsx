import React from 'react';
import type { Block } from '../../types/component';
import { CopyButton } from './CopyButton';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const BlockRenderer: React.FC<{ block: Block }> = ({ block }) => {
    switch (block.type) {
        case 'text':
            return <p className="doc-text">{block.content}</p>;
        case 'code':
            return (
                <div className="code-block-wrapper">
                    <SyntaxHighlighter
                        language={block.language || 'jsx'}
                        style={atomOneDark}
                        showLineNumbers
                        wrapLongLines
                        customStyle={{
                            background: '#282c34',
                            borderRadius: '6px',
                            padding: '1rem'
                        }}
                    >
                        {block.code}
                    </SyntaxHighlighter>
                    <CopyButton text={block.code} />
                </div>
            );
        case 'list':
            return (
                <ul className="doc-list">
                    {block.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            );
        case 'table':
            return (
                <div className="doc-table-wrapper">
                    <table className="doc-table">
                        <thead>
                            <tr>{block.columns.map((c, i) => <th key={i}>{c}</th>)}</tr>
                        </thead>
                        <tbody>
                            {(block.rows as string[][]).map((row: string[], rowIndex: number) => (
                                <tr key={rowIndex}>
                                    {row.map((cell: string, cellIndex: number) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        default:
            return null;
    }
};
