import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { toast } from "../models/formInterface";

export default function UseToast(props: toast) {
  const toast = useRef<Toast>(null);
    useEffect(() => {
      
    if (props.status === "success") {
      toast.current?.show({
        severity: "success",
        summary: "success",
        detail: "Success",
      });
    }
    if (props.status === "error") {
      toast.current?.show({
        severity: "error",
        summary: "error",
        detail: "Something went wrong",
      });
    }
  }, [props.status]);

  return (
    <div className="toast">
      <Toast ref={toast} />
    </div>
  );
}
