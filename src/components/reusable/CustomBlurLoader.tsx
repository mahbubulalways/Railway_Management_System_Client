const CustomBlurLoader = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
};

export default CustomBlurLoader;
