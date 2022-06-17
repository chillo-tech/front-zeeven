import {useCallback, useContext, useEffect, useState} from "react";
import { NewEventContext } from "../../../../../context/EventContext";
import { useNavigate } from "react-router-dom";
import {AuthenticatedApiClient} from '../../../../../services';
function FinalStep() {
  const navigate = useNavigate();
	const {state: {event}} = useContext(NewEventContext);
	const [displayMessage, setDisplayMessage] = useState(false);

	const saveEvent = useCallback(
		async () => {
			let name = '';
			console.log(event)
			if (event && event.contacts) {
				name = `Mariage de ${event?.contacts[0]?.firstName} et ${event.contacts[1].firstName}`;
			}
			const eventToSave = {
				name,
				...event
			}
			try {
				const apiClient = AuthenticatedApiClient();
				await apiClient.post('event', JSON.stringify(eventToSave));
				setDisplayMessage(true);
			} catch (error) {
        console.log({error})
        /*
        const {response: {status}} = error;
        if(Number(status) === 404) {
          navigate('/500', { replace: true });
        }
				setDisplayMessage(false);
        */
			}
		},
		[event],
	)
	const goToHomePage = () => {
    navigate('/', { replace: true });
	}
	useEffect(() => {
		saveEvent();
	}, [saveEvent])

	return (
		<div >
			{
				displayMessage ?
					<>
						<p className='text-center my-5'>Votre annonce a bien été enregistrée</p>
						<p className='text-center my-10'>
							<button onClick={goToHomePage}
									className="w-3/4 mx-auto border border-blue-800 hover:border-blue-800 text-blue-800 font-light py-2 px-4 rounded-lg shadow-sm">Voir
								mon évènement
							</button>
						</p>
					</>
					:
					<>
						<p className='text-center my-5'>... Un instant</p>
						<p className='text-center my-5'>nous vérifions votre anonce</p>
					</>
			}
		</div>
	)
}

export default FinalStep;
