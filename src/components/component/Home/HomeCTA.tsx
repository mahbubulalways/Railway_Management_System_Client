const HomeCTA = () => {
  return (
    <section className="relative overflow-hidden bg-green-800 px-6 py-20 text-center sm:px-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-700/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-green-900/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          আজই আপনার যাত্রা শুরু করুন
        </h2>
        <p className="mt-4 text-green-100">
          হাজারো যাত্রীর আস্থার সাথী — নিরাপদ, সময়মতো, আরামদায়ক।
        </p>
        <button className="mt-8 rounded-lg bg-red-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-red-500">
          টিকেট বুক করুন
        </button>
      </div>
    </section>
  );
};

export default HomeCTA;
