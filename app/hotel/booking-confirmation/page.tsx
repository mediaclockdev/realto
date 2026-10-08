import Image from "next/image";
import Link from "next/link";

// Figma icons are cropped rasters: c = [height%, left%, top%, width%] of the image inside its w×h box.
type Crop = [number, number, number, number];
const Cr = ({ src, c, sizes }: { src: string; c: Crop; sizes: string }) => (
  <Image src={src} alt="" width={400} height={400} sizes={sizes} className="absolute max-w-none"
    style={{ height: `${c[0]}%`, left: `${c[1]}%`, top: `${c[2]}%`, width: `${c[3]}%` }} />
);
const I = ({ s, w, h, c, r, rot }: { s: string; w: number; h: number; c?: Crop; r?: number; rot?: number }) => (
  <div
    className="relative shrink-0 overflow-hidden"
    style={{ width: w, height: h, borderRadius: r, transform: rot ? `rotate(${rot}deg)` : undefined }}
  >
    {c ? (
      <Cr src={`/confirmbooking/img${s}.png`} c={c} sizes={`${w * 2}px`} />
    ) : (
      <Image src={`/confirmbooking/img${s}.png`} alt="" fill sizes={`${w * 2}px`} className="object-cover" />
    )}
  </div>
);
const Svg = ({ s, className }: { s: string; className: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/confirmbooking/img${s}.svg`} alt="" className={className} />
);

const tick: Crop = [123.69, -12.82, -10.56, 125.64];
const checkIn: Crop = [101.69, -10.4, 0, 118.34];
const checkOut: Crop = [100, -10, 0, 117.25];
const pin: Crop = [108.14, -3.73, -3.16, 108.74];
const mail: Crop = [106.37, 0, -2.37, 100];
const arrow: Crop = [105.13, -10.39, 0, 120];

const card = "bg-white border border-[#e2e8f0] rounded-3xl drop-shadow-[8px_-8px_8px_#999fb4] drop-shadow-[-8px_8px_8px_#999fb4]";
const ab = "font-['Arial_Black']";
const shadowWhite = { textShadow: "1px 1px 2.1px black, 0 0 7.3px rgba(0,0,0,.6)" };
const arrowBtn = "flex items-center justify-center rounded-md bg-white px-2 py-[5px] shadow-[0_0_4px_rgba(0,0,0,.25)]";

const ArrowBtn = ({ w, h }: { w: number; h: number }) => (
  <div className={arrowBtn}>
    <div className="flex items-center justify-center" style={{ width: h, height: w }}>
      <I s="Image1613" w={w} h={h} c={arrow} rot={-90} />
    </div>
  </div>
);

const Pill = ({ children, className = "", pos }: { children: React.ReactNode; className?: string; pos: Crop }) => (
  <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
    <Cr src="/confirmbooking/imgNightsPill.png" c={pos} sizes="300px" />
    <span className="relative">{children}</span>
  </div>
);

const Banner = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative flex items-center justify-center gap-2.5 whitespace-nowrap px-10 py-8 h-[91px] w-[481px] max-w-full ${className}`}>
    <Image src="/confirmbooking/imgFrame1171276855.png" alt="" fill sizes="481px" className="object-cover" />
    {children}
  </div>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between text-[22px]">
    <span className="font-normal text-[#94a3b8]">{k}</span>
    <span className="text-[#1e293b]">{v}</span>
  </div>
);

