import { CheckCircledIcon, CheckboxIcon } from '@radix-ui/react-icons'


interface LoginSuccessProps {
    message?: string | null | undefined
}

export const LoginSuccessElememt = ({ message }: LoginSuccessProps) => {
    if (!message) return null

    return (
        <div className=" flex justify-center gap-4 items-center space-x-2 bg-green-100 text-green-700 rounded-md p-3">
            <CheckCircledIcon style={{transform : 'scale(2)'}} className='ml-3' />
            <p className='text-balance'>{message}</p>
        </div>
    )
}
