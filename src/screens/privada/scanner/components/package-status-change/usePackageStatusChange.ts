import { StatusOption } from "@/types/package";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PackageStatusChangeRef } from ".";
import { packageStatusSchema } from "./schema";
import { packageStatusTypes } from "./types";

interface PusePackageStatusChangeProps {
  ref: React.ForwardedRef<PackageStatusChangeRef>;
}

export const usePackageStatusChange = ({
  ref,
}: PusePackageStatusChangeProps) => {
  const [loading, setLoading] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [onSubmitCallback, setOnSubmitCallback] = useState<
    ((data: packageStatusTypes) => Promise<boolean>) | null
  >(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<packageStatusTypes>({
    resolver: zodResolver(packageStatusSchema),
    defaultValues: { status: "Coletado" },
  });

  const status = watch('status')

  useImperativeHandle(ref, () => ({
    open: (onSubmit) => {
      setOnSubmitCallback(() => onSubmit);
      bottomSheetRef.current?.present();
    },
    close: () => {
      bottomSheetRef.current?.dismiss();
    },
  }));

const handleConfirm = handleSubmit(async (data: packageStatusTypes) => {
  if (!onSubmitCallback) return;

  try {
    setLoading(true);
    const success = await onSubmitCallback(data);

    if (success) {
      bottomSheetRef.current?.dismiss();
    }
  } catch (err) {
    console.error("Erro ao enviar dados do modal:", err);
  } finally {
    setLoading(false);
  }
});

  const selectStatus = (item: StatusOption) => {
    setValue('status' ,item.value)
  }

  const isLoading = isSubmitting || loading

  return {
    bottomSheetRef,
    status,
    selectStatus,
    handleConfirm,
    control,
    errors,
    isLoading
  };
};
