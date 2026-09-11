import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, roleLabels } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Sign up — Polar Science Portal" },
      {
        name: "description",
        content:
          "Sign in as a public user, researcher or NCPOR administrator to access polar datasets and tools.",
      },
      { property: "og:title", content: "Login or Sign up — Polar Science Portal" },
      { property: "og:description", content: "Role-based access to India's polar science repository." },
    ],
  }),
  component: AuthPage,
});

const accessLevels = [
  {
    role: "Public User",
    text: "Browse outreach stories, education modules and basic station datasets.",
  },
  {
    role: "Researcher",
    text: "Advanced datasets, visualization tools and data submission forms.",
  },
  {
    role: "Admin (NCPOR staff)",
    text: "Approve datasets and manage outreach, careers and collaboration content.",
  },
];

function AuthPage() {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [requestedRole, setRequestedRole] = useState("public_user");
  const [busy, setBusy] = useState(false);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => navigate({ to: "/datasets" }), 800);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
        data: { full_name: fullName, institution, requested_role: requestedRole },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      setAwaitingConfirm(true);
      toast.success("Account created — check your email to confirm it.");
    } else {
      toast.success("Account created");
    }
  };

  if (user) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <Badge variant="secondary">{roleLabels[role]}</Badge>
        <h1 className="mt-4 text-2xl font-semibold">You're signed in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Taking you to the datasets area. You can also head to{" "}
          <Link to="/visualization" className="underline">visualization tools</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-icefield">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Login / Signup</h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            The portal uses role-based access so that public visitors, researchers and NCPOR staff each see the
            right tools and data.
          </p>
          <div className="mt-8 space-y-4">
            {accessLevels.map((level) => (
              <Card key={level.role}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{level.role}</CardTitle>
                  <CardDescription>{level.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Administrator access is granted by NCPOR staff after account verification.
          </p>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Access your account</CardTitle>
            <CardDescription>Use your institutional email where possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {awaitingConfirm ? (
              <div className="space-y-3 text-sm">
                <p className="font-medium">Confirm your email</p>
                <p className="text-muted-foreground">
                  We sent a confirmation link to <span className="font-medium">{email}</span>. Click it, then come
                  back and sign in.
                </p>
                <Button variant="outline" onClick={() => setAwaitingConfirm(false)}>Back</Button>
              </div>
            ) : (
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign in</TabsTrigger>
                  <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form className="space-y-4 pt-4" onSubmit={handleSignIn}>
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input id="signin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input id="signin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? "Signing in…" : "Sign in"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form className="space-y-4 pt-4" onSubmit={handleSignUp}>
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full name</Label>
                      <Input id="signup-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-institution">Institution (optional)</Label>
                      <Input id="signup-institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Requested access</Label>
                      <RadioGroup value={requestedRole} onValueChange={setRequestedRole} className="gap-2">
                        <div className="flex items-center gap-2 rounded-md border border-border p-3">
                          <RadioGroupItem value="public_user" id="role-public" />
                          <Label htmlFor="role-public" className="font-normal">Public user</Label>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border border-border p-3">
                          <RadioGroupItem value="researcher" id="role-researcher" />
                          <Label htmlFor="role-researcher" className="font-normal">Researcher</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? "Creating account…" : "Create account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
