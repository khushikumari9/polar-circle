import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, Snowflake, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, roleLabels } from "@/lib/auth";
import { stations } from "@/lib/portal-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/visualization", label: "Visualization" },
  { to: "/outreach", label: "Outreach" },
  { to: "/education", label: "Education" },
  { to: "/careers", label: "Careers" },
  { to: "/collaboration", label: "Collaboration" },
  { to: "/news", label: "News" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, role, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    navigate({ to: "/auth", replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-md bg-polar text-primary-foreground">
            <Snowflake className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold">Polar Science Portal</span>
            <span className="block text-[11px] text-muted-foreground">NCPOR • Ministry of Earth Sciences</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/dashboard"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          {user ? (
            <>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {roleLabels[role]}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Login / Signup</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          <div className="grid gap-1 pt-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                Admin dashboard
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
