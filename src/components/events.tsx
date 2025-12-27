type DbEvent = {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  tag: string | null;
  image_url: string | null;
  scheduled_at: string; // ISO string
  created_at: string;   // ISO string
};

export default function Events({ events }: { events: DbEvent[] }) {
  const getColorClasses = (tag?: string | null) => {
    // keep your color system, but decide color by tag (or default)
    const colors: Record<string, { bg: string; border: string; badge: string }> = {
      tech: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600" },
      workshop: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600" },
      hackathon: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-600" },
      default: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600" },
    };

    const key = String(tag ?? "").toLowerCase();
    return colors[key] || colors.default;
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(d);
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-IN", { timeStyle: "short" }).format(d);
  };

  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with events happening around you.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(!events || events.length === 0) ? (
            <div className="text-gray-600">No events yet.</div>
          ) : (
            events.map((event) => {
              const colors = getColorClasses(event.tag);
              return (
                <div
                  key={event.id}
                  className={`${colors.bg} rounded-3xl p-8 hover:shadow-xl transition-all border ${colors.border}`}
                >
                  {/* Image (optional) */}
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt={event.name}
                      className="w-full h-40 object-cover rounded-2xl mb-5"
                      loading="lazy"
                    />
                  ) : null}

                  {/* Tag badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${colors.badge} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                      {event.tag ?? "Event"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {event.name}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-lg">📅</span>
                      <span className="font-medium">{formatDate(event.scheduled_at)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-lg">🕒</span>
                      <span>{formatTime(event.scheduled_at)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-lg">📍</span>
                      <span>{event.location ?? "TBA"}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description ?? "No description provided."}
                  </p>

                  {/* Register Button (keep as button, or convert to Link later) */}
                  <button className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-lg">
                    Register Now
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* CTA Section (unchanged) */}
        <div className="mt-16 bg-gradient-to-r from-blue-400 to-blue-700 rounded-3xl p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Want to host an event?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Create and promote events to your community in minutes.
          </p>
          <a
            href="/join"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:shadow-lg hover:scale-105"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
}
