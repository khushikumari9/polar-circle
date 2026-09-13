import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Facebook, Instagram, Mail, MapPin, Phone, Send, Snowflake, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmail("");
    toast.success("Subscribed — expedition updates will arrive in your inbox.");
  };

  return (
    <footer className="mt-20 border-t border-border bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Snowflake className="size-4" />
            </span>
            <h3 className="font-display text-base font-semibold">Polar Science Portal</h3>
          </div>
          <p className="mt-3 max-w-sm text-sm opacity-75">
            Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal —
            connecting India's Antarctic, Arctic and Himalayan research with the public.
          </p>
          <div className="mt-5 space-y-2 text-sm opacity-80">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" /> NCPOR, Headland Sada, Vasco-da-Gama, Goa 403804
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" /> +91 832 2525 600
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" /> outreach@ncpor.res.in
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            {[
              { icon: Twitter, label: "Updates on X" },
              { icon: Instagram, label: "Field photos" },
              { icon: Facebook, label: "Community" },
              { icon: Youtube, label: "Films" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                size="icon"
                aria-label={label}
                className="border-white/20 bg-transparent text-deep-foreground hover:bg-white/10 hover:text-deep-foreground"
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><Link to="/datasets" className="hover:underline">Datasets</Link></li>
            <li><Link to="/visualization" className="hover:underline">Visualization</Link></li>
            <li><Link to="/outreach" className="hover:underline">Outreach</Link></li>
            <li><Link to="/education" className="hover:underline">Education</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Engage</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            <li><Link to="/collaboration" className="hover:underline">Collaboration</Link></li>
            <li><Link to="/news" className="hover:underline">News</Link></li>
            <li><Link to="/auth" className="hover:underline">Login / Signup</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Newsletter</h4>
          <p className="mt-3 text-sm opacity-75">
            Expedition dispatches, new datasets and event announcements — once a month.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={subscribe}>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email for newsletter"
              className="border-white/20 bg-white/10 text-deep-foreground placeholder:text-deep-foreground/50"
            />
            <Button type="submit" size="icon" aria-label="Subscribe">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs opacity-70">
        © 2026 NCPOR • Ministry of Earth Sciences
      </div>
    </footer>
  );
}
