import ActividadesLeft from '@/Components/actividades/ActividadesLeft'
import ActividadesRigth from '@/Components/actividades/ActividadesRigth'
import ActividadesTable from '@/Components/actividades/ActividadesTable'

const ActividadTemplate = () => {
  return (
    <div className="grid grid-rows-3 gap-4 h-screen w-full font-roboto">
      <div className="row-span-2 bg-[#F1F1F1] flex items-center justify-center">
        <p><ActividadesTable/></p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-500 flex items-center justify-center">
          <ActividadesRigth/>
        </div>
        <div className="bg-[#F1F1F1] flex items-center justify-center">
          <ActividadesLeft/>
        </div>
      </div>
    </div>
  )
}

export default ActividadTemplate
