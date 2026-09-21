"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { Award, CheckCircle2, ChevronDown, XCircle } from "lucide-react";
import HeroSection from "../ui/HeroSection";
// hero background
import heroBg from "@/public/herobrokerbg.jpg";
// agency logo (Mortgage Choice)
import agencyLogo from "@/public/mortagagechoicebank.svg";
// broker portrait
import portrait from "@/public/loanbrokerimg1.jpg";
// rating stars
import starFilled from "@/public/agentstarrating.svg";
import starEmpty from "@/public/agentstarratingempty.svg";

// social icons
import whatsapp from "@/public/whatsapp.svg";
import instagram from "@/public/logos_instagram.svg";
import facebook from "@/public/logos_facebook.svg";
import socialicon from "@/public/brokericons/socialicon.svg";

import serviceAreaIconred from "@/public/location.svg";
import certificatesIcon from "@/public/brokericons/Certificates&Awards.svg";
// reviewer avatars
import sara from "@/public/sarajohnson.jpg";
import david from "@/public/davidthompson.jpg";
import michael from "@/public/michaelchen.jpg";
import businesshour from "@/public/brokericons/businesshouricon.svg";
import serviceareaicon from "@/public/brokericons/serviceareaicon.svg";
import phoneicon from "@/public/brokericons/brokerphoneicon.svg";
import landline from "@/public/brokericons/brokerlandlineicon.svg";
import mailicon from "@/public/brokericons/brokermailicon.svg";
import amcicon from "@/public/brokericons/AMCicon.svg";
import diplomabrokering from "@/public/brokericons/Diplomabrokingicon.svg";
import mortagebrokering from "@/public/brokericons/CertificateMortageicon.svg";
import loaninsighticon from "@/public/brokericons/loanInsightsicon.svg";
import langugageicon from "@/public/languageworld.svg";
import callbroker from "@/public/brokericons/callbrokericon.svg";
import sendmessage from "@/public/brokericons/messageicon.svg";
import bookconsultation from "@/public/brokericons/bookconsultationicon.svg";
import mail from "@/public/contactmailicon.svg";
import headingbg from "@/public/contactheadingbg.svg";
// inquiry form field icons (shared with components/Home/Contact.tsx)
import dl from "@/public/agentpanelicons/profiledl.svg";
import edit from "@/public/agentpanelicons/dashboardeditprofileicon.svg";
import emailicon from "@/public/contactemailicon.svg";
import contactphone from "@/public/contactphoneicon.svg";
import sendbg from "@/public/contactsendbg.svg";
import sendicon from "@/public/contactsendbtn.svg";

const broker = {
  name: "Daniel Carter",
  title: "Senior Loan Broker",
  rating: 4.5,
  reviewCount: 38,
  specializations: [
    "Home Loans",
    "Investment Loans",
    "Refinancing",
    "First Home Buyer",
  ],
  serviceArea: "Austin, Australia",
  phone: "+62 444 555 333",
  landline: "(02) 5550 xxxx",
  email: "examplesetnikarpare@yahoo.com",
  about:
    "I'm a dedicated loan broker with a passion for helping individuals and families achieve their property and financial goals. With years of experience in the lending industry, I work with a wide panel of trusted lenders to find the right loan solution tailored to your needs. Whether you're a first home buyer, investor, or looking to refinance, I'm here to make the process simple, transparent, and stress-free.",
};

const hours = [
  ["Monday", "09:00am - 05:00pm"],
  ["Tuesday", "09:00am - 05:00pm"],
  ["Wednesday", "09:00am - 05:00pm"],
  ["Thursday", "09:00am - 05:00pm"],
  ["Friday", "09:00am - 05:00pm"],
  ["Saturday", "Closed"],
];

const stats = [
  ["8+", "Years Experience"],
  ["500+", "Home Loan Settled"],
  ["450 million", "Loan Volume"],
  ["98%", "Client Satisfaction"],
];

const credentials = [
  {
    icon: amcicon,
    title: "Accrediated Mortgage Consultant (AMC)",
    org: "EstatePrime Realty • 2018 - Present",
    desc: "Professional member with a commitment to the highest industry standards.",
  },
  {
    icon: diplomabrokering,
    title: "Diploma of finance and Mortgage broking",
    org: "EstatePrime Realty • 2018 - Present",
    desc: "Specialised in residential and investment lending solutions.",
  },
  {
    icon: mortagebrokering,
    title: "Certificate IV in Finance and Mortgage broking",
    org: "TAFE NSW",
    desc: "Strong foundation in lending, compliance and customer service.",
  },
];

