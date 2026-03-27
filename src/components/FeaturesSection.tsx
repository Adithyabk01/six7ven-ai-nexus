import { motion } from "framer-motion";
import { Mic, Zap, BarChart, Headset, Link2, ShieldCheck } from "lucide-react";

const features = [
  { icon: Mic, title: "Natural Voice Conversations", desc: "Interact fluidly with minimal latency, mimicking true human conversation flows." },
  { icon: BarChart, title: "Intelligent Lead Qualification", desc: "Our agents automatically score and advance leads straight into your CRM." },
  { icon: Zap, title: "Instant Deployment", desc: "Ready to answer calls and handle customer objections right out of the box." },
  { icon: Headset, title: "Omnichannel Support", desc: "Easily integrate with telephony, websites, or messaging applications." },
  { icon: Link2, title: "Seamless Integrations", desc: "Connect natively to Salesforce, HubSpot, Zapier, and custom webhooks." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "Enterprise-grade security ensuring privacy in every interaction." },
];

const FeaturesSection = () => {
  return (
    <section className="relative z-10 min-h-screen py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold">Why <span className="text-primary">Voice AI</span>?</h2>
        <p className="mt-4 text-xl text-muted-foreground">The competitive edge you need to scale your business unhindered.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
              <feature.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
