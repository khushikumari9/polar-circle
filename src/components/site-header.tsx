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

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/outreach", label: "Outreach" },
  { to: "/education", label: "Education" },
  { to: "/news", label: "News" },
] as const;

const memberLinks = [
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
  const { user, role, isAdmin, isResearcher, signOut } = useAuth();
  const navigate = useNavigate();
  const links = isResearcher ? memberLinks : publicLinks;
  const showSubmit = isResearcher && !isAdmin;

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
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-foreground">
              Datasets <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/datasets" className="font-medium">All datasets</Link>
              </DropdownMenuItem>
              {stations.map((s) => (
                <DropdownMenuItem key={s.slug} asChild>
                  <Link to="/datasets" hash={s.slug}>
                    <span>{s.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{s.established}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Link
              to="/datasets"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              Datasets
            </Link>
            <div className="ml-4 grid gap-1 border-l border-border pl-3">
              {stations.map((s) => (
                <Link
                  key={s.slug}
                  to="/datasets"
                  hash={s.slug}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {s.name}
                </Link>
              ))}
            </div>
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
