import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Mail, ArrowLeft } from "lucide-react";

export default function MagicLinkPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-amber-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Package className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold">PodBundle</span>
          </div>
          <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a magic link to your email address. Click the link to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The link will expire in 10 minutes. If you don&apos;t see the email, check your spam folder.
          </p>
          <Link href="/auth/signin">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
