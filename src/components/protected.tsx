
import { auth0 } from '@/lib/auth0';
import Lockscreen from './lockscreen';



export default function ProtectedRoute({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div>
            {auth0 && (

              children
            )}
        </div>
    )
}

