import { IPlatform, IStation, TCreateStation } from "@/interface/station";

const stationPayload = (data: TCreateStation) => {
  const station: Partial<IStation> = {
    phone: data.data.station.phone,
    email: data.data.station.email,
    type: data.data.station.type,
    division: data.data.station.division,
    district: data.data.station.district,
    name: data.data.station.name,
    status: data.data.station.status,
    established: new Date(data.data.station.established),
    notes: data.data.station.notes,
    ticketCounter: data.data.station.ticketCounter,
    onlineTicketSupport: data.data.station.onlineTicketSupport,
    foodCourt: data.data.station.foodCourt,
    parking: data.data.station.parking,
    hasDisplayBoard: data.data.station.hasDisplayBoard,
    hasAnnouncementSystem: data.data.station.hasAnnouncementSystem,
    wheelchairAccess: data.data.station.wheelchairAccess,
    wifi: data.data.station.wifi,
    washroom: data.data.station.washroom,
    atm: data.data.station.atm,
    securityService: data.data.station.securityService,
    cctv: data.data.station.cctv,
    prayerRoom: data.data.station.prayerRoom,
    escalator: data.data.station.escalator,
    lift: data.data.station.lift,
  };

  const platforms: Partial<IPlatform>[] = data.data.platforms.map(
    (platform) => ({
      name: platform.name,
      type: platform.type,
      status: platform.status,
      length: Number(platform.length),
      capacity: Number(platform.capacity),
      hasRoof: platform.hasRoof,
    }),
  );

  return {
    data: {
      station,
      platforms,
    },
  };
};

export default stationPayload;
