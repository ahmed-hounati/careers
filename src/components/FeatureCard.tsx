import { Card, CardContent } from "./ui/card"

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

