"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Clipboard, RefreshCw } from "lucide-react";

import { Button, Input, Card, CardContent, Label } from "@shared/ui";
import { loginSchema, type LoginFormValues } from "../model/schema";

function generateDeviceCode() {
  return "LG" + Math.floor(100000 + Math.random() * 900000);
}

export function LoginForm() {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [deviceCode, setDeviceCode] = useState<string>("");
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setDeviceCode(generateDeviceCode());
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorText("");

    try {
      if (values.password !== deviceCode) {
        throw new Error("Parol noto‘g‘ri! Iltimos, qayta urinib ko‘ring.");
      }

      Cookies.set("access_token", "mock-token", {
        path: "/",
        sameSite: "lax",
        
      });

      router.push("/kassa");
    } catch (e: unknown) {
      setErrorText(e instanceof Error ? e.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const refreshCode = () => setDeviceCode(generateDeviceCode());

  return (
    <Card className="shadow-sm border-0">
      <CardContent className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-6">Tizimga kirish</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Login</Label>
            <Input
              className="mt-1 "
              autoComplete="off"
              {...register("login")}
            />
            {errors.login && (
              <p className="text-sm text-red-500 mt-1">
                {errors.login.message}
              </p>
            )}
          </div>

          <div>
            <Label>Parol</Label>
            <div className="relative mt-1">
              <Input
                type={showPass ? "text" : "password"}
                className="pr-10 "
                autoComplete="new-password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPass ? "Yopish" : "Ko‘rsatish"}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {deviceCode && (
            <div className="flex items-center justify-between bg-green-100 text-gray-800 rounded-xl p-3">
              <span className="font-semibold tracking-wide">{deviceCode}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(deviceCode)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Nusxa olish"
                >
                  <Clipboard size={18} />
                </button>
                <button
                  type="button"
                  onClick={refreshCode}
                  className="text-gray-600 hover:text-gray-800"
                  title="Yangilash"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
          )}

          {errorText && (
            <p className="text-sm text-red-600 font-medium">{errorText}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-base">
            {loading ? "Kirish..." : "Kirish"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}