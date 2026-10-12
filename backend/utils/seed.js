import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Service from "../models/Service.js";
import Product from "../models/Product.js";
import Banner from "../models/Banner.js";
import Portfolio from "../models/Portfolio.js";
import Partner from "../models/Partner.js";
import Position from "../models/Position.js";

dotenv.config();

async function seed() {
  await connectDB();

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
      { title: "Website Development", icon: "FaGlobe", description: "Responsive, high-performance websites built for conversions.", features: ["Custom UI/UX", "SEO Ready", "CMS Integration"], price: "₹15,000", delivery: "5-10 days", technology: ["React", "Tailwind"], tag: "Popular", order: 1 },
      { title: "ERP Systems", icon: "FaBuilding", description: "Unify inventory, HR, finance and operations in one system.", features: ["Multi-Module", "Reports"], price: "Starting ₹2,50,000", delivery: "8-12 weeks", technology: ["MERN Stack"], tag: "Enterprise", order: 2 },
      { title: "Mobile App Development", icon: "FaMobileAlt", description: "Native-feel Android & iOS apps from a single codebase.", features: ["Cross Platform", "Push Notifications"], price: "Starting ₹80,000", delivery: "3-6 weeks", technology: ["React Native"], order: 3 },
    ]);
    console.log("✔ Services seeded");
  }

  if ((await Product.countDocuments()) === 0) {
    await Product.insertMany([
      { name: "LOFA CRM", description: "A modern CRM for leads and deals.", image: "https://placehold.co/600x400/12141f/6d5bff?text=LOFA+CRM", features: ["Pipeline View"], technology: ["React", "Node.js"], status: "Live" },
      { name: "LOFA AI Assist", description: "AI-powered customer support widget.", image: "https://placehold.co/600x400/12141f/8b7bff?text=AI+Assist", features: ["Chatbot Builder"], technology: ["Python"], status: "Coming Soon" },
    ]);
    console.log("✔ Products seeded");
  }

  if ((await Banner.countDocuments()) === 0) {
    await Banner.create({
      heading: "LOFA AI Assist is launching soon",
      description: "Our next-gen AI support widget drops in a few days.",
      bannerImage: "https://placehold.co/1200x300/12141f/6d5bff?text=LOFA+AI+Assist",
      launchDate: new Date(Date.now() + 5 * 86400000),
      buttonText: "Notify Me",
      externalLink: "/products",
      isActive: true,
    });
    console.log("✔ Launch banner seeded");
  }

  if ((await Portfolio.countDocuments()) === 0) {
    await Portfolio.insertMany([
      { client: "Nova Retail", type: "E-Commerce Platform", technologies: ["React", "Node.js", "MongoDB"], duration: "8 weeks", image: "https://placehold.co/600x400/12141f/6d5bff?text=Nova+Retail", liveLink: "#", githubLink: "#" },
      { client: "Zenith Manufacturing", type: "ERP System", technologies: ["MERN Stack", "MySQL"], duration: "12 weeks", image: "https://placehold.co/600x400/12141f/3ee6cf?text=Zenith+ERP", liveLink: "#", githubLink: "#" },
    ]);
    console.log("✔ Portfolio seeded");
  }

  if ((await Partner.countDocuments()) === 0) {
    await Partner.insertMany([
      { name: "Nova Retail", logo: "https://placehold.co/200x80/12141f/6d5bff?text=Nova", order: 1 },
      { name: "Zenith Manufacturing", logo: "https://placehold.co/200x80/12141f/3ee6cf?text=Zenith", order: 2 },
      { name: "Orbit Fitness", logo: "https://placehold.co/200x80/12141f/ff6bd6?text=Orbit", order: 3 },
      { name: "Pulse Realty", logo: "https://placehold.co/200x80/12141f/8b7bff?text=Pulse", order: 4 },
    ]);
    console.log("✔ Partner logos seeded");
  }

  if ((await Position.countDocuments()) === 0) {
    await Position.insertMany([
      { title: "Frontend Engineer (React)", type: "Full-time", location: "Remote" },
      { title: "Backend Engineer (Node.js)", type: "Full-time", location: "Remote" },
    ]);
    console.log("✔ Career positions seeded");
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
