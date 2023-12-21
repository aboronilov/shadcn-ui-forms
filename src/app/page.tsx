import { ModeToggle } from '@/components/ThemeToggler'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { registerSchema } from '@/validators/auth'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

type Input = z.infer<typeof registerSchema>

export default function Home() {
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      studentId: "",
      year: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = (data: Input) => {
    console.log(data)
  }

  return (
    <section className='flex h-screen items-center justify-center'>
      <ModeToggle className="absolute top-6 right-6" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Start the journey with us today</CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>
    </section>
  )
}
