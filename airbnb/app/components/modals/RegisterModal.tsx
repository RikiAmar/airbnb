"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../shared/Heading";
import Input from "../Inputs/Input";
import Button from "../shared/Button";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb!" subtitle="create an account" center />
      <Input
        id="email"
        label="Email"
        register={register}
        disabled={isLoading}
        error={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        disabled={isLoading}
        error={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        disabled={isLoading}
        error={errors}
        required
      />
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then((response) => {
        toast.success("You Registered successfully!");
        toggle();
      })
      .catch((error) => {
        toast.error("Your registration failed! Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Continue with Github"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggle}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
    />
  );
};

export default RegisterModal;
