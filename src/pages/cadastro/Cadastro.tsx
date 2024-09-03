import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Usuario from '../../models/Usuario'
import './Cadastro.css'
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {

  const navigate = useNavigate();

  //Estado que vai guardar os dados do meu usuário
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  })

  //Estado que vai guarda a confirmação da senha
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  //Estado que vai indicar quando a animação (loader) será carregada
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //UseEffect para monitorar o estado usuario

  useEffect(() => {
    if(usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  // Redireciona para o Componente Login (rota /login)

  function retornar(){
    navigate('/login')
  }

  //Funcao que atualiza as propriedades do Estado Usuário
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){
      setIsLoading(true)

      try{
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario)
        ToastAlerta("Usuário cadastrado com Sucesso!")

      }catch(error){
        ToastAlerta('Erro ao cadastrar o usuário!')
      }
    }

    else{
      ToastAlerta("Dados inconsistentes! Verifique as informações do Cadastro.")
      setUsuario({...usuario, senha: ""})
      setConfirmaSenha("")
    }
    setIsLoading(false)
  }

  console.log(usuario)
  console.log(confirmaSenha)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form onSubmit={cadastrarNovoUsuario} className='flex justify-center items-center flex-col w-2/3 gap-3'>
          <h1 className='text-slate-900 text-5xl'>Cadastrar</h1>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input 
              type="email" 
              id='usuario'
              name='usuario'
              placeholder='Usuario'
              className='border-2 border-slate-700 rounded p-2'
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor="foto">foto</label>
            <input 
              type="text" 
              id='foto'
              name='foto'
              placeholder='Foto'
              className='border-2 border-slate-700 rounded p-2'
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id='senha'
              name='senha'
              placeholder='Senha'
              className='border-2 border-slate-700 rounded p-2'  
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor="confirmar_senha">Confirmar Senha</label>
            <input 
              type="password" 
              id='confirmar_senha'
              name='confirmar_senha'
              placeholder='Confirmar Senha'
              className='border-2 border-slate-700 rounded p-2'  
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className='flex justify-around w-full gap-8 text-white'>
            <button className='bg-red-400 rounded py-2 hover:bg-red-700 w-1/2' onClick={retornar}>
                Cancelar
            </button>
            <button 
            className=' bg-blue-400 rounded py-2 hover:bg-blue-700 w-1/2 flex justify-center' 
            type='submit'
            >
                {isLoading ? 
                <RotatingLines
                strokeColor="white"
                strokeWidth = "5"
                animationDuration="0.75"
                width="24"
                visible={true}
                /> :
                <span>Cadastrar</span>}
                
            </button>
          </div>
          
          <a href="../"></a>
        </form>
      </div>
    </>
  )
}

export default Cadastro