import React, {useContext} from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {ApplicationContext, SecurityContext} from '../../context';

const schema = yup.object({
	username: yup.string().email("Email invalide").required("Ce champ est requis"),
	password: yup.string().required("Ce champ est requis"),
}).required();

function SignIn() {
  const {signIn} = useContext(ApplicationContext);
  const {publicAxios} = useContext(SecurityContext);
  const {register, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async(credentials) => {
    try {
      const {data} = await publicAxios.post('connexion', credentials);
      signIn(data);
    } catch (error) {
    }
	};

	return (
		<>
			<form className="my-5" onSubmit={handleSubmit(onSubmit)}>
				<h1 className='text-center font-nunito text-4xl mb-2 text-sky-300'>Connectez vous</h1>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">Saisissez votre username</label>
					<div className="mt-1">
						<input {...register("username")} type="text"
							   className="text-black	form-control w-full border border-white rounded-lg shadow-sm"
							   id="username" autoComplete='username'/>
					</div>
					<p className='text-red-600'>{errors.username?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Mot de passe</label>
					<div className="mt-1">
						<input {...register("password")} type="password"
							   className="text-black	form-control w-full border border-white rounded-lg shadow-sm"
							   id="password" autoComplete='current-password'/>
					</div>
					<p className='text-red-600'>{errors.password?.message}</p>
				</div>
				<button type="submit"
						className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded-lg shadow-sm">Continuer
				</button>
			</form>
      {
        /**
         	<div className='flex flex-col'>
            <span className='block text-center'>Vous n'avez pas encore de compte ?</span>
            <Link to='/'>
              <span className='block my-1 text-center text-sky-300'>Inscrivez-vous gratuitement</span>
            </Link>
          </div> 
         */
      }
		
		</>
	);
}

export default SignIn