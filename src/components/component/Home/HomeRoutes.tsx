import { ArrowRight, Clock, Eye, Ticket, TrainFront } from "lucide-react";

const routes = [
  {
    from: "Dhaka",
    to: "Chittagong",
    train: "Subarna Express",
    duration: "6 Hours",
    price: "500৳",
    popular: true,
  },
  {
    from: "Dhaka",
    to: "Sylhet",
    train: "Parabat Express",
    duration: "6.5 Hours",
    price: "450৳",
    popular: false,
  },
  {
    from: "Dhaka",
    to: "Rajshahi",
    train: "Dhumketu Express",
    duration: "5.5 Hours",
    price: "420৳",
    popular: false,
  },
];

const HomeRoutes = () => {
  return (
    <section className="px-4 pb-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#006A4E]">
              Popular Routes
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Explore Train Journeys
            </h2>
          </div>

          <button
            className="
            hidden
            items-center
            gap-2
            text-sm
            font-semibold
            text-[#006A4E]
            sm:flex
            "
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <div
              key={r.train}
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
              {/* Popular */}

              {r.popular && (
                <span
                  className="
                  absolute
                  right-5
                  top-5
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-[#006A4E]
                  "
                >
                  Popular
                </span>
              )}

              {/* Train */}

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-green-50
                text-[#006A4E]
                "
              >
                <TrainFront size={24} />
              </div>

              {/* Route */}

              <div className="mt-6 flex items-center gap-3">
                <h3 className="text-xl font-bold text-gray-900">{r.from}</h3>

                <ArrowRight
                  className="
                  text-[#006A4E]
                  transition
                  group-hover:translate-x-1
                  "
                  size={20}
                />

                <h3 className="text-xl font-bold text-gray-900">{r.to}</h3>
              </div>

              <p className="mt-2 text-sm text-gray-500">{r.train}</p>

              {/* Info */}

              <div
                className="
                mt-6
                flex
                items-center
                justify-between
                rounded-2xl
                bg-gray-50
                p-4
                "
              >
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400">Duration</p>

                    <p className="text-sm font-semibold text-gray-800">
                      {r.duration}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">Starting</p>

                  <p className="text-lg font-bold text-[#006A4E]">{r.price}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                {/* Details Button */}

                <button
                  className="
    group
    flex
    flex-1
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-gray-200
    bg-white
    py-3
    text-sm
    font-semibold
    text-gray-700
    transition
    hover:border-[#006A4E]
    hover:bg-green-50
    hover:text-[#006A4E]
    "
                >
                  <Eye
                    size={18}
                    className="
      transition
      group-hover:scale-110
      "
                  />
                  Details
                </button>

                {/* Book Button */}

                <button
                  className="
    group
    flex
    flex-1
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-[#006A4E]
    py-3
    text-sm
    font-semibold
    text-white
    shadow-md
    transition
    hover:bg-[#00543e]
    hover:shadow-lg
    "
                >
                  <Ticket
                    size={18}
                    className="
      transition
      group-hover:rotate-6
      "
                  />
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeRoutes;
