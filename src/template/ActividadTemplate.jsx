import ActividadesTable from '@/Components/actividades/ActividadesTable'
import React from 'react'

const ActividadTemplate = () => {
  return (
    <div className="grid grid-rows-3 gap-4 h-screen w-full font-roboto">
      <div className="row-span-2 bg-[#F1F1F1] flex items-center justify-center">
        <p><ActividadesTable/></p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-500 flex items-center justify-center">
          <p>Pequeño 1</p>
        </div>
        <div className="bg-red-500 flex items-center justify-center">
          <p>Pequeño 2</p>
        </div>
      </div>
    </div>
  )
}

export default ActividadTemplate
