import Image from "next/image";
import banner from "@/assets/Gemini_Generated_Image_77qqsb77qqsb77qq.png";

const HomeBanner = () => {
  return (
    <section
      className="
      relative
      min-h-[55vh]
      bg-[#00664A]
      "
    >
      <div
        className="
        mx-auto
        max-w-6xl
        pt-28
        pb-32
        "
      >
        <div className="max-w-3xl">
          <span
            className="
            inline-flex
            items-center
            rounded-full
            bg-white/10
            px-4
            py-2
            text-sm
            font-medium
            text-white
            "
          >
            🇧🇩 Bangladesh Railway
          </span>

          <h1
            className="
            mt-6
            text-4xl
            font-extrabold
            leading-tight
            text-white
            sm:text-5xl
            lg:text-7xl
            "
          >
            Discover Bangladesh
            <br />
            by Train
          </h1>

          <p
            className="
            mt-5
            max-w-2xl
            text-base
            text-green-50
            sm:text-lg
            "
          >
            Book train tickets, check schedules, explore routes and travel
            comfortably across Bangladesh.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="
              rounded-xl
              bg-red-600
              px-8
              py-3
              border-2 border-white/30
              font-semibold
              text-white
              transition
              hover:bg-red-700
              "
            >
              Book Ticket
            </button>

            <button
              className="
              rounded-xl
              border-2
              border-white/30
              px-8
              py-3
              font-semibold
              text-white
              transition
              hover:bg-white/10
              "
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;

{
  /* <Image
        src={banner}
        alt="Bangladesh Railway"
        fill
        priority
        className="
        object-cover
        object-center
        scale-x-[-1]
        "
      />

      {/* Overlay */
}
// <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/20" />

// {/* Bottom Fade */}
// <div
//   className="
//   absolute
//   bottom-0
//   h-24
//   w-full
//   bg-linear-to-t
//   from-black/50
//   to-transparent
//   "
// /> */}
