import { CheckCircledIcon } from '@radix-ui/react-icons'
// import { Stringifier } from 'postcss'

interface LoginSuccessProps {
    message?: string
}

export const LoginSuccessElememt = ({ message }: LoginSuccessProps) => {
    if (!message) return null

    return (
        <div className=" flex justify-center gap-4 items-center space-x-2 bg-green-100 text-green-700 rounded-md p-3">
            <CheckCircledIcon />
            <p>{message}</p>
        </div>
    )
}
