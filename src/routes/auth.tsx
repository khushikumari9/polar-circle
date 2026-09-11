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
  component: AuthPage;
});

function AuthPage() {
  return null;
}
