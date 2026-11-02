"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCheck, MoreVertical, Paperclip, PenLine, Search, Smile } from "lucide-react";
import messageicon from "@/public/userpanelicons/userpanelmessagesicon.svg";
import houseicon from "@/public/propertyhouse.svg";
import funnelicon from "@/public/hotelfunnelicon.svg";
import callicon from "@/public/agentcallicon.svg";
import mailicon from "@/public/contactemailicon.svg";
import phoneicon from "@/public/contactformphoneicon.svg";
import clockicon from "@/public/newclockicon.svg";
import sendicon from "@/public/sendbtn.svg";

const SOFT_SHADOW = "shadow-[-8px_8px_16px_0_#999FB4,6px_-6px_12px_0_#FFFFFF]";
const GOLD_BORDER = {
  background:
    "linear-gradient(135deg,#FFFFFF 0%,#ECEDF0 50%,#C2C6CD 100%) padding-box, linear-gradient(180deg,#BA9000 0%,#F7D257 50%,#BA9000 100%) border-box",
};

// ponytail: static demo data, swap for messages API when it exists
const contacts = [
  { name: "Alex", last: "Close enough", time: "2d", unread: 0, img: 12 },
  { name: "Alex Johnson", last: "Sent you a photo", time: "2d", unread: 4, img: 33 },
  { name: "Sophia", last: "Hey How are you?", time: "2d", unread: 0, img: 47 },
  { name: "John", last: "Thanks!", time: "1d", unread: 2, img: 15 },
  { name: "Elena", last: "Dinner Tonight", time: "1d", unread: 2, img: 45 },
  { name: "Menash", last: "Good Morning", time: "3d", unread: 0, img: 53 },
  { name: "Noah", last: "Invite Sent", time: "1d", unread: 120, img: 60 },
  { name: "Freya", last: "Dinner Tonight", time: "1d", unread: 2, img: 44 },
];

const initialMessages = [
  { me: false, text: "Hi Parker, I saw the apartment listing in Austin.", time: "10:30 AM" },
  { me: true, text: "Hello Alex! 👋", time: "10:30 AM" },
  { me: false, text: "I'm interested in this property.", time: "10:30 AM" },
  { me: false, text: "Is the property still available?", time: "10:31 AM" },
  { me: true, text: "Yes, it is available.", time: "10:31 AM" },
  { me: true, text: "Would you like to schedule a visit?", time: "10:32 AM" },
  { me: false, text: "Yes, that would be great.", time: "10:32 AM" },
];

const avatar = (n: number) => `https://i.pravatar.cc/120?img=${n}`;

