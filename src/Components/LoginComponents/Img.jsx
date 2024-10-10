import Logo from '../../img/softwareIntegration.png'

const Img = () => {
  return (
    <div>
    
        <img className="w-[17rem] mb-6" src={Logo} />
        <div className="flex flex-col items-center">
          <label className="text-center">Simplificando procesos,</label>
          <label className="text-center">acelerando resultados</label>
        </div>
    </div>
  )
}

export default Img
