// import SignUpForm from '../components/SignUpForm/SignUpForm';

// export default function Authenticate() {
//     return (
//         <>
//             <h1>Se créer un compte</h1>
//             <SignUpForm />
//         </>
//     )
// }

// src/pages/signup.tsx
import AuthPageUI from '../components/AuthPageUI/AuthPageUI';
import SignUpForm from '../components/SignUpForm/SignUpForm';

export default function Signup() {
  return (
    <AuthPageUI>
      <SignUpForm />
    </AuthPageUI>
  )
}