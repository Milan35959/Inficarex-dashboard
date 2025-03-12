"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiRequest } from "@/lib/auth"

// Define the form schema with Zod
const formSchema = z.object({
  // Owner Information
  owner_email: z.string().email({ message: "Please enter a valid email address" }),
  owner_password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  owner_first_name: z.string().min(1, { message: "First name is required" }),
  owner_middle_name: z.string().optional(),
  owner_last_name: z.string().min(1, { message: "Last name is required" }),
  owner_gender: z.enum(["male", "female", "other", "prefer not to say"]),
  owner_pronoun: z.string().optional(),
  owner_dob: z.date({ required_error: "Please select a date of birth" }),
  owner_timezone: z.string().min(1, { message: "Timezone is required" }),
  owner_mobile_number: z.string().optional(),
  owner_phone_number: z.string().optional(),
  owner_address: z.string().optional(),
  owner_state: z.string().optional(),
  owner_post_code: z.string().optional(),
  owner_emergency_contact_name: z.string().min(1, { message: "Emergency contact name is required" }),
  owner_emergency_contact_number: z.string().min(1, { message: "Emergency contact number is required" }),

  // NDIS Provider Information
  ndis_provider_name: z.string().min(1, { message: "Provider name is required" }),
  ndis_provider_number: z.string().optional().nullable(),
  ndis_abn: z.string().min(1, { message: "ABN is required" }),
  ndis_registered_location: z.string().min(1, { message: "Registered location is required" }),
  ndis_business_email: z.string().email({ message: "Please enter a valid business email" }),
  entity_detail: z.string().min(1, { message: "Entity detail is required" }),

  // Primary Contact Information
  primary_person_full_name: z.string().min(1, { message: "Primary contact name is required" }),
  primary_person_designation: z.string().min(1, { message: "Designation is required" }),
  primary_person_email: z.string().email({ message: "Please enter a valid email address" }),
  primary_person_phone: z.string().min(1, { message: "Phone number is required" }),

  // Address Information
  street_line_1: z.string().min(1, { message: "Street address is required" }),
  street_line_2: z.string().optional(),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zip_code: z.string().min(1, { message: "Zip code is required" }),
})

type FormValues = z.infer<typeof formSchema>