const places = [
  ["Skydeck Melbourne", "SkydeckMelbourne", "4.6", "(12.3K)", "Melbourne", "2.4 km"],
  ["Great Ocean Road Tour", "GreatOceanRoadTour", "4.8", "(9.1K)", "Victoria", "76 km"],
  ["Melbourne City Tour", "MelbourneCityTourTram", "4.5", "(8.7K)", "Melbourne", "1.2 km"],
  ["Yarra River Cruise", "YarraRiverCruise", "4.4", "(6.2K)", "Victoria", "1.8 km"],
];

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-white font-TimesNewRoman font-bold">
      {/* Hero */}
      <div className="relative h-80 w-full overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 opacity-85">
          <Cr src="/confirmbooking/imgMelbourneSkylineHorizon.png" c={[217.97, 0, -58.98, 100]} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-[50px] px-4 pb-6 lg:px-10" style={{ zoom: 0.8 }}>
        {/* Confirmation banner */}
        <div className={`${card} mx-auto -mt-px flex w-full max-w-[1281px] flex-wrap items-center gap-[25px] px-4 py-1 mt-[18px] lg:flex-nowrap`}>
          <div className="flex items-center gap-5">
            <I s="894A6495346B47A38715B15948A0Bd84Photoroom2" w={79} h={79} c={tick} />
            <div className="flex flex-col gap-1">
              <h1 className={`${ab} text-[28px] leading-8 text-[#059669]`}>Booking Confirmed!</h1>
              <p className="pt-0.5 text-xl text-[#334155]">Your hotel reservation is confirmed.</p>
              <p className="text-xl font-normal italic leading-[23px] text-[#64748b]">
                A confirmation email and SMS have been sent to your registered
                <br />
                email and mobile number.
              </p>
            </div>
          </div>

          <div className="flex flex-col border-l border-[#f3f4f6] pl-[19px]">
            <p className={`${ab} text-xl tracking-[0.3px] text-[#0496ff]`}>Booking Reference Number</p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-2xl tracking-[0.9px] text-[#0f172a]">RLTO78456231</span>
              <I s="Image1956" w={34} h={40} c={[104.53, -4.61, -3.77, 109.43]} />
            </div>
            <div className="flex flex-col gap-2 pt-3 text-2xl font-normal text-[#475569]">
              <div className="flex items-center gap-2">
                <I s="Image1688" w={41} h={41} c={[113.08, -7.51, -7.48, 116.88]} />
                indranilxo6@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <div className="flex w-[41px] justify-center"><I s="Image1365" w={31} h={41} c={[108.84, -3.23, -4.35, 107]} /></div>
                04XX XXX 2887
              </div>
            </div>
          </div>

          <div className="ml-auto flex flex-col items-end gap-[15px]">
            <div className="flex w-[190px] items-center justify-end gap-5 pr-[5px] text-base text-[#334155]">
              <button className="flex items-center gap-1.5">
                <I s="Image1650" w={52} h={52} c={[103.16, -2.5, 0, 105]} /> Share
              </button>
              <button className="flex items-center gap-1.5">
                <span className="relative h-[34px] w-[39px]">
                  <Svg s="Vector" className="absolute inset-[-11.76%_-10.26%] block max-w-none size-full" />
                </span>
                Save
              </button>
            </div>
            <button className="relative flex h-[66px] w-[251px] items-center gap-[5px] overflow-hidden py-[9px] pl-[22px] pr-[69px] text-center text-xl leading-6 text-white">
              <Cr src="/confirmbooking/imgFrame1171276853.png" c={[224.79, -4.09, -58.68, 108.13]} sizes="251px" />
              <span className="relative w-[120px]">Download<br />Confirmation</span>
              <span className="relative"><I s="Image1953" w={71} h={46} /></span>
            </button>
            <Link href="/my-bookings" className="flex items-center gap-1 text-xl text-[#0496ff]">
              View in My Bookings <Svg s="Container" className="h-[7.5px] w-[8.75px]" />
            </Link>
          </div>
        </div>

        <Link href="/hotel" className="flex items-center gap-2 text-base text-[#334155]">
          <Svg s="Container1" className="h-[8.75px] w-[5px]" /> Back to Stays
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left column */}
          <div className="flex flex-col gap-4 lg:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-[31px] text-[#0f172a]">Holiday INN Melbourne</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-0.5 rounded-md bg-[#c0e8ff] px-2 py-0.5">
                    <span className="text-[28px] leading-7 tracking-[0.3px] text-white" style={shadowWhite}>4.3</span>
                    <I s="Image1656" w={32} h={32} />
                  </div>
                  <span className="text-base text-[#64748b]">Excellent (55,571 Reviews)</span>
                  <div className="flex items-center">
                    <I s="Image1903" w={30} h={43} c={pin} />
                    <span className="text-[17px] text-black">&nbsp;575 Flinders Lane, Melbourne VIC 3000, Australia</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-[26px] gap-y-2 pt-[5.5px] text-[21px] text-[#475569]">
                  <span className="flex items-center gap-1.5"><I s="Image1932" w={62} h={54} c={[106.92, -2.53, -5.67, 104.75]} /> Free Wi-Fi</span>
                  <span className="flex items-center gap-1.5"><I s="Image1928" w={37} h={65} /> Restaurant</span>
                  <span className="flex items-center gap-1.5"><I s="Image1929" w={71} h={54} c={[113.11, -1.34, -8.9, 101.34]} /> Fitness Centre</span>
                  <span className="flex items-center gap-1.5"><I s="Image1930" w={145} h={54} c={[117.7, -2.15, -12.7, 104.66]} /> Airport Shuttle</span>
                </div>
              </div>
              <Pill className="h-[51px] w-[222px] text-[22px]" pos={[168.56, -5.73, -33.99, 111.47]}>
                <span className="bg-gradient-to-b from-[#0890ef] to-[#0353aa] bg-clip-text leading-7 text-transparent">6 Days ,7 Nights</span>
              </Pill>
            </div>

            <div className="grid h-[331px] grid-cols-4 gap-3 overflow-hidden rounded-2xl">
              <div className="relative col-span-3">
                <Image src="/confirmbooking/imgBigLeftImage3ColsHolidayInnMelbourneExteriorFacade.png" alt="Holiday Inn Melbourne" fill sizes="800px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-3">
                {["CityAerialView", "HotelSuite", "HotelRoomDoubleBeds"].map((s, i) => (
                  <div key={s} className="relative flex-1 overflow-hidden rounded-lg">
                    <Image src={`/confirmbooking/img${s}.png`} alt="" fill sizes="200px" className="object-cover" />
                    {i === 2 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-sans text-sm font-bold tracking-[0.35px] text-white">+8 Photos</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={`${card} p-6`}>
              <div className="flex flex-wrap gap-4">
                <div className="flex h-[81px] min-w-[300px] flex-1 items-center gap-[14px] rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-2">
                  <I s="Image1581" w={74} h={66} c={checkIn} />
                  <div className="flex flex-col">
                    <p className={`${ab} text-2xl text-[#018a5e]`}>Check-in</p>
                    <p className="text-[22px] text-[#1e293b]">Monday 21 September 2026</p>
                    <p className="text-lg text-[#64748b]">1:00 pm</p>
                  </div>
                </div>
                <div className="flex h-[81px] min-w-[300px] flex-1 items-center justify-end gap-[30px] rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-1 py-2">
                  <div className="flex flex-col items-end">
                    <p className={`${ab} text-2xl text-[#fa2f2f]`}>Check-out</p>
                    <p className="text-[22px] text-[#1e293b]">Friday 25 September 2026</p>
                    <p className="text-lg text-[#64748b]">10:00 am</p>
                  </div>
                  <I s="Image1589" w={74} h={66} c={checkOut} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
              <div className={`${card} flex h-[97px] w-[424px] max-w-full items-center gap-5 py-6 pl-[33px] pr-6`}>
                <I s="Image1960" w={91} h={89} c={[111.26, -3.41, -5.01, 105.68]} />
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1.5 whitespace-nowrap text-lg leading-5 text-[#1e293b]">
                    <p className={`${ab} text-xl tracking-[0.5px] text-black`}>Guest name</p>
                    <p>Indranil Sen</p>
                    <p>Maria sen</p>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-lg border-2 border-[#ba9000] bg-white px-1 py-[5px]">
                    <I s="Image1966" w={27} h={27} c={[117, -11.94, -7.68, 125.28]} />
                    <div className="flex size-8 items-center justify-center rounded-md bg-white font-sans text-[23px] text-black shadow-[0_0_4px_rgba(0,0,0,.25)]">1</div>
                    <I s="Image1965" w={27} h={28} c={[111.55, -11.85, -4.92, 124.28]} />
                  </div>
                </div>
              </div>
              <div className={`${card} flex h-[97px] w-[402px] max-w-full items-center gap-5 p-6`}>
                <I s="Frame14660" w={130} h={86} r={6} c={[100, -0.31, 0, 100.96]} />
                <div className="flex flex-col gap-1.5 text-base text-[#1e293b]">
                  <p className={`${ab} text-xl tracking-[0.5px] text-black`}>Room type</p>
                  <p>Superior Room,</p>
                  <p>2 Double Beds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking summary */}
          <div className={`${card} relative flex flex-col gap-4 px-6 pb-6 pt-[54px] lg:col-span-4`}>
            <div className="absolute inset-x-[11%] top-0 flex h-[58px] items-center justify-center">
              <Image src="/confirmbooking/imgFrame1171276859.png" alt="" fill sizes="400px" className="object-fill" />
              <span className={`${ab} relative text-[26px] text-[#0496ff]`}>Booking Summary</span>
            </div>
            <div className="flex flex-col gap-2.5 py-4">
              <div className="flex justify-between"><span className="text-[23px] font-normal text-black">Base Price</span><span className="text-base text-[#1e293b]">AUD 819</span></div>
              <div className="flex justify-between"><span className="text-[23px] text-[#70c506]">Discount (15%)</span><span className="text-base text-[#018a5e]">- AUD 122</span></div>
            </div>
            <div className="flex items-baseline justify-between border-t border-[#f1f5f9] pb-5 pt-[9px]">
              <span className="text-lg text-[#1e293b]">Total Amount Paid</span>
              <span className="text-2xl tracking-[-0.6px] text-[#00a859]">AUD $697</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-[#00a859] bg-[#ebfbf3] p-[15px]">
              <I s="894A6495346B47A38715B15948A0Bd84Photoroom2" w={55} h={55} c={tick} />
              <div className="flex flex-col gap-2.5">
                <p className="text-lg text-[#3cd103]">Payment Successful</p>
                <p className="text-xl font-normal italic leading-[17.88px] text-[#027b11]">Your payment has been processed<br />successfully via our secure partner.</p>
              </div>
            </div>
            <div className="flex flex-col gap-[25px] border-b border-[#f1f5f9] pb-[25px]">
              <Row k="Payment Method" v="Credit / Debit Card" />
              <Row k="Payment Date" v="23 Aug 2026, 12:34 PM" />
              <Row k="Transaction ID" v="RTLPAY12876453" />
            </div>
            <div className="mt-auto flex flex-col gap-[18px] text-[25px] text-[#334155]">
              {[
                ["Contact Hotel", <I key="a" s="Image1931" w={60} h={62} c={[103.63, -6.42, -1.58, 108.67]} />],
                ["E-mail Hotel", <I key="b" s="Image1618" w={70} h={60} c={mail} />],
                ["Get Directions", <I key="c" s="Image1784" w={45} h={70} c={[100, -18.71, 0.7, 138.25]} />],
              ].map(([t, icon]) => (
                <button key={t as string} className={`${card} flex h-[70px] items-center gap-5 rounded-xl py-1 pl-6 pr-[7px]`}>
                  <span className="flex w-[73px] justify-start">{icon}</span>
                  <span className="font-['Aptos',Arial,sans-serif] font-black">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status strip */}
        <div className={`${card} flex flex-wrap items-center justify-between gap-4 whitespace-nowrap py-6 pl-[31px] pr-10 xl:flex-nowrap`}>
          <div className="flex items-center gap-3">
            <I s="894A6495346B47A38715B15948A0Bd84Photoroom2" w={79} h={79} c={tick} />
            <div className="flex flex-col gap-3">
              <p className={`${ab} text-2xl text-[#018a5e]`}>Booking Confirmed</p>
              <p className="text-[23px] font-normal text-[#94a3b8]">23 Aug 2026, 12:34 PM</p>
              <p className="text-[21px] font-normal text-[#64748b]">Your reservation is confirmed.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <I s="Image1581" w={96} h={79} c={checkIn} />
            <div className="flex flex-col gap-2">
              <p className={`${ab} text-2xl text-[#018a5e]`}>Check-in</p>
              <p className="text-[22px] text-[#1e293b]">Monday 21 September 2026</p>
              <p className="text-xl font-normal text-[#2563eb]">Upcoming</p>
            </div>
          </div>
          <Pill className="h-[41px] w-[134px] text-xl text-black" pos={[168.56, -7.37, -34.28, 111.47]}>7 Nights</Pill>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-2">
              <p className={`${ab} text-2xl text-[#fa2f2f]`}>Check-out</p>
              <p className="text-[22px] text-[#1e293b]">Friday 25 September 2026</p>
              <p className="text-xl font-normal text-[#2563eb]">Upcoming</p>
            </div>
            <I s="Image1589" w={96} h={79} c={checkOut} />
          </div>
        </div>

        {/* Important information */}
        <div className={`${card} flex flex-col gap-[29px] p-6`}>
          <Banner>
            <div className="relative size-[69px] shrink-0 overflow-hidden rounded-full bg-white">
              <Cr src="/confirmbooking/imgImage1364.png" c={[120.75, -10.71, -10.38, 123.23]} sizes="140px" />
            </div>
            <span className={`${ab} relative text-[28px] leading-7 text-white`} style={shadowWhite}>Important Information</span>
          </Banner>

          <div className="flex flex-wrap items-start gap-x-6 gap-y-8 text-[#1e293b]">
            <div className="flex w-[242px] flex-col gap-[13px]">
              <div className="flex gap-1">
                <I s="Image1581" w={82} h={68} c={checkIn} />
                <div className="flex flex-col gap-2">
                  <p className={`${ab} whitespace-nowrap text-xl text-[#018a5e]`}>Check-in Time</p>
                  <p className="text-lg font-normal leading-[23px] text-[#0f172a]">25 Aug 2026<br />1:00 PM</p>
                </div>
              </div>
              <p className="pt-0.5 text-[23px] font-normal italic leading-[23px] text-[#64748b]">Early check-in is subject to availability.</p>
            </div>
            <div className="flex w-[258px] flex-col items-end gap-[13px]">
              <div className="flex gap-1">
                <div className="flex flex-col items-end gap-2">
                  <p className={`${ab} whitespace-nowrap text-xl text-[#e50914]`}>Check-out Time</p>
                  <p className="text-right text-lg font-normal leading-[23px] text-[#0f172a]">01 Sep 2026<br />10:00 AM</p>
                </div>
                <div className="pt-0.5"><I s="Image1589" w={82} h={68} c={checkOut} /></div>
              </div>
              <p className="pt-0.5 text-right text-[23px] font-normal italic leading-[23px] text-[#64748b]">Late check-out is subject to availability.</p>
            </div>

            <div className="flex w-[222px] flex-col items-center gap-2.5">
              <div className="flex h-[110px] w-[198px] items-center justify-center">
                <I s="Image1954" w={188} h={61} c={[121.96, -2.63, -11.15, 106.79]} rot={-16} />
              </div>
              <p className={`${ab} self-start text-[23px]`}>Free Cancellation</p>
              <p className="self-start text-lg font-normal leading-[23px] text-[#0f172a]">Until 24 Aug 2026<br />07:59 AM</p>
              <p className="text-[21px] font-normal italic leading-[21px] text-[#64748b]">Get a full refund if you cancel before this time.</p>
            </div>
            <div className="flex w-[241px] flex-col items-center gap-3">
              <div className="flex h-[113px] items-center gap-1">
                <I s="Image1257" w={127} h={83} c={[109.17, -1.61, -5.68, 105.26]} />
                <I s="Image1672" w={76} h={113} r={3} c={[108.74, -2.78, -7.77, 105.56]} />
              </div>
              <p className={`${ab} text-[23px]`}>ID Requirement</p>
              <p className="text-[21px] font-normal italic leading-[21px] text-[#64748b]">A valid government ID is required at check-in (e.g. passport or driver&apos;s license).</p>
            </div>
            <div className="flex w-[234px] flex-col items-center gap-2.5">
              <div className="pt-0.5"><I s="Image1936" w={76} h={104} c={[106.33, -12.92, -2.58, 124.43]} /></div>
              <p className={`${ab} text-[23px]`}>Special Requests</p>
              <p className="text-center text-[21px] font-normal italic leading-[21px] text-[#64748b]">For any special requests (e.g. extra bed, room near lift), please contact the hotel directly after booking.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border-[1.5px] border-[#5cc2fd] bg-white py-1.5 pl-px pr-3 shadow-[8px_-8px_15px_rgba(65,137,221,.2),-8px_8px_15px_rgba(55,113,200,.2)]">
            <div className="flex items-center">
              <I s="Image1618" w={84} h={68} c={mail} />
              <p className="max-w-[882px] text-xl font-normal leading-[26px] text-[#1e40af]">
                Your booking is also available in your Realto account and has been sent to <b>indranilxo6@gmail.com</b> and <b>04XX XXX 2887</b>.
              </p>
            </div>
            <Link href="/my-bookings" className="flex items-center gap-10">
              <span className={`${ab} text-xl text-[#1a73e8]`}>Go to My Bookings</span>
              <ArrowBtn w={30} h={23} />
            </Link>
          </div>
        </div>

        {/* Recommended places */}
        <div className={`${card} relative flex flex-col gap-5 p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-3.5">
              <Banner>
                <span className={`${ab} relative text-[30px] leading-7 text-white`} style={shadowWhite}>Recommended Places</span>
              </Banner>
              <p className="text-[19px] font-normal text-[#64748b]">Based on your booking in Melbourne.</p>
            </div>
            <div className="flex w-[148px] flex-col">
              <p className={`${ab} text-[28px] text-[#0496ff]`}>See More</p>
              <div className="flex h-[49px] items-center gap-3.5 rounded-md border-2 border-[#ba9000] py-1 pl-0.5 pr-3">
                <I s="Image1794" w={87} h={45} />
                <ArrowBtn w={21} h={16} />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[22px] top-1/2 z-10 -translate-y-1/2 -scale-x-100"><I s="Image1726" w={44} h={44} /></div>
            <div className="absolute -right-[22px] top-1/2 z-10 -translate-y-1/2"><I s="Image1726" w={44} h={44} /></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {places.map(([name, img, rating, reviews, city, dist]) => (
                <div key={name} className="flex h-[320px] flex-col overflow-hidden rounded-xl border border-[#f1f5f9] bg-white p-px shadow-[6px_-6px_12px_white,-8px_8px_16px_#999fb4]">
                  <div className="relative h-[195px] shrink-0">
                    <Image src={`/confirmbooking/img${img}.png`} alt={name} fill sizes="320px" className="object-cover" />
                    <Svg s="Vector1" className="absolute right-[11px] top-2.5 h-7 w-[34px] overflow-visible" />
                  </div>
                  <div className="flex flex-col gap-[5px] px-3 pb-3 pt-px">
                    <div className="flex h-[33px] items-center justify-between gap-1">
                      <span className={`${ab} truncate text-base text-[#0f172a]`}>{name}</span>
                      <div className="flex shrink-0 items-center gap-[3px]">
                        <I s="Image1651" w={32} h={31} />
                        <div className="flex flex-col items-center text-[#334155]">
                          <span className="text-lg leading-[16.5px]">{rating}</span>
                          <span className="text-[13px] font-normal leading-[16.5px] text-[#94a3b8]">{reviews}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-[3px] text-[21px] font-normal leading-[16.5px] text-[#64748b]">
                      <div className="w-[35px]"><I s="Image1903" w={30} h={43} c={pin} /></div>
                      {city} {dist}
                    </div>
                    <div className="flex items-center gap-[3px] text-[21px] font-normal leading-[16.5px] text-[#64748b]">
                      <I s="Image1969" w={35} h={36} c={[111.43, -6.57, -7.86, 113.87]} />
                      +61 448 298 337
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Need help */}
        <div className={`${card} flex flex-wrap items-center justify-between gap-4 p-4`}>
          <div className="flex items-center gap-3">
            <I s="Image1270" w={72} h={96} />
            <div>
              <h4 className={`${ab} text-xl text-[#0496ff]`}>Need Help?</h4>
              <p className="text-xl font-normal italic text-[#64748b]">
                We&apos;re here to help. If you have any questions about your booking, feel free to contact us.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              ["Contact Support", "Image1186", "border-[#ba9000] text-[#ba9000]"],
              ["Manage Booking", "Image1964", "border-[#ba9000] text-[#ba9000]"],
              ["Cancel Booking", "Image1260", "border-[#e50914] text-[#e50914]"],
            ].map(([t, s, cls]) => (
              <button key={t} className={`${ab} flex items-center gap-2 rounded-lg border-2 bg-white px-3 py-1 text-base ${cls}`}>
                <I s={s} w={40} h={40} /> {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
