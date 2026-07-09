// import LoginForm ou SignUpForm
import LogoContainer from "../LogoContainer/LogoContainer";

export default function AuthPageUI({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LogoContainer />
      {children}
    </>
  )
}



// import SignUpForm from "../SignUpForm/SignUpForm";

// export default function AuthForm() {
//   return (
//     <>
//         <LogoContainer />
//         {/* <LoginForm /> ou <SignUpForm */}
//     </>
//   )
// }
