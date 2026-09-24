import React from 'react';
import DetailContent from "@/components/StudentResidencyDetail/DetailContent";
import { studentResidencyCitiesData } from "@/lib/student-residency/popular-cities-data";

export default async function StudentResidencyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find the property across all cities
  const allProperties = Object.values(studentResidencyCitiesData).flat();
  const property = allProperties.find(p => p.id === parseInt(id));

  if (!property) {
    return <div className="p-10 text-center">Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main>
        <DetailContent property={property} />
      </main>
    </div>
  );
}
