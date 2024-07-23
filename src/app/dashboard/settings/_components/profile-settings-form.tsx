"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "lucia";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { updateUserInfoAction } from "../actions";
import {
  profileSettingsSchema,
  type ProfileSettingsSchema,
} from "../profile-settings-schema";

type ProfileSettingsFormProps = {
  user: User;
};

export const ProfileSettingsForm = ({ user }: ProfileSettingsFormProps) => {
  const form = useForm<ProfileSettingsSchema>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      fullName: user.fullName ?? "",
      phoneNumber: user.phoneNumber ?? "",
    },
  });

  const { isPending, execute: saveSettings } =
    useServerAction(updateUserInfoAction);

  const onSubmit = (values: ProfileSettingsSchema) => saveSettings(values);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex flex-wrap items-center gap-2 space-y-0">
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input className="xs:max-w-80" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-wrap items-center gap-2 space-y-0">
              <FormLabel>Contacto Telefónico</FormLabel>
              <FormControl>
                <Input className="xs:max-w-40" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="xs:w-fit">
          Guardar alterações
          {isPending && <LoaderCircle className="ml-2 size-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
