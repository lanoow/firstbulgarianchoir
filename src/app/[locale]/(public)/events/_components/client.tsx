import EventCard from '../../_components/event-card';
import { SafeEvent } from '@/types';

const EventsClient: React.FC<{ events: SafeEvent[]; }> = ({ events }) => {
	return (
		<div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
			{events.map((event: SafeEvent) => (
				<EventCard
					key={event.slug}
					{...event}
				/>
			))}
		</div>
	)
}

export default EventsClient;