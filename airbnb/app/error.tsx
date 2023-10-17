"use client";

import { useEffect } from "react";
import EmptyState from "./components/shared/EmptyState";

interface IErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<IErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return <div>
    <EmptyState title="Uh Oh" subtitle="Something went wrong!" />
  </div>;
};

export default ErrorState;
