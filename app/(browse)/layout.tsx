import { Suspense } from "react";
import Container from "./_components/container";
import { Navbar } from "./_components/navbar/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar/index";
//this is server component
const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>

        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
