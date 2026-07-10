import LogoContainer from "../../LogoContainer/LogoContainer";

export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LogoContainer />
      {children}
    </>
  )
}