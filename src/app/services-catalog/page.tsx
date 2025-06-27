'use client'
import React from "react";
import { ServicesCatalogPage } from "@/features/services-catalog/components/ServicesCatalogPage";
import PageBreadcrumb from "@/shared/components/common/PageBreadCrumb";

export default function ServicesCatalog() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Catálogo de Servicios - Asistente IA" />
      <ServicesCatalogPage />
    </div>
  );
} 