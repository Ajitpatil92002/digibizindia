'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PenIcon } from 'lucide-react'
import { Biz } from '@prisma/client'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	slug: z.string(),
	id: z.string().optional(),
	bizname: z.string().min(1, "Business name is required"),
	heading: z.string().optional(),
	subheading: z.string().optional(),
	type: z.enum(['PRODUCT', 'SERVICES']),
	logo: z.string().optional(),
	phonenumbers: z.string().optional(),
	email: z.string().email().optional(),
	address: z.string().optional(),
	timings: z.string().optional(),
	fblink: z.string().url().optional(),
	instalink: z.string().url().optional(),
	bannerImg: z.string().optional(),
	otherslink: z.string().optional(),
})

export function BizForm({ biz }: { biz: z.infer<typeof formSchema> }) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [isSubmitting, setisSubmitting] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...biz
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setisSubmitting(true)
			const formattedValues = {
				...values,
				bizId: values.id,
				logo: undefined,
				bannerImg: undefined,
				otherslink: values.otherslink ? values.otherslink.split(',').map(link => link.trim()) : undefined,
			}
			await axios.post('/api/biz', formattedValues)
			alert("Your business information has been updated.")
			router.refresh()
			setOpen(false)
		} catch (error: any) {
			alert("error : " + error.response.data.msg || error.message + "\n: Your business information has been updated.")
		} finally {
			setisSubmitting(false)
		}
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size={"icon"}><PenIcon className='mx-2 h-4 w-4' /></Button>
			</SheetTrigger>
			<SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
				<SheetHeader>
					<SheetTitle>Update Business Information</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
						<FormField
							control={form.control}
							name="bizname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Business Name</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Heading</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="subheading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subheading</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="PRODUCT">Product</SelectItem>
											<SelectItem value="SERVICES">Services</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phonenumbers"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Numbers</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="timings"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Timings</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="fblink"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Facebook Link</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="instalink"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Instagram Link</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="otherslink"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Other Links (comma-separated)</FormLabel>
									<FormControl>
										<Textarea disabled={isSubmitting} {...field} placeholder="Enter links separated by commas" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isSubmitting} type="submit" className="w-full">Submit</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}