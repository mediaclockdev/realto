import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import buildingImage from "@/public/CompanyBuildinglogin.svg";
import emailIcon from "@/public/emailloginicon.svg";
import logo from "@/public/logo.svg";
import nameIcon from "@/public/userloginicon.svg";
import phoneIcon from "@/public/phoneloginicon.svg";
import passwordIcon from "@/public/passwordloginicon.svg";

type AuthInputProps = {
  icon?: StaticImageData;
  type?: string;
  placeholder: string;
};

function AuthInput({ icon, type = "text", placeholder }: AuthInputProps) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-md bg-white px-3 text-[#1f2a28]">
      {icon ? <Image src={icon} alt="" className="h-4 w-4" /> : null}
      <input
        type={type}
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#9a9a9a]"
      />
    </div>
  );
}

export default function Signup() {
  return (
    <main className="min-h-screen bg-[#40514E]  text-white sm:px-8">
  
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-screen-2xl items-center justify-center px-6 py-10 sm:px-10 lg:px-20">
        <div className="grid w-full max-w-screen-2xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="hidden justify-center lg:block lg:justify-start">
            <Image
              src={buildingImage}
              alt="Realto building illustration"
              priority
              className="w-full max-w-[560px]"
            />
          </div>

          <div className="mx-auto w-full max-w-[520px]">
            <div className="mb-8 flex flex-col items-center gap-3">
              <Image src={logo} alt="Realto" priority className="h-auto w-64" />
              <p className="text-center text-lg font-medium">
                Already Have An Account?{" "}
                <Link href="/login" className="underline underline-offset-2">
                  Sign In
                </Link>
              </p>
            </div>

            <section className="rounded-2xl border border-white/20 bg-white/15 p-8 shadow-xl backdrop-blur-sm">
              <h1 className="mb-6 text-xl font-semibold">Sign Up</h1>
              <form className="space-y-4">
                <label className="block space-y-2 text-sm font-medium">
                  <span>Enter Your Name</span>
                  <AuthInput icon={nameIcon} placeholder="Enter Your Name" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Enter Your Phone Number</span>
                  <AuthInput
                    icon={phoneIcon}
                    type="tel"
                    placeholder="Enter Your Phone No. Here"
                  />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Enter Your Email Address</span>
                  <AuthInput
                    icon={emailIcon}
                    type="email"
                    placeholder="Email address"
                  />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Enter Your Password</span>
                  <AuthInput
                    icon={passwordIcon}
                    type="password"
                    placeholder="Enter Your Password Here"
                  />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Confirm Password</span>
                  <AuthInput
                     icon={passwordIcon}
                    type="password"
                    placeholder="Enter Your Password Here"
                  />
                </label>
                <button
                  type="submit"
                  className="h-10 w-full rounded-md bg-[#3d91df] px-4 text-sm font-semibold text-white transition hover:bg-[#2f83d1]"
                >
                  Sign Up
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
