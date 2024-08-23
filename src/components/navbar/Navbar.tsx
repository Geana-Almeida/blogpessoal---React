import { Link } from "react-router-dom"

function Navbar() {
  return (
    <>
        <div className="w-full flex justify-center py-4
                        bg-indigo-900 text-white">
            <div className="container flex justify-between text-lg">
                <Link to='/home' className='text-2xl font-bold'>Blog Pessoal</Link>
                
                <div className="flex">
                    <p className="mr-5">Postagem</p>
                    <p className="mr-5">Temas</p>
                    <p className="mr-5">Cadastrar tema</p>
                    <p className="mr-5">Perfil</p>
                    <p className="mr-5">Sair</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar