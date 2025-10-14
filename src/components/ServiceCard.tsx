import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  label: string;
  href: string;
  variant?: "default" | "accent";
}

export const ServiceCard = ({ icon: Icon, label, href, variant = "default" }: ServiceCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 active:scale-95",
        variant === "accent" 
          ? "bg-accent/10 hover:bg-accent/20" 
          : "bg-card hover:bg-muted"
      )}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className={cn(
        "p-3 rounded-xl",
        variant === "accent" ? "bg-accent/20" : "bg-primary/10"
      )}>
        <Icon className={cn(
          "h-6 w-6",
          variant === "accent" ? "text-accent" : "text-primary"
        )} />
      </div>
      <span className="text-sm font-medium text-foreground text-center">{label}</span>
    </Link>
  );
};
