import DateDisplay from "../date-display/DateDisplay";

function ScheduleList({dates, schedules, handleDelete}) {
  const deleteSchedule = ({id}) => {
    handleDelete({id});
  }
  return (
    <div className="">
      {dates.map((date) => (
        <div className="" key={String(date)}>
          <h3 className="font-nunito mb-2 mt-1 !font-extrabold text-blue-800"><DateDisplay entry={date} /></h3>
          <div className={`mb-10 grid gap-4 grid-cols-1 md:grid-cols-3`}>
          {schedules.filter(({date: current}) => new Date(date).getTime() === new Date(current).getTime()).map((schedule, index) => (
              <div key={`${index}-${date}`} className={`${index % 2 === 0 ? 'bg-slate-100': 'bg-slate-100'}  flex flex-col justify-between border border-slate-300 rounded  text-center items-center justify-center`}>
                <div className="col-span-5 py-3">
                  <div className="font-extrabold ">{schedule.start}</div>
                    <div className="my-2">
                        <h4 className="font-extrabold text-blue-800 text-xl">
                          {schedule.title}
                        </h4>
                        <p className="">
                          {schedule.location}
                        </p>
                      </div>
                      {schedule.note ? (<div className="px-2 text-gray-400" dangerouslySetInnerHTML={{__html: schedule.note}}></div>) : <div></div> }
                </div>
                <button type='button' className='block w-full py-1 bg-red-500 text-white' onClick={() => deleteSchedule({id: schedule.publicId})} > 
                    Supprimer
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScheduleList;