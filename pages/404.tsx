import Link from "next/link";
import { MainLayout } from "../components/main-layout/main-layout";

export default function ErrorPage() {
  return (
    <MainLayout title="Not Found">
      <h1>Error 404</h1>
    </MainLayout>
  );
}
