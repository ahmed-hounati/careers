import Link from "next/link"

export function CTASection() {
    return (
        <section className="bg-emerald-50 py-16">
            <div className="container px-4 mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                    Ready to Transform Your Hiring?
                </h2>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-lg mb-8">
                    Join thousands of companies that have streamlined their recruitment process with our platform
                </p>
                <Link href={"/auth/login"} className="bg-emerald-700 p-2 rounded-lg text-white hover:bg-emerald-800">
                    Start Hiring Today
                </Link>
            </div>
        </section>
    )
}

