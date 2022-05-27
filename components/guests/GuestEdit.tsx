import { MouseEventHandler} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
type Params = {
  prevFormStep?: MouseEventHandler, 
  nextFormStep: Function, 
  title: string,
  name: string,
  adjective?: string,
  defaultValues: any
}
const schema = yup.object({
  civility: yup.string()
        .required("Ce champ est requis"),
  firstName: yup.string()
        .required("Ce champ est requis"),
  lastName: yup.string()
        .required("Ce champ est requis"),
  email: yup.string()
        .email("Email invalide"),
  phone: yup.string()
        .required("Ce champ est requis")
        .min(10, "Téléphone invalide")
        .max(10, "Téléphone invalide"),
}).required();

function GuestEdit({handleSubmit}) {
  const { register, handleSubmit: handleFormSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

	return (
		 <form onSubmit={handleFormSubmit(handleSubmit)}>
       <div className="grid grid-cols-2 gap-4">        
       <div className="mb-0 text-md">
          <label htmlFor="civility" className="form-label">Civilité</label>
          <div className="mt-1">
            <select {...register("civility")} id="civility">
              <option value="">Sélectionner</option>
              <option value="MR">Monsieur</option>
              <option value="MRS">Madame</option>
              <option value="MR_MRS">Monsieur & Madame</option>
            </select>
          </div>
          <p className='text-red-600'>{errors.civility?.message}</p>
        </div>
        <div className="mb-0 text-md">
          <label htmlFor="phone" className="form-label mb-1">Téléphone</label>
          <div className="mt-1">
            <input {...register("phone")} type="text" className="" id="phone" />
          </div>
          <p className='text-red-600'>{errors.phone?.message}</p>
        </div>
        <div className="mb-0 text-md">
          <label htmlFor="lastName" className="form-label">Nom</label>
          <div className="mt-1">
            <input {...register("lastName")} type="text" id="lastName"  />
          </div>
          <p className='text-red-600'>{errors.lastName?.message}</p>
        </div>
        
        <div className="mb-0 text-md">
          <label htmlFor="email" className="form-label">E-mail</label>
          <div className="mt-1">
            <input {...register("email")} type="email" id="email" />
          </div>
          <p className='text-red-600'>{errors.email?.message}</p>
        </div>
        <div className="mb-0 text-md">
          <label htmlFor="firstName" className="form-label">Prénom</label>
          <div className="mt-1">
            <input {...register("firstName")} type="text" id="firstName"  />
          </div>
          <p className='text-red-600'>{errors.firstName?.message}</p>
        </div>
        <div className="mb-0 text-md flex items-end pb-3">
          <div className="mt-1 h-100">
            <input className="form-check-input" type="checkbox" {...register("sendInvitation")} id="sendFile" />
            <label className="form-check-label ml-2" htmlFor="sendFile">
              Envoyer l'invitation
            </label>
          </div>
        </div>
        <button type="submit" className="col-span-2 mt-2 w-full bg-blue-800 hover:bg-blue-800 text-white font-light py-2 px-4 rounded-lg shadow-sm">
          Enregistrer
        </button>

        </div> 
      </form>
	);
}

export default GuestEdit;
