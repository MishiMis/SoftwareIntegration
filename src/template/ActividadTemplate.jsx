import ActividadesLeft from '@/Components/actividades/ActividadesLeft'
import ActividadesRigth from '@/Components/actividades/ActividadesRigth'
import ActividadesTable from '@/Components/actividades/ActividadesTable'

// interfaz de actividades
const ActividadTemplate = () => {
  return (
    <div className="grid grid-rows-3 gap-2 h-screen w-full font-roboto">
      <div className="row-span-2 bg-gradient-to-r from-gray-100 to-gray-300  flex items-center justify-center">
        <p><ActividadesTable/></p>
      </div>
      <div className="grid grid-cols-2 gap-2">

        <div className="bg-gradient-to-r from-gray-100 to-gray-300 flex items-start justify-start rounded-md">
          <ActividadesRigth/>
        </div>

        <div className="bg-gradient-to-r from-gray-100 to-gray-300 flex  justify-center rounded-md">
          <ActividadesLeft/>
        </div>

      </div>
    </div>
  )
}

export default ActividadTemplate
