export const projects = [
  {
    slug: "medimind",
    name: "MediMind",
    shortDescription: "A full-stack AI-powered clinical decision support platform.",
    image: "/projects/medimind.png",
    techStack: ["Next.js", "TypeScript", "Express.js", "MongoDB", "Groq AI", "Google Gemini"],
    description: "MediMind is a full-stack AI-powered clinical decision support platform that gives patients and clinicians access to three intelligent medical tools — a symptom checker, a medical document analyzer, and a drug interaction detector — all in one place. The symptom checker uses Groq AI to analyze user-described symptoms in natural language, assign a clinical urgency score from 1–10, and recommend the right specialist, while the document analysis tool uses Google Gemini AI to extract key findings from uploaded lab results, MRI reports, and prescriptions. Built with Next.js, TypeScript, and Express.js on a MongoDB backend, MediMind tackles one of healthcare's most serious problems — the 250,000+ preventable medical errors that occur every year — by making expert-level clinical intelligence freely available to everyone.",
    liveUrl: "https://medimind-client.vercel.app/", 
    githubUrl: "https://github.com/officialshahidulshihab/medimindClient",
    challenges: [
      "Orchestrating Two Different AI APIs with Consistent, Safe Output: MediMind uses two separate AI providers — Groq for the symptom checker and Google Gemini for document analysis — each with different response formats, token limits, and failure modes. The hardest part was engineering structured, medically safe prompts for both APIs that consistently returned formatted clinical output (urgency scores, specialist recommendations, flagged findings) rather than free-form text, and building fallback handling so that if one AI API failed or returned an unexpected format, the UI wouldn't break or show a patient misleading medical information.",
      "Secure Medical Document Upload & AI Processing Pipeline: Building the health records feature required handling file uploads of sensitive medical documents (PDFs, images of lab results, MRI scans) and feeding them into Gemini's multimodal API for analysis. This meant managing file validation, secure storage, base64 encoding for API transmission, and parsing AI responses into structured clinical summaries — all while ensuring user documents were treated with the privacy and security that medical data demands, including access control via BetterAuth sessions.",
      "Designing Responsible AI Guardrails for a Medical Context: Unlike a general chatbot, every response MediMind generates could influence a real health decision. Building guardrails into the AI prompts — preventing the symptom checker from making definitive diagnoses, always directing users to real doctors for serious urgency scores, and ensuring the drug interaction checker clearly labels severity levels — required careful, iterative prompt engineering. Balancing clinical usefulness with responsible AI behavior in a TypeScript-strict codebase, where every API response had to be typed and validated, added another layer of complexity."
    ],
    futurePlans: [
      "Persistent Health History & AI-Generated Health Summary: Currently, each tool session is stateless. Adding a personal health dashboard where users can save past symptom checks, uploaded documents, and drug interaction reports — and have the AI generate a running longitudinal health summary over time — would transform MediMind from a one-off tool into a genuine personal health companion.",
      "Symptom-to-Doctor Direct Booking: Right now, the symptom checker recommends a specialist type and the doctor directory is a separate section. Connecting these flows — so that after receiving an urgency score and a specialist recommendation, the user is taken directly to a filtered list of available doctors matching that specialty — would complete the full patient journey end-to-end and make the platform dramatically more actionable."
    ]
  },
  {
    slug: "medicon",
    name: "MediCon",
    shortDescription: "A full-stack healthcare appointment booking platform for Bangladesh.",
    image: "/projects/medicon.jpg",
    techStack: ["Next.js", "TypeScript", "Express.js", "MongoDB", "BetterAuth"],
    description: "MediCon is a full-stack healthcare appointment booking platform built specifically for Bangladesh, allowing patients to discover and book specialist doctors across all 8 divisions of the country. The platform features real-time doctor availability, multi-criteria filtering by specialty, location, consultation fee, and rating, along with verified doctor profiles showcasing credentials, experience, and patient reviews. Built with Next.js and TypeScript on an Express.js/MongoDB backend, MediCon bridges the critical gap between patients and specialist care in a healthcare-underserved market.",
    liveUrl: "https://medicon-three.vercel.app/",
    githubUrl: "https://github.com/officialshahidulshihab/medicon-client",
    challenges: [
      "Real-Time Appointment Slot Management: Building a reliable slot booking system was the most technically demanding part of the project. When multiple patients browse the same doctor simultaneously, there's a race condition risk where two users could book the same time slot. Solving this required implementing atomic MongoDB operations and careful server-side validation on the Express.js API to ensure a slot marked as booked could never be double-reserved — no matter how many concurrent users were on the platform.",
      "Role-Based Access Control for Three User Types: MediCon has three distinct roles — patients, doctors, and admins — each with completely different dashboards, permissions, and protected routes. Implementing this with BetterAuth in a Next.js TypeScript environment meant carefully designing middleware that could distinguish roles at the route level, protect doctor registration flows, and ensure patients couldn't access doctor-side features and vice versa — all while keeping TypeScript types strictly consistent across the client and API.",
      "Multi-Criteria Doctor Search & Filtering: The search system allows filtering by specialty, division/location, fee range, rating, and availability simultaneously. Translating these combined frontend filter states into efficient MongoDB aggregation queries — while keeping results fast and paginated — was a significant backend challenge, especially ensuring that filters composed correctly together and didn't return inconsistent results when multiple parameters were active at once."
    ],
    futurePlans: [
      "In-App Video Consultation (Telemedicine): Several patient reviews on the site specifically mention the need for remote/telemedicine access, especially for rural patients. Adding live video consultation directly within the platform — with a virtual waiting room and prescription download after the call — would make MediCon a complete end-to-end healthcare solution.",
      "Smart Appointment Reminders via SMS: The platform already references SMS confirmations in the UI, but building a fully automated reminder system using Bangladesh's local SMS gateways (like SSL Wireless or bKash SMS API) — sending reminders 24 hours and 1 hour before an appointment — would dramatically reduce no-shows and make the product feel truly production-grade."
    ]
  },
  {
    slug: "arthub",
    name: "ArtHub",
    shortDescription: "A full-stack online art marketplace for independent artists.",
    image: "/projects/arthub.jpg",
    techStack: ["Next.js", "Express.js", "MongoDB", "BetterAuth", "Stripe"],
    description: "ArtHub is a full-stack online art marketplace where independent artists can open their own studio, list original artworks, and sell them to collectors worldwide. The platform supports secure user authentication, category-based artwork browsing with price filtering, and integrated Stripe payments — making it a complete end-to-end buying and selling experience. Built with Next.js and Express.js on a MongoDB backend, ArtHub bridges the gap between emerging artists and art lovers through a clean, gallery-quality interface.",
    liveUrl: "https://art-hub-client-two.vercel.app/",
    githubUrl: "https://github.com/officialshahidulshihab/art-hub-client",
    challenges: [
      "Authentication Architecture with BetterAuth + JWT: Implementing a dual-layer auth system using BetterAuth alongside JWT was one of the most complex parts of the project. Managing session persistence, protecting private routes like the artist dashboard, and ensuring tokens were correctly validated on both the Next.js client and the Express.js API required careful coordination — especially handling edge cases like token expiry and unauthorized redirects without breaking the user experience.",
      "Stripe Payment Integration with Artist Payouts: Connecting Stripe to handle artwork purchases in a marketplace model — where money flows from a buyer to a specific artist — meant dealing with Stripe Connect, webhook verification, and handling failed or pending payment states. Ensuring the payment lifecycle was reliable and that the database order status stayed in sync with Stripe's webhook events was a significant backend challenge.",
      "Dynamic Filtering with a Fallback Content System: The browse and homepage needed to gracefully handle real-time API data while also falling back to local content when the remote API was unavailable (as seen live on the site). Building a filtering system for category and price range that worked seamlessly with both live MongoDB data and local fallback data — without UI flickers or broken states — required careful state management on the Next.js side."
    ],
    futurePlans: [
      "Artist Analytics Dashboard: Add a dedicated dashboard where artists can track their artwork views, sales history, revenue over time, and which categories perform best — giving them real insight into their audience.",
      "Wishlist & Collections for Collectors: Allow buyers to save artworks to a personal wishlist or curate private collections, and optionally share those collections publicly — increasing engagement and return visits to the platform."
    ]
  }
];
