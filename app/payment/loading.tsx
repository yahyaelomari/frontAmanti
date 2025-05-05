import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentsLoading() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-10 w-48" />
            </div>

            <Skeleton className="h-10 w-64 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Skeleton className="h-[400px] w-full rounded-md" />
                </div>
                <div>
                    <Skeleton className="h-[350px] w-full rounded-md" />
                </div>
            </div>
        </div>
    )
}
