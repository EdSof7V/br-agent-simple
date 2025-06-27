'use client'
import React, { useState } from "react";
import PageBreadCrumb from "@/shared/components/common/PageBreadCrumb";
import { useRouter } from "next/navigation";

interface ServicesDiagramDetailsPageProps {
  diagramId: string;
}

interface Service {
  name: string;
  category: string;
  status: string;
  position: { x: number; y: number };
}

interface ServiceCategory {
  name: string;
  services: number;
  description: string;
  position: { x: number; y: number };
}

interface ServiceRelationship {
  from: string;
  to: string;
  type: string;
}

interface ServiceDiagram {
  id: string;
  name: string;
  type: 'Service Catalog';
  created: string;
  description: string;
  services: Service[];
  categories: ServiceCategory[];
  relationships: ServiceRelationship[];
}

export default function ServicesDiagramDetailsPage({ diagramId }: ServicesDiagramDetailsPageProps) {
  const [viewMode, setViewMode] = useState('details'); // 'details' or 'visual'
  const router = useRouter();

  // Datos de ejemplo para los diagramas de servicios
  const diagramData: Record<string, ServiceDiagram> = {
    'ecommerce-services': {
      id: 'ecommerce-services',
      name: 'E-commerce Services Catalog',
      type: 'Service Catalog',
      created: 'hace 1 día',
      description: 'Catálogo de servicios para el sistema de comercio electrónico',
      services: [
        { name: 'User Management', category: 'Core', status: 'Active', position: { x: 100, y: 50 } },
        { name: 'Product Catalog', category: 'Core', status: 'Active', position: { x: 300, y: 50 } },
        { name: 'Order Processing', category: 'Transaction', status: 'Active', position: { x: 500, y: 50 } },
        { name: 'Payment Gateway', category: 'Financial', status: 'Active', position: { x: 100, y: 200 } },
        { name: 'Inventory Management', category: 'Inventory', status: 'Active', position: { x: 300, y: 200 } },
        { name: 'Shipping Service', category: 'Logistics', status: 'Active', position: { x: 500, y: 200 } },
        { name: 'Review System', category: 'Content', status: 'Active', position: { x: 100, y: 350 } },
        { name: 'Wishlist Service', category: 'User', status: 'Active', position: { x: 300, y: 350 } },
        { name: 'Coupon System', category: 'Promotion', status: 'Active', position: { x: 500, y: 350 } },
        { name: 'Analytics Service', category: 'Reporting', status: 'Active', position: { x: 100, y: 500 } },
        { name: 'Notification Service', category: 'Communication', status: 'Active', position: { x: 300, y: 500 } },
        { name: 'Search Service', category: 'Core', status: 'Active', position: { x: 500, y: 500 } }
      ],
      categories: [
        { name: 'Core Services', services: 3, description: 'Servicios fundamentales del sistema', position: { x: 50, y: 50 } },
        { name: 'Transaction Services', services: 1, description: 'Servicios de transacciones', position: { x: 250, y: 50 } },
        { name: 'Financial Services', services: 1, description: 'Servicios financieros', position: { x: 450, y: 50 } },
        { name: 'Support Services', services: 7, description: 'Servicios de soporte', position: { x: 50, y: 200 } }
      ],
      relationships: [
        { from: 'User Management', to: 'Order Processing', type: 'depends_on' },
        { from: 'Product Catalog', to: 'Order Processing', type: 'depends_on' },
        { from: 'Order Processing', to: 'Payment Gateway', type: 'depends_on' },
        { from: 'Product Catalog', to: 'Inventory Management', type: 'depends_on' },
        { from: 'Order Processing', to: 'Shipping Service', type: 'depends_on' },
        { from: 'User Management', to: 'Review System', type: 'depends_on' },
        { from: 'Product Catalog', to: 'Review System', type: 'depends_on' }
      ]
    }
  };

  const selectedDiagram = diagramData[diagramId];

  const getServiceColor = (category: string) => {
    const colors = {
      'Core': 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200',
      'Transaction': 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200',
      'Financial': 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200',
      'Inventory': 'bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900 dark:border-orange-700 dark:text-orange-200',
      'Logistics': 'bg-teal-100 border-teal-300 text-teal-800 dark:bg-teal-900 dark:border-teal-700 dark:text-teal-200',
      'Content': 'bg-pink-100 border-pink-300 text-pink-800 dark:bg-pink-900 dark:border-pink-700 dark:text-pink-200',
      'User': 'bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-200',
      'Promotion': 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200',
      'Reporting': 'bg-cyan-100 border-cyan-300 text-cyan-800 dark:bg-cyan-900 dark:border-cyan-700 dark:text-cyan-200',
      'Communication': 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-200'
    };
    return colors[category as keyof typeof colors] || colors['Core'];
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
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Detalles
            </button>
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1 text-xs rounded-r-lg ${
                viewMode === 'visual'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Visual
            </button>
          </div>
        </div>

        {/* Services */}
        {selectedDiagram.services?.map((service, index) => (
          <div
            key={index}
            className={`absolute border-2 rounded-lg p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow ${
              getServiceColor(service.category)
            }`}
            style={{
              left: service.position.x,
              top: service.position.y,
              width: '140px',
              height: '80px'
            }}
          >
            <div className="text-xs font-medium text-center">{service.name}</div>
            <div className="text-xs text-center mt-1 opacity-75">{service.category}</div>
            <div className="text-xs text-center mt-1 font-bold">{service.status}</div>
          </div>
        ))}

        {/* Categories */}
        {selectedDiagram.categories?.map((category, index) => (
          <div
            key={index}
            className="absolute border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            style={{
              left: category.position.x,
              top: category.position.y,
              width: '160px',
              height: '90px'
            }}
          >
            <div className="text-xs font-medium text-gray-800 dark:text-white text-center">{category.name}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">{category.services} servicios</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1 truncate">{category.description}</div>
          </div>
        ))}

        {/* Relationships (SVG Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {selectedDiagram.relationships?.map((rel, index) => {
            const fromService = selectedDiagram.services.find(s => s.name === rel.from);
            const toService = selectedDiagram.services.find(s => s.name === rel.to);
            
            if (!fromService || !toService) return null;

            const fromX = fromService.position.x + 70;
            const fromY = fromService.position.y + 40;
            const toX = toService.position.x + 70;
            const toY = toService.position.y + 40;

            return (
              <line
                key={index}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="5,5"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
            </marker>
          </defs>
        </svg>
      </div>
    );
  };

  const renderDetailsView = () => {
    if (!selectedDiagram) return null;

    return (
      <div className="space-y-6">
        {/* Diagram Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{selectedDiagram.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedDiagram.description}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {selectedDiagram.type}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Creado {selectedDiagram.created}</p>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Servicios ({selectedDiagram.services?.length || 0})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedDiagram.services?.map((service, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${getServiceColor(service.category)}`}
              >
                <div className="font-medium text-sm">{service.name}</div>
                <div className="text-xs opacity-75 mt-1">{service.category}</div>
                <div className="text-xs font-bold mt-1">{service.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Categorías ({selectedDiagram.categories?.length || 0})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedDiagram.categories?.map((category, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
              >
                <div className="font-medium text-sm text-gray-800 dark:text-white">{category.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{category.services} servicios</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{category.description}</div>
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
        <PageBreadCrumb pageTitle="Diagrama de Servicios" />
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">Diagrama no encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle={`${selectedDiagram.name} - Diagrama de Servicios`} />
      
      {viewMode === 'visual' ? renderVisualDiagram() : renderDetailsView()}
    </div>
  );
} 