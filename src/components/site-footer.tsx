import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-base font-semibold">Polar Science Portal</h3>
          <p className="mt-2 text-sm opacity-75">
            Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal.
          </p>
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
          <h4 className="text-sm font-semibold">Stations</h4>
          <p className="mt-3 text-sm opacity-80">
            Maitri • Bharati • Himadri • Himansh • Southern Ocean expeditions
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs opacity-70">
        © 2026 NCPOR • Ministry of Earth Sciences
      </div>
    </footer>
  );
}
