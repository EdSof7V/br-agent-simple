'use client'
import React from "react";
import ServicesDiagramDetailsPage from "@/features/services-catalog/components/ServicesDiagramDetailsPage";

interface ServicesCatalogDiagramProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServicesCatalogDiagram({ params }: ServicesCatalogDiagramProps) {
  const { id } = await params;
  return <ServicesDiagramDetailsPage diagramId={id} />;
} 