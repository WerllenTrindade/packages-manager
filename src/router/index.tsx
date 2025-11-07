import React from "react";
import { useSession } from "../contexts/hooks/use-session";
import { PrivateStack } from "./private.router";
import { PublicStack } from "./public.router";

export function Router() {
  const { session } = useSession();

  return (
    <>{!!session?.email ?  <PrivateStack /> : <PublicStack />}</>
  
  );
}