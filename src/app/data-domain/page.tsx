'use client'
import React from "react";
import { DataDomainPage } from "@/features/data-domain/components/DataDomainPage";
import PageBreadcrumb from "@/shared/components/common/PageBreadCrumb";

export default function DataDomain() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Asistente IA - Consultas Inteligentes" />
      <DataDomainPage />
    </div>
  );
} 