import HomeBanner from "../component/Home/HomeBanner";
import HomeCTA from "../component/Home/HomeCTA";
import HomeFeatures from "../component/Home/HomeFeatures";
import HomeRoutes from "../component/Home/HomeRoutes";
import HomeSearch from "../component/Home/HomeSearch";
import HomeStats from "../component/Home/HomeStats";
import RailwayMap from "../component/Home/RailwayMap";

const HomePage = () => {
  return (
    <>
      <div className="relative">
        <HomeBanner />
        <div className="-mt-20 relative z-10">
          <HomeSearch />
        </div>
      </div>
      <HomeStats />
      <HomeRoutes />
      <RailwayMap />
      <HomeFeatures />
      <HomeCTA />
    </>
  );
};

export default HomePage;
