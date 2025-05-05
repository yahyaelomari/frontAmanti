import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function AllPaidMessage() {
    return (
        <Card className="w-full border-green-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-green-600 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    All Payments Completed
                </CardTitle>
                <CardDescription>All current orders have been paid</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    There are no pending payments at this time. New orders will appear here when they require payment.
                </p>
            </CardContent>
        </Card>
    )
}
