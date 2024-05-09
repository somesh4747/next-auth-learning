import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
// import { Stringifier } from 'postcss'

interface loginErrorProps {
    message? : string
}

export const LoginErrorElememt = ({message} : loginErrorProps) => {
    if(!message) return null;

    return (
        <div className=' flex justify-center gap-4 items-center bg-red-100 text-red-700 rounded-md p-3'>
            <ExclamationTriangleIcon />
            <p>{message}</p>
        </div>
    )
}
