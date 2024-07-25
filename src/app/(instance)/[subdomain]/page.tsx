import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { FC } from "react";

interface IIndexPageProps {
  params: { subdomain: string };
}

const InstanceNotFoundPage: FC = () => {
  return (
    <div className='h-screen grid place-items-center'>
      <Card>
        <CardHeader>
          <CardTitle>Subdomain belongs to nobody</CardTitle>
          <CardDescription>Create a new instance to get started.</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

const InstanceIndexPage: FC<IIndexPageProps> = async ({ params: { subdomain } }) => {
  return (
    <>
      {subdomain}
      <InstanceNotFoundPage />
    </>
  );

  if (!subdomain) {
  }

  return (
    <div>
      <h1>Page</h1>
      <p>Subdomain: {subdomain}</p>
    </div>
  );
};

export default InstanceIndexPage;
