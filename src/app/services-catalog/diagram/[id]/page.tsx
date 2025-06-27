'use client'
import React from "react";
import ServicesDiagramDetailsPage from "@/features/services-catalog/components/ServicesDiagramDetailsPage";

interface ServicesCatalogDiagramProps {
  params: {
    id: string;
  };
}

export default function ServicesCatalogDiagram({ params }: ServicesCatalogDiagramProps) {
  return <ServicesDiagramDetailsPage diagramId={params.id} />;
} 