import { db } from "./index";
import { podcasts } from "./schema";

const seedPodcasts = [
  { name: "The SaaS Insider", niche: "tech_saas" as const, audienceSize: 85000, cpm: "25.00", description: "Deep dives into SaaS growth strategies, featuring interviews with founders who scaled from $0 to $10M ARR.", imageUrl: null },
  { name: "Code & Coffee", niche: "tech_saas" as const, audienceSize: 120000, cpm: "30.00", description: "Morning conversations about software engineering, developer tools, and the tech industry.", imageUrl: null },
  { name: "Startup Stack", niche: "tech_saas" as const, audienceSize: 65000, cpm: "22.00", description: "Reviews and breakdowns of the best tools and technologies for early-stage startups.", imageUrl: null },
  { name: "DevOps Daily", niche: "tech_saas" as const, audienceSize: 95000, cpm: "28.00", description: "Daily insights on DevOps practices, cloud infrastructure, and CI/CD pipelines.", imageUrl: null },
  { name: "Product Thinking", niche: "tech_saas" as const, audienceSize: 78000, cpm: "26.00", description: "Product management strategies from PMs at top tech companies.", imageUrl: null },
  { name: "AI Frontiers", niche: "tech_saas" as const, audienceSize: 150000, cpm: "35.00", description: "Exploring the cutting edge of artificial intelligence, machine learning, and their business applications.", imageUrl: null },
  { name: "Cloud Native Show", niche: "tech_saas" as const, audienceSize: 55000, cpm: "20.00", description: "Everything Kubernetes, Docker, and cloud-native architecture.", imageUrl: null },
  { name: "The API Hour", niche: "tech_saas" as const, audienceSize: 42000, cpm: "18.00", description: "Building, designing, and monetizing APIs. For developers and API-first businesses.", imageUrl: null },
  { name: "Security Bytes", niche: "tech_saas" as const, audienceSize: 88000, cpm: "27.00", description: "Cybersecurity news, threat analysis, and best practices for tech teams.", imageUrl: null },
  { name: "Design Systems FM", niche: "tech_saas" as const, audienceSize: 38000, cpm: "19.00", description: "Building and maintaining design systems at scale. UI/UX deep dives.", imageUrl: null },
  { name: "The Money Stack", niche: "business_finance" as const, audienceSize: 200000, cpm: "32.00", description: "Personal finance and investing strategies for professionals and entrepreneurs.", imageUrl: null },
  { name: "Venture Voice", niche: "business_finance" as const, audienceSize: 110000, cpm: "29.00", description: "Inside the world of venture capital. Fund managers share deal flow insights.", imageUrl: null },
  { name: "CFO Playbook", niche: "business_finance" as const, audienceSize: 45000, cpm: "40.00", description: "Financial strategy and operations for growing companies. High-intent B2B audience.", imageUrl: null },
  { name: "Side Hustle Success", niche: "business_finance" as const, audienceSize: 175000, cpm: "22.00", description: "Real stories from people building profitable side businesses.", imageUrl: null },
  { name: "The Negotiation Edge", niche: "business_finance" as const, audienceSize: 62000, cpm: "24.00", description: "Master negotiation skills for business deals, salary talks, and everyday life.", imageUrl: null },
  { name: "E-Commerce Fuel", niche: "business_finance" as const, audienceSize: 82000, cpm: "26.00", description: "Strategies for 7- and 8-figure e-commerce store owners.", imageUrl: null },
  { name: "Real Estate Mogul", niche: "business_finance" as const, audienceSize: 135000, cpm: "28.00", description: "Commercial and residential real estate investing insights.", imageUrl: null },
  { name: "The Leadership Lab", niche: "business_finance" as const, audienceSize: 58000, cpm: "25.00", description: "Leadership development and management strategies for executives.", imageUrl: null },
  { name: "Crypto Decoded", niche: "business_finance" as const, audienceSize: 95000, cpm: "23.00", description: "Making sense of cryptocurrency, DeFi, and blockchain technology.", imageUrl: null },
  { name: "Small Biz Breakthrough", niche: "business_finance" as const, audienceSize: 72000, cpm: "21.00", description: "Actionable advice for small business owners looking to scale.", imageUrl: null },
  { name: "Mindful Living", niche: "health_wellness" as const, audienceSize: 160000, cpm: "24.00", description: "Meditation, mindfulness, and mental health practices for modern life.", imageUrl: null },
  { name: "Fit & Focused", niche: "health_wellness" as const, audienceSize: 190000, cpm: "26.00", description: "Science-backed fitness and nutrition advice from certified trainers.", imageUrl: null },
  { name: "The Sleep Doctor", niche: "health_wellness" as const, audienceSize: 105000, cpm: "30.00", description: "Improving sleep quality through evidence-based strategies and technology.", imageUrl: null },
  { name: "Nutrition Unlocked", niche: "health_wellness" as const, audienceSize: 88000, cpm: "25.00", description: "Cutting-edge nutrition science made accessible. Meal plans and supplement reviews.", imageUrl: null },
  { name: "Mental Health Matters", niche: "health_wellness" as const, audienceSize: 140000, cpm: "28.00", description: "Open conversations about anxiety, depression, and building resilience.", imageUrl: null },
  { name: "Yoga & Beyond", niche: "health_wellness" as const, audienceSize: 75000, cpm: "22.00", description: "Yoga practice, philosophy, and holistic wellness for all levels.", imageUrl: null },
  { name: "Biohacker's Guide", niche: "health_wellness" as const, audienceSize: 68000, cpm: "32.00", description: "Optimizing human performance through biohacking, supplements, and technology.", imageUrl: null },
  { name: "The Wellness Hour", niche: "health_wellness" as const, audienceSize: 120000, cpm: "23.00", description: "Weekly interviews with doctors, therapists, and wellness experts.", imageUrl: null },
  { name: "Run Wild", niche: "health_wellness" as const, audienceSize: 52000, cpm: "20.00", description: "Trail running, ultramarathons, and outdoor adventures.", imageUrl: null },
  { name: "Parent Wellness", niche: "health_wellness" as const, audienceSize: 98000, cpm: "24.00", description: "Health and wellness strategies specifically designed for busy parents.", imageUrl: null },
  { name: "The Growth Hacker", niche: "tech_saas" as const, audienceSize: 72000, cpm: "24.00", description: "Growth marketing tactics for SaaS and tech companies.", imageUrl: null },
  { name: "Women in Business", niche: "business_finance" as const, audienceSize: 115000, cpm: "27.00", description: "Empowering women entrepreneurs with strategies, stories, and support.", imageUrl: null },
];

async function seed() {
  console.log("Seeding podcasts...");
  await db.insert(podcasts).values(seedPodcasts);
  console.log(`Seeded ${seedPodcasts.length} podcasts`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
