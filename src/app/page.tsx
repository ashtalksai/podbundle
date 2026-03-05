import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriceCard } from "@/components/price-card";
import {
  Radio, Package, BarChart3, FileText,
  ArrowRight, Search, Layers, Rocket,
  Star, Quote,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-7 w-7 text-indigo-600" />
            <span className="text-xl font-bold">PodBundle</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">How It Works</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-amber-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-indigo-600">Bundle. Launch. Report.</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance max-w-4xl mx-auto">
            Podcast Advertising
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent"> Made Simple </span>
            for Small Agencies
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Access 200+ curated podcasts, bundle them into targeted campaigns, and track performance — all from one dashboard.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-base px-8 h-12">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button size="lg" variant="outline" className="text-base px-8 h-12">
                See Pricing
              </Button>
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Radio className="h-4 w-4 text-indigo-600" />
              <span>200+ Podcasts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <span>Real-time Reporting</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" />
              <span>Trusted by 500+ Agencies</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Three simple steps to launch your podcast ad campaign</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Search, title: "Browse", desc: "Explore our curated directory of 200+ podcasts across tech, business, and wellness niches." },
              { step: "02", icon: Layers, title: "Bundle", desc: "Select podcasts, set your budget, and let our smart bundling optimize your reach." },
              { step: "03", icon: Rocket, title: "Launch", desc: "Submit your campaign, and track performance with unified real-time reporting." },
            ].map((item) => (
              <div key={item.step} className="relative text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-6">
                  <item.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-indigo-100 font-mono">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Everything You Need</h2>
            <p className="mt-4 text-lg text-muted-foreground">Powerful tools designed for small agencies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Radio, title: "Podcast Directory", desc: "200+ curated shows across tech, business, and wellness niches with detailed audience data." },
              { icon: Package, title: "Smart Bundling", desc: "Optimize reach within your budget with intelligent podcast grouping and allocation." },
              { icon: BarChart3, title: "Campaign Management", desc: "One dashboard to manage all your campaigns, track spend, and monitor status." },
              { icon: FileText, title: "Unified Reporting", desc: "Real-time performance data with impressions, downloads, and spend breakdowns." },
            ].map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 mb-4">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">Start free, scale as you grow. Plus a 10% media fee on campaign spend.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            <PriceCard
              name="Free"
              price="$0"
              period="mo"
              description="Perfect for trying out podcast advertising"
              features={[
                "Up to 5 podcasts",
                "1 active campaign",
                "Basic reporting",
                "Email support",
              ]}
              ctaText="Start Free"
            />
            <PriceCard
              name="Pro"
              price="$99"
              period="mo"
              description="For growing agencies with multiple clients"
              features={[
                "Up to 50 podcasts",
                "10 active campaigns",
                "Advanced reporting",
                "Priority support",
                "CSV export",
              ]}
              highlighted
              ctaText="Start Pro Trial"
            />
            <PriceCard
              name="Agency"
              price="$199"
              period="mo"
              description="For established agencies at scale"
              features={[
                "Unlimited podcasts",
                "Unlimited campaigns",
                "White-label reports",
                "API access",
                "Dedicated account manager",
                "Custom integrations",
              ]}
              ctaText="Contact Sales"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Loved by Agencies</h2>
            <p className="mt-4 text-lg text-muted-foreground">See what our customers have to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "PodBundle cut our podcast ad buying time by 80%. What used to take us a week now takes an afternoon.",
                name: "Sarah Chen",
                role: "Founder, Bright Media Co.",
                rating: 5,
              },
              {
                quote: "The bundling feature is genius. We got 3x the reach for the same budget by combining niche podcasts.",
                name: "Marcus Johnson",
                role: "Media Director, GrowthLab Agency",
                rating: 5,
              },
              {
                quote: "Finally, unified reporting across all our podcast campaigns. Our clients love the professional reports.",
                name: "Emily Rodriguez",
                role: "VP of Partnerships, AudioFirst",
                rating: 5,
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-indigo-200 mb-4" />
                  <p className="text-sm mb-6">{testimonial.quote}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Bundle Your First Campaign?</h2>
          <p className="text-lg text-indigo-200 mb-8">Join 500+ agencies already using PodBundle to simplify podcast advertising.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 text-base px-8 h-12">
                Start Free Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="border-indigo-400 text-white hover:bg-indigo-700 text-base px-8 h-12">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-indigo-400" />
              <span className="text-white font-semibold">PodBundle</span>
            </div>
            <p className="text-sm">Bundle. Launch. Report.</p>
            <p className="text-sm">&copy; 2026 PodBundle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
