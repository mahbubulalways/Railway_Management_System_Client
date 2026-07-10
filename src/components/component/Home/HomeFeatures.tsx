import { Ticket, MapPin, CalendarClock, Package } from "lucide-react";

const features = [
  {
    title: "E-Ticket Booking",
    desc: "Book your train tickets online quickly and securely from anywhere.",
    icon: Ticket,
  },
  {
    title: "Live Tracking",
    desc: "Track your train location and get real-time journey updates.",
    icon: MapPin,
  },
  {
    title: "Smart Schedule",
    desc: "Find updated train schedules and routes in one place.",
    icon: CalendarClock,
  },
  {
    title: "Cargo Service",
    desc: "Transport your packages safely with reliable railway cargo.",
    icon: Package,
  },
];

const HomeFeatures = () => {
  return (
    <section className="px-4 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p
              className="
            text-sm
            font-semibold
            uppercase
            tracking-widest
            text-[#006A4E]
            "
            >
              Services
            </p>

            <h2
              className="
            mt-2
            text-3xl
            font-bold
            text-gray-900
            sm:text-4xl
            "
            >
              Everything You Need
            </h2>
          </div>

          <p
            className="
          hidden
          max-w-sm
          text-right
          text-sm
          text-gray-500
          sm:block
          "
          >
            Enjoy a simple, comfortable and connected railway experience.
          </p>
        </div>

        {/* Cards */}

        <div
          className="
        grid
        gap-5
        sm:grid-cols-2
        lg:grid-cols-4
        "
        >
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-2
                hover:shadow-xl
                "
              >
                {/* Icon */}

                <div
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-green-50
                  text-[#006A4E]
                  transition
                  group-hover:bg-[#006A4E]
                  group-hover:text-white
                  "
                >
                  <Icon size={26} />
                </div>

                <h3
                  className="
                mt-6
                text-lg
                font-bold
                text-gray-900
                "
                >
                  {item.title}
                </h3>

                <p
                  className="
                mt-2
                text-sm
                leading-relaxed
                text-gray-500
                "
                >
                  {item.desc}
                </p>

                <div
                  className="
                  absolute
                  -bottom-8
                  -right-8
                  h-24
                  w-24
                  rounded-full
                  bg-green-100/50
                  transition
                  group-hover:scale-150
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