const insights = [
  ["Avg. Loan Price", "$620K"],
  ["Loan Approval Rate", "96%"],
  ["Avg. Days to Approval", "12 days"],
  ["Free Consultation", "Yes"],
];

const languages = [
  ["English", "Native"],
  ["Spanish", "Fluent"],
  ["French", "Conversational"],
];

const serviceAreas = [
  "Beverly Hills",
  "West Hollywood",
  "Bel Air",
  "Santa Monica",
  "Malibu",
];

const certificates = [
  "MFAA Accredited Mortgage Consultant",
  "Member of FBAA (Finance Brokers Association of Australia)",
  "Top 10 Loan Brokers NSW (2022, 2023)",
  "5-Star Client Satisfaction Award",
];

const reviews = [
  {
    img: sara,
    name: "Sarah Johnson",
    rating: 4,
    meta: "Purchased in Beverly Hills • 2 months ago",
  },
  {
    img: david,
    name: "David Thompson",
    rating: 4,
    meta: "Purchased in Malibu • 5 months ago",
  },
  {
    img: michael,
    name: "Michael Chen",
    rating: 4,
    meta: "Investment Property • 4 months ago",
  },
];

const reviewText =
  "“Outstanding service from start to finish. John's attention to detail and responsiveness made the entire process smooth. He truly cares about his clients' best interests.”";

const goldBorder = "border-2 border-[#ECC440]";
const card = "rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]";

const Stars = ({
  rating,
  size = "size-5",
}: {
  rating: number;
  size?: string;
}) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Image
        key={i}
        src={i <= rating ? starFilled : starEmpty}
        alt=""
        className={size}
      />
    ))}
  </div>
);

