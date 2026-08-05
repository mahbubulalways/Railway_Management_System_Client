"use client";

import Link from "next/link";
import { ArrowLeft, Construction, Home } from "lucide-react";

interface UnderConstructionPageProps {
  title?: string;
  message?: string;
}

const UnderConstructionPage = ({
  title = "Page Under Construction",
  message = "This page is not ready yet. We're working hard to build it. Please check back soon.",
}: UnderConstructionPageProps) => {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center">
      <div className="flex max-w-md flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Construction className="h-12 w-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-gray-500 sm:text-base">{message}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