export default function UserPanelMessages() {
  const [active, setActive] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const contact = contacts[active];

  function send() {
    if (!draft.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([...messages, { me: true, text: draft.trim(), time }]);
    setDraft("");
  }

  return (
    <main className="space-y-4 p-4 text-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className={`flex w-fit items-center gap-6 rounded-xl border-2 border-transparent px-3 py-1 text-2xl font-bold text-[#E1AB18] ${SOFT_SHADOW}`}
            style={GOLD_BORDER}
          >
            Messages
            <Image src={messageicon} alt="" className="size-10" />
          </h1>
          <p className="mt-3 font-TimesNewRoman text-xl italic text-gray-500">
            Communicate with our team and get real-time support
          </p>
        </div>
        <button
          className={`flex items-center gap-2 rounded-lg border-t border-r border-[#DCDCDC] bg-white px-2 py-1 font-semibold ${SOFT_SHADOW}`}
        >
          <Image src={houseicon} alt="" className="h-10 w-14 object-contain" />
          <span><span className="text-red-600">New</span> Message</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[290px_1fr_260px]">
        {/* contacts */}
        <aside className={`overflow-hidden rounded-xl bg-[#E4E9F3] ${SOFT_SHADOW}`}>
          <div className="space-y-4 p-2">
            <div
              className={`flex items-center justify-between rounded-lg border-2 border-transparent px-2 py-1 ${SOFT_SHADOW}`}
              style={GOLD_BORDER}
            >
              <span className={`flex items-center gap-2 rounded-full bg-white px-3 py-1 font-amasis text-lg font-black text-[#0a4fa0] ${SOFT_SHADOW}`}>
                <Image src={mailicon} alt="" className="size-7" /> Inbox
              </span>
              <div className="flex items-center gap-2">
                <Image src={funnelicon} alt="" className="size-9" />
                <span className="flex size-10 items-center justify-center rounded-md border-2 border-[#8B5A2B] bg-white">
                  <PenLine className="size-6 text-[#E1AB18]" />
                </span>
              </div>
            </div>
            <label className={`flex items-center rounded-full bg-white px-4 py-2 ${SOFT_SHADOW}`}>
              <input
                placeholder="Search Contacts"
                className="w-full bg-transparent font-TimesNewRoman text-lg italic outline-none placeholder:text-gray-400"
              />
              <Search className="size-6 text-[#E1AB18]" />
            </label>
          </div>
          <ul>
            {contacts.map((c, i) => (
              <li key={c.name}>
                <button
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-6 py-2 text-left ${
                    i === active ? `rounded-xl bg-[#F4F6FA] ${SOFT_SHADOW}` : ""
                  }`}
                >
                  <img src={avatar(c.img)} alt="" className={`size-14 rounded-full border-2 border-white object-cover ${SOFT_SHADOW}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-medium">{c.name}</span>
                    <span className="block truncate text-xs text-gray-500">
                      {c.last} <span className="ml-2 text-gray-400">{c.time}</span>
                    </span>
                  </span>
                  {c.unread > 0 && (
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#FF0000] text-xs font-bold text-white shadow-[0_6px_16px_rgba(255,77,103,0.4),-5px_5px_4.2px_rgba(255,0,0,0.3)]">
                      {c.unread > 99 ? "99+" : c.unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* chat */}
        <section className={`flex min-h-[640px] flex-col rounded-xl bg-[#F7F9FC] ${SOFT_SHADOW}`}>
          <header className="flex items-center gap-3 border-b border-gray-200 px-6 py-3">
            <span className="relative">
              <img src={avatar(contact.img)} alt="" className={`size-11 rounded-full border-2 border-white object-cover ${SOFT_SHADOW}`} />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full border border-white bg-green-500" />
            </span>
            <div className="flex-1">
              <p className="font-semibold">{contact.name}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
            <button className={`flex size-10 items-center justify-center rounded-full bg-white ${SOFT_SHADOW}`}>
              <Image src={callicon} alt="Call" className="size-6" />
            </button>
            <button className={`flex size-10 items-center justify-center rounded-full bg-white ${SOFT_SHADOW}`}>
              <MoreVertical className="size-5 text-[#E1AB18]" />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              <span className={`rounded-full bg-white px-3 py-1 ${SOFT_SHADOW}`}>Today</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            {messages.map((m, i) =>
              m.me ? (
                <div key={i} className="flex flex-col items-end">
                  <p className="rounded-xl rounded-br-none bg-[#0A9BFF] px-3 py-2 text-sm text-white shadow-[-6px_6px_12px_0_#999FB4]">
                    {m.text}
                  </p>
                  <span className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                    {m.time} <CheckCheck className="size-3 text-[#0A9BFF]" />
                  </span>
                </div>
              ) : (
                <div key={i} className="flex items-start gap-3">
                  <img src={avatar(contact.img)} alt="" className="size-7 rounded-full object-cover" />
                  <div>
                    <p className={`rounded-xl rounded-tl-none bg-white px-3 py-2 text-sm ${SOFT_SHADOW}`}>{m.text}</p>
                    <span className="mt-1 block text-[10px] text-gray-400">{m.time}</span>
                  </div>
                </div>
              ),
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 px-4 pb-4"
          >
            <Paperclip className="size-7 shrink-0 text-[#E1AB18]" />
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent font-TimesNewRoman italic outline-none"
              />
              <Smile className="size-8 shrink-0 fill-yellow-300 text-amber-600" />
              <button type="submit" aria-label="Send">
                <Image src={sendicon} alt="" className="size-11" />
              </button>
            </div>
          </form>
        </section>

        {/* support */}
        <div className="space-y-6">
          <div className={`space-y-4 rounded-xl bg-[#E9F0FB] p-4 text-xs ${SOFT_SHADOW}`}>
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#DCE6F5] font-bold text-[#E1AB18]">ST</span>
              <div className="flex-1">
                <p className="text-sm font-semibold">Support Team</p>
                <p className="text-[10px] text-green-500">● Online</p>
              </div>
              <span className="rounded bg-[#D6E4FA] px-1 text-[9px] font-semibold text-[#0a4fa0]">Official</span>
            </div>
            <div className="border-b border-white pb-3">
              <p className="text-sm font-bold text-[#2495FF]">Description</p>
              <p className="mt-1 text-gray-600">Our support team is here to help with your queries and booking related issues.</p>
            </div>
            <div className="border-b border-white pb-3">
              <p className="flex items-center gap-2 text-sm font-bold text-[#2495FF]">
                <Image src={mailicon} alt="" className="size-8" /> Email
              </p>
              <p className="mt-1 text-[#0a4fa0]">support@realto.com.au</p>
            </div>
            <div className="border-b border-white pb-3">
              <p className="flex items-center gap-2 text-sm font-bold text-[#2495FF]">
                <Image src={phoneicon} alt="" className="size-8" /> Phone
              </p>
              <p className="mt-1 text-[#0a4fa0]">+61 485 812 008</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-[#2495FF]">
                <Image src={clockicon} alt="" className="size-7" /> Working Hours
              </p>
              <dl className="mt-2 grid grid-cols-[70px_1fr] gap-y-1 font-semibold">
                <dt>Mon - Fri:</dt><dd>8:00 AM - 8:00 PM</dd>
                <dt>Sat - Sun:</dt><dd>9:00 AM - 5:00 PM</dd>
              </dl>
            </div>
          </div>

          <div className="rounded-xl border-2 border-[#5DB8FF] bg-gradient-to-br from-[#1E6BFF] to-[#00B4FF] p-4 text-white shadow-[0_0_16px_#5DB8FF]">
            <p className="font-bold">Need Help ?</p>
            <p className="mt-1 text-[10px]">Contact our support team 24/7</p>
            <button className="mt-3 rounded-md border border-[#E1AB18] bg-white px-3 py-1 text-[10px] font-semibold text-[#B8962E]">
              Contact support
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
