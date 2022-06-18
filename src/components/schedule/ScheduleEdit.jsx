import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DateDisplay from "../date-display/DateDisplay";
const isSameOrBefore = (startTime, endTime) => {
  if (startTime && !endTime) {
    return true;
  }
  const startDate = new Date();
  startDate.setHours(Number(startTime.split(':')[0]));
  startDate.setSeconds(Number(startTime.split(':')[1]));

  const endDate = new Date();
  endDate.setHours(Number(endTime.split(':')[0]));
  endDate.setSeconds(Number(endTime.split(':')[1]));

  return endDate.getTime() > startDate.getTime()
}

const schema = yup.object({
    id: yup.string(),
    title: yup.string()
          .required("Ce champ est requis"),
    date: yup.date()
            .typeError("Ce champ est requis")
            .required("Ce champ est requis")
            .min(new Date(), "La date est invalide"),
    start: yup.string()
    .test(
      'not empty',
      'Ce champ est requis',
      function(value) {
        return !!value;
      }
    )
    .test(
      "start_time_test",
      "L'heure de début doit être après l'heure de fin",
      function (value) {
        const { end } = this.parent;
        return value ? isSameOrBefore(value, end): false;
      }
    ),
    end: yup.string(),
    location: yup.string()
          .required("Ce champ est requis"),
    note: yup.string()
}).required();

function ScheduleEdit({dates, handleSubmit}) {
  const { register, handleSubmit: handleFormSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (schedule) => {
    reset();
    handleSubmit(schedule);
  }

	return (
		 <form onSubmit={handleFormSubmit(onSubmit)}>    
        <div className="my-3 text-md">
          <label htmlFor="date" className="form-label">Date</label>
          <div className="mt-1">
            <select {...register("date")} id="date">
              <option value="">Sélectionner</option>
              {
                dates.sort().map(
                    (date, index) => (
                      <option key={index} value={String(date)}>
                        <DateDisplay entry={date}/>
                      </option>
                    )
                  )
              }
            </select>
          </div>
          <p className='text-red-600'>{errors?.date?.message}</p>
        </div>

        <div className="my-3 text-md">
          <label htmlFor="title" className="form-label mb-1">Titre</label>
          <div className="mt-1">
            <input {...register("title")} type="text" className="" id="title" />
          </div>
          <p className='text-red-600'>{errors?.title?.message}</p>
        </div>
        <div className="flex justify-between">
          <div className="my-3 text-md flex-auto mr-2">
            <label htmlFor="start" className="form-label mb-1">A</label>
            <div className="mt-1">
              <input {...register("start")} type="time" min="00:00" max="24:00" className="" id="start" />
            </div>
            <p className='text-red-600'>{errors?.start?.message}</p>
          </div>
          {
            /**
          <div className="my-3 text-md flex-auto ml-2">
            <label htmlFor="end" className="form-label mb-1">A</label>
            <div className="mt-1">
              <input {...register("end")} type="time" min="00:00" max="24:00" className="" id="end" />
            </div>
            <p className='text-red-600'>{errors?.end?.message}</p>
          </div>

             */
          }
        </div>
        <div className="my-3 text-md">
          <label htmlFor="location" className="form-label mb-1">Adresse</label>
          <div className="mt-1">
            <input {...register("location")} type="text" className="" id="location" />
          </div>
          <p className='text-red-600'>{errors?.location?.message}</p>
        </div>

        <div className="my-3 text-md">
          <label htmlFor="note" className="form-label mb-1">Note</label>
          <div className="mt-1">
            <textarea {...register("note")} className="" id="note"></textarea>
          </div>
          <p className='text-red-600'>{errors?.note?.message}</p>
        </div>

        <button type="submit" className="col-span-2 mt-2 w-full bg-blue-800 hover:bg-blue-800 text-white font-light py-2 px-4 rounded-lg shadow-sm">
          Enregistrer
        </button>
      </form>
	);
}

export default ScheduleEdit;