const SidebarCard = ({
  icon,
  title,
  children,
}: {
  icon: typeof starFilled;
  title: string;
  children: React.ReactNode;
}) => (
  <div className={`${card} p-4 `}>
    <div className="mb-4 flex items-center gap-3 relative rounded-full bg-[#F1F3F2] px-3 py-2 shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]">
      <Image
        src={icon}
        alt=""
        className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 object-contain"
      />
      <h3 className="pl-11 font-bold text-[#4189DD] [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000]">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const BrokerProfilePage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Inquiry sent");
    e.currentTarget.reset();
  };

  return (
    <div className="bg-white font-poppins text-[#1f2937]">
      <HeroSection
        image={heroBg}
        title="Find Your Perfect Broker"
        description="Connect with experienced real estate professionals who will guide you through every step of your property journey."
      />

      <nav className="mx-auto max-w-screen-2xl px-5 py-3 text-xs text-[#6b7280]">
        <Link href="/homepage" className="hover:text-[#0284C7]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/broker" className="hover:text-[#0284C7]">
          Brokers
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-[#1f2937]">{broker.name}</span>
      </nav>

      {/* Agency banner */}
      <div className="bg-[#123C63]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5">
          <div className="flex items-center bg-white px-4 py-2">
            <Image
              src={agencyLogo}
              alt="Mortgage Choice"
              className="h-10 w-auto"
            />
          </div>
          <h2 className="flex items-center px-6 text-xl font-semibold text-white md:text-2xl">
            Loan Brokers
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-10 px-5 py-8">
        {/* Profile */}
        <section className="grid grid-cols-1 gap-6  lg:grid-cols-[342px_1fr]">
          <div className="space-y-3 ">
            <div className="relative mx-auto h-[352px] w-full max-w-[342px] overflow-hidden rounded-lg">
              <Image
                src={portrait}
                alt={broker.name}
                fill
                className="object-cover object-top"
              />
            </div>
            {[
              {
                icon: callbroker,
                label: "Call Broker",
                href: `tel:${broker.phone}`,
              },
              { icon: sendmessage, label: "Send Message", href: "#inquiry" },
              {
                icon: bookconsultation,
                label: "Book Consultation",
                href: "#inquiry",
              },
            ].map((b) => (
              <a
                key={b.label}
                href={b.href}
                className={`${goldBorder} flex items-center gap-3 rounded-lg px-3 py-2 font-bold text-[#C99A1E] hover:bg-[#FFF8E1]`}
              >
                <Image src={b.icon} alt={b.label} className="size-10" />
                {b.label}
              </a>
            ))}
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-[32px] font-semibold text-[#FA2F2F]">
                {broker.name}
              </h1>
              <p className="mt-1 text-lg font-bold text-[#4189DD]">
                {broker.title}
              </p>
              <div className="mt-2 flex items-center gap-2 text-base">
                <Stars rating={Math.round(broker.rating)} />
                <div>
                  <span className="font-semibold">{broker.rating}</span>
                  <a href="#reviews" className="underline font-normal">
                    ({broker.reviewCount} reviews)
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`${card} grid grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_220px]`}
            >
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#E11D2E]">
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {broker.specializations.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-[#ECC850] px-3 py-2 text-base font-semibold leading-none text-white [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                  <Info
                    icon={
                      <Image src={serviceareaicon} alt="" className="size-8" />
                    }
                    label="Service Area"
                    value={broker.serviceArea}
                  />
                  <Info
                    icon={<Image src={phoneicon} alt="" className="size-8" />}
                    label="Phone"
                    value={broker.phone}
                  />
                  <Info
                    icon={<Image src={landline} alt="" className="size-8" />}
                    label="Landline"
                    value={broker.landline}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <Info
                    icon={<Image src={mailicon} alt="" className="size-8" />}
                    label="Email"
                    value={broker.email}
                  />
                  <div>
                    <p className="text-[10px] text-gray-500">
                      Social media links
                    </p>
                    <div className="flex gap-2">
                      {[socialicon, whatsapp, instagram, facebook].map(
                        (s, i) => (
                          <Image key={i} src={s} alt="" className="size-7" />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border-[1.09px] border-[#DCDCDC] bg-white p-3 shadow-[-8.68px_8.68px_17.37px_0_#999FB4,6.51px_-6.51px_13.03px_0_#FFFFFF]">
                <div className="flex items-center gap-2 border-b-[1.09px] border-[#F3F4F6] ">
                  <Image src={businesshour} alt="business hour icon" />
                  <p className=" text-sm font-semibold text-[#4189DD]">
                    Business Hours
                  </p>
                </div>
                <dl className="space-y-1 text-[11px]">
                  {hours.map(([day, time]) => (
                    <div key={day} className="flex justify-between gap-2">
                      <dt className="font-semibold">{day}</dt>
                      <dd>{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className=" space-y-4 rounded-2xl bg-gradient-to-r from-[#D8EFFD] to-[#E9EDFE] p-4 text-center shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]"
                >
                  <p className="text-[28px] font-semibold font-Aptos text-[#E50914]">
                    {value}
                  </p>
                  <p className="bg-gradient-to-b from-[#024AA2] to-[#002A6F] bg-clip-text text-2xl font-bold text-transparent">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About + sidebar */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          <div className={`${card} h-fit space-y-6 p-5`}>
            <div>
              <h2 className="mb-2 font-semibold">About Me</h2>
              <p className="text-sm text-[#434C59]">{broker.about}</p>
            </div>
            <h3 className="mx-auto w-fit rounded-full bg-[#F1F3F2] px-6 py-2 font-black text-2xl text-[#4189DD] [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000] shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]">
              Experience &amp; Credentials
            </h3>
            {credentials.map((c) => (
              <div key={c.title} className="flex gap-3">
                <Image
                  src={c.icon}
                  alt=""
                  className="size-10 shrink-0 object-contain"
                />
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-xs text-[#007CBE]">{c.org}</p>
                  <p className="text-sm text-[#434C59]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <SidebarCard icon={loaninsighticon} title="Loan Insights">
              <dl className="space-y-1 text-sm font-semibold">
                {insights.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </SidebarCard>

            <SidebarCard icon={langugageicon} title="Languages">
              <dl className="space-y-1 text-sm">
                {languages.map(([lang, level]) => (
                  <div key={lang} className="flex justify-between">
                    <dt className="font-semibold">{lang}</dt>
                    <dd className="text-gray-500">({level})</dd>
                  </div>
                ))}
              </dl>
            </SidebarCard>

            <SidebarCard icon={serviceAreaIconred} title="Service Areas">
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((a) => (
                  <span
                    key={a}
                    className="rounded bg-gray-100 px-2 py-1 text-xs font-medium"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </SidebarCard>

            <SidebarCard icon={certificatesIcon} title="Certificates & Awards">
              <ul className="space-y-2 text-sm font-semibold">
                {certificates.map((c) => (
                  <li key={c} className="flex gap-2">
                    <CheckCircle2 className="size-4 shrink-0 translate-y-0.5 text-green-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </SidebarCard>
          </div>
        </section>

        {/* Reviews + inquiry */}
        <section id="reviews" className="space-y-6">
          <div className="text-center">
            <h2
              className={`${goldBorder} mx-auto flex w-fit items-center gap-3 rounded px-4 py-1 text-xl font-bold text-[#4189DD] [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000]`}
            >
              <Image src={edit} alt="" className="size-9" />
              Client Reviews and Ratings
              <Image src={certificatesIcon} alt="" className="size-9" />
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              What clients say about working with Daniel
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 justify-between w-full">
            <div className="flex h-full max-w-[713px] flex-col justify-between gap-4">
              {reviews.map((r) => (
                <div
                  key={r.name}
                  className={`${goldBorder} rounded-xl bg-white p-4`}
                >
                  <div className="flex gap-3">
                    <Image
                      src={r.img}
                      alt={r.name}
                      className="size-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <Stars rating={r.rating} size="size-6" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm italic text-[#434C59]">
                    {reviewText}{" "}
                    <button className="not-italic text-[#007CBE]">
                      Read more...
                    </button>
                  </p>
                  <p className="mt-2 text-right text-[10px] text-[#9CA3AF]">
                    {r.meta}
                  </p>
                </div>
              ))}
            </div>

            <form
              id="inquiry"
              onSubmit={handleSubmit}
              className={`${card} h-fit space-y-3 p-4 max-w-[450px]`}
            >
              <div className="relative w-full">
                <Image
                  src={headingbg}
                  alt="Heading Background"
                  className="w-full h-auto"
                />

                <div className="absolute left-2 top-5 -translate-y-1/2 ">
                  <Image src={mail} alt="mail" className="" />
                </div>

                <div className="absolute top-6 right-10 ">
                  <h2 className="text-white font-amasis font-black text-[28px] leading-none [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000]">
                    Message{" "}
                    <span className="font-['Times_New_Roman',serif] font-normal italic">
                      of
                    </span>{" "}
                    Inquiry
                  </h2>
                </div>
              </div>
              <Field
                label="Full Name"
                name="name"
                placeholder="Alex Johnson"
                icon={dl}
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="alex.johnson@gmail.com"
                icon={emailicon}
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="0142 345 678"
                icon={contactphone}
              />
              <label className={`${fieldBox} flex flex-col-reverse`}>
                <select
                  name="loanType"
                  className="peer w-full appearance-none bg-transparent pr-8 text-base outline-none"
                >
                  {broker.specializations.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className={statusLabel}>
                  <Status />
                  Loan Type
                </span>
                <ChevronDown className="absolute right-4 top-1/2 size-6 -translate-y-1/2 stroke-[3] text-[#ECC440]" />
              </label>
              <label className={`${fieldBox} flex flex-col-reverse`}>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Please type your message…"
                  className="peer w-full resize-none bg-transparent text-base italic outline-none placeholder:italic placeholder:text-gray-500"
                />
                <span className={statusLabel}>
                  <Status />
                  Message
                  <Image src={edit} alt="" className="size-8" />
                </span>
              </label>
              <button className="relative mx-auto block h-14 w-64">
                <Image src={sendbg} alt="" className="h-full w-full" />
                <span className="absolute inset-0 flex items-center justify-center pr-10 text-2xl font-bold text-white [text-shadow:0_0_7.3px_rgba(0,0,0,0.6),1px_1px_2.1px_#000]">
                  Send
                </span>
                <Image
                  src={sendicon}
                  alt=""
                  className="pointer-events-none absolute right-12 -top-1 size-14"
                />
              </button>
            </form>
          </div>

          <button className="mx-auto block rounded border border-[#D1D5DB] px-4 py-2 text-xs font-medium">
            Load More Reviews
          </button>
        </section>
      </div>
    </div>
  );
};

const Info = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-0.5">
    {icon}
    <div className="min-w-0">
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="break-all font-semibold">{value}</p>
    </div>
  </div>
);

// gold gradient border, same recipe as components/Home/Contact.tsx
const fieldBox =
  "relative rounded-2xl border-2 border-transparent px-4 py-2 [background:linear-gradient(white,white)_padding-box,linear-gradient(180deg,#BA9000,#F7D257,#BA9000)_border-box]";

// check/cross track the input's own :valid state — no JS.
// peer-* only reaches siblings, so the toggle lives on the label span.
const statusLabel =
  "flex items-center gap-1 text-sm text-gray-500 peer-invalid:[&_.ok]:hidden peer-invalid:[&_.bad]:block";

const Status = () => (
  <>
    <CheckCircle2 className="ok size-4 text-green-500" />
    <XCircle className="bad hidden size-4 text-red-500" />
  </>
);

const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  icon: typeof starFilled;
}) => (
  <label className={`${fieldBox} flex flex-col-reverse`}>
    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="peer w-full bg-transparent pr-16 text-base outline-none"
    />
    <span className={statusLabel}>
      <Status />
      {label}
    </span>
    <Image
      src={icon}
      alt=""
      className="absolute right-2 top-1/2 size-14 -translate-y-1/2 object-contain"
    />
  </label>
);

export default BrokerProfilePage;
