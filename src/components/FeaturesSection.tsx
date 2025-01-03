import { Users2, Building2, MessageSquare, Search, Calendar, Award } from 'lucide-react'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Everything You Need to Hire Better
                    </h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">
                        Streamline your recruitment process with our comprehensive suite of tools
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={<Users2 className="w-10 h-10 text-emerald-600" />}
                        title="Talent Pool"
                        description="Access a diverse pool of qualified candidates from around the world"
                    />
                    <FeatureCard
                        icon={<Building2 className="w-10 h-10 text-emerald-600" />}
                        title="Company Profiles"
                        description="Create engaging company profiles to attract top talent"
                    />
                    <FeatureCard
                        icon={<MessageSquare className="w-10 h-10 text-emerald-600" />}
                        title="Smart Communication"
                        description="Engage with candidates through our integrated messaging system"
                    />
                    <FeatureCard
                        icon={<Search className="w-10 h-10 text-emerald-600" />}
                        title="Advanced Search"
                        description="Find the perfect candidates with powerful search filters"
                    />
                    <FeatureCard
                        icon={<Calendar className="w-10 h-10 text-emerald-600" />}
                        title="Interview Scheduling"
                        description="Streamline the interview process with automated scheduling"
                    />
                    <FeatureCard
                        icon={<Award className="w-10 h-10 text-emerald-600" />}
                        title="Skills Assessment"
                        description="Evaluate candidates with customizable assessment tools"
                    />
                </div>
            </div>
        </section>
    )
}

