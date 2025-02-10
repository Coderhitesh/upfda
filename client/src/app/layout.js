import UserLayout from "@/components/userLayout/UserLayout";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Uttar Pradesh Federation of Distributor Associations",
  description: "Welcome to Uttar Pradesh Federation of Distributor Associations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserLayout>
          {children}
        </UserLayout>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
