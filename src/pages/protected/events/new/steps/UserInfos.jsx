import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string()
        .required("Ce champ est requis"),
  lastName: yup.string()
        .required("Ce champ est requis"),
  phone: yup.string()
        .required("Ce champ est requis")
        .matches(/^\d+$/, "Téléphone invalide")
        .min(10, "Téléphone invalide")
        .max(10, "Téléphone invalide"),
}).required();

function UserInfos({ title, prevFormStep, nextFormStep, defaultValues, adjective = 'Votre'}) {
  const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });
  
  const onSubmit = (profile) => {
    nextFormStep(profile);
  };

 useEffect(()=> {
   if(isSubmitSuccessful) {
    reset()
   }
  }, [isSubmitSuccessful, reset])
	return (
		 <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='font-nunito text-2xl mb-2 text-blue-800'>{title}</h2>
        <div className="my-4 text-xl">
          <label htmlFor="firstName" className="form-label text-lg">{adjective} prénom</label>
          <div className="mt-1">
            <input {...register("firstName")} type="text" className="border-2 border-gray-300 after:text-black	form-control w-full text-black rounded-lg shadow-sm" id="firstName"  />
          </div>
          <p className='text-red-600'>{errors.firstName?.message}</p>
        </div>
        <div className="my-4 text-xl">
          <label htmlFor="lastName" className="form-label text-xl">{adjective} nom</label>
          <div className="mt-1">
            <input {...register("lastName")} type="text" className="border-2 border-gray-300 after:text-black	form-control w-full text-black rounded-lg shadow-sm" id="lastName"  />
          </div>
          <p className='text-red-600'>{errors.lastName?.message}</p>
        </div>
        

        <div className="my-4 text-xl">
          <label htmlFor="phone" className="form-label text-xl">{adjective} téléphone</label>
          <div className="mt-1">
            <input {...register("phone")} type="text" className="border-2 border-gray-300 after:text-black	form-control w-full text-black rounded-lg shadow-sm" id="phone" />
          </div>
          <p className='text-red-600'>{errors.phone?.message}</p>
        </div>
        {
          prevFormStep ? 
          <div className="flex py-2">
            <button type="button" onClick={prevFormStep} className="mr-2 w-full border border-blue-800 hover:border-blue-800 text-blue-800 font-light py-2 px-4 rounded-lg shadow-sm">Retour</button>
            <button type="submit" className="ml-2 w-full bg-blue-800 hover:bg-blue-800 text-white font-light py-2 px-4 rounded-lg shadow-sm">Continuer</button>
          </div> : 
          <button type="submit" className="mt-2 w-full bg-blue-800 hover:bg-blue-800 text-white font-light py-2 px-4 rounded-lg shadow-sm">Continuer</button>
        }
      </form>
	);
}

export default UserInfos;
