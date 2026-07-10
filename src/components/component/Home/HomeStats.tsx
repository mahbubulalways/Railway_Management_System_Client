import { Route, Train, Users, Clock3 } from "lucide-react";

const stats = [
  {
    value: "120+",
    label: "Routes",
    icon: Route,
  },
  {
    value: "38",
    label: "Stations",
    icon: Train,
  },
  {
    value: "4L+",
    label: "Passengers",
    icon: Users,
  },
  {
    value: "96%",
    label: "On-Time",
    icon: Clock3,
  },
];

const HomeStats = () => {
  return (
    <section className="px-4 my-20 py-10 sm:px-10 lg:px-20 bg-gray-50">
      <div className="mx-auto max-w-6xl ">
        {/* Header */}

        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-[#006A4E]">
              Railway Overview
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Our Network
            </h2>
          </div>

          <p className="hidden max-w-sm text-right text-sm text-gray-500 sm:block">
            Fast, safe and reliable railway service across Bangladesh.
          </p>
        </div>

        {/* Stats */}

        <div
          className="
          grid
          grid-cols-2
          gap-4
          lg:grid-cols-4
          "
        >
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                group
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-6
                shadow
                transition
                hover:-translate-y-1
                hover:shadow-lg
                "
              >
                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-50
                  text-[#006A4E]
                  transition
                  group-hover:bg-[#006A4E]
                  group-hover:text-white
                  "
                >
                  <Icon size={28} />
                </div>

                <h3
                  className="
                  mt-5
                  text-3xl
                  font-extrabold
                  text-gray-900
                  "
                >
                  {item.value}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
