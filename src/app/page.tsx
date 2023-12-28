"use client"

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
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

type Input = z.infer<typeof registerSchema>

export default function Home() {
  const [formStep, setFormStep] = useState(0)

  const { toast } = useToast()

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

  // console.log(form.watch())

  const onSubmit = (data: Input) => {
    if (data.confirmPassword !== data.password) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* name */}
              <div className={cn('space-y-3', {
                'hidden': formStep == 1,
              })}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* student ID */}
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Student ID..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of study</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a year of study to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[10, 11, 12].map((item) => (
                            <SelectItem
                              key={item}
                              value={item.toString()}
                            >
                              Year {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn('space-y-3', {
                'hidden': formStep == 0,
              })}>
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password..." {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* re-password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm your password..." {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className={cn({
                      hidden: formStep == 0
                    }
                  )}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.trigger(['email', 'name', 'year', 'studentId'])
                    const emailState = form.getFieldState('email')
                    const nameState = form.getFieldState('name')
                    const yearState = form.getFieldState('year')
                    const studentIdState = form.getFieldState('studentId')

                    if (!emailState.isDirty || emailState.error) return
                    if (!nameState.isDirty || nameState.error) return
                    if (!yearState.isDirty || yearState.error) return
                    if (!studentIdState.isDirty || studentIdState.error) return

                    setFormStep((prev) => prev += 1)
                  }}
                  className={cn({
                    hidden: formStep == 1
                  }
                )}
                >
                  Next step <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={cn({
                      hidden: formStep == 0
                    }
                  )}
                  onClick={() => setFormStep((prev) => prev -= 1)}
                >
                  Go back <ArrowLeft className='w-4 h-4 ml-2' />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