interface AddNdisProviderFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddNdisProviderForm({ open, onOpenChange, onSuccess }: AddNdisProviderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("owner")
  const router = useRouter()

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner_email: "",
      owner_password: "",
      owner_first_name: "",
      owner_middle_name: "",
      owner_last_name: "",
      owner_gender: "male",
      owner_pronoun: "",
      owner_timezone: "Australia/Perth",
      owner_mobile_number: "",
      owner_phone_number: "",
      owner_address: "",
      owner_state: "",
      owner_post_code: "",
      owner_emergency_contact_name: "",
      owner_emergency_contact_number: "",
      ndis_provider_name: "",
      ndis_provider_number: null,
      ndis_abn: "",
      ndis_registered_location: "",
      ndis_business_email: "",
      entity_detail: "",
      primary_person_full_name: "",
      primary_person_designation: "",
      primary_person_email: "",
      primary_person_phone: "",
      street_line_1: "",
      street_line_2: "",
      country: "Australia",
      city: "",
      zip_code: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Format the date to YYYY-MM-DD
      const formattedData = {
        ...data,
        owner_dob: format(data.owner_dob, "yyyy-MM-dd"),
      }

      // Send the data to the API
      const response = await apiRequest("dashboard/ndis", {
        method: "POST",
        body: JSON.stringify(formattedData),
      })

      if (response.success) {
        // Close the dialog and refresh the data
        onOpenChange(false)
        onSuccess()
        form.reset()
      } else {
        // Handle API error
        console.error("API Error:", response.message)
        form.setError("root", {
          type: "manual",
          message: response.message || "Failed to create NDIS provider. Please try again.",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      form.setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Navigate between tabs
  const goToNextTab = () => {
    if (activeTab === "owner") {
      // Validate owner fields before proceeding
      form
        .trigger([
          "owner_email",
          "owner_password",
          "owner_first_name",
          "owner_last_name",
          "owner_gender",
          "owner_dob",
          "owner_timezone",
          "owner_emergency_contact_name",
          "owner_emergency_contact_number",
        ])
        .then((isValid) => {
          if (isValid) setActiveTab("provider")
        })
    } else if (activeTab === "provider") {
      // Validate provider fields before proceeding
      form
        .trigger(["ndis_provider_name", "ndis_abn", "ndis_registered_location", "ndis_business_email", "entity_detail"])
        .then((isValid) => {
          if (isValid) setActiveTab("contact")
        })
    } else if (activeTab === "contact") {
      // Validate contact fields before proceeding
      form
        .trigger([
          "primary_person_full_name",
          "primary_person_designation",
          "primary_person_email",
          "primary_person_phone",
        ])
        .then((isValid) => {
          if (isValid) setActiveTab("address")
        })
    }
  }

  const goToPreviousTab = () => {
    if (activeTab === "provider") setActiveTab("owner")
    else if (activeTab === "contact") setActiveTab("provider")
    else if (activeTab === "address") setActiveTab("contact")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New NDIS Provider</DialogTitle>
          <DialogDescription>Fill in the details to create a new NDIS provider.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="owner">Owner Info</TabsTrigger>
                <TabsTrigger value="provider">Provider Info</TabsTrigger>
                <TabsTrigger value="contact">Primary Contact</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
              </TabsList>

              {/* Owner Information Tab */}
              <TabsContent value="owner" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="owner_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password*</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="owner_first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_middle_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="David" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="owner_gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_pronoun"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pronoun</FormLabel>
                        <FormControl>
                          <Input placeholder="he/him" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="owner_dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value ? "text-muted-foreground" : ""
                                }`}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Australia/Perth">Perth (AWST)</SelectItem>
                            <SelectItem value="Australia/Adelaide">Adelaide (ACST)</SelectItem>
                            <SelectItem value="Australia/Darwin">Darwin (ACST)</SelectItem>
                            <SelectItem value="Australia/Brisbane">Brisbane (AEST)</SelectItem>
                            <SelectItem value="Australia/Sydney">Sydney (AEST)</SelectItem>
                            <SelectItem value="Australia/Melbourne">Melbourne (AEST)</SelectItem>
                            <SelectItem value="Australia/Hobart">Hobart (AEST)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="owner_mobile_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0412 345 678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="02 1234 5678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="owner_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="NSW" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_post_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Code</FormLabel>
                        <FormControl>
                          <Input placeholder="2000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="owner_emergency_contact_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_emergency_contact_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="0412 345 678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Provider Information Tab */}
              <TabsContent value="provider" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ndis_provider_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Neupane Home Care" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ndis_provider_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ndis_abn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ABN*</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678901" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ndis_registered_location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="Sydney, Australia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ndis_business_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="business@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="entity_detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entity Detail*</FormLabel>
                        <FormControl>
                          <Input placeholder="Saycare Services Pty Ltd" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Primary Contact Tab */}
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="primary_person_full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Billy Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primary_person_designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation*</FormLabel>
                        <FormControl>
                          <Input placeholder="Director" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="primary_person_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primary_person_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone*</FormLabel>
                        <FormControl>
                          <Input placeholder="+61 400 123 456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="street_line_1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address Line 1*</FormLabel>
                        <FormControl>
                          <Input placeholder="00 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street_line_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address Line 2</FormLabel>
                        <FormControl>
                          <Input placeholder="Apartment, suite, unit, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country*</FormLabel>
                        <FormControl>
                          <Input placeholder="Australia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl>
                          <Input placeholder="Sydney" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zip_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip/Postal Code*</FormLabel>
                        <FormControl>
                          <Input placeholder="2000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Form error message */}
            {form.formState.errors.root && (
              <div className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</div>
            )}

            {/* Navigation buttons */}
            <DialogFooter className="flex justify-between">
              <div>
                {activeTab !== "owner" && (
                  <Button type="button" variant="outline" onClick={goToPreviousTab}>
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>

                {activeTab !== "address" ? (
                  <Button type="button" onClick={goToNextTab}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

