import LogoContainer from "../LogoContainer/LogoContainer";

export default function AuthPageUI({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LogoContainer />
      {children}
    </>
  )
}