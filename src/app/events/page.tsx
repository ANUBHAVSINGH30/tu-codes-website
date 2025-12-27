import Events from "@/components/events";
import { fetchEvents } from '../../../lib/queries';

export default async function EventsPage() {
  const data = await fetchEvents();
  const events = Array.isArray(data) ? data : (data ? [data] : []);
    return (
        <div className="min-h-screen bg-white">
            <Events events={events} />
        </div>
    );
}
