import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import CardWrapper from './card-wrapper'

export default function LoginForm() {
    return (
        <CardWrapper
            headerLabel="Welcome back!!"
            backButtonHref="/register"
            backButtonLabel="don't have an account"
            showSocial
        >
            login component
        </CardWrapper>
    )
}
