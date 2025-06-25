'use client'
import React, { useState } from "react";
import PageBreadCrumb from "@/shared/components/common/PageBreadCrumb";
import { useRouter } from "next/navigation";

interface DiagramDetailsPageProps {
  diagramId: string;
}

interface Entity {
  name: string;
  columns: number;
  type: string;
  position: { x: number; y: number };
}

interface Table {
  name: string;
  columns: number;
  description: string;
  position: { x: number; y: number };
}

interface Relationship {
  from: string;
  to: string;
  type: string;
}

interface ERDiagram {
  id: string;
  name: string;
  type: 'ER Diagram';
  created: string;
  description: string;
  entities: Entity[];
  relationships: Relationship[];
}

interface DDLDiagram {
  id: string;
  name: string;
  type: 'DDL Script';
  created: string;
  description: string;
  tables: Table[];
}

type Diagram = ERDiagram | DDLDiagram;

export default function DiagramDetailsPage({ diagramId }: DiagramDetailsPageProps) {
  const [viewMode, setViewMode] = useState('details'); // 'details' or 'visual'
  const router = useRouter();

  // Datos de ejemplo para los diagramas
  const diagramData: Record<string, Diagram> = {
    'ecommerce': {
      id: 'ecommerce',
      name: 'E-commerce ER Diagram',
      type: 'ER Diagram',
      created: 'hace 1 día',
      description: 'Diagrama de entidad-relación para el sistema de comercio electrónico',
      entities: [
        { name: 'Users', columns: 8, type: 'Core', position: { x: 100, y: 50 } },
        { name: 'Products', columns: 12, type: 'Core', position: { x: 300, y: 50 } },
        { name: 'Orders', columns: 10, type: 'Transaction', position: { x: 500, y: 50 } },
        { name: 'Categories', columns: 5, type: 'Reference', position: { x: 100, y: 200 } },
        { name: 'Inventory', columns: 6, type: 'Inventory', position: { x: 300, y: 200 } },
        { name: 'Payments', columns: 9, type: 'Financial', position: { x: 500, y: 200 } },
        { name: 'Shipping', columns: 7, type: 'Logistics', position: { x: 100, y: 350 } },
        { name: 'Reviews', columns: 6, type: 'Content', position: { x: 300, y: 350 } },
        { name: 'Wishlist', columns: 4, type: 'User', position: { x: 500, y: 350 } },
        { name: 'Coupons', columns: 8, type: 'Promotion', position: { x: 100, y: 500 } },
        { name: 'Suppliers', columns: 9, type: 'External', position: { x: 300, y: 500 } },
        { name: 'Analytics', columns: 11, type: 'Reporting', position: { x: 500, y: 500 } }
      ],
      relationships: [
        { from: 'Users', to: 'Orders', type: '1:N' },
        { from: 'Products', to: 'Categories', type: 'N:1' },
        { from: 'Orders', to: 'Products', type: 'N:N' },
        { from: 'Orders', to: 'Payments', type: '1:1' },
        { from: 'Products', to: 'Inventory', type: '1:1' },
        { from: 'Users', to: 'Reviews', type: '1:N' },
        { from: 'Products', to: 'Reviews', type: '1:N' },
        { from: 'Users', to: 'Wishlist', type: '1:N' }
      ]
    },
    'customer-analytics': {
      id: 'customer-analytics',
      name: 'Customer Analytics DDL',
      type: 'DDL Script',
      created: 'hace 3 días',
      description: 'Script DDL para el esquema de análisis de clientes',
      tables: [
        { name: 'customers', columns: 12, description: 'Información principal de clientes', position: { x: 100, y: 50 } },
        { name: 'customer_segments', columns: 6, description: 'Segmentación de clientes', position: { x: 300, y: 50 } },
        { name: 'customer_behavior', columns: 8, description: 'Comportamiento y patrones', position: { x: 500, y: 50 } },
        { name: 'customer_preferences', columns: 7, description: 'Preferencias y configuraciones', position: { x: 100, y: 200 } },
        { name: 'customer_interactions', columns: 5, description: 'Historial de interacciones', position: { x: 300, y: 200 } },
        { name: 'customer_metrics', columns: 4, description: 'Métricas de rendimiento', position: { x: 500, y: 200 } },
        { name: 'customer_feedback', columns: 3, description: 'Comentarios y evaluaciones', position: { x: 300, y: 350 } }
      ]
    }
  };

  const selectedDiagram = diagramData[diagramId];

  const getEntityColor = (type: string) => {
    const colors = {
      'Core': 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200',
      'Transaction': 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200',
      'Reference': 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-200',
      'Inventory': 'bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900 dark:border-orange-700 dark:text-orange-200',
      'Financial': 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200',
      'Logistics': 'bg-teal-100 border-teal-300 text-teal-800 dark:bg-teal-900 dark:border-teal-700 dark:text-teal-200',
      'Content': 'bg-pink-100 border-pink-300 text-pink-800 dark:bg-pink-900 dark:border-pink-700 dark:text-pink-200',
      'User': 'bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-200',
      'Promotion': 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200',
      'External': 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200',
      'Reporting': 'bg-cyan-100 border-cyan-300 text-cyan-800 dark:bg-cyan-900 dark:border-cyan-700 dark:text-cyan-200'
    };
    return colors[type as keyof typeof colors] || colors['Core'];
  };

  const renderVisualDiagram = () => {
    if (!selectedDiagram) return null;

    return (
      <div className="relative w-full h-[600px] bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden">
        {/* Diagram Title */}
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
            {selectedDiagram.name}
          </h3>
        </div>

        {/* View Mode Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <button
              onClick={() => setViewMode('details')}
              className={`px-3 py-1 text-xs rounded-l-lg ${
                viewMode === 'details'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Detalles
            </button>
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1 text-xs rounded-r-lg ${
                viewMode === 'visual'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Visual
            </button>
          </div>
        </div>

        {/* Entities/Tables */}
        {selectedDiagram.type === 'ER Diagram' && selectedDiagram.entities?.map((entity, index) => (
          <div
            key={index}
            className={`absolute border-2 rounded-lg p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow ${
              getEntityColor(entity.type)
            }`}
            style={{
              left: entity.position.x,
              top: entity.position.y,
              width: '120px',
              height: '80px'
            }}
          >
            <div className="text-xs font-medium text-center">{entity.name}</div>
            <div className="text-xs text-center mt-1 opacity-75">{entity.columns} cols</div>
            <div className="text-xs text-center mt-1 font-bold">{entity.type}</div>
          </div>
        ))}

        {selectedDiagram.type === 'DDL Script' && selectedDiagram.tables?.map((table, index) => (
          <div
            key={index}
            className="absolute border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            style={{
              left: table.position.x,
              top: table.position.y,
              width: '140px',
              height: '90px'
            }}
          >
            <div className="text-xs font-medium text-gray-800 dark:text-white text-center">{table.name}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">{table.columns} cols</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1 truncate">{table.description}</div>
          </div>
        ))}

        {/* Relationships (SVG Lines) */}
        {selectedDiagram.type === 'ER Diagram' && selectedDiagram.relationships && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {selectedDiagram.relationships.map((rel, index) => {
              const fromEntity = selectedDiagram.entities?.find(e => e.name === rel.from);
              const toEntity = selectedDiagram.entities?.find(e => e.name === rel.to);
              
              if (!fromEntity || !toEntity) return null;

              const fromX = fromEntity.position.x + 60;
              const fromY = fromEntity.position.y + 40;
              const toX = toEntity.position.x + 60;
              const toY = toEntity.position.y + 40;

              return (
                <g key={index}>
                  <line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <circle
                    cx={toX}
                    cy={toY}
                    r="4"
                    fill="#6B7280"
                  />
                  <text
                    x={(fromX + toX) / 2}
                    y={(fromY + toY) / 2 - 5}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                    style={{ fontSize: '10px' }}
                  >
                    {rel.type}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
          <div className="text-xs font-medium text-gray-800 dark:text-white mb-2">Tipos de Entidad:</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {['Core', 'Transaction', 'Reference', 'Financial'].map(type => (
              <div key={type} className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded ${getEntityColor(type).split(' ')[0]}`}></div>
                <span className="text-gray-600 dark:text-gray-400">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!selectedDiagram) {
    return (
      <div className="space-y-6">
        <PageBreadCrumb pageTitle="Diagrama no encontrado" />
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Diagrama no encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">El diagrama que buscas no existe.</p>
            <button
              onClick={() => router.push('/data-domain')}
              className="px-4 py-2 bg-[#8C4799] text-white rounded-lg hover:bg-[#7a3c84] transition-colors"
            >
              Volver a Data Domain
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle={selectedDiagram.name} />
      
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{selectedDiagram.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{selectedDiagram.description}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/data-domain')}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Volver
            </button>
            <button className="px-4 py-2 bg-[#8C4799] text-white rounded-lg hover:bg-[#7a3c84] transition-colors">
              Exportar
            </button>
          </div>
        </div>

        {/* Diagram Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-blue-600 dark:text-blue-400">Tipo</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{selectedDiagram.type}</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-green-600 dark:text-green-400">Creado</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">{selectedDiagram.created}</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-sm text-purple-600 dark:text-purple-400">
              {selectedDiagram.type === 'ER Diagram' ? 'Entidades' : 'Tablas'}
            </div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {selectedDiagram.type === 'ER Diagram' ? selectedDiagram.entities.length : selectedDiagram.tables.length}
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('details')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'details'
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              Vista de Detalles
            </button>
            <button
              onClick={() => setViewMode('visual')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'visual'
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              Vista Visual
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'visual' ? (
          renderVisualDiagram()
        ) : (
          <div className="space-y-6">
            {/* Entities/Tables */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {selectedDiagram.type === 'ER Diagram' ? 'Entidades' : 'Tablas'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedDiagram.type === 'ER Diagram' && selectedDiagram.entities?.map((entity, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-white">{entity.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getEntityColor(entity.type)}`}>
                        {entity.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entity.columns} columnas</p>
                  </div>
                ))}
                {selectedDiagram.type === 'DDL Script' && selectedDiagram.tables?.map((table, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">{table.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{table.columns} columnas</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{table.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relationships (only for ER Diagrams) */}
            {selectedDiagram.type === 'ER Diagram' && selectedDiagram.relationships && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Relaciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDiagram.relationships.map((rel, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-800 dark:text-white">
                          {rel.from} → {rel.to}
                        </div>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          {rel.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 