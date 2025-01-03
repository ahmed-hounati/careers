import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="bg-emerald-700 text-white">
            <div className="container px-4 py-24 mx-auto">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            Connect with Top Talent Globally
                        </h1>
                        <p className="max-w-[600px] text-emerald-100 md:text-xl">
                            Transform your recruitment process with our intelligent platform. Find, engage, and hire the best candidates seamlessly.
                        </p>
                        <div className="flex flex-col gap-4 min-[400px]:flex-row">
                            <Button size="lg" className="bg-yellow-400 text-emerald-900 hover:bg-yellow-500">
                                Get Started
                            </Button>
                            <Button size="lg" variant="outline" className="border-emerald-100 text-emerald-100 hover:bg-emerald-600">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-transparent lg:hidden" />
                        <img
                            src="/placeholder.svg?height=400&width=500"
                            alt="Remote work illustration"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

