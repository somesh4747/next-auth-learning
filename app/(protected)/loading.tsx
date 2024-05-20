import { ShowUserInfo } from '@/components/user-info'

export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-sm rounded-md p-4 shadow">
            <div className="flex animate-pulse space-x-4 pt-5">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-7 rounded bg-slate-700"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 h-7 rounded bg-slate-700"></div>
                            <div className="col-span-1 h-7 rounded bg-slate-700"></div>
                        </div>
                        <div className="h-7 rounded bg-slate-700"></div>
                        <div className="h-7 rounded bg-slate-700"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 h-7 rounded bg-slate-700"></div>
                            <div className="col-span-1 h-7 rounded bg-slate-700"></div>
                        </div>
                        <div className="h-7 rounded bg-slate-700"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
