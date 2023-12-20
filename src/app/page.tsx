import { ModeToggle } from '@/components/ThemeToggler'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <section>
      <ModeToggle className="absolute top-6 right-6" />
    </section>
  )
}
